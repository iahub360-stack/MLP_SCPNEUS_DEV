import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getProducts, createProduct } from '@/lib/supabase-helpers';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');
    const search = searchParams.get('search');

    const options: any = {};

    if (category) {
      options.category = category;
    }

    if (brand) {
      options.brand = brand;
    }

    if (featured === 'true') {
      options.featured = true;
    }

    if (search) {
      options.search = search;
    }

    if (limit) {
      options.limit = parseInt(limit);
    }

    if (page && limit) {
      options.offset = (parseInt(page) - 1) * parseInt(limit);
    }

    const products = await getProducts(options);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sku,
      name,
      description,
      short_description,
      price,
      compare_price,
      cost_price,
      quantity,
      weight,
      featured = false,
      category_id,
      brand_id,
      images,
      attributes
    } = body;

    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Inserir produto
    const { data: product, error } = await supabase
      .from('products')
      .insert({
        sku,
        name,
        slug,
        description,
        short_description,
        price,
        compare_price,
        cost_price,
        quantity,
        weight,
        featured,
        category_id,
        brand_id
      })
      .select(`
        *,
        category:categories(*),
        brand:brands(*)
      `)
      .single();

    if (error) throw error;

    // Inserir imagens se existirem
    if (images && images.length > 0) {
      const { data: productImages } = await supabase
        .from('product_images')
        .insert(
          images.map((img: any, index: number) => ({
            product_id: product.id,
            url: img.url,
            alt_text: img.alt_text,
            sort_order: index
          }))
        )
        .select();

      product.images = productImages;
    }

    // Inserir atributos se existirem
    if (attributes && attributes.length > 0) {
      const { data: productAttributes } = await supabase
        .from('product_attributes')
        .insert(
          attributes.map((attr: any) => ({
            product_id: product.id,
            name: attr.name,
            value: attr.value
          }))
        )
        .select();

      product.attributes = productAttributes;
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}