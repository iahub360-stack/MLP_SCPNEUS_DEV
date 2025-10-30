'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Play, Shield, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Pneus de Alta Performance",
      subtitle: "Para quem não abre mão de qualidade e segurança",
      description: "Encontre os melhores pneus para seu veículo com preços imbatíveis",
      image: "https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_3_t5qskt.png",
      badge: "LANÇAMENTO"
    },
    {
      title: "Pneus Off-Road",
      subtitle: "Conquiste qualquer terreno",
      description: "Pneus robustos para suas aventuras mais extremas",
      image: "https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_2_u0wsjg.png",
      badge: "MAIS VENDIDOS"
    },
    {
      title: "Frete Grátis",
      subtitle: "Para todo o Brasil",
      description: "Compre com segurança e receba no conforto da sua casa",
      image: "https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_1_mqwbqx.png",
      badge: "OFERTA"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-pattern">
      {/* Background Gradient */}
      <div className="absolute inset-0 tire-gradient opacity-10" />
      
      {/* Slide Background */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="fade-in">
            <Badge variant="secondary" className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
              {slides[currentSlide].badge}
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="tire-text-gradient">
                {slides[currentSlide].title}
              </span>
            </h1>
            
            <h2 className="text-2xl lg:text-3xl text-gray-600 mb-4">
              {slides[currentSlide].subtitle}
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="tire-gradient text-white hover:opacity-90 transition-opacity"
              >
                Comprar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Ver Demonstração
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 tire-gradient rounded-full flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium">Garantia</span>
                <span className="text-xs text-gray-600">100% Segura</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 tire-gradient rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium">Entrega</span>
                <span className="text-xs text-gray-600">Rápida</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 tire-gradient rounded-full flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium">Qualidade</span>
                <span className="text-xs text-gray-600">Premium</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 tire-gradient rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 tire-gradient rounded-full opacity-20 blur-2xl" />
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-orange-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}