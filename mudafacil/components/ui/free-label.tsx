"use client"

import { motion } from "framer-motion"

/**
 * Label "É grátis" com duas fases de animação:
 * 1. Entra suavemente após o botão (fade-up com 0.7s delay)
 * 2. Respira lentamente em loop — chama atenção sem distrair
 *
 * Padrão UX: reassurance micro-copy posicionado logo abaixo do CTA
 * reduz fricção no momento de decisão do usuário.
 */
export function FreeLabel() {
  return (
    <motion.div
      className="flex items-center justify-center mt-3 select-none"
      // Fase 1 — entrada suave, depois do botão ter "assentado"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Texto — Fase 2: respira lentamente em loop */}
      <motion.span
        className="text-sm"
        style={{ letterSpacing: "0.01em" }}
        animate={{ color: ["#78716C", "#BF3A1C", "#78716C"] }}
        transition={{
          duration: 3,
          delay: 1.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        É grátis · sem cartão de crédito
      </motion.span>
    </motion.div>
  )
}
