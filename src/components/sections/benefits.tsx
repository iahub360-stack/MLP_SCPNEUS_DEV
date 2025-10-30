'use client';

import { Shield, Truck, Headphones, Award, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Ambiente 100% seguro com criptografia SSL e proteção de dados'
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Receba seus pneus em até 48h em todo o território nacional'
  },
  {
    icon: Headphones,
    title: 'Suporte Especializado',
    description: 'Equipe de especialistas pronta para ajudar na sua escolha'
  },
  {
    icon: Award,
    title: 'Qualidade Garantida',
    description: 'Produtos originais com garantia direta do fabricante'
  },
  {
    icon: Clock,
    title: 'Melhor Preço',
    description: 'Preços competitivos e condições especiais de pagamento'
  },
  {
    icon: RefreshCw,
    title: 'Devolução Fácil',
    description: '7 dias para devolução caso não fique satisfeito'
  }
];

export function Benefits() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="tire-text-gradient">
              Por que Escolher o Mercado Livre dos Pneus
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A melhor experiência de compra de pneus com benefícios exclusivos
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            
            return (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 tire-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold tire-text-gradient mb-2">
                50K+
              </div>
              <div className="text-gray-600">Clientes Satisfeitos</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold tire-text-gradient mb-2">
                200+
              </div>
              <div className="text-gray-600">Produtos</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold tire-text-gradient mb-2">
                4.9★
              </div>
              <div className="text-gray-600">Avaliação Média</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold tire-text-gradient mb-2">
                10+
              </div>
              <div className="text-gray-600">Anos de Mercado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}