# 🚀 Guia Completo - Configuração Supabase

## ✅ Credenciais Já Configuradas

Seu projeto já está configurado com as novas credenciais:

- **URL**: `https://cizqiblsvqladtbtdqfz.supabase.co`
- **Chave Anônima**: `eyJ...HsvOR3ZrMwSP_CHAYKVFzCjTLnTz9Y5meKiriWfV-Nk`
- **Chave de Serviço**: `eyJ...O9gQjvALWHmVKuwqB4jM7uSBNR43EY7Fjp8EegnVGsA`

## 📋 Passo a Passo Detalhado

### 🎯 Passo 1: Acessar o Painel Supabase

1. **Abra seu navegador**
2. **Acesse**: https://cizqiblsvqladtbtdqfz.supabase.co
3. **Faça login** com sua conta Supabase
4. **Você verá** o painel do seu projeto

### 🎯 Passo 2: Executar Schema SQL

1. **No menu lateral**, clique em **"SQL Editor"**
2. **Clique em** **"New query"** (botão azul no canto superior direito)
3. **Abra o arquivo** `supabase/schema.sql` no seu editor de código
4. **Copie todo o conteúdo** (Ctrl+C / Cmd+C)
5. **Cole no editor SQL** do Supabase (Ctrl+V / Cmd+V)
6. **Clique em** **"Run"** (botão ▶️ no canto inferior direito)

**O que será criado:**
- ✅ `categories` - Categorias de produtos
- ✅ `brands` - Marcas de produtos
- ✅ `products` - Produtos
- ✅ `product_images` - Imagens dos produtos
- ✅ `product_attributes` - Atributos (largura, altura, etc.)
- ✅ `product_variants` - Variações dos produtos
- ✅ `orders` - Pedidos
- ✅ `order_items` - Itens dos pedidos
- ✅ `carts` - Carrinhos de compras
- ✅ `cart_items` - Itens dos carrinhos
- ✅ `settings` - Configurações da loja

### 🎯 Passo 3: Popular Dados Iniciais (Opcional, mas recomendado)

1. **Clique em** **"New query"** novamente
2. **Abra o arquivo** `supabase/seed.sql` no seu editor
3. **Copie todo o conteúdo**
4. **Cole no editor SQL**
5. **Clique em** **"Run"**

**O que será inserido:**
- 🏷️ 6 categorias (Pneus, Aros, Baterias, etc.)
- 🏢 6 marcas (Pirelli, Michelin, Bridgestone, etc.)
- 🛞 6 produtos de exemplo com imagens e atributos
- ⚙️ Configurações básicas da loja

### 🎯 Passo 4: Verificar Tabelas Criadas

1. **No menu lateral**, clique em **"Table Editor"**
2. **Você deve ver** todas as tabelas listadas
3. **Clique em qualquer tabela** para ver os dados

### 🎯 Passo 5: Testar Conexão

1. **Abra seu navegador** e acesse: http://localhost:3000/supabase-setup
2. **Clique em** **"Testar Conexão"**
3. **Você deve ver**: "Conexão bem-sucedida!" e o status das tabelas

### 🎯 Passo 6: Testar Aplicação

1. **Acesse**: http://localhost:3000
2. **Verifique** se os produtos estão carregando
3. **Navegue** pelas categorias
4. **Teste** a página de detalhes dos produtos

## 🛠️ Scripts Automatizados

### Script de Teste Rápido

Execute no terminal:

```bash
node setup-supabase.js
```

Este script irá:
- ✅ Testar a conexão com Supabase
- ✅ Verificar se as credenciais estão funcionando
- ✅ Mostrar instruções detalhadas

### Teste via API

```bash
curl http://localhost:3000/api/test-supabase
```

## 🔧 Arquivos Importantes

### Configuração
- 📁 `.env.local` - Credenciais Supabase (já configurado)
- 📁 `src/lib/supabase.ts` - Cliente Supabase
- 📁 `src/lib/supabase-helpers.ts` - Helpers para operações CRUD

### Schema e Dados
- 📁 `supabase/schema.sql` - Schema completo do banco
- 📁 `supabase/seed.sql` - Dados iniciais

### Testes e Configuração
- 📁 `src/app/api/test-supabase/route.ts` - API de teste
- 📁 `src/app/supabase-setup/page.tsx` - Página de configuração visual

## 🎯 Benefícios Alcançados

Com o Supabase você terá:

- 🚀 **Performance**: PostgreSQL em vez de SQLite
- 🔄 **Real-time**: Atualizações em tempo real
- 💾 **Backup**: Backups automáticos diários
- 🔐 **Segurança**: Row Level Security (RLS)
- 📊 **API REST**: API automática gerada
- 🌍 **Escalabilidade**: Banco de dados na nuvem
- 📈 **Monitoramento**: Dashboard completo
- 🔍 **Logs**: Logs detalhados de consultas

## 🆘 Solução de Problemas

### Erro: "Could not find the table"
**Causa**: Schema SQL não foi executado
**Solução**: Execute o schema.sql no painel Supabase

### Erro: "Invalid API key"
**Causa**: Credenciais incorretas
**Solução**: Verifique o arquivo .env.local

### Erro: "Connection refused"
**Causa**: Projeto Supabase não está ativo
**Solução**: Verifique o status do projeto no painel

### Tabelas não aparecem
**Causa**: Schema não executado completamente
**Solução**: Verifique logs de erro no SQL Editor

## 📊 Estrutura do Banco

### Tabela Products
```sql
- id (UUID) - Identificador único
- name (VARCHAR) - Nome do produto
- slug (VARCHAR) - URL amigável
- description (TEXT) - Descrição completa
- price (DECIMAL) - Preço
- category_id (UUID) - Categoria
- brand_id (UUID) - Marca
- featured (BOOLEAN) - Produto em destaque
- status (VARCHAR) - active/draft/archived
```

### Tabela Categories
```sql
- id (UUID) - Identificador único
- name (VARCHAR) - Nome da categoria
- slug (VARCHAR) - URL amigável
- description (TEXT) - Descrição
- image_url (VARCHAR) - Imagem da categoria
```

### Tabela Orders
```sql
- id (UUID) - Identificador único
- order_number (VARCHAR) - Número do pedido
- customer_name (VARCHAR) - Nome do cliente
- customer_email (VARCHAR) - Email do cliente
- status (VARCHAR) - Status do pedido
- total_amount (DECIMAL) - Valor total
- payment_status (VARCHAR) - Status do pagamento
```

## 🎉 Parabéns!

Após seguir estes passos:

1. ✅ Seu projeto usará Supabase como banco de dados
2. ✅ Terá um banco PostgreSQL escalável
3. ✅ Contará com backups automáticos
4. ✅ Terá API REST automática
5. ✅ Poderá usar real-time features
6. ✅ Terá dashboard completo de monitoramento

### Links Úteis

- 🌐 **Sua Aplicação**: http://localhost:3000
- 🔧 **Painel Supabase**: https://cizqiblsvqladtbtdqfz.supabase.co
- 📊 **Configuração**: http://localhost:3000/supabase-setup
- 📚 **Documentação**: https://supabase.com/docs

---

**Sucesso!** 🚀 Seu e-commerce "Mercado Livre dos Pneus" agora está rodando com Supabase!