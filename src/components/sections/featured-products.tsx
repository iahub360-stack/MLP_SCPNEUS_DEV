'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  brand: string;
  images: string[];
  featured: boolean;
  category: {
    name: string;
    slug: string;
  };
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?featured=true&limit=8');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Pneu XBRI BRUTUS T/A LT 205/70R15',
      slug: 'pneu-xbri-brutus-ta-205-70r15',
      description: 'Estabilidade e controle excepcionais para qualquer terreno',
      price: 410.00,
      brand: 'XBRI',
      images: [
        'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_3_t5qskt.png',
        'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_2_u0wsjg.png'
      ],
      featured: true,
      category: {
        name: 'Pneus Camioneta',
        slug: 'pneus-camioneta'
      }
    },
    {
      id: '2',
      name: 'Pneu XBRI BRUTUS T/A LT 245/70R16',
      slug: 'pneu-xbri-brutus-ta-245-70r16',
      description: 'Máxima performance off-road com design agressivo',
      price: 550.00,
      brand: 'XBRI',
      images: [
        'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_1_mqwbqx.png',
        'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_4_imkwcy.png'
      ],
      featured: true,
      category: {
        name: 'Pneus Camioneta',
        slug: 'pneus-camioneta'
      }
    }
  ];

  const displayProducts = products.length > 0 ? products : mockProducts;

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug
    });
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="tire-text-gradient">
                Carregando produtos...
              </span>
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="tire-text-gradient">
              Produtos em Destaque
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confira nossa seleção dos melhores pneus com ofertas imperdíveis
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group card-hover border-0 shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <Link href={`/produtos/${product.slug}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge variant="destructive" className="bg-red-600">
                      -15%
                    </Badge>
                    {product.featured && (
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        Destaque
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white"
                      onClick={() => {}}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white"
                      onClick={() => {}}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Brand */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{product.brand}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </div>

                  {/* Name */}
                  <Link href={`/produtos/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Category */}
                  <Badge variant="outline" className="text-xs mb-3">
                    {product.category.name}
                  </Badge>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <div className="text-sm text-gray-500 line-through">
                        R$ {(product.price * 1.15).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <Button
                    className="w-full tire-gradient text-white hover:opacity-90 transition-opacity"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            asChild
          >
            <Link href="/produtos">
              Ver Todos os Produtos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}