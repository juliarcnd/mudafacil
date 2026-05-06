"use client"

import { SessionProvider } from "next-auth/react"
import { NavSidebar } from "@/components/layout/nav-sidebar"

// SessionProvider fica apenas no layout protegido
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex h-screen overflow-hidden">
        <NavSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}
