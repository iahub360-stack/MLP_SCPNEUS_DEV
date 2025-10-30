import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    // Inserir categorias
    const categorias = [
      { nome: 'Pneus Carro', descricao: 'Pneus para veículos de passeio', imagem: 'https://res.cloudinary.com/demo/image/upload/v1712345678/tires/car-tires.jpg' },
      { nome: 'Pneus SUV', descricao: 'Pneus para utilitários esportivos', imagem: 'https://res.cloudinary.com/demo/image/upload/v1712345678/tires/suv-tires.jpg' },
      { nome: 'Pneus Moto', descricao: 'Pneus para motocicletas', imagem: 'https://res.cloudinary.com/demo/image/upload/v1712345678/tires/moto-tires.jpg' },
      { nome: 'Pneus Caminhão', descricao: 'Pneus para veículos de carga', imagem: 'https://res.cloudinary.com/demo/image/upload/v1712345678/tires/truck-tires.jpg' }
    ]

    const { data: categoriasInseridas, error: erroCategorias } = await supabase
      .from('categorias')
      .insert(categorias)
      .select()

    if (erroCategorias) {
      console.error('Erro ao inserir categorias:', erroCategorias)
      return NextResponse.json({ error: 'Erro ao inserir categorias' }, { status: 500 })
    }

    // Inserir marcas
    const marcas = [
      { nome: 'Pirelli', logo: 'https://res.cloudinary.com/demo/image/upload/v1712345678/brands/pirelli.png' },
      { nome: 'Michelin', logo: 'https://res.cloudinary.com/demo/image/upload/v1712345678/brands/michelin.png' },
      { nome: 'Bridgestone', logo: 'https://res.cloudinary.com/demo/image/upload/v1712345678/brands/bridgestone.png' },
      { nome: 'Goodyear', logo: 'https://res.cloudinary.com/demo/image/upload/v1712345678/brands/goodyear.png' },
      { nome: 'Continental', logo: 'https://res.cloudinary.com/demo/image/upload/v1712345678/brands/continental.png' }
    ]

    const { data: marcasInseridas, error: erroMarcas } = await supabase
      .from('marcas')
      .insert(marcas)
      .select()

    if (erroMarcas) {
      console.error('Erro ao inserir marcas:', erroMarcas)
      return NextResponse.json({ error: 'Erro ao inserir marcas' }, { status: 500 })
    }

    // Inserir produtos
    const produtos = [
      {
        codigo_produto: 'PIRELLI-PZERO-001',
        nome: 'Pirelli P Zero',
        categoria_id: categoriasInseridas[0].id,
        marca_id: marcasInseridas[0].id,
        descricao: 'Pneu de alta performance para veículos esportivos',
        especificacoes: { largura: 205, perfil: 55, aro: 16, carga: 91, velocidade: 'V' },
        imagem_principal: 'https://res.cloudinary.com/demo/image/upload/v1712345678/products/pirelli-pzero.jpg',
        imagens_secundarias: ['https://res.cloudinary.com/demo/image/upload/v1712345678/products/pirelli-pzero-2.jpg'],
        preco: 450.00,
        ativo: true
      },
      {
        codigo_produto: 'MICHELIN-PILOT-002',
        nome: 'Michelin Pilot Sport 4',
        categoria_id: categoriasInseridas[0].id,
        marca_id: marcasInseridas[1].id,
        descricao: 'Excelente aderência e desempenho em pista seca e molhada',
        especificacoes: { largura: 215, perfil: 45, aro: 17, carga: 91, velocidade: 'Y' },
        imagem_principal: 'https://res.cloudinary.com/demo/image/upload/v1712345678/products/michelin-pilot.jpg',
        imagens_secundarias: ['https://res.cloudinary.com/demo/image/upload/v1712345678/products/michelin-pilot-2.jpg'],
        preco: 520.00,
        ativo: true
      },
      {
        codigo_produto: 'BRIDGESTONE-TURANZA-003',
        nome: 'Bridgestone Turanza',
        categoria_id: categoriasInseridas[1].id,
        marca_id: marcasInseridas[2].id,
        descricao: 'Conforto e durabilidade para SUVs',
        especificacoes: { largura: 235, perfil: 60, aro: 17, carga: 103, velocidade: 'H' },
        imagem_principal: 'https://res.cloudinary.com/demo/image/upload/v1712345678/products/bridgestone-turanza.jpg',
        imagens_secundarias: ['https://res.cloudinary.com/demo/image/upload/v1712345678/products/bridgestone-turanza-2.jpg'],
        preco: 380.00,
        ativo: true
      }
    ]

    const { data: produtosInseridos, error: erroProdutos } = await supabase
      .from('produtos')
      .insert(produtos)
      .select()

    if (erroProdutos) {
      console.error('Erro ao inserir produtos:', erroProdutos)
      return NextResponse.json({ error: 'Erro ao inserir produtos' }, { status: 500 })
    }

    // Inserir promoções
    const promocoes = [
      {
        produto_id: produtosInseridos[0].id,
        tipo_desconto: 'percentual',
        valor_desconto: 15.00,
        data_inicio: new Date().toISOString().split('T')[0],
        data_fim: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ativo: true
      },
      {
        produto_id: produtosInseridos[2].id,
        tipo_desconto: 'valor_fixo',
        valor_desconto: 50.00,
        data_inicio: new Date().toISOString().split('T')[0],
        data_fim: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        ativo: true
      }
    ]

    const { data: promocoesInseridas, error: erroPromocoes } = await supabase
      .from('promocoes')
      .insert(promocoes)
      .select()

    if (erroPromocoes) {
      console.error('Erro ao inserir promoções:', erroPromocoes)
      return NextResponse.json({ error: 'Erro ao inserir promoções' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Dados inseridos com sucesso!',
      data: {
        categorias: categoriasInseridas,
        marcas: marcasInseridas,
        produtos: produtosInseridos,
        promocoes: promocoesInseridas
      }
    })

  } catch (error) {
    console.error('Erro interno:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}