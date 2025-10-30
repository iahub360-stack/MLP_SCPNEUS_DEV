'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, digite seu e-mail.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sucesso!",
        description: "E-mail cadastrado com sucesso. Em breve você receberá nossas ofertas.",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar seu e-mail. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="tire-gradient rounded-3xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full" />
              <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full" />
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full" />
            </div>

            <div className="relative z-10">
              <Mail className="w-16 h-16 mx-auto mb-6" />
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Receba Ofertas Exclusivas
              </h2>
              
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Cadastre-se e receba as melhores promoções de pneus diretamente no seu e-mail
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Digite seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70 focus:border-white focus:ring-white"
                  required
                />
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-orange-600 hover:bg-gray-100 font-medium px-8"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Cadastrar
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-sm mt-4 opacity-75">
                Ao se cadastrar, você concorda com nossos termos de uso e política de privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}