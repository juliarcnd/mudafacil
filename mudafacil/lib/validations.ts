import { z } from "zod"

export const createMudancaSchema = z.object({
  enderecoOrigem: z.string().min(5, "Endereço de origem obrigatório"),
  enderecoDestino: z.string().min(5, "Endereço de destino obrigatório"),
  dataDesejada: z.string().optional(),
})

export const updateMudancaSchema = z.object({
  enderecoOrigem: z.string().min(5).optional(),
  enderecoDestino: z.string().min(5).optional(),
  dataDesejada: z.string().optional(),
  caminhaoId: z.string().optional(),
  status: z.enum(["RASCUNHO", "COTANDO", "CONFIRMADA", "CONCLUIDA"]).optional(),
})

export const addItemSchema = z.object({
  itemId: z.string(),
  quantidade: z.number().int().min(1).max(99),
})

export const updateLayoutSchema = z.object({
  caminhaoId: z.string(),
  itens: z.array(
    z.object({
      itemId: z.string(),
      x: z.number(),
      y: z.number(),
      rotacao: z.number().default(0),
    })
  ),
  ocupacaoPercentual: z.number().min(0).max(200),
})

export type CreateMudancaInput = z.infer<typeof createMudancaSchema>
export type UpdateMudancaInput = z.infer<typeof updateMudancaSchema>
export type AddItemInput = z.infer<typeof addItemSchema>
export type UpdateLayoutInput = z.infer<typeof updateLayoutSchema>
