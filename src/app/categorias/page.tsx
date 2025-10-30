'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const defaultCategories = [
    {
      id: '1',
      name: 'Pneus Camioneta',
      slug: 'pneus-camioneta',
      description: 'Pneus robustos para 4x4, SUVs e caminhonetes',
      image: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_3_t5qskt.png',
      _count: { products: 24 }
    },
    {
      id: '2',
      name: 'Pneus Carro',
      slug: 'pneus-carro',
      description: 'Pneus de alto desempenho para veículos de passeio',
      image: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_2_u0wsjg.png',
      _count: { products: 36 }
    },
    {
      id: '3',
      name: 'Pneus Moto',
      slug: 'pneus-moto',
      description: 'Pneus esportivos e de touring para motocicletas',
      image: 'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_1_mqwbqx.png',
      _count: { products: 18 }
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  if (loading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando categorias...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="tire-text-gradient">
              Categorias de Pneus
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Encontre o pneu perfeito para seu veículo
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar categorias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Link key={category.id} href={`/categorias/${category.slug}`}>
                <Card className="group cursor-pointer card-hover border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-white text-6xl font-bold">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                          {category._count?.products || 0} produtos
                        </Badge>
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
                      
                      <Button variant="ghost" className="p-0 h-auto font-medium text-orange-600">
                        Ver Produtos →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <Link key={category.id} href={`/categorias/${category.slug}`}>
                <Card className="group cursor-pointer card-hover border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 tire-gradient rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1 group-hover:text-orange-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-gray-600">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          {category._count?.products || 0} produtos
                        </Badge>
                        <Button variant="ghost" className="text-orange-600">
                          Ver →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              🔍
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Nenhuma categoria encontrada
            </h3>
            <p className="text-gray-600">
              Tente buscar com outros termos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}