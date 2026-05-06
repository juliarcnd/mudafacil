import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { tokens } from "../../design-system/tokens"

// ─── Dados do sistema tipográfico ─────────────────────────────────────────────

const HEADINGS = [
  {
    label: "Display",
    tag: "h1" as const,
    size: "3rem",
    weight: 800,
    tracking: "-0.04em",
    lh: 1.05,
    sample: "Mudança sem estresse.",
    note: "Hero — clamp(2.5rem, 5vw, 3.5rem)",
  },
  {
    label: "H1",
    tag: "h1" as const,
    size: tokens.typography["4xl"],
    weight: 800,
    tracking: "-0.03em",
    lh: 1.1,
    sample: "Antes de sair do lugar.",
    note: "Título principal de página",
  },
  {
    label: "H2",
    tag: "h2" as const,
    size: tokens.typography["3xl"],
    weight: 700,
    tracking: "-0.025em",
    lh: 1.15,
    sample: "Tudo que você precisa para uma mudança tranquila",
    note: "Título de seção",
  },
  {
    label: "H3",
    tag: "h3" as const,
    size: tokens.typography["2xl"],
    weight: 700,
    tracking: "-0.02em",
    lh: 1.2,
    sample: "Canvas de carga interativo",
    note: "Subtítulo de seção",
  },
  {
    label: "H4",
    tag: "h4" as const,
    size: tokens.typography.xl,
    weight: 600,
    tracking: "-0.01em",
    lh: 1.25,
    sample: "Seletor de caminhão",
    note: "Título de card ou widget",
  },
  {
    label: "H5",
    tag: "h5" as const,
    size: tokens.typography.lg,
    weight: 600,
    tracking: "0",
    lh: 1.3,
    sample: "Mudanças organizadas",
    note: "Label de seção ou grupo",
  },
  {
    label: "H6",
    tag: "h6" as const,
    size: tokens.typography.base,
    weight: 600,
    tracking: "0.01em",
    lh: 1.4,
    sample: "Informações do plano",
    note: "Rótulo secundário",
  },
]

const BODY_STYLES = [
  {
    label: "Body LG",
    size: tokens.typography.lg,
    weight: 400,
    lh: 1.65,
    sample:
      "Do planejamento à contratação, o MudaFácil tem cada etapa coberta com ferramentas visuais intuitivas. Sem surpresas no dia da mudança.",
    note: "Parágrafos de destaque, subtítulos de hero",
  },
  {
    label: "Body Base",
    size: tokens.typography.base,
    weight: 400,
    lh: 1.6,
    sample:
      "Filtre transportadoras por preço, nota de avaliação, data disponível e seguro incluso. Ordene e compare lado a lado em cards.",
    note: "Texto padrão de interface",
  },
  {
    label: "Body SM",
    size: tokens.typography.sm,
    weight: 400,
    lh: 1.55,
    sample:
      "Receba cotações instantâneas de transportadoras com notas verificadas. Contrate com segurança.",
    note: "Texto secundário, descrições de features",
  },
  {
    label: "Caption",
    size: tokens.typography.xs,
    weight: 400,
    lh: 1.5,
    sample: "© 2026 MudaFácil. Todos os direitos reservados.",
    note: "Legendas, metadados, footer",
  },
]

const UI_LABELS = [
  {
    label: "Label Uppercase",
    size: "0.7rem",
    weight: 700,
    tracking: "0.18em",
    transform: "uppercase" as const,
    sample: "Números reais",
    note: "Eyebrow / seção highlight",
  },
  {
    label: "Badge",
    size: tokens.typography.xs,
    weight: 600,
    tracking: "0.04em",
    transform: "none" as const,
    sample: "Trial de 14 dias · Sem cartão de crédito",
    note: "Badges, chips, pills",
  },
  {
    label: "Nav link",
    size: tokens.typography.sm,
    weight: 400,
    tracking: "0",
    transform: "none" as const,
    sample: "Preços",
    note: "Links de navegação",
  },
  {
    label: "Button SM",
    size: tokens.typography.xs,
    weight: 500,
    tracking: "0",
    transform: "none" as const,
    sample: "Entrar",
    note: "Botão size=sm",
  },
  {
    label: "Button Default",
    size: tokens.typography.sm,
    weight: 500,
    tracking: "0",
    transform: "none" as const,
    sample: "Começar agora",
    note: "Botão size=default",
  },
  {
    label: "Button LG",
    size: tokens.typography.base,
    weight: 500,
    tracking: "0",
    transform: "none" as const,
    sample: "Começar agora",
    note: "Botão size=lg",
  },
]

const WEIGHTS = [
  { label: "Regular", value: 400, sample: "MudaFácil — Mudança sem estresse" },
  { label: "Medium", value: 500, sample: "MudaFácil — Mudança sem estresse" },
  { label: "Semibold", value: 600, sample: "MudaFácil — Mudança sem estresse" },
  { label: "Bold", value: 700, sample: "MudaFácil — Mudança sem estresse" },
  { label: "Extrabold", value: 800, sample: "MudaFácil — Mudança sem estresse" },
]

// ─── Componentes de renderização ──────────────────────────────────────────────

function Row({
  label,
  note,
  children,
}: {
  label: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-6 border-b border-border pb-5 last:border-0">
      <div className="w-28 flex-shrink-0 pt-1">
        <span className="text-xs font-mono font-semibold text-foreground block">{label}</span>
        {note && <span className="text-[10px] text-muted-foreground leading-tight block mt-0.5">{note}</span>}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="text-base font-bold text-foreground border-b-2 border-primary pb-2">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

function TypographySystem() {
  return (
    <div className="p-8 space-y-14 max-w-3xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">Typography System</h1>
        <p className="text-muted-foreground text-sm">
          Escala definida em{" "}
          <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
            design-system/tokens.ts → typography
          </code>
          . Fonte: Geist Sans (Next.js).
        </p>
      </div>

      {/* 1. Hierarquia de headings */}
      <Section title="Hierarquia de Títulos">
        {HEADINGS.map((h) => (
          <Row key={h.label} label={h.label} note={h.note}>
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-[10px] font-mono text-muted-foreground w-20 flex-shrink-0">
                {h.size} / {h.weight}
              </span>
              <h.tag
                style={{
                  fontSize: h.size,
                  fontWeight: h.weight,
                  letterSpacing: h.tracking,
                  lineHeight: h.lh,
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                {h.sample}
              </h.tag>
            </div>
          </Row>
        ))}
      </Section>

      {/* 2. Corpo de texto */}
      <Section title="Texto de Corpo">
        {BODY_STYLES.map((b) => (
          <Row key={b.label} label={b.label} note={b.note}>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground block">
                {b.size} / weight {b.weight} / lh {b.lh}
              </span>
              <p
                style={{
                  fontSize: b.size,
                  fontWeight: b.weight,
                  lineHeight: b.lh,
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                {b.sample}
              </p>
            </div>
          </Row>
        ))}
      </Section>

      {/* 3. Labels e UI text */}
      <Section title="Labels e Texto de Interface">
        {UI_LABELS.map((u) => (
          <Row key={u.label} label={u.label} note={u.note}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-mono text-muted-foreground w-20 flex-shrink-0">
                {u.size} / {u.weight}
              </span>
              <span
                style={{
                  fontSize: u.size,
                  fontWeight: u.weight,
                  letterSpacing: u.tracking,
                  textTransform: u.transform,
                  color: "var(--foreground)",
                }}
              >
                {u.sample}
              </span>
            </div>
          </Row>
        ))}
      </Section>

      {/* 4. Escala de pesos */}
      <Section title="Escala de Pesos (font-weight)">
        {WEIGHTS.map((w) => (
          <Row key={w.label} label={w.label} note={`weight: ${w.value}`}>
            <p
              style={{
                fontSize: tokens.typography.xl,
                fontWeight: w.value,
                color: "var(--foreground)",
                margin: 0,
              }}
            >
              {w.sample}
            </p>
          </Row>
        ))}
      </Section>

      {/* 5. Escala de tamanhos (token scale) */}
      <Section title="Escala de Tamanhos (tokens.typography)">
        {Object.entries(tokens.typography).map(([key, value]) => (
          <Row key={key} label={key} note={value}>
            <p
              style={{
                fontSize: value,
                fontWeight: 500,
                color: "var(--foreground)",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              MudaFácil — Mudança sem estresse
            </p>
          </Row>
        ))}
      </Section>

      {/* 6. Bloco editorial de exemplo */}
      <Section title="Exemplo Editorial">
        <div
          className="rounded-xl border border-border p-8 space-y-4"
          style={{ background: "var(--card)" }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--primary)",
              opacity: 0.75,
            }}
          >
            Por que MudaFácil
          </p>
          <h2
            style={{
              fontSize: tokens.typography["3xl"],
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            Uma mudança que começa{" "}
            <span style={{ color: "var(--primary)" }}>antes do caminhão chegar</span>
          </h2>
          <p
            style={{
              fontSize: tokens.typography.lg,
              fontWeight: 400,
              lineHeight: 1.65,
              color: "var(--muted-foreground)",
              margin: 0,
            }}
          >
            Do planejamento à contratação, o MudaFácil tem cada etapa coberta com ferramentas
            visuais intuitivas. Calcule volumes, compare caminhões e receba cotações verificadas
            — tudo em um lugar só.
          </p>
          <p
            style={{
              fontSize: tokens.typography.sm,
              fontWeight: 400,
              lineHeight: 1.55,
              color: "var(--muted-foreground)",
              margin: 0,
            }}
          >
            Começar é grátis. Sem cartão de crédito. 14 dias de trial completo.
          </p>
        </div>
      </Section>
    </div>
  )
}

// ─── Meta & Stories ───────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Design Tokens/Typography",
  component: TypographySystem,
}
export default meta

export const Sistema: StoryObj = {
  name: "Sistema completo",
  render: () => <TypographySystem />,
}

export const Headings: StoryObj = {
  name: "Hierarquia de Títulos",
  render: () => (
    <div className="p-8 space-y-6 max-w-2xl">
      {HEADINGS.map((h) => (
        <div key={h.label} className="border-b border-border pb-4 last:border-0">
          <span className="text-xs font-mono text-muted-foreground block mb-1">
            {h.label} · {h.size} · {h.weight}
          </span>
          <h.tag
            style={{
              fontSize: h.size,
              fontWeight: h.weight,
              letterSpacing: h.tracking,
              lineHeight: h.lh,
              margin: 0,
            }}
          >
            {h.sample}
          </h.tag>
        </div>
      ))}
    </div>
  ),
}

export const EscalaTamanhos: StoryObj = {
  name: "Escala de Tamanhos",
  render: () => (
    <div className="p-8 space-y-3 max-w-xl">
      {Object.entries(tokens.typography).map(([key, value]) => (
        <div key={key} className="flex items-baseline gap-4 border-b border-border pb-3 last:border-0">
          <span className="w-12 text-xs font-mono text-muted-foreground flex-shrink-0">{key}</span>
          <span className="w-16 text-xs font-mono text-muted-foreground flex-shrink-0">{value}</span>
          <span style={{ fontSize: value, fontWeight: 500 }}>
            MudaFácil — Mudança sem estresse
          </span>
        </div>
      ))}
    </div>
  ),
}

/** Alias para compatibilidade com a URL antiga 'design-tokens-typography--scale' */
export const Scale: StoryObj = {
  name: "Escala de Tamanhos (legacy)",
  render: EscalaTamanhos.render,
}

export const Pesos: StoryObj = {
  name: "Escala de Pesos",
  render: () => (
    <div className="p-8 space-y-4 max-w-xl">
      {WEIGHTS.map((w) => (
        <div key={w.label} className="flex items-baseline gap-4 border-b border-border pb-3 last:border-0">
          <span className="w-24 text-xs font-mono text-muted-foreground flex-shrink-0">
            {w.label} ({w.value})
          </span>
          <p style={{ fontSize: tokens.typography.xl, fontWeight: w.value, margin: 0 }}>
            {w.sample}
          </p>
        </div>
      ))}
    </div>
  ),
}
