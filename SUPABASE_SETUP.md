# Configuração do Supabase

Este guia irá ajudá-lo a migrar do banco de dados local (Prisma + SQLite) para o Supabase.

## 📋 Pré-requisitos

- Conta no Supabase (https://supabase.com)
- Projeto Next.js já configurado

## 🚀 Passos para Configuração

### 1. Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Escolha uma organização
5. Configure o projeto:
   - **Project Name**: `mercado-livre-pneus` (ou seu preferido)
   - **Database Password**: Crie uma senha forte
   - **Region**: Escolha a região mais próxima dos seus clientes
6. Aguarde a criação do projeto (pode levar alguns minutos)

### 2. Obter Credenciais

1. No painel do seu projeto Supabase
2. Vá em **Settings** > **API**
3. Anote as seguintes informações:
   - **Project URL**: `https://seu-projeto-id.supabase.co`
   - **anon public**: Chave pública (começa com `eyJ...`)
   - **service_role**: Chave de serviço (começa com `eyJ...`)

### 3. Configurar Variáveis de Ambiente

Edite o arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role_aqui

# Database URL (mantido para compatibilidade temporária)
DATABASE_URL="file:./dev.db"
```

**Importante**: Substitua os valores acima com suas credenciais reais.

### 4. Executar Schema SQL

1. No painel Supabase, vá em **SQL Editor**
2. Clique em "New query"
3. Copie e cole o conteúdo do arquivo `supabase/schema.sql`
4. Clique em "Run" para executar o schema

Isso criará todas as tabelas necessárias:
- `categories` - Categorias de produtos
- `brands` - Marcas de produtos
- `products` - Produtos
- `product_images` - Imagens dos produtos
- `product_attributes` - Atributos dos produtos
- `product_variants` - Variações dos produtos
- `orders` - Pedidos
- `order_items` - Itens dos pedidos
- `carts` - Carrinhos de compras
- `cart_items` - Itens dos carrinhos
- `settings` - Configurações da loja

### 5. Popular Dados Iniciais (Opcional)

Use a página de configuração em `/supabase-setup` ou execute manualmente:

1. No painel Supabase, vá em **SQL Editor**
2. Copie e cole o conteúdo do arquivo `supabase/seed.sql`
3. Clique em "Run" para popular os dados

Isso criará:
- 6 categorias (Pneus, Aros e Rodas, Baterias, etc.)
- 6 marcas (Pirelli, Michelin, Bridgestone, etc.)
- 6 produtos de exemplo
- Configurações básicas da loja

### 6. Testar Conexão

1. Acesse `http://localhost:3000/supabase-setup`
2. Clique em "Testar Conexão"
3. Verifique se todas as tabelas estão OK

### 7. Verificar Funcionamento

1. Acesse a página principal do site
2. Verifique se os produtos estão carregando
3. Teste as categorias e páginas de detalhes

## 📁 Arquivos Modificados

### Novos Arquivos
- `src/lib/supabase.ts` - Cliente Supabase
- `src/lib/supabase-helpers.ts` - Helpers para operações CRUD
- `src/lib/test-supabase.ts` - Funções de teste
- `src/app/api/test-supabase/route.ts` - API de teste
- `src/app/supabase-setup/page.tsx` - Página de configuração
- `supabase/schema.sql` - Schema do banco de dados
- `supabase/seed.sql` - Dados iniciais

### Arquivos Modificados
- `src/app/api/products/route.ts` - Atualizado para usar Supabase
- `src/app/api/products/[slug]/route.ts` - Atualizado para usar Supabase
- `src/app/api/categories/route.ts` - Atualizado para usar Supabase
- `.env.local` - Adicionadas variáveis do Supabase

## 🔧 Estrutura das Tabelas

### Categories
```sql
- id (UUID)
- name (VARCHAR)
- slug (VARCHAR, UNIQUE)
- description (TEXT)
- image_url (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Products
```sql
- id (UUID)
- name (VARCHAR)
- slug (VARCHAR, UNIQUE)
- description (TEXT)
- short_description (TEXT)
- sku (VARCHAR, UNIQUE)
- price (DECIMAL)
- compare_price (DECIMAL)
- cost_price (DECIMAL)
- quantity (INTEGER)
- weight (DECIMAL)
- status (VARCHAR: active/draft/archived)
- featured (BOOLEAN)
- category_id (UUID, FOREIGN KEY)
- brand_id (UUID, FOREIGN KEY)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Orders
```sql
- id (UUID)
- order_number (VARCHAR, UNIQUE)
- customer_name (VARCHAR)
- customer_email (VARCHAR)
- customer_phone (VARCHAR)
- customer_cpf (VARCHAR)
- status (VARCHAR: pending/confirmed/processing/shipped/delivered/cancelled)
- payment_status (VARCHAR: pending/paid/failed/refunded)
- payment_method (VARCHAR)
- payment_id (VARCHAR)
- subtotal (DECIMAL)
- shipping_cost (DECIMAL)
- discount_amount (DECIMAL)
- total_amount (DECIMAL)
- shipping_address (JSONB)
- tracking_number (VARCHAR)
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🎯 Benefícios da Migração

1. **Escalabilidade**: Supabase usa PostgreSQL, muito mais robusto que SQLite
2. **Performance**: Melhor performance para consultas complexas
3. **Real-time**: Suporte nativo a atualizações em tempo real
4. **Backup**: Backups automáticos incluídos
5. **API REST**: API automática gerada a partir das tabelas
6. **Autenticação**: Sistema de autenticação completo
7. **CDN**: Storage para imagens com CDN

## 🚨 Considerações Importantes

1. **Backup**: Faça backup do seu banco SQLite antes de migrar
2. **Dados Existentes**: Se você tiver dados no SQLite, precisará migrá-los manualmente
3. **Chaves de API**: Nunca exponha a `service_role_key` no frontend
4. **Row Level Security**: Configure RLS para proteger seus dados
5. **Custos**: Verifique os limites do plano gratuito do Supabase

## 🛠️ Troubleshooting

### Erro de Conexão
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo
- Verifique se o schema foi executado corretamente

### Dados Não Aparecendo
- Execute o script de seed
- Verifique se as tabelas têm dados
- Confirme se as permissões estão corretas

### Performance Lenta
- Verifique os índices das tabelas
- Considere adicionar mais índices para consultas frequentes
- Use o EXPLAIN ANALYZE para otimizar queries

## 📚 Recursos Adicionais

- [Documentação Supabase](https://supabase.com/docs)
- [Guia de Migração](https://supabase.com/docs/guides/migrations)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [API Reference](https://supabase.com/docs/reference/javascript)

## 🆘 Suporte

Se encontrar problemas durante a migração:

1. Verifique os logs do console do navegador
2. Verifique os logs do servidor Next.js
3. Use a página `/supabase-setup` para testar a conexão
4. Consulte a documentação do Supabase

---

**Parabéns!** Após seguir estes passos, sua aplicação estará usando o Supabase como banco de dados principal.