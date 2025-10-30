'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const total = getTotal();
  const shipping = total > 500 ? 0 : 29.90;
  const finalTotal = total + shipping;

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    setIsUpdating(id);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    updateQuantity(id, newQuantity);
    setIsUpdating(null);
  };

  const handleRemoveItem = async (id: string) => {
    setIsUpdating(id);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    removeItem(id);
    setIsUpdating(null);
  };

  const handleClearCart = async () => {
    setIsUpdating('clear');
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    clearCart();
    setIsUpdating(null);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Parece que você ainda não adicionou nenhum produto ao carrinho.
            </p>
            
            <div className="space-x-4">
              <Button asChild>
                <Link href="/produtos">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Link>
              </Button>
            </div>
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
          <h1 className="text-3xl font-bold mb-2">Meu Carrinho</h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/produtos/${item.slug}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 mt-1">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={isUpdating === item.id || item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">
                        {isUpdating === item.id ? '...' : item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={isUpdating === item.id}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right min-w-0">
                      <p className="font-semibold text-lg">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isUpdating === item.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={handleClearCart}
                disabled={isUpdating === 'clear'}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Esvaziar Carrinho
              </Button>

              <Button variant="outline" asChild>
                <Link href="/produtos">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R$ {total.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Grátis</span>
                    ) : (
                      `R$ ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {/* Free Shipping Notice */}
                {total < 500 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-800">
                      <Truck className="w-4 h-4 inline mr-1" />
                      Adicione mais R$ {(500 - total).toFixed(2)} para ganhar frete grátis!
                    </p>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-orange-600">
                      R$ {finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full tire-gradient text-white hover:opacity-90 transition-opacity" asChild>
                  <Link href="/checkout">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Finalizar Compra
                  </Link>
                </Button>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Compra 100% segura
                </div>

                {/* Payment Methods */}
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Aceitamos:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Visa', 'Mastercard', 'Elo', 'Pix', 'Boleto'].map((method) => (
                      <span
                        key={method}
                        className="px-3 py-1 bg-gray-100 rounded text-xs text-gray-600"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}