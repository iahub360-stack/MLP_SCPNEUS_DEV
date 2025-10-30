import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Produto, ProductWithDetails } from '@/types/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoriaId = searchParams.get('categoria_id')
    const marcaId = searchParams.get('marca_id')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    let query = supabase
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

    if (categoriaId) {
      query = query.eq('categoria_id', categoriaId)
    }

    if (marcaId) {
      query = query.eq('marca_id', marcaId)
    }

    if (featured === 'true') {
      query = query.not('promocao', 'is', null)
    }

    if (limit) {
      query = query.limit(parseInt(limit))
    }

    if (offset) {
      query = query.range(parseInt(offset), parseInt(offset) + (limit ? parseInt(limit) - 1 : 19))
    }

    const { data, error } = await query.order('nome')

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      return NextResponse.json(
        { error: 'Erro ao buscar produtos' },
        { status: 500 }
      )
    }

    // Calcular preços com desconto
    const productsWithDiscount = (data || []).map((product: any) => {
      let precoComDesconto = product.preco
      
      if (product.promocao) {
        if (product.promocao.tipo_desconto === 'percentual') {
          precoComDesconto = product.preco * (1 - product.promocao.valor_desconto / 100)
        } else {
          precoComDesconto = product.preco - product.promocao.valor_desconto
        }
      }

      return {
        ...product,
        preco_com_desconto: precoComDesconto > 0 ? precoComDesconto : product.preco
      }
    })

    return NextResponse.json({ data: productsWithDiscount })
  } catch (error) {
    console.error('Erro interno:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabase
      .from('produtos')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar produto:', error)
      return NextResponse.json(
        { error: 'Erro ao criar produto' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error('Erro interno:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}