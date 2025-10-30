import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    console.log('Testando conexão com Supabase...')
    
    // Testar conexão básica
    const { data, error } = await supabase.from('categories').select('count').single()
    
    if (error) {
      console.error('Erro na conexão:', error)
      return { success: false, error: error.message }
    }
    
    console.log('Conexão bem-sucedida!')
    
    // Testar se as tabelas existem
    const tables = ['categories', 'brands', 'products', 'product_images', 'orders']
    const results = {}
    
    for (const table of tables) {
      try {
        const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
        results[table] = { success: !error, count: count || 0, error: error?.message }
      } catch (err) {
        results[table] = { success: false, error: err.message }
      }
    }
    
    return { success: true, results }
  } catch (error) {
    console.error('Erro ao testar conexão:', error)
    return { success: false, error: error.message }
  }
}

export async function seedDatabase() {
  try {
    console.log('Populando banco de dados...')
    
    // Verificar se já existem dados
    const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true })
    
    if (categoryCount && categoryCount > 0) {
      console.log('Banco de dados já contém dados. Pulando seed.')
      return { success: true, message: 'Dados já existem' }
    }
    
    // Aqui você executaria o SQL de seed
    // Por enquanto, vamos inserir alguns dados básicos via API
    
    // Inserir categorias
    const categories = [
      { name: 'Pneus', slug: 'pneus', description: 'Pneus para todos os tipos de veículos' },
      { name: 'Aros e Rodas', slug: 'aros-e-rodas', description: 'Aros e rodas de alumínio e aço' },
      { name: 'Baterias', slug: 'baterias', description: 'Baterias automotivas de alta qualidade' }
    ]
    
    const { data: insertedCategories, error: categoryError } = await supabase
      .from('categories')
      .insert(categories)
      .select()
    
    if (categoryError) {
      console.error('Erro ao inserir categorias:', categoryError)
      return { success: false, error: categoryError.message }
    }
    
    // Inserir marcas
    const brands = [
      { name: 'Pirelli', slug: 'pirelli', description: 'Pneus premium de alta performance' },
      { name: 'Michelin', slug: 'michelin', description: 'Inovação e segurança em pneus' },
      { name: 'Bridgestone', slug: 'bridgestone', description: 'Tecnologia japonesa em pneus' }
    ]
    
    const { data: insertedBrands, error: brandError } = await supabase
      .from('brands')
      .insert(brands)
      .select()
    
    if (brandError) {
      console.error('Erro ao inserir marcas:', brandError)
      return { success: false, error: brandError.message }
    }
    
    console.log('Banco de dados populado com sucesso!')
    return { 
      success: true, 
      message: 'Dados inseridos com sucesso',
      categories: insertedCategories,
      brands: insertedBrands
    }
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error)
    return { success: false, error: error.message }
  }
}