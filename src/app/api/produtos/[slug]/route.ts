import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { ProductWithDetails } from '@/types/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select(`
        *,
        categoria:categorias(*),
        marca:marcas(*),
        promocao:promocoes(
          *,
          ativo:and(
            ativo.eq.true,
            or(
              data_inicio.is.null,
              data_inicio.lte.now()
            ),
            or(
              data_fim.is.null,
              data_fim.gte.now()
            )
          )
        )
      `)
      .eq('ativo', true)
      .eq('codigo_produto', params.slug)
      .single()

    if (error) {
      console.error('Erro ao buscar produto:', error)
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      )
    }

    // Calcular preço com desconto
    let precoComDesconto = data.preco
    if (data.promocao) {
      if (data.promocao.tipo_desconto === 'percentual') {
        precoComDesconto = data.preco * (1 - data.promocao.valor_desconto / 100)
      } else {
        precoComDesconto = data.preco - data.promocao.valor_desconto
      }
    }

    const productWithDiscount = {
      ...data,
      preco_com_desconto: precoComDesconto > 0 ? precoComDesconto : data.preco
    }

    return NextResponse.json({ data: productWithDiscount })
  } catch (error) {
    console.error('Erro interno:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}