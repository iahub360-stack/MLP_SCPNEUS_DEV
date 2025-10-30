'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Institucional',
      links: [
        { name: 'Sobre Nós', href: '/institucional' },
        { name: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
        { name: 'Política de Privacidade', href: '/privacidade' },
        { name: 'Termos e Condições', href: '/termos' },
      ]
    },
    {
      title: 'Ajuda',
      links: [
        { name: 'Como Comprar', href: '/ajuda/comprar' },
        { name: 'Formas de Pagamento', href: '/ajuda/pagamento' },
        { name: 'Prazos de Entrega', href: '/ajuda/entrega' },
        { name: 'Central de Atendimento', href: '/contato' },
      ]
    },
    {
      title: 'Categorias',
      links: [
        { name: 'Pneus Carro', href: '/categoria/pneus-carro' },
        { name: 'Pneus Camioneta', href: '/categoria/pneus-camioneta' },
        { name: 'Pneus Moto', href: '/categoria/pneus-moto' },
        { name: 'Pneus Agrícolas', href: '/categoria/pneus-agricola' },
      ]
    }
  ]

  const paymentMethods = [
    { 
      name: 'Visa', 
      image: 'https://http2.mlstatic.com/storage/logos-api-admin/f3e8e940-f549-11ef-bad6-e9962bcd76e5-m.svg'
    },
    { 
      name: 'Mastercard', 
      image: 'https://http2.mlstatic.com/storage/logos-api-admin/f99fcca0-f3bd-11eb-9984-b7076edb0bb7-m.svg'
    },
    { 
      name: 'Elo', 
      image: 'https://http2.mlstatic.com/storage/logos-api-admin/bb7c7bb0-adec-11f0-92e6-bad6-c3381f368aaf-m.svg'
    },
    { 
      name: 'American Express', 
      image: 'https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg'
    },
    { 
      name: 'PIX', 
      image: 'https://http2.mlstatic.com/storage/logos-api-admin/9cf818e0-723a-11f0-a459-cf21d0937aeb-m.svg'
    },
    { 
      name: 'Boleto', 
      image: 'https://http2.mlstatic.com/storage/logos-api-admin/d572fb20-8da7-11ec-b5e8-23212ecb99a1-m.svg'
    },
  ]

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-gray-50 py-6 sm:py-8">
        <div className="ml-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Receba ofertas exclusivas de pneus
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Cadastre-se e receba as melhores promoções no seu e-mail
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md w-full">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm"
              />
              <button className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-8 sm:py-12">
        <div className="ml-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <a href="https://ibb.co/DfWng7Rd" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <img 
                      src="https://i.ibb.co/1GQxJ9mc/Logo-MLP-2.png" 
                      alt="Logo MLP" 
                      className="h-12 sm:h-14 object-contain"
                    />
                  </a>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Mercado Livre dos Pneus</h2>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 max-w-xs">
                  O maior e-commerce de pneus do Brasil. 
                  As melhores marcas e preços com a qualidade SCPNEUS.
                </p>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Meios de pagamento</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="w-12 h-8 bg-white rounded flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                      title={method.name}
                    >
                      <img 
                        src={method.image} 
                        alt={method.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Order Payment Button */}
                <Link href="/pagamento-encomenda">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                    <CreditCard className="w-4 h-4" />
                    Pagamento de Encomenda
                  </button>
                </Link>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">{section.title}</h3>
                <ul className="space-y-1 sm:space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-50 border-t border-gray-200 py-6 sm:py-8">
        <div className="ml-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                <span>Copyright © {currentYear} Mercado Livre dos Pneus</span>
                <span className="hidden sm:inline">•</span>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacidade
                </Link>
                <span className="hidden sm:inline">•</span>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Termos e condições
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">contato@scpneus.com.br</span>
                  <span className="sm:hidden">E-mail</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>+55 (49) 3436-1447</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <a
                  href="https://twitter.com/mercadolivre"
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://facebook.com/mercadolivre"
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://instagram.com/mercadolivre"
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
                <a
                  href="https://youtube.com/mercadolivre"
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Youtube className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row items-center justify-between text-xs text-gray-500 gap-2">
              <div className="text-center lg:text-left">
                <span>SCPNEUS DISTRIBUIDORA - CNPJ: 17.474.116/0001-65</span>
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="block sm:inline mt-1 sm:mt-0">Rua Luiz Bagatini, 581, Nossa Senhora de Lourdes, Xanxerê - SC, 89820-000</span>
              </div>
              <div className="text-center lg:text-right">
                <span>WhatsApp: +55 (49) 3436-1447 • contato@scpneus.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}