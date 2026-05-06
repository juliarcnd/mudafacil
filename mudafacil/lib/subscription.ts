export type PlanUser = {
  plan: string
  trialEndsAt: Date | null
  stripeCurrentPeriodEnd: Date | null
}

export function isTrialActive(user: PlanUser): boolean {
  return user.plan === "TRIAL" && user.trialEndsAt != null && user.trialEndsAt > new Date()
}

export function isSubscribed(user: PlanUser): boolean {
  return (
    user.plan === "PRO" &&
    user.stripeCurrentPeriodEnd != null &&
    user.stripeCurrentPeriodEnd > new Date()
  )
}

export function hasAccess(user: PlanUser): boolean {
  return isTrialActive(user) || isSubscribed(user)
}

export function daysLeftInTrial(user: PlanUser): number {
  if (!user.trialEndsAt) return 0
  const diff = user.trialEndsAt.getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export const PLAN_LIMITS = {
  FREE: {
    mudancasAtivas: 1,
    itensNoCanvas: 15,
    cotacoesPorMudanca: 3,
    filtrosAvancados: false,
  },
  TRIAL: {
    mudancasAtivas: Infinity,
    itensNoCanvas: Infinity,
    cotacoesPorMudanca: Infinity,
    filtrosAvancados: true,
  },
  PRO: {
    mudancasAtivas: Infinity,
    itensNoCanvas: Infinity,
    cotacoesPorMudanca: Infinity,
    filtrosAvancados: true,
  },
} as const

export type PlanLimitKey = keyof (typeof PLAN_LIMITS)["FREE"]

export function getPlanLimits(user: PlanUser) {
  if (isTrialActive(user)) return PLAN_LIMITS.TRIAL
  if (isSubscribed(user)) return PLAN_LIMITS.PRO
  return PLAN_LIMITS.FREE
}
