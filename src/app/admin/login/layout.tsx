export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // Không render sidebar cho login
}
