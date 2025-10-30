'use client';

import Link from 'next/link';
import { CheckCircle, Package, Truck, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function OrderSuccessPage() {
  // In a real app, this would come from the order data
  const orderNumber = `ORD-${Date.now()}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold mb-4">
            Pedido Realizado com Sucesso!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Seu pedido foi processado e está sendo preparado para envio.
          </p>

          {/* Order Info */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-left space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-gray-600">Número do Pedido:</span>
                  <span className="font-mono font-bold text-lg">{orderNumber}</span>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-gray-600">Previsão de Entrega:</span>
                  <span className="font-medium">
                    {estimatedDelivery.toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Em Processamento
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Separação</h3>
              <p className="text-sm text-gray-600">
                Seus produtos estão sendo separados em nosso centro de distribuição
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Transporte</h3>
              <p className="text-sm text-gray-600">
                Produtos enviados para a transportadora
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Entrega</h3>
              <p className="text-sm text-gray-600">
                Receba seus produtos no endereço informado
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="tire-gradient text-white hover:opacity-90 transition-opacity">
              <Link href="/produtos">
                <Home className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <Link href="/contato">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Falar com Suporte
              </Link>
            </Button>
          </div>

          {/* Email Notice */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              <strong>Importante:</strong> Enviamos um e-mail com todos os detalhes do seu pedido. 
              Verifique também sua caixa de spam caso não encontre o e-mail na caixa de entrada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}