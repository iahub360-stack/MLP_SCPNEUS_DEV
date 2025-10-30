import { supabase } from './supabase'

// Types
export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  short_description?: string
  sku: string
  price: number
  compare_price?: number
  cost_price?: number
  track_inventory: boolean
  quantity: number
  weight?: number
  status: 'active' | 'draft' | 'archived'
  featured: boolean
  category_id?: string
  brand_id?: string
  created_at: string
  updated_at: string
  category?: Category
  brand?: Brand
  images?: ProductImage[]
  attributes?: ProductAttribute[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt_text?: string
  sort_order: number
  created_at: string
}

export interface ProductAttribute {
  id: string
  product_id: string
  name: string
  value: string
  created_at: string
}

export interface Cart {
  id: string
  session_id?: string
  customer_email?: string
  created_at: string
  updated_at: string
  items?: CartItem[]
}

export interface CartItem {
  id: string
  cart_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  customer_cpf?: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method?: string
  payment_id?: string
  subtotal: number
  shipping_cost: number
  discount_amount: number
  total_amount: number
  shipping_address?: any
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  product_name: string
  product_sku: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
}

// Categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data as Category[]
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data as Category
}

// Brands
export async function getBrands() {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data as Brand[]
}

export async function getBrandBySlug(slug: string) {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data as Brand
}

// Products
export async function getProducts(options: {
  category?: string
  brand?: string
  featured?: boolean
  search?: string
  limit?: number
  offset?: number
} = {}) {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      brand:brands(*),
      images:product_images(*),
      attributes:product_attributes(*)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (options.category) {
    query = query.eq('category.slug', options.category)
  }

  if (options.brand) {
    query = query.eq('brand.slug', options.brand)
  }

  if (options.featured) {
    query = query.eq('featured', true)
  }

  if (options.search) {
    query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%,short_description.ilike.%${options.search}%`)
  }

  if (options.limit) {
    query = query.limit(options.limit)
  }

  if (options.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query
  
  if (error) throw error
  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      brand:brands(*),
      images:product_images(*),
      attributes:product_attributes(*)
    `)
    .eq('slug', slug)
    .eq('status', 'active')
    .single()
  
  if (error) throw error
  return data as Product
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      brand:brands(*),
      images:product_images(*),
      attributes:product_attributes(*)
    `)
    .eq('id', id)
    .eq('status', 'active')
    .single()
  
  if (error) throw error
  return data as Product
}

export async function getFeaturedProducts(limit: number = 8) {
  return getProducts({ featured: true, limit })
}

export async function getRelatedProducts(productId: string, categoryId?: string, limit: number = 4) {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(*),
      brand:brands(*),
      images:product_images(*)
    `)
    .eq('status', 'active')
    .neq('id', productId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data, error } = await query
  
  if (error) throw error
  return data as Product[]
}

// Cart
export async function getCartBySessionId(sessionId: string) {
  const { data, error } = await supabase
    .from('carts')
    .select(`
      *,
      items:cart_items(
        *,
        product:products(*)
      )
    `)
    .eq('session_id', sessionId)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data as Cart | null
}

export async function createCart(sessionId: string, customerEmail?: string) {
  const { data, error } = await supabase
    .from('carts')
    .insert({ session_id: sessionId, customer_email: customerEmail })
    .select()
    .single()
  
  if (error) throw error
  return data as Cart
}

export async function addToCart(cartId: string, productId: string, quantity: number = 1) {
  // Verificar se o item já existe no carrinho
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartId)
    .eq('product_id', productId)
    .single()

  if (existingItem) {
    // Atualizar quantidade
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)
      .select()
      .single()
    
    if (error) throw error
    return data as CartItem
  } else {
    // Inserir novo item
    const { data, error } = await supabase
      .from('cart_items')
      .insert({ cart_id: cartId, product_id: productId, quantity })
      .select()
      .single()
    
    if (error) throw error
    return data as CartItem
  }
}

export async function updateCartItem(itemId: string, quantity: number) {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .select()
    .single()
  
  if (error) throw error
  return data as CartItem
}

export async function removeFromCart(itemId: string) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)
  
  if (error) throw error
}

export async function clearCart(cartId: string) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cartId)
  
  if (error) throw error
}

// Orders
export async function createOrder(orderData: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>) {
  // Gerar número do pedido
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  
  const { data, error } = await supabase
    .from('orders')
    .insert({ ...orderData, order_number: orderNumber })
    .select()
    .single()
  
  if (error) throw error
  return data as Order
}

export async function getOrderById(id: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Order
}

export async function getOrdersByEmail(email: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(*)
    `)
    .eq('customer_email', email)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Order[]
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single()
  
  if (error) throw error
  return data as Order
}

export async function updatePaymentStatus(orderId: string, paymentStatus: Order['payment_status']) {
  const { data, error } = await supabase
    .from('orders')
    .update({ payment_status })
    .eq('id', orderId)
    .select()
    .single()
  
  if (error) throw error
  return data as Order
}

// Settings
export async function getSetting(key: string) {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single()
  
  if (error) throw error
  return data?.value
}

export async function getSettings(keys?: string[]) {
  let query = supabase.from('settings').select('*')
  
  if (keys) {
    query = query.in('key', keys)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data?.reduce((acc, setting) => {
    acc[setting.key] = setting.value
    return acc
  }, {} as Record<string, string>)
}