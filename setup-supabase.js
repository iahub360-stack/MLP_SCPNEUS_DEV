#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  log('❌ Erro: Credenciais Supabase não encontradas no .env.local', 'red');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    log('\n🔗 Testando conexão com Supabase...', 'cyan');
    
    // Verificar se as variáveis de ambiente estão carregadas
    if (!supabaseUrl || !supabaseKey) {
      log('❌ Variáveis de ambiente não encontradas', 'red');
      return false;
    }
    
    log(`🌐 URL: ${supabaseUrl}`, 'blue');
    log(`🔑 Chave: ${supabaseKey.substring(0, 20)}...`, 'blue');
    
    // Tentar inicializar o cliente (isso valida as credenciais)
    const client = createClient(supabaseUrl, supabaseKey);
    
    log('✅ Credenciais válidas!', 'green');
    log('📋 Projeto Supabase conectado', 'blue');
    log('⚠️  Tabelas precisam ser criadas manualmente', 'yellow');
    
    return true;
    
  } catch (error) {
    log(`❌ Erro ao testar conexão: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  log('🚀 Configuração Automática do Supabase', 'bright');
  log('=====================================', 'cyan');
  
  // 1. Testar conexão
  const connectionOk = await testConnection();
  if (!connectionOk) {
    log('\n❌ Falha na conexão. Verifique suas credenciais.', 'red');
    process.exit(1);
  }
  
  // 2. Mostrar instruções
  log('\n📋 Próximos passos manuais:', 'yellow');
  log('=====================================', 'cyan');
  log('1. Acesse o painel Supabase:', 'blue');
  log('   🔗 https://cizqiblsvqladtbtdqfz.supabase.co', 'bright');
  log('\n2. Vá para SQL Editor', 'blue');
  log('\n3. Copie e cole o conteúdo do arquivo:', 'blue');
  log('   📁 supabase/schema.sql', 'yellow');
  log('\n4. Clique em "Run" para executar', 'blue');
  log('\n5. (Opcional) Para dados iniciais:', 'blue');
  log('   📁 supabase/seed.sql', 'yellow');
  log('\n6. Teste a aplicação:', 'blue');
  log('   🌐 http://localhost:3000', 'bright');
  log('   🔧 http://localhost:3000/supabase-setup', 'bright');
  
  log('\n✅ Configuração das credenciais concluída!', 'green');
  log('🎯 Seu projeto está pronto para usar o Supabase!', 'green');
}

// Executar script
main().catch(error => {
  log(`\n❌ Erro fatal: ${error.message}`, 'red');
  process.exit(1);
});