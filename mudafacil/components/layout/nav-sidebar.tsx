"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Truck, LayoutDashboard, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/app", label: "Minhas Mudanças", icon: Truck },
  { href: "/settings/billing", label: "Plano e Billing", icon: Settings },
]

export function NavSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar-background">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <Truck className="h-6 w-6 text-accent" />
        <span className="text-lg font-bold text-foreground">MudaFácil</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith(href)
                ? "bg-primary/20 text-primary"
                : "text-sidebar-foreground hover:bg-primary/10 hover:text-primary"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  )
}
