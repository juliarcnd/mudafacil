"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// ─── Dados ────────────────────────────────────────────────────────────────────

const STATS = [
  {
    prefix: "+",
    value: 500,
    suffix: "",
    label: "mudanças organizadas",
    description: "Famílias que já planejaram a mudança com o MudaFácil",
  },
  {
    prefix: "",
    value: 14,
    suffix: " dias",
    label: "de trial grátis",
    description: "Para explorar tudo sem precisar de cartão de crédito",
  },
  {
    prefix: "R$",
    value: 0,
    suffix: "",
    label: "para começar",
    description: "Crie sua conta e monte seu primeiro plano agora mesmo",
  },
]

// ─── Hook: contador animado com ease-out ─────────────────────────────────────

function useCounter(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    if (target === 0) { setCount(0); return }

    let raf: number
    let startTime: number | null = null

    const tick = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)   // cubic ease-out
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, started])

  return count
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  stat,
  index,
  started,
  last,
}: {
  stat: (typeof STATS)[number]
  index: number
  started: boolean
  last: boolean
}) {
  const count = useCounter(stat.value, 1100 + index * 120, started)

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center"
      style={{
        padding: "2.75rem 2rem",
        borderRight: last ? "none" : "1px solid #F0E0D8",
        minHeight: "220px",
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
    >

      {/* Número — refinado: bold, não extrabold; tamanho controlado */}
      <div
        style={{
          fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "#BF3A1C",
          marginBottom: "0.55rem",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {stat.prefix}{count}{stat.suffix}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "#1C1917",
          marginBottom: "0.5rem",
          letterSpacing: "0.01em",
        }}
      >
        {stat.label}
      </div>

      {/* Descrição */}
      <p
        style={{
          fontSize: "0.8rem",
          color: "#78716C", /* mutedForeground do DS — contraste 4.6:1 ✓ WCAG AA */
          lineHeight: 1.55,
          maxWidth: "176px",
        }}
      >
        {stat.description}
      </p>
    </motion.div>
  )
}

// ─── Seção ───────────────────────────────────────────────────────────────────

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="px-4 py-20" style={{ background: "#FAF0EC" }}>
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">

        {/* Headline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#BF3A1C",
              opacity: 0.65,
              marginBottom: "0.85rem",
            }}
          >
            Números reais
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "#1C1917",
            }}
          >
            Uma mudança que começa{" "}
            <span style={{ color: "#BF3A1C" }}>
              antes do caminhão chegar
            </span>
          </h2>
        </motion.div>

        {/* Card container */}
        <motion.div
          className="w-full grid grid-cols-1 md:grid-cols-3"
          style={{
            border: "1px solid #E8D5CE",
            borderRadius: "1.125rem",
            background: "white",
            overflow: "hidden",
            boxShadow: "0 2px 16px rgba(191,58,28,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={i}
              started={inView}
              last={i === STATS.length - 1}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button asChild size="lg" className="px-10 shadow-md shadow-primary/20">
            <Link href="/login">
              Quero experimentar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  )
}
