import { NextRequest, NextResponse } from 'next/server'
import { testSupabaseConnection, seedDatabase } from '@/lib/test-supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    if (action === 'seed') {
      const result = await seedDatabase()
      return NextResponse.json(result)
    }
    
    const result = await testSupabaseConnection()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Erro no teste do Supabase:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
}