// Tipos baseados na estrutura do banco SCPNEUS
export interface Categoria {
  id: number
  nome: string
  descricao?: string
  imagem?: string
  criado_em: string
}

export interface Marca {
  id: number
  nome: string
  logo?: string
  criado_em: string
}

export interface Produto {
  id: number
  codigo_produto?: string
  nome: string
  categoria_id?: number
  marca_id?: number
  descricao?: string
  especificacoes?: Record<string, any>
  imagem_principal?: string
  imagens_secundarias?: string[]
  preco: number
  ativo: boolean
  criado_em: string
  // Relacionamentos (joins)
  categoria?: Categoria
  marca?: Marca
  promocao?: Promocao
}

export interface Promocao {
  id: number
  produto_id: number
  tipo_desconto: 'percentual' | 'valor_fixo'
  valor_desconto: number
  data_inicio?: string
  data_fim?: string
  ativo: boolean
  criado_em: string
}

export interface Cupom {
  id: number
  codigo: string
  tipo: 'frete' | 'percentual' | 'valor_fixo'
  valor: number
  limite_uso: number
  usado: number
  data_inicio?: string
  data_fim?: string
  ativo: boolean
  criado_em: string
}

export interface Cliente {
  id: number
  nome: string
  email?: string
  telefone?: string
  endereco?: {
    rua: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    estado: string
    cep: string
  }
  criado_em: string
}

export interface CarrinhoItem {
  produto_id: number
  quantidade: number
  preco_unitario: number
  produto?: Produto
}

export interface Carrinho {
  id: number
  cliente_id?: number
  produtos: CarrinhoItem[]
  total: number
  atualizado_em: string
}

export interface PedidoItem {
  produto_id: number
  quantidade: number
  preco_unitario: number
  produto?: Produto
}

export interface Pedido {
  id: number
  cliente_id?: number
  produtos: PedidoItem[]
  cupom_id?: number
  total: number
  status_pagamento: 'pendente' | 'aprovado' | 'recusado'
  data_pedido: string
  // Relacionamentos
  cliente?: Cliente
  cupom?: Cupom
}

// Tipos para API responses
export interface ApiResponse<T> {
  data: T[]
  error?: string
  count?: number
}

export interface ProductWithDetails extends Produto {
  categoria?: Categoria
  marca?: Marca
  promocao_ativa?: Promocao
  preco_com_desconto?: number
}

// Cart types para frontend
export interface CartItem {
  id: number
  product: Produto
  quantity: number
  price: number
}

export interface Cart {
  id: number
  items: CartItem[]
  total: number
  subtotal: number
  discount: number
}