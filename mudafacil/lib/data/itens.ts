export type ItemData = {
  id: string
  nome: string
  categoria: string
  emoji: string
  larguraCm: number
  alturaCm: number
  profundidadeCm: number
  pesoKg: number
  volumeM3: number
}

export const ITENS_CATALOGO: ItemData[] = [
  // Quarto
  { id: "cama-casal", nome: "Cama Casal", categoria: "Quarto", emoji: "🛏️", larguraCm: 188, alturaCm: 45, profundidadeCm: 138, pesoKg: 80, volumeM3: 1.17 },
  { id: "cama-solteiro", nome: "Cama Solteiro", categoria: "Quarto", emoji: "🛏️", larguraCm: 188, alturaCm: 45, profundidadeCm: 88, pesoKg: 50, volumeM3: 0.74 },
  { id: "guarda-roupa-6", nome: "Guarda-roupa 6 portas", categoria: "Quarto", emoji: "🚪", larguraCm: 200, alturaCm: 220, profundidadeCm: 55, pesoKg: 120, volumeM3: 2.42 },
  { id: "guarda-roupa-4", nome: "Guarda-roupa 4 portas", categoria: "Quarto", emoji: "🚪", larguraCm: 160, alturaCm: 210, profundidadeCm: 52, pesoKg: 90, volumeM3: 1.75 },
  { id: "comoda", nome: "Cômoda", categoria: "Quarto", emoji: "🗃️", larguraCm: 100, alturaCm: 90, profundidadeCm: 45, pesoKg: 40, volumeM3: 0.41 },
  { id: "criado-mudo", nome: "Criado-mudo", categoria: "Quarto", emoji: "🗄️", larguraCm: 45, alturaCm: 55, profundidadeCm: 40, pesoKg: 15, volumeM3: 0.1 },
  { id: "escrivaninha", nome: "Escrivaninha", categoria: "Quarto", emoji: "🪑", larguraCm: 120, alturaCm: 75, profundidadeCm: 60, pesoKg: 35, volumeM3: 0.54 },
  // Sala
  { id: "sofa-3", nome: "Sofá 3 Lugares", categoria: "Sala", emoji: "🛋️", larguraCm: 210, alturaCm: 90, profundidadeCm: 85, pesoKg: 70, volumeM3: 1.6 },
  { id: "sofa-2", nome: "Sofá 2 Lugares", categoria: "Sala", emoji: "🛋️", larguraCm: 145, alturaCm: 85, profundidadeCm: 80, pesoKg: 50, volumeM3: 0.98 },
  { id: "mesa-sala", nome: "Mesa de Sala", categoria: "Sala", emoji: "🪑", larguraCm: 160, alturaCm: 76, profundidadeCm: 80, pesoKg: 60, volumeM3: 0.97 },
  { id: "cadeira", nome: "Cadeira", categoria: "Sala", emoji: "🪑", larguraCm: 45, alturaCm: 90, profundidadeCm: 45, pesoKg: 6, volumeM3: 0.18 },
  { id: "tv-55", nome: "TV 55\"", categoria: "Sala", emoji: "📺", larguraCm: 125, alturaCm: 72, profundidadeCm: 9, pesoKg: 15, volumeM3: 0.08 },
  { id: "rack", nome: "Rack para TV", categoria: "Sala", emoji: "📺", larguraCm: 150, alturaCm: 50, profundidadeCm: 40, pesoKg: 30, volumeM3: 0.3 },
  { id: "armario-sala", nome: "Armário de Sala", categoria: "Sala", emoji: "🗄️", larguraCm: 120, alturaCm: 180, profundidadeCm: 40, pesoKg: 60, volumeM3: 0.86 },
  // Cozinha
  { id: "geladeira", nome: "Geladeira Duplex", categoria: "Cozinha", emoji: "🧊", larguraCm: 70, alturaCm: 180, profundidadeCm: 70, pesoKg: 80, volumeM3: 0.88 },
  { id: "fogao", nome: "Fogão 4 Bocas", categoria: "Cozinha", emoji: "🍳", larguraCm: 76, alturaCm: 88, profundidadeCm: 59, pesoKg: 30, volumeM3: 0.39 },
  { id: "microondas", nome: "Micro-ondas", categoria: "Cozinha", emoji: "📦", larguraCm: 50, alturaCm: 30, profundidadeCm: 36, pesoKg: 12, volumeM3: 0.05 },
  { id: "maquina-lavar", nome: "Máquina de Lavar", categoria: "Cozinha", emoji: "🫧", larguraCm: 60, alturaCm: 85, profundidadeCm: 55, pesoKg: 65, volumeM3: 0.28 },
  { id: "mesa-cozinha", nome: "Mesa de Cozinha", categoria: "Cozinha", emoji: "🍽️", larguraCm: 120, alturaCm: 76, profundidadeCm: 70, pesoKg: 35, volumeM3: 0.64 },
  // Escritório
  { id: "mesa-escritorio", nome: "Mesa de Escritório", categoria: "Escritório", emoji: "💼", larguraCm: 140, alturaCm: 76, profundidadeCm: 70, pesoKg: 40, volumeM3: 0.75 },
  { id: "cadeira-escritorio", nome: "Cadeira de Escritório", categoria: "Escritório", emoji: "🪑", larguraCm: 65, alturaCm: 120, profundidadeCm: 65, pesoKg: 15, volumeM3: 0.51 },
  { id: "estante", nome: "Estante de Livros", categoria: "Escritório", emoji: "📚", larguraCm: 80, alturaCm: 180, profundidadeCm: 30, pesoKg: 50, volumeM3: 0.43 },
  { id: "impressora", nome: "Impressora", categoria: "Escritório", emoji: "🖨️", larguraCm: 44, alturaCm: 24, profundidadeCm: 38, pesoKg: 8, volumeM3: 0.04 },
  // Caixas
  { id: "caixa-p", nome: "Caixa P", categoria: "Caixas", emoji: "📦", larguraCm: 38, alturaCm: 26, profundidadeCm: 26, pesoKg: 10, volumeM3: 0.026 },
  { id: "caixa-m", nome: "Caixa M", categoria: "Caixas", emoji: "📦", larguraCm: 46, alturaCm: 35, profundidadeCm: 35, pesoKg: 20, volumeM3: 0.056 },
  { id: "caixa-g", nome: "Caixa G", categoria: "Caixas", emoji: "📦", larguraCm: 56, alturaCm: 43, profundidadeCm: 43, pesoKg: 30, volumeM3: 0.104 },
]

export const CATEGORIAS = ["Quarto", "Sala", "Cozinha", "Escritório", "Caixas"]
