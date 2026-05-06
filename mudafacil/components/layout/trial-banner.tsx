"use client"

import Link from "next/link"
import { Clock } from "lucide-react"

interface TrialBannerProps {
  daysLeft: number
}

export function TrialBanner({ daysLeft }: TrialBannerProps) {
  return (
    <div className="flex items-center justify-between bg-primary/10 border-b border-primary/20 px-4 py-2 text-sm">
      <div className="flex items-center gap-2 text-foreground">
        <Clock className="h-4 w-4 text-primary" />
        <span>
          <strong>{daysLeft} dias</strong> restantes no seu trial gratuito
        </span>
      </div>
      <Link
        href="/settings/billing"
        className="text-primary hover:text-primary/80 font-medium underline underline-offset-2"
      >
        Fazer upgrade →
      </Link>
    </div>
  )
}
