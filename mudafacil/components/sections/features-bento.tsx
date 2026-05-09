"use client"

import { motion, type Variants } from "framer-motion"
import { MousePointerClick, Truck, ShieldCheck } from "lucide-react"

// ─── Dados ────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    n: "01",
    icon: MousePointerClick,
    fear: "Não sei o que vai caber no caminhão",
    solution: "Canvas visual com dimensões reais",
    body: "Arraste sofás, camas, caixas e eletrodomésticos para um container interativo. Volume e peso calculados em tempo real — você sabe exatamente o que cabe antes de contratar qualquer coisa.",
    accent: "#FDBA74",
  },
  {
    n: "02",
    icon: Truck,
    fear: "Descubro no dia que precisava de caminhão maior",
    solution: "Caminhão certo, sem surpresa no dia D",
    body: "Compare Fiorino, HR, 3/4 e Baú lado a lado. A barra de ocupação sobe conforme você adiciona itens e avisa quando você está chegando no limite.",
    accent: "#FDBA74",
  },
  {
    n: "03",
    icon: ShieldCheck,
    fear: "Não conheço transportadoras confiáveis",
    solution: "Cotações de empresas verificadas",
    body: "Transportadoras avaliadas por clientes reais enviam propostas em minutos. Compare preço, nota, seguro incluso e data disponível — contrate com confiança.",
    accent: "#FDBA74",
  },
]


// ─── Animações ────────────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function FeaturesBento() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#0A0302" }}
    >
      {/* Transição suave do hero escuro */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #3D1510 0%, #0A0302 100%)",
        }}
      />

      {/* Glow de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-[160px]"
          style={{
            top: "10%", left: "5%",
            width: "35%", height: "40%",
            background: "rgba(191,58,28,0.12)",
          }}
        />
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            top: "20%", right: "8%",
            width: "25%", height: "30%",
            background: "rgba(253,186,116,0.06)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-28">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
        >
          <span
            className="inline-block text-xs font-bold tracking-[0.18em] uppercase mb-5"
            style={{ color: "#FDBA74", opacity: 0.75 }}
          >
            Por que MudaFácil
          </span>

          <h2
            className="text-4xl md:text-[3.25rem] font-extrabold leading-[1.08] tracking-tight mb-5"
            style={{ color: "white" }}
          >
            Três erros que todo mundo comete.<br />
            <span style={{ color: "#A78BFA" }}>Que você não vai cometer.</span>
          </h2>

          <p
            className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.50)" }}
          >
            Cada funcionalidade nasceu de uma dor real de quem já passou
            pelo estresse de uma mudança sem planejamento.
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.n}
              className="relative rounded-2xl p-7 flex flex-col gap-5 group cursor-default"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(191,58,28,0.18)",
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ scale: 1.015 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Número decorativo */}
              <span
                className="absolute -top-5 right-4 font-extrabold select-none pointer-events-none leading-none"
                style={{
                  fontSize: "6.5rem",
                  color: "rgba(191,58,28,0.07)",
                  letterSpacing: "-0.05em",
                }}
              >
                {card.n}
              </span>

              {/* Ícone */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(253,186,116,0.12)",
                  border: "1px solid rgba(253,186,116,0.22)",
                }}
              >
                <card.icon
                  className="w-5 h-5"
                  style={{ color: card.accent }}
                />
              </div>

              {/* Medo riscado */}
              <p
                className="text-sm leading-snug"
                style={{
                  color: "rgba(255,255,255,0.28)",
                  textDecoration: "line-through",
                  textDecorationColor: "rgba(239,68,68,0.4)",
                }}
              >
                {card.fear}
              </p>

              {/* Divisor */}
              <div
                className="h-px"
                style={{ background: "rgba(191,58,28,0.2)" }}
              />

              {/* Solução */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-lg font-bold leading-snug"
                  style={{ color: "white" }}
                >
                  {card.solution}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.50)" }}
                >
                  {card.body}
                </p>
              </div>

              {/* Glow de hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(191,58,28,0.35), 0 8px 48px rgba(191,58,28,0.07)",
                }}
              />
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
