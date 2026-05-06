"use client"

import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PaywallGateProps {
  children: React.ReactNode
  blocked: boolean
  title?: string
  description?: string
  feature?: string
}

export function PaywallGate({
  children,
  blocked,
  title = "Recurso PRO",
  description = "Faça upgrade para desbloquear este recurso.",
  feature,
}: PaywallGateProps) {
  if (!blocked) return <>{children}</>

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-50">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm shadow-xl border-primary/30 bg-background/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-3">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              {feature && <span className="block font-medium text-foreground mb-1">{feature}</span>}
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button className="w-full" asChild>
              <a href="/settings/billing">
                Fazer upgrade — R$ 29,90/mês
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
