# 🛞 Mercado Livre dos Pneus

Uma plataforma completa de e-commerce para venda de pneus, desenvolvida com tecnologias modernas e design cinematográfico.

## 🚀 Sobre o Projeto

O Mercado Livre dos Pneus é uma loja virtual completa, responsiva e esteticamente impressionante, focada em oferecer a melhor experiência de compra de pneus. Com design moderno, animações suaves e integração completa com sistemas de pagamento e frete.

## ✨ Funcionalidades Principais

### 🛍️ E-commerce Completo
- **Catálogo de Produtos**: Sistema completo com categorias, busca e filtros
- **Carrinho de Compras**: Funcionalidade completa com persistência local
- **Checkout Completo**: Formulário de pedido com cálculo de frete e múltiplas formas de pagamento
- **Gestão de Estoque**: Controle de produtos e categorias via painel administrativo

### 🎨 Design & UX
- **Design Cinematográfico**: Interface moderna com gradientes e animações suaves
- **Totalmente Responsivo**: Experiência perfeita em desktop, tablet e mobile
- **Animações Fluidas**: Transições suaves, hover effects e micro-interações
- **Paleta de Cores Personalizada**: Cores laranja e roxo inspiradas no universo automotivo

### 🔧 Tecnologias Utilizadas

#### Frontend
- **⚡ Next.js 15** - Framework React com App Router
- **📘 TypeScript 5** - Tipagem segura e melhor DX
- **🎨 Tailwind CSS 4** - Framework CSS utility-first
- **🧩 shadcn/ui** - Componentes acessíveis e modernos
- **🎯 Framer Motion** - Animações e transições fluidas
- **🐻 Zustand** - Gerenciamento de estado simples e escalável

#### Backend
- **🗄️ Prisma ORM** - Banco de dados type-safe com SQLite
- **🔐 NextAuth.js** - Sistema de autenticação completo
- **🌐 API Routes** - Endpoints RESTful para produtos e categorias
- **📊 TanStack Query** - Cache e sincronização de dados

#### Integrações
- **💳 Mercado Pago** - Sistema de pagamento seguro (configurável)
- **📦 Cálculo de Frete** - Integração com transportadoras
- **🖼️ Cloudinary** - Hospedagem de imagens otimizadas

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js 15
│   ├── api/               # API Routes
│   │   ├── categories/    # Gestão de categorias
│   │   ├── products/      # Gestão de produtos
│   │   └── seed/          # População inicial do BD
│   ├── admin/             # Painel administrativo
│   ├── carrinho/          # Carrinho de compras
│   ├── categorias/        # Listagem de categorias
│   ├── checkout/          # Processo de checkout
│   ├── produtos/          # Catálogo de produtos
│   └── pedido-sucesso/    # Página de sucesso
├── components/
│   ├── layout/            # Header, Footer
│   ├── sections/          # Seções da landing page
│   └── ui/                # Componentes shadcn/ui
├── hooks/                 # Hooks personalizados
├── lib/                   # Utilitários e configurações
└── styles/                # Estilos globais
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd mercadolivredospneus
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o banco de dados**
```bash
# Push do schema para o SQLite
npm run db:push

# Gere o Prisma Client
npm run db:generate
```

4. **Popule o banco de dados**
```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Em outro terminal, popule os dados
curl -X POST http://localhost:3000/api/seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## 📝 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Mercado Pago (opcional)
MERCADO_PAGO_ACCESS_TOKEN="your-access-token"
MERCADO_PAGO_PUBLIC_KEY="your-public-key"

# Cloudinary (opcional)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## 🎨 Personalização

### Cores e Tema
As cores principais estão definidas em `src/app/globals.css`:

```css
:root {
  --tire-orange: oklch(0.65 0.15 30);
  --tire-dark: oklch(0.15 0.05 280);
  --tire-gray: oklch(0.45 0.02 280);
}
```

### Componentes Personalizados
- **Hero Section**: Slider cinematográfico com produtos em destaque
- **Product Cards**: Cards com hover effects e quick actions
- **Cart System**: Carrinho com persistência local e cálculo automático
- **Checkout Flow**: Processo completo com validação e múltiplos passos

## 📊 Funcionalidades Técnicas

### Performance
- **Lazy Loading**: Imens carregadas sob demanda
- **Code Splitting**: Divisão automática de código
- **Image Optimization**: Otimização automática com Next.js Image
- **Caching**: Estratégias de cache no cliente e servidor

### SEO
- **Meta Tags**: Otimização para motores de busca
- **URLs Amigáveis**: Estrutura de URLs semânticas
- **Structured Data**: Schema.org para produtos
- **Sitemap**: Geração automática de sitemap

### Segurança
- **HTTPS**: Forçado em produção
- **CSRF Protection**: Proteção contra ataques CSRF
- **Input Validation**: Validação rigorosa com Zod
- **SQL Injection Protection**: Proteção via Prisma ORM

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção

# Banco de Dados
npm run db:push      # Push schema sem migrations
npm run db:generate  # Gerar Prisma Client
npm run db:migrate   # Executar migrations
npm run db:reset     # Resetar banco de dados

# Qualidade
npm run lint         # Verificação ESLint
npm run type-check   # Verificação TypeScript
```

## 📱 Páginas da Aplicação

### Públicas
- **/** - Landing page cinematográfica
- **/produtos** - Catálogo completo de produtos
- **/categorias** - Listagem de categorias
- **/produtos/[slug]** - Detalhes do produto
- **/carrinho** - Carrinho de compras
- **/checkout** - Processo de finalização
- **/pedido-sucesso** - Confirmação de pedido

### Administrativas
- **/admin** - Painel administrativo
- **/admin/produtos** - Gestão de produtos
- **/admin/categorias** - Gestão de categorias

## 🔮 Funcionalidades Futuras

- [ ] Integração completa com Mercado Pago
- [ ] Sistema de avaliações de produtos
- [ ] Chat de suporte ao cliente
- [ ] PWA para acesso offline
- [ ] Sistema de afiliados
- [ ] Exportação para marketplaces
- [ ] Analytics e relatórios avançados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Para suporte, envie um e-mail para contato@mercadolivredospneus.com.br ou abra uma issue no GitHub.

---

Desenvolvido com ❤️ para a comunidade de desenvolvedores. Potencializado por tecnologias modernas 🚀
