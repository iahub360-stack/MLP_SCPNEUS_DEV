# 🚀 Instruções para Configurar o Supabase

Suas credenciais já estão configuradas no projeto! Agora siga estes passos:

## 📋 Passo 1: Acessar o Painel Supabase

1. Abra o navegador e acesse: https://wqkbpsdpsuzgaclwmeyg.supabase.co
2. Clique em **"Sign in"** e faça login com sua conta

## 📋 Passo 2: Executar o Schema SQL

1. No painel do Supabase, clique em **"SQL Editor"** no menu lateral
2. Clique em **"New query"**
3. Copie todo o conteúdo do arquivo `supabase/schema.sql`
4. Cole no editor SQL
5. Clique em **"Run"** para executar

Isso criará todas as tabelas necessárias:
- ✅ categories
- ✅ brands  
- ✅ products
- ✅ product_images
- ✅ product_attributes
- ✅ product_variants
- ✅ orders
- ✅ order_items
- ✅ carts
- ✅ cart_items
- ✅ settings

## 📋 Passo 3: Popular Dados Iniciais (Opcional)

1. Clique em **"New query"** novamente
2. Copie todo o conteúdo do arquivo `supabase/seed.sql`
3. Cole no editor SQL
4. Clique em **"Run"** para executar

Isso criará:
- 🏷️ 6 categorias (Pneus, Aros, Baterias, etc.)
- 🏢 6 marcas (Pirelli, Michelin, Bridgestone, etc.)
- 🛞 6 produtos de exemplo
- ⚙️ Configurações básicas da loja

## 📋 Passo 4: Testar a Conexão

1. Abra o navegador e acesse: http://localhost:3000/supabase-setup
2. Clique em **"Testar Conexão"**
3. Você deve ver "Conexão bem-sucedida!" e o status de todas as tabelas

## 📋 Passo 5: Verificar a Aplicação

1. Acesse: http://localhost:3000
2. Verifique se os produtos estão carregando
3. Teste as categorias e páginas de detalhes

## 🔧 Arquivos Configurados

Seu projeto já está configurado com:
- ✅ `.env.local` - Credenciais Supabase
- ✅ `src/lib/supabase.ts` - Cliente Supabase
- ✅ `src/lib/supabase-helpers.ts` - Funções de banco de dados
- ✅ APIs atualizadas para usar Supabase
- ✅ Página de configuração em `/supabase-setup`

## 🎯 Benefícios

Com o Supabase você terá:
- 🚀 **Performance**: PostgreSQL em vez de SQLite
- 🔄 **Real-time**: Atualizações em tempo real
- 💾 **Backup**: Backups automáticos
- 🔐 **Segurança**: Row Level Security
- 📊 **API REST**: API automática
- 🌍 **Escalabilidade**: Banco de dados na nuvem

## 🆘 Suporte

Se encontrar problemas:
1. Verifique se o schema foi executado sem erros
2. Confirme se as tabelas aparecem no **Table Editor**
3. Use a página `/supabase-setup` para testar conexão
4. Verifique os logs no terminal

---

**Parabéns!** 🎉 Após executar estes passos, sua aplicação estará usando o Supabase como banco de dados principal.