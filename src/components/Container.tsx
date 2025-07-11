import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <main className="max-w-7xl mx-auto px-4">{children}</main>;
}
