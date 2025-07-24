'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const API_BASE_URL = 'https://cores-api.ewarrantysystem.com'

// Types
export interface User {
  id: string
  account: string
  email?: string
  role: 'admin' | 'user' | 'moderator'
  permissions: string[]
  token: string
}

export interface Session {
  user: User
  expires: string
}

interface UserProfile {
  email?: string
  role?: string
  [key: string]: unknown
}

const serverAuthService = {
  login: async (account: string, password: string): Promise<string> => {
    try {
      const response = await fetch("/api/admin/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account,
          password,
          isLogout: false
        }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const token = await response.text()
      return token
    } catch (error) {
      console.error('Server login error:', error)
      throw error
    }
  },

  logout: async (token: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/identity/v1/Account/Logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('Server logout error:', error)
    }
  },

  getUserProfile: async (token: string): Promise<UserProfile | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/identity/v1/Account/Profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to get user profile')
      }

      return await response.json()
    } catch (error) {
      console.error('Get user profile error:', error)
      return null
    }
  }
}

function determineUserRole(account: string, profile: UserProfile | null): 'admin' | 'user' | 'moderator' {
  if (account.includes('admin') || profile?.role === 'admin') {
    return 'admin'
  }
  if (account.includes('moderator') || profile?.role === 'moderator') {
    return 'moderator'
  }
  return 'user'
}

function determineUserPermissions(account: string, profile: UserProfile | null): string[] {
  const role = determineUserRole(account, profile)
  
  switch (role) {
    case 'admin':
      return [
        'users:read',
        'users:manage',
        'products:read',
        'products:manage',
        'analytics:read',
        'system:manage'
      ]
    case 'moderator':
      return [
        'users:read',
        'products:read',
        'products:manage',
        'analytics:read'
      ]
    case 'user':
    default:
      return ['products:read']
  }
}

export const verifySession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  const account = cookieStore.get('auth-account')?.value
  
  if (!token || !account) {
    return null
  }

  try {
    const profile = await serverAuthService.getUserProfile(token)
    
    if (!profile && profile !== null) {
      return null
    }

    const user: User = {
      id: account,
      account,
      email: profile?.email || account,
      role: determineUserRole(account, profile),
      permissions: determineUserPermissions(account, profile),
      token
    }

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

    return {
      user,
      expires
    }
  } catch (error) {
    console.error('Session verification failed:', error)
    return null
  }
})

export const getUser = cache(async (): Promise<User | null> => {
  const session = await verifySession()
  if (!session) return null

  return session.user
})

export const getUserById = cache(async (userId: string): Promise<User | null> => {
  const session = await verifySession()
  if (!session) return null

  if (session.user.id !== userId && !(await hasPermission(session.user, 'users:read'))) {
    return null
  }

  try {
    if (session.user.id === userId) {
      return session.user
    }
    
    return null
  } catch (error) {
    console.error('Failed to fetch user by ID:', error)
    return null
  }
})

export async function hasPermission(user: User, permission: string): Promise<boolean> {
  return user.permissions?.includes(permission) || user.role === 'admin'
}

export async function createSession(account: string, token: string): Promise<void> {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })
  
  cookieStore.set('auth-account', account, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  
  const token = cookieStore.get('auth-token')?.value
  
  if (token) {
    try {
      await serverAuthService.logout(token)
    } catch (error) {
      console.error('API logout failed:', error)
    }
  }
  
  cookieStore.delete('auth-token')
  cookieStore.delete('auth-account')
}

export async function authenticateWithAPI(account: string, password: string): Promise<string> {
  return await serverAuthService.login(account, password)
}

export async function requireAuth(): Promise<User> {
  const user = await getUser()
  if (!user) {
    redirect('/login')
  }
  return user
}

export async function requireRole(role: User['role']): Promise<User> {
  const user = await requireAuth()
  if (user.role !== role && user.role !== 'admin') {
    redirect('/unauthorized')
  }
  return user
}

export async function requirePermission(permission: string): Promise<User> {
  const user = await requireAuth()
  if (!(await hasPermission(user, permission))) {
    redirect('/unauthorized')
  }
  return user
} 