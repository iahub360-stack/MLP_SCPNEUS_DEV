'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, XCircle, Database, ExternalLink, Copy } from 'lucide-react'

export default function SupabaseSetup() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [seedResult, setSeedResult] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const supabaseUrl = 'https://cizqiblsvqladtbtdqfz.supabase.co'

  const handleTestConnection = async () => {
    setIsLoading(true)
    setTestResult(null)
    
    try {
      const response = await fetch('/api/test-supabase')
      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({ success: false, error: 'Erro ao conectar ao Supabase' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(supabaseUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenSupabase = () => {
    window.open(supabaseUrl, '_blank')
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Configuração do Supabase</h1>
          <p className="text-muted-foreground">
            Configure seu banco de dados Supabase para o "Mercado Livre dos Pneus"
          </p>
        </div>

        <div className="grid gap-6">
          {/* Card de Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Status da Configuração
              </CardTitle>
              <CardDescription>
                Suas credenciais já estão configuradas no projeto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Credenciais Configuradas</span>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Projeto: <span className="font-mono">cizqiblsvqladtbtdqfz</span>
                </p>
                <div className="flex items-center gap-2">
                  <Input
                    value={supabaseUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyUrl}
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenSupabase}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Teste de Conexão */}
          <Card>
            <CardHeader>
              <CardTitle>Testar Conexão</CardTitle>
              <CardDescription>
                Verifique se a conexão com o Supabase está funcionando
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleTestConnection}
                disabled={isLoading}
                variant="outline"
                className="w-full"
              >
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Testar Conexão
              </Button>
              
              {testResult && (
                <Alert className={`mt-4 ${testResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <div className="flex items-center gap-2">
                    {testResult.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription>
                      {testResult.success ? 'Conexão bem-sucedida!' : testResult.error}
                    </AlertDescription>
                  </div>
                  {testResult.results && (
                    <div className="mt-2 text-sm">
                      <p>Status das tabelas:</p>
                      <ul className="ml-4 list-disc">
                        {Object.entries(testResult.results).map(([table, info]: [string, any]) => (
                          <li key={table}>
                            {table}: {info.success ? '✅ OK' : '❌ Erro'} 
                            {info.count !== undefined && ` (${info.count} registros)`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Card de Instruções */}
          <Card>
            <CardHeader>
              <CardTitle>📋 Passos para Configurar o Banco</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Acessar Painel Supabase</h4>
                    <p className="text-sm text-muted-foreground">
                      Clique no botão acima ou acesse: <span className="font-mono">{supabaseUrl}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Abrir SQL Editor</h4>
                    <p className="text-sm text-muted-foreground">
                      No menu lateral, clique em "SQL Editor"
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Executar Schema</h4>
                    <p className="text-sm text-muted-foreground">
                      Copie o conteúdo do arquivo <code className="bg-gray-100 px-1 rounded">supabase/schema.sql</code> e cole no editor
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Popular Dados (Opcional)</h4>
                    <p className="text-sm text-muted-foreground">
                      Execute o arquivo <code className="bg-gray-100 px-1 rounded">supabase/seed.sql</code> para dados de exemplo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold">Testar Aplicação</h4>
                    <p className="text-sm text-muted-foreground">
                      Acesse <a href="/" className="text-blue-600 hover:underline">http://localhost:3000</a> e verifique se funciona
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Arquivos Importantes */}
          <Card>
            <CardHeader>
              <CardTitle>📁 Arquivos Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span><code>.env.local</code></span>
                  <span className="text-green-600">✅ Configurado</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span><code>supabase/schema.sql</code></span>
                  <span className="text-blue-600">📋 Schema completo</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span><code>supabase/seed.sql</code></span>
                  <span className="text-blue-600">🌱 Dados iniciais</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span><code>src/lib/supabase.ts</code></span>
                  <span className="text-green-600">✅ Cliente Supabase</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card de Benefícios */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Benefícios do Supabase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>PostgreSQL escalável</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Backups automáticos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>API REST automática</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Real-time updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Row Level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Dashboard completo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}