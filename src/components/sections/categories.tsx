'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Car, Truck, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  _count?: {
    products: number;
  };
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const defaultCategories = [
    {
      id: '1',
      name: 'Pneus Camioneta',
      slug: 'pneus-camioneta',
      description: 'Pneus robustos para 4x4 e SUVs',
      icon: Truck,
      color: 'from-orange-500 to-red-600',
      products: 24
    },
    {
      id: '2',
      name: 'Pneus Carro',
      slug: 'pneus-carro',
      description: 'Alto desempenho para seu veículo',
      icon: Car,
      color: 'from-blue-500 to-purple-600',
      products: 36
    },
    {
      id: '3',
      name: 'Pneus Moto',
      slug: 'pneus-moto',
      description: 'Máxima aderência para duas rodas',
      icon: Bike,
      color: 'from-green-500 to-teal-600',
      products: 18
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="tire-text-gradient">
              Categorias em Destaque
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre o pneu perfeito para seu veículo em nossa seleção especializada
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCategories.map((category, index) => {
            const IconComponent = (category as any).icon || Car;
            const gradientClass = (category as any).color || 'from-gray-500 to-gray-600';
            const productCount = category._count?.products || (category as any).products || 0;
            
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer card-hover border-0 shadow-lg overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link href={`/categorias/${category.slug}`}>
                  <CardContent className="p-0">
                    {/* Image Background */}
                    <div className={`h-48 bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconComponent className="w-24 h-24 text-white/80" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                          {productCount} produtos
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {category.description}
                      </p>
                      
                      <Button variant="ghost" className="group/btn p-0 h-auto font-medium">
                        Ver Produtos
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="tire-gradient text-white hover:opacity-90 transition-opacity"
            asChild
          >
            <Link href="/categorias">
              Ver Todas as Categorias
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}