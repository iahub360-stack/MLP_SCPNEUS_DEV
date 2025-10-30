'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Star,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';

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

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          slug: product.slug
        });
      }
      
      toast({
        title: "Produto adicionado!",
        description: `${quantity}x ${product.name} foi adicionado ao carrinho.`,
      });
      
      setQuantity(1);
    }
  };

  const nextImage = () => {
    if (product) {
      setCurrentImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Link href="/produtos">
              <Button>Voltar para Produtos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-orange-600">
                Início
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/produtos" className="text-gray-600 hover:text-orange-600">
                Produtos
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link 
                href={`/categorias/${product.category.slug}`} 
                className="text-gray-600 hover:text-orange-600"
              >
                {product.category.name}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-96 bg-white rounded-lg overflow-hidden">
                <Image
                  src={product.images[currentImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
                
                {/* Navigation */}
                {product.images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImage === index ? 'border-orange-600' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Imagem ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <Badge variant="outline" className="mb-4">
              {product.category.name}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Brand and Rating */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-lg text-gray-600">Marca: {product.brand}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">4.8 (124 avaliações)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  R$ {(product.price * 1.15).toFixed(2)}
                </span>
                <Badge variant="destructive" className="bg-red-600">
                  -15%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                ou 12x de R$ {(product.price / 12).toFixed(2)} sem juros
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-none"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-none"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <Button
                className="flex-1 tire-gradient text-white hover:opacity-90 transition-opacity"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mb-8">
              <Button variant="outline" className="flex-1">
                <Heart className="w-4 h-4 mr-2" />
                Favoritar
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <span className="text-sm">Frete Grátis</span>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <span className="text-sm">Garantia</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <span className="text-sm">7 dias para troca</span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Descrição do Produto</h3>
                <div className="prose prose-sm max-w-none">
                  {product.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Especificações</TabsTrigger>
              <TabsTrigger value="shipping">Entrega</TabsTrigger>
              <TabsTrigger value="warranty">Garantia</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Especificações Técnicas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Marca:</span>
                      <p className="font-medium">{product.brand}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Categoria:</span>
                      <p className="font-medium">{product.category.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">SKU:</span>
                      <p className="font-medium">{product.id}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Estoque:</span>
                      <p className="font-medium">Disponível</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informações de Entrega</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <p className="font-medium">Entrega Rápida</p>
                        <p className="text-sm text-gray-600">Receba em até 48h em todo o Brasil</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <p className="font-medium">Embalagem Segura</p>
                        <p className="text-sm text-gray-600">Embalagem especial para proteção dos pneus</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="warranty" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Garantia e Trocas</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Garantia do Fabricante</p>
                      <p className="text-sm text-gray-600">
                        Todos os nossos produtos possuem garantia direta do fabricante contra defeitos de fabricação.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Política de Trocas</p>
                      <p className="text-sm text-gray-600">
                        Você tem 7 dias após o recebimento para solicitar troca ou devolução, 
                        desde que o produto esteja na embalagem original e sem uso.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}