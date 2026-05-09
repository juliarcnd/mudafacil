"use client"

import React from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Constantes ───────────────────────────────────────────────────────────────

const ROAD_H        = 28
const TRUCK_BOTTOM  = 24
const TRUCK_W       = 380
const TRUCK_SPEED   = 0.024
const WHEEL_DEG     = 1.65  // sincronizado com velocidade de solo

// ─── Skyline — prédios no horizonte ──────────────────────────────────────────

function CitySkyline() {
  const b = [
    [0,52],[28,70],[46,46],[68,82],[82,60],[100,42],[136,76],[148,98],
    [154,64],[170,48],[202,66],[214,86],[236,56],[252,40],[282,72],
    [292,94],[310,60],[324,46],[356,80],[366,56],[388,68],[404,44],
    [438,78],[450,102],[458,62],[474,42],[506,74],[518,88],[538,56],
    [552,48],[584,66],[594,82],[616,54],[632,46],[666,76],[678,104],
    [686,58],[704,44],[734,72],[748,86],[768,52],[778,40],[810,80],
    [822,94],[840,64],[862,50],[896,74],[908,106],[914,58],[930,42],
    [960,78],[970,92],[990,56],[1004,44],[1036,72],[1048,86],[1066,60],
    [1088,48],[1122,76],[1134,98],[1142,64],[1160,40],[1190,70],[1208,54],
    [1238,80],[1258,46],[1278,62],
  ]

  return (
    <svg
      viewBox="0 0 1280 110"
      preserveAspectRatio="xMidYMax slice"
      className="w-full h-full"
      fill="none"
    >
      <defs>
        {/* Janelas — luzes quentes nos prédios */}
        <pattern id="wins" width="14" height="18" patternUnits="userSpaceOnUse">
          <rect x="2"  y="2"  width="4" height="6" rx="0.5" fill="#FDBA74" opacity="0.35" />
          <rect x="8"  y="2"  width="4" height="6" rx="0.5" fill="#E85A2A" opacity="0.22" />
          <rect x="2"  y="10" width="4" height="6" rx="0.5" fill="#E85A2A" opacity="0.16" />
          <rect x="8"  y="10" width="4" height="6" rx="0.5" fill="#FDBA74" opacity="0.14" />
        </pattern>
        {/* Degrade que apaga a base dos prédios */}
        <linearGradient id="bFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#160805" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {b.map(([x, h], i) => {
        const w = 10 + (i % 5) * 5
        return (
          <g key={i}>
            <rect
              x={x} y={110 - h} width={w} height={h}
              fill="#3D1510"
              opacity={0.08 + (i % 3) * 0.025}
            />
            <rect
              x={x + 1} y={110 - h + 5} width={w - 2} height={h - 6}
              fill="url(#wins)"
            />
            <rect x={x} y={110 - h} width={w} height={1.5} fill="#BF3A1C" opacity="0.06" />
          </g>
        )
      })}

      {/* Véu que funde com o asfalto */}
      <rect x="0" y="65" width="1280" height="45" fill="url(#bFade)" />
    </svg>
  )
}

// ─── Caminhão SVG — identidade Trekon ────────────────────────────────────────

function TruckSVG({
  wheelAngle,
}: {
  wheelAngle: ReturnType<typeof useMotionValue<number>>
}) {
  const WCX = [58, 184, 298]
  const WCY = 95

  return (
    <svg
      viewBox="0 0 380 115"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Sombra no asfalto */}
      <ellipse cx="183" cy="111" rx="164" ry="5" fill="black" opacity="0.22" />

      {/* ══════════════════════════════════════
          BAÚ / CARROCERIA — carvão Trekon
          ══════════════════════════════════════ */}

      {/* Corpo externo — carvão escuro */}
      <rect x="2" y="10" width="228" height="78" rx="6" fill="#1A1410" />
      {/* Faixa Trekon Red no topo */}
      <rect x="2" y="10" width="228" height="7" rx="6" fill="#BF3A1C" />
      {/* Faixa cromada inferior */}
      <rect x="2"  y="83" width="228" height="4" rx="2" fill="#3A2820" opacity="0.8" />
      <rect x="16" y="85" width="200" height="5" rx="2.5" fill="#2A1C16" opacity="0.85" />

      {/* ── Janela de carga (interior visível) ── */}
      <rect x="10" y="18" width="212" height="62" rx="3" fill="#0A0302" opacity="0.80" />

      {/* ── SOFÁ (esquerda) ── */}
      <rect x="13" y="37" width="50" height="22" rx="3" fill="#7C2D12" opacity="0.85" />
      <rect x="15" y="57" width="46" height="21" rx="2" fill="#92400E" opacity="0.9"  />
      <rect x="16" y="58" width="20" height="18" rx="2" fill="#A16207" opacity="0.65" />
      <rect x="38" y="58" width="20" height="18" rx="2" fill="#A16207" opacity="0.65" />
      <rect x="11" y="37" width="8"  height="41" rx="2" fill="#6B2110" opacity="0.88" />
      <rect x="61" y="37" width="8"  height="41" rx="2" fill="#6B2110" opacity="0.88" />
      <rect x="17" y="75" width="5" height="5" rx="1" fill="#451a03" opacity="0.75" />
      <rect x="54" y="75" width="5" height="5" rx="1" fill="#451a03" opacity="0.75" />

      {/* ── PILHA DE CAIXAS A (centro-esquerda) ── */}
      <rect x="74" y="52" width="36" height="26" rx="1" fill="#A16207" opacity="0.85" />
      <line x1="74"  y1="65" x2="110" y2="65"  stroke="#FDBA74" strokeWidth="1"   opacity="0.48" />
      <line x1="92"  y1="52" x2="92"  y2="78"  stroke="#854D0E" strokeWidth="0.8" opacity="0.35" />
      <rect x="74" y="32" width="36" height="20" rx="1" fill="#92400E" opacity="0.80" />
      <line x1="74"  y1="42" x2="110" y2="42"  stroke="#FDBA74" strokeWidth="1"   opacity="0.42" />
      <rect x="78" y="34" width="14" height="6" rx="1" fill="#FDBA74" opacity="0.18" />
      <rect x="79" y="20" width="24" height="12" rx="1" fill="#78350F" opacity="0.76" />
      <line x1="79"  y1="26" x2="103" y2="26"  stroke="#FDBA74" strokeWidth="0.8" opacity="0.36" />

      {/* ── PILHA DE CAIXAS B (centro) ── */}
      <rect x="116" y="54" width="30" height="24" rx="1" fill="#854D0E" opacity="0.82" />
      <line x1="116" y1="66" x2="146" y2="66"  stroke="#FDBA74" strokeWidth="1"   opacity="0.44" />
      <line x1="131" y1="54" x2="131" y2="78"  stroke="#78350F" strokeWidth="0.8" opacity="0.30" />
      <rect x="116" y="33" width="30" height="21" rx="1" fill="#92400E" opacity="0.78" />
      <line x1="116" y1="43" x2="146" y2="43"  stroke="#FDBA74" strokeWidth="1"   opacity="0.40" />
      <rect x="118" y="20" width="26" height="13" rx="1" fill="#7C2D12" opacity="0.72" />

      {/* ── ITEM EMBALADO — manta protetora (azul industrial) ── */}
      <rect x="152" y="25" width="40" height="53" rx="3" fill="#1C3A5C" opacity="0.60" />
      <line x1="152" y1="34" x2="192" y2="34" stroke="#2D5A8C" strokeWidth="1" opacity="0.45" />
      <line x1="152" y1="43" x2="192" y2="43" stroke="#2D5A8C" strokeWidth="1" opacity="0.45" />
      <line x1="152" y1="52" x2="192" y2="52" stroke="#2D5A8C" strokeWidth="1" opacity="0.45" />
      <line x1="152" y1="61" x2="192" y2="61" stroke="#2D5A8C" strokeWidth="1" opacity="0.45" />
      <line x1="152" y1="70" x2="192" y2="70" stroke="#2D5A8C" strokeWidth="1" opacity="0.45" />
      {/* Faixas de fixação âmbar */}
      <rect x="159" y="25" width="6" height="53" rx="1" fill="#FDBA74" opacity="0.30" />
      <rect x="178" y="25" width="6" height="53" rx="1" fill="#FDBA74" opacity="0.30" />

      {/* ── PILHA DE CAIXAS C (direita) ── */}
      <rect x="198" y="56" width="22" height="22" rx="1" fill="#78350F" opacity="0.80" />
      <line x1="198" y1="67" x2="220" y2="67" stroke="#FDBA74" strokeWidth="0.8" opacity="0.40" />
      <rect x="198" y="35" width="22" height="21" rx="1" fill="#92400E" opacity="0.75" />
      <rect x="199" y="20" width="20" height="15" rx="1" fill="#7C2D12" opacity="0.70" />
      <line x1="199" y1="27" x2="219" y2="27" stroke="#FDBA74" strokeWidth="0.8" opacity="0.32" />

      {/* Divisórias internas do baú */}
      <line x1="72"  y1="18" x2="72"  y2="80" stroke="#BF3A1C" strokeWidth="1" opacity="0.25" />
      <line x1="114" y1="18" x2="114" y2="80" stroke="#BF3A1C" strokeWidth="1" opacity="0.25" />
      <line x1="150" y1="18" x2="150" y2="80" stroke="#BF3A1C" strokeWidth="1" opacity="0.25" />
      <line x1="196" y1="18" x2="196" y2="80" stroke="#BF3A1C" strokeWidth="1" opacity="0.25" />

      {/* Moldura do baú */}
      <rect x="2"   y="10" width="4"   height="78" rx="2" fill="#BF3A1C" opacity="0.45" />
      <rect x="226" y="10" width="4"   height="78" rx="2" fill="#BF3A1C" opacity="0.45" />
      <rect x="2"   y="10" width="228" height="7"  rx="6" fill="#BF3A1C" opacity="0.40" />

      {/* Escapamento */}
      <rect x="220" y="4" width="10" height="18" rx="3" fill="#1A1410" />
      <ellipse cx="225" cy="3.5" rx="5" ry="2.5" fill="#3A2820" opacity="0.8" />
      <circle cx="225" cy="0"  r="3.5" fill="#3A2820" opacity="0.20" />
      <circle cx="227" cy="-4" r="2.5" fill="#3A2820" opacity="0.12" />

      {/* ══════════════════════════════════════
          CABINE — Trekon Red
          ══════════════════════════════════════ */}
      <path d="M232 15 L296 15 L328 57 L328 88 L232 88 Z" fill="#BF3A1C" />
      <path d="M232 15 L296 15 L312 35 L232 35 Z" fill="#E85A2A" opacity="0.40" />
      {/* Faixa lateral decorativa */}
      <line x1="232" y1="72" x2="328" y2="72" stroke="#FDBA74" strokeWidth="2" opacity="0.20" />

      {/* Para-brisa */}
      <path d="M239 19 L292 19 L310 39 L239 39 Z" fill="#E8906A" opacity="0.14" />
      <path d="M239 19 L292 19 L310 39 L239 39 Z" fill="white"   opacity="0.06" />
      <path d="M243 21 L262 21 L272 33 L243 33 Z" fill="white"   opacity="0.05" />

      {/* Porta */}
      <rect x="238" y="44" width="56" height="40" rx="3" fill="#9B2D13" opacity="0.40" />
      <rect x="284" y="60" width="8"  height="5"  rx="2" fill="white"   opacity="0.22" />

      {/* Retrovisor */}
      <rect x="320" y="30" width="17" height="11" rx="2.5" fill="#1A1410" />
      <rect x="321" y="31" width="15" height="9"  rx="2"   fill="#3A2820" opacity="0.40" />
      <line x1="328" y1="41" x2="328" y2="48" stroke="#1A1410" strokeWidth="2.5" />

      {/* Farol */}
      <rect x="322" y="50" width="16" height="26" rx="5" fill="#FDBA74" />
      <rect x="323" y="51" width="14" height="24" rx="4" fill="#FEF3C7" opacity="0.65" />
      <rect x="324" y="52" width="11" height="10" rx="2" fill="white"   opacity="0.55" />
      <circle cx="330" cy="69" r="3.5" fill="#FDE68A" opacity="0.52" />

      {/* Para-choque */}
      <rect x="318" y="78" width="26" height="9" rx="3.5" fill="#1A1410" />
      <rect x="319" y="79" width="24" height="7" rx="2.5" fill="#3A2820" opacity="0.50" />
      <rect x="332" y="81" width="10" height="3" rx="1.5" fill="#0A0302" />

      {/* ══════════════════════════════════════
          RODAS
          ══════════════════════════════════════ */}
      {WCX.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={WCY} r={16} fill="#111827" />
          <motion.g
            style={{
              rotate: wheelAngle,
              transformOrigin: `${cx}px ${WCY}px`,
            }}
          >
            <circle cx={cx} cy={WCY} r={11} fill="#2A2220" />
            <circle cx={cx} cy={WCY} r={6.5} fill="#3A2820" opacity={0.90} />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180
              return (
                <line
                  key={deg}
                  x1={cx + Math.cos(rad) * 11}
                  y1={WCY + Math.sin(rad) * 11}
                  x2={cx - Math.cos(rad) * 11}
                  y2={WCY - Math.sin(rad) * 11}
                  stroke="#BF3A1C"
                  strokeWidth={1.8}
                  opacity={0.75}
                />
              )
            })}
            <circle cx={cx} cy={WCY} r={2.5} fill="white" opacity={0.22} />
          </motion.g>
          <circle cx={cx} cy={WCY} r={11} fill="none" stroke="#E85A2A" strokeWidth={1} opacity={0.40} />
        </g>
      ))}

      {/* Eixo traseiro */}
      <rect x="174" y="92" width="124" height="6" rx="3" fill="#111827" opacity="0.55" />
    </svg>
  )
}

// ─── Hero principal ────────────────────────────────────────────────────────────

export function HeroAnimated() {
  const truckXPercent = useMotionValue(-12)
  const roadDashX     = useMotionValue(0)
  const wheelAngle    = useMotionValue(0)

  useAnimationFrame(() => {
    const cur = truckXPercent.get()
    truckXPercent.set(cur > 110 ? -12 : cur + TRUCK_SPEED)
    roadDashX.set((roadDashX.get() - 0.46) % 120)
    wheelAngle.set(wheelAngle.get() + WHEEL_DEG)
  })

  const truckLeft     = useTransform(truckXPercent, (v) => `${v}%`)
  const truckGlowLeft = useTransform(truckXPercent, (v) => `calc(${v}% + 125px)`)

  return (
    <div
      className="relative w-full flex flex-col overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* Céu — gradiente carvão quente Trekon */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, #0A0302 0%, #160805 28%, #2E1008 55%, #4A1A0E 78%, #3D1510 100%)",
        }}
      />

      {/* Estrelas */}
      <svg className="absolute inset-0 z-[1] w-full h-full pointer-events-none">
        {[
          [8,6],[15,11],[23,4],[31,8],[38,5],[47,13],[54,7],[62,10],
          [69,3],[76,7],[83,14],[90,5],[97,9],[5,19],[19,17],[34,21],
          [49,16],[64,20],[79,18],[94,15],[12,27],[28,24],[44,29],[60,25],
          [75,28],[88,23],[4,34],[17,31],[33,37],[50,33],[67,36],[82,30],
          [96,35],[11,43],[26,40],[42,45],[58,41],[73,44],[87,39],[98,42],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y * 0.7}%`}
            r={i % 5 === 0 ? 1.4 : i % 3 === 0 ? 1.0 : 0.7}
            fill="white"
            opacity={0.10 + (i % 4) * 0.055}
          />
        ))}
      </svg>

      {/* Glows de ambiente — vermelho Trekon */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="absolute left-[8%]  top-[8%]  w-[28%] h-[28%] rounded-full blur-[130px]"
             style={{ background: "rgba(191,58,28,0.18)" }} />
        <div className="absolute right-[12%] top-[12%] w-[20%] h-[22%] rounded-full blur-[100px]"
             style={{ background: "rgba(253,186,116,0.08)" }} />
        <div className="absolute left-[42%] top-[5%]  w-[18%] h-[16%] rounded-full blur-[90px]"
             style={{ background: "rgba(232,90,42,0.10)" }} />
      </div>

      {/* ── Zona de conteúdo ── */}
      <div
        className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: "clamp(2rem, 5vh, 4rem)", paddingBottom: "1.5rem" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6 w-full">
          <span
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(10,3,2,0.50)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.55)",
              fontSize: "0.8rem",
              letterSpacing: "0.03em",
            }}
          >
            Trial de 14 dias · Sem cartão de crédito
          </span>

          <h1
            className="text-5xl md:text-[4.5rem] font-extrabold tracking-tight leading-[1.06]"
            style={{ color: "white", textShadow: "0 2px 28px rgba(191,58,28,0.45)" }}
          >
            Tudo no lugar.{" "}
            <br className="hidden md:block" />
            <span style={{ color: "#FDBA74" }}>Antes de sair</span> do lugar.
          </h1>

          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.70)" }}
          >
            Monte visualmente o que vai no caminhão, compare tamanhos em tempo real
            e receba cotações de transportadoras verificadas{" "}
            <span style={{ color: "rgba(255,255,255,0.90)", fontWeight: 500 }}>
              sem surpresas no dia da mudança.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="text-base px-8 shadow-lg shadow-primary/40"
            >
              <Link href="/login">
                Planejar minha mudança
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-8"
              style={{
                borderColor: "rgba(255,255,255,0.18)",
                color: "white",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              <Link href="/pricing">Ver planos</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Zona de cena ── */}
      <div
        className="relative flex-shrink-0 w-full overflow-hidden"
        style={{ height: "42%" }}
      >
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "60px",
            background: "linear-gradient(to bottom, rgba(61,21,16,0.0) 0%, rgba(61,21,16,0.0) 100%)",
          }}
        />

        {/* Skyline */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{ bottom: "67%", height: "130px" }}
        >
          <CitySkyline />
        </div>

        {/* Asfalto */}
        <div
          className="absolute left-0 right-0 bottom-0 overflow-hidden"
          style={{ height: "67%" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, #120806 0%, #080402 100%)" }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(191,58,28,0.5), transparent)" }}
          />
          <div
            className="absolute top-0 left-0 right-0"
            style={{ height: "28px", background: "linear-gradient(to bottom, rgba(191,58,28,0.10), transparent)" }}
          />
          {/* Faixas tracejadas */}
          <motion.div
            className="absolute left-0 flex"
            style={{
              top: "8%",
              height: "3px",
              gap: "60px",
              x: roadDashX,
              width: "calc(100% + 240px)",
              marginLeft: "-120px",
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "100%",
                  width: "60px",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.20)",
                  borderRadius: "2px",
                }}
              />
            ))}
          </motion.div>
          <div
            className="absolute left-0 right-0"
            style={{
              top: "18%",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(253,186,116,0.08), transparent)",
            }}
          />
        </div>

        {/* Glow sob o caminhão */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: truckGlowLeft,
            bottom: "57%",
            width: "300px",
            height: "70px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(191,58,28,0.28) 0%, transparent 70%)",
            transform: "translateX(-50%) translateY(58%)",
          }}
        />

        {/* Caminhão */}
        <motion.div
          className="absolute"
          style={{ left: truckLeft, bottom: "57%", width: `${TRUCK_W}px` }}
        >
          {/* Feixe do farol */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: "-180px",
              top: "27%",
              width: "200px",
              height: "62px",
              background: "linear-gradient(to right, rgba(253,186,116,0.18), transparent)",
              clipPath: "polygon(0 28%, 100% 0%, 100% 100%, 0 72%)",
            }}
          />
          {/* Reflexo no asfalto */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: "-10px",
              left: "8%",
              right: "8%",
              height: "18px",
              background: "rgba(191,58,28,0.22)",
              filter: "blur(14px)",
              borderRadius: "50%",
            }}
          />
          <TruckSVG wheelAngle={wheelAngle} />
        </motion.div>
      </div>
    </div>
  )
}
