import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { tokens } from "../../design-system/tokens"

// ─── Utilitários ─────────────────────────────────────────────────────────────

/** Contraste WCAG simplificado (luminância relativa) */
function relativeLuminance(hex: string): number {
  const clean = hex.replace("#", "")
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1)
  const l2 = relativeLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function wcagBadge(hex: string) {
  // Contrast vs white (#FFFBF7) e vs dark (#1C1917)
  const vsWhite = contrastRatio(hex, "#FFFBF7")
  const vsDark = contrastRatio(hex, "#1C1917")
  const best = Math.max(vsWhite, vsDark)
  const label = best >= 7 ? "AAA" : best >= 4.5 ? "AA" : best >= 3 ? "AA Large" : "Fail"
  const color = best >= 4.5 ? "#16a34a" : best >= 3 ? "#d97706" : "#dc2626"
  return { label, ratio: best.toFixed(1), color }
}

function isValidHex(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

// ─── Componente de swatch ─────────────────────────────────────────────────────

function Swatch({
  name,
  value,
  description,
  cssVar,
}: {
  name: string
  value: string
  description?: string
  cssVar?: string
}) {
  const valid = isValidHex(value)
  const { label, ratio, color } = valid
    ? wcagBadge(value)
    : { label: "—", ratio: "—", color: "#999" }

  // Texto do swatch: branco ou escuro dependendo da luminância
  const textColor =
    valid && relativeLuminance(value) < 0.35 ? "#ffffff" : "#1C1917"

  return (
    <div className="flex flex-col gap-2 min-w-0">
      {/* Cor */}
      <div
        className="h-20 rounded-xl border border-border shadow-sm flex items-end p-2"
        style={{ backgroundColor: value }}
      >
        <span
          className="text-xs font-mono opacity-60 truncate"
          style={{ color: textColor }}
        >
          {value}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-0.5">
        <p className="text-xs font-semibold text-foreground truncate">{name}</p>
        {cssVar && (
          <p className="text-[10px] font-mono text-muted-foreground truncate">{cssVar}</p>
        )}
        {description && (
          <p className="text-[10px] text-muted-foreground leading-tight">{description}</p>
        )}
        {/* WCAG badge */}
        {valid && (
          <span
            className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-sm"
            style={{ background: color + "22", color }}
          >
            {label} {ratio}:1
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Grupos de cores ──────────────────────────────────────────────────────────

const CORE_GROUPS: {
  title: string
  description: string
  entries: { key: string; value: string; description: string; cssVar: string }[]
}[] = [
  {
    title: "Brand",
    description: "Cores de identidade — usadas em CTAs, links e destaques",
    entries: [
      { key: "Primary", value: tokens.colors.primary, description: "Violet-600 · WCAG AAA no fundo claro", cssVar: "--primary" },
      { key: "Primary Foreground", value: tokens.colors.primaryForeground, description: "Texto sobre primary", cssVar: "--primary-foreground" },
      { key: "Accent", value: tokens.colors.accent, description: "Âmbar · remete a caminhão", cssVar: "--accent" },
      { key: "Accent Foreground", value: tokens.colors.accentForeground, description: "Texto sobre accent", cssVar: "--accent-foreground" },
      { key: "Secondary", value: tokens.colors.secondary, description: "Violeta claro — fundos e badges", cssVar: "--secondary" },
      { key: "Secondary Foreground", value: tokens.colors.secondaryForeground, description: "Texto sobre secondary", cssVar: "--secondary-foreground" },
    ],
  },
  {
    title: "Texto",
    description: "Hierarquia tipográfica — foreground → muted",
    entries: [
      { key: "Foreground", value: tokens.colors.foreground, description: "Texto principal — stone-900", cssVar: "--foreground" },
      { key: "Muted Foreground", value: tokens.colors.mutedForeground, description: "Texto secundário — contraste 4.6:1 ✓ AA", cssVar: "--muted-foreground" },
      { key: "Card Foreground", value: tokens.colors.cardForeground, description: "Texto em cards", cssVar: "--card-foreground" },
    ],
  },
  {
    title: "Superfícies",
    description: "Backgrounds de página, cards e overlays",
    entries: [
      { key: "Background", value: tokens.colors.background, description: "Fundo do site — branco quente", cssVar: "--background" },
      { key: "Card", value: tokens.colors.card, description: "Fundo de cards e modais", cssVar: "--card" },
      { key: "Muted", value: tokens.colors.muted, description: "Fundo de seções alternativas", cssVar: "--muted" },
      { key: "Popover", value: tokens.colors.popover, description: "Fundo de dropdowns e tooltips", cssVar: "--popover" },
    ],
  },
  {
    title: "Bordas e Inputs",
    description: "Divisores, contornos de inputs e focus ring",
    entries: [
      { key: "Border", value: tokens.colors.border, description: "Borda padrão de componentes", cssVar: "--border" },
      { key: "Input", value: tokens.colors.input, description: "Borda de campos de formulário", cssVar: "--input" },
      { key: "Ring", value: tokens.colors.ring, description: "Focus ring (acessibilidade)", cssVar: "--ring" },
    ],
  },
  {
    title: "Estado",
    description: "Feedback de ações — erro, alerta, sucesso",
    entries: [
      { key: "Destructive", value: tokens.colors.destructive, description: "Erro / ação destrutiva", cssVar: "--destructive" },
      { key: "Destructive Foreground", value: tokens.colors.destructiveForeground, description: "Texto sobre destructive", cssVar: "--destructive-foreground" },
    ],
  },
]

const LANDING_ENTRIES = [
  { key: "Hero Darkest", value: tokens.landing.heroDarkest, description: "Céu base — fundo mais profundo do hero", cssVar: "--landing-hero-darkest" },
  { key: "Hero Dark", value: tokens.landing.heroDark, description: "2ª camada do gradiente do céu", cssVar: "--landing-hero-dark" },
  { key: "Hero Mid", value: tokens.landing.heroMid, description: "Meio do gradiente", cssVar: "--landing-hero-mid" },
  { key: "Hero Light", value: tokens.landing.heroLight, description: "Tom mais claro do céu", cssVar: "--landing-hero-light" },
  { key: "Hero Horizon", value: tokens.landing.heroHorizon, description: "Horizonte — onde o céu encontra a cidade", cssVar: "--landing-hero-horizon" },
  { key: "Section Dark", value: tokens.landing.sectionDark, description: "Fundo da seção FeaturesBento", cssVar: "--landing-section-dark" },
  { key: "Section Soft Pink", value: tokens.landing.sectionSoftPink, description: "Fundo da seção StatsCounter", cssVar: "--landing-section-soft-pink" },
  { key: "Card Border", value: tokens.landing.cardBorder, description: "Borda do card de stats", cssVar: "--landing-card-border" },
  { key: "Card Divider", value: tokens.landing.cardDivider, description: "Divisória interna dos cards de stats", cssVar: "--landing-card-divider" },
  { key: "Violet Soft", value: tokens.landing.accentSoft, description: "Violeta médio — ícones e acentos", cssVar: "--landing-violet-soft" },
  { key: "Violet Lighter", value: tokens.landing.accentLighter, description: "Violeta claro — glows e bordas sutis", cssVar: "--landing-violet-lighter" },
]

const SIDEBAR_ENTRIES = Object.entries(tokens.sidebar).map(([key, value]) => ({
  key: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
  value,
  description: "",
  cssVar: `--sidebar-${key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)}`,
}))

// ─── Componente principal ─────────────────────────────────────────────────────

function ColorSystem() {
  return (
    <div className="p-8 space-y-12 max-w-5xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">Color System</h1>
        <p className="text-muted-foreground text-sm">
          Fonte única de verdade em{" "}
          <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
            design-system/tokens.ts
          </code>
          {" "}→{" "}
          <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
            npm run tokens
          </code>
          {" "}→{" "}
          <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
            globals.css
          </code>
        </p>
      </div>

      {/* Core groups */}
      {CORE_GROUPS.map((group) => (
        <section key={group.title} className="space-y-4">
          <div>
            <h2 className="text-lg font-bold">{group.title}</h2>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {group.entries.map((e) => (
              <Swatch key={e.key} name={e.key} value={e.value} description={e.description} cssVar={e.cssVar} />
            ))}
          </div>
        </section>
      ))}

      {/* Landing */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">Landing — Seções especiais</h2>
          <p className="text-sm text-muted-foreground">
            Cores do hero, FeaturesBento e StatsCounter. Geradas como{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">--landing-*</code>{" "}
            em globals.css.
          </p>
        </div>

        {/* Hero sky gradient preview */}
        <div
          className="h-16 rounded-xl mb-2"
          style={{
            background: `linear-gradient(to right, ${tokens.landing.heroDarkest}, ${tokens.landing.heroDark}, ${tokens.landing.heroMid}, ${tokens.landing.heroLight}, ${tokens.landing.heroHorizon}, ${tokens.colors.primary})`,
          }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {LANDING_ENTRIES.map((e) => (
            <Swatch key={e.key} name={e.key} value={e.value} description={e.description} cssVar={e.cssVar} />
          ))}
        </div>
      </section>

      {/* Sidebar */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">Sidebar</h2>
          <p className="text-sm text-muted-foreground">
            Cores do painel lateral do produto (dashboard).
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SIDEBAR_ENTRIES.map((e) => (
            <Swatch key={e.key} name={e.key} value={e.value} description={e.description} cssVar={e.cssVar} />
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── Meta & Stories ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Design Tokens/Colors",
  component: ColorSystem,
}
export default meta

export const Sistema: StoryObj = {
  name: "Sistema completo",
  render: () => <ColorSystem />,
}
