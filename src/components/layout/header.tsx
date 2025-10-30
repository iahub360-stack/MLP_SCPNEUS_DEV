'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, X, User, MapPin, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/store/cart'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userLocation, setUserLocation] = useState('Enviar para São Paulo')
  const { items } = useCartStore()
  const searchRef = useRef<HTMLDivElement>(null)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Mock search suggestions
  const suggestions = [
    'pneu aro 14',
    'pneu aro 15',
    'pneu aro 16',
    'pneu pirelli',
    'pneu michelin',
    'pneu camioneta',
    'pneu moto',
    'pneu agricola'
  ]

  const categories = [
    { name: 'Ofertas de Pneus', href: '/ofertas' },
    { name: 'Pneus Carro', href: '/categoria/pneus-carro' },
    { name: 'Pneus Camioneta', href: '/categoria/pneus-camioneta' },
    { name: 'Pneus Moto', href: '/categoria/pneus-moto' },
    { name: 'Pneus Agrícolas', href: '/categoria/pneus-agricola' },
    { name: 'Marcas', href: '/categoria/marcas' },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
    console.log('Searching for:', searchQuery)
    setShowSuggestions(false)
  }

  return (
    <>
      {/* Top Bar - Location */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="ml-container">
          <div className="flex items-center justify-between h-8 text-xs">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              <button className="flex items-center hover:text-blue-600 transition-colors">
                {userLocation}
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
                Central de ajuda
              </Link>
              <Link href="/account" className="text-gray-600 hover:text-blue-600 transition-colors">
                Minha conta
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="ml-header sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="ml-container">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center mr-2 sm:mr-4 lg:mr-8">
                <div className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
                  Mercado Livre dos Pneus
                </div>
              </Link>

              {/* Mobile Categories Button */}
              <Button
                variant="ghost"
                className="lg:hidden text-gray-700 hover:text-blue-600 hover:bg-transparent p-1 sm:p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>

              {/* Categories - Desktop */}
              <nav className="hidden xl:flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="text-gray-700 hover:text-blue-600 text-xs sm:text-sm font-medium transition-colors flex items-center"
                  >
                    {category.name}
                    {category.name === 'Ofertas de Pneus' && (
                      <Badge className="ml-1 sm:ml-2 bg-orange-500 text-white text-xs px-1 sm:px-2 py-0.5">
                        OFERTA
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Search Bar - Hidden on Mobile */}
            <div className="hidden md:flex flex-1 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-2 sm:mx-4 md:mx-8" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative">
                <div className="ml-search-bar flex items-center">
                  <Input
                    type="text"
                    placeholder="Buscar pneus, marcas e mais..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setShowSuggestions(e.target.value.length > 0)
                    }}
                    onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                    className="border-none shadow-none focus:ring-0 text-gray-700 placeholder-gray-400 text-sm"
                  />
                  <Button
                    type="submit"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-none m-0 px-2 sm:px-4 h-full"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>

                {/* Search Suggestions */}
                {showSuggestions && (
                  <div className="ml-search-suggestions absolute top-full left-0 right-0 z-50">
                    {suggestions
                      .filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 8)
                      .map((suggestion, index) => (
                        <div
                          key={index}
                          className="ml-search-suggestion-item"
                          onClick={() => {
                            setSearchQuery(suggestion)
                            setShowSuggestions(false)
                          }}
                        >
                          <Search className="w-4 h-4 text-gray-400 mr-3" />
                          <span className="text-gray-700">{suggestion}</span>
                        </div>
                      ))}
                  </div>
                )}
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              {/* WhatsApp - Hidden on Mobile */}
              <a
                href="https://wa.me/554934361447?text=Olá! Estava navegando no site Mercado Livre dos Pneus e preciso de informações."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors px-2 py-1"
              >
                <div className="absolute inset-0 bg-green-400/20 rounded-lg blur-sm group-hover:bg-green-400/30 transition-colors" />
                <img 
                  src="https://i.ibb.co/1t9xgh4D/Pngtree-golden-whatsapp-icon-whatsapp-logo-3562048.png" 
                  alt="WhatsApp" 
                  className="w-4 h-4 sm:w-5 sm:h-5 relative z-10"
                />
                <span className="text-xs font-medium relative z-10 hidden lg:inline">WhatsApp</span>
              </a>

              {/* Cart */}
              <Link href="/checkout-final" className="relative">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 hover:bg-transparent p-1 sm:p-1.5 lg:p-2"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] sm:text-xs min-w-[14px] sm:min-w-[16px] lg:min-w-[18px] h-3 sm:h-4 lg:h-5 flex items-center justify-center">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Account - Hidden on Mobile */}
              <div className="hidden md:flex items-center space-x-1 sm:space-x-2">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 hover:bg-transparent p-1.5 sm:p-2"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <div className="text-xs sm:text-sm hidden lg:block">
                  <div className="text-gray-700 font-medium">Olá!</div>
                  <div className="text-gray-500">Minha conta</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 ml-animate-slide-in">
              <div className="space-y-3">
                {/* Mobile Search */}
                <div className="px-4">
                  <form onSubmit={handleSearch} className="relative">
                    <div className="flex items-center bg-gray-100 rounded-lg">
                      <Input
                        type="text"
                        placeholder="Buscar pneus..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-none shadow-none focus:ring-0 bg-transparent text-gray-700 placeholder-gray-400 text-sm"
                      />
                      <Button
                        type="submit"
                        className="bg-transparent hover:bg-transparent text-gray-600 p-2"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </div>

                {/* Mobile Categories */}
                <nav className="px-4 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      {category.name === 'Ofertas de Pneus' && (
                        <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5">
                          OFERTA
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="px-4 pt-2 border-t border-gray-100 space-y-2">
                  <Link
                    href="https://wa.me/554934361447?text=Olá! Estava navegando no site Mercado Livre dos Pneus e preciso de informações."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 text-green-600 hover:bg-green-50 transition-colors rounded-lg"
                  >
                    <img 
                      src="https://i.ibb.co/1t9xgh4D/Pngtree-golden-whatsapp-icon-whatsapp-logo-3562048.png" 
                      alt="WhatsApp" 
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">WhatsApp</span>
                  </Link>
                  <Link
                    href="/account"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors rounded-lg text-sm font-medium"
                  >
                    Minha conta
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sub-header - Offers Banner */}
      <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 py-1 sm:py-2">
        <div className="ml-container">
          <div className="flex items-center justify-center">
            <span className="text-xs sm:text-sm font-medium text-gray-800 px-2 text-center">
              🎉 Ofertas imperdíveis em pneus! Frete grátis na compra de 4 pneus
            </span>
          </div>
        </div>
      </div>
    </>
  )
}