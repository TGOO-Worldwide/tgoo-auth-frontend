# ✅ Checklist de Deploy - CloudPanel

Use este checklist para garantir que tudo está configurado corretamente.

## 📋 Pré-Deploy

### Servidor CloudPanel

- [ ] Acesso SSH ao servidor está funcionando
- [ ] CloudPanel está instalado e configurado
- [ ] Site/domínio criado no CloudPanel
- [ ] Node.js 18+ disponível no servidor
- [ ] Verificar espaço em disco disponível (min 500MB)

### Repositório GitHub

- [ ] Repositório criado no GitHub
- [ ] Código commitado e pushado
- [ ] Acesso de admin ao repositório
- [ ] GitHub Actions habilitado no repositório

## 🔧 Configuração do Servidor

### 1. Estrutura de Diretórios

Execute no servidor:
```bash
cd /home/seusite
mkdir -p deployments/tgoo-auth-frontend/{current,backup,temp}
```

- [ ] Diretório `deployments` criado
- [ ] Subdiretórios `current`, `backup`, `temp` criados
- [ ] Permissões corretas (755)

### 2. Chave SSH

Execute no servidor:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/github_deploy ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

- [ ] Par de chaves criado
- [ ] Chave pública adicionada ao authorized_keys
- [ ] Permissões corretas configuradas
- [ ] Chave privada copiada (incluindo BEGIN e END)

### 3. Testar SSH

```bash
ssh -i ~/.ssh/github_deploy usuario@localhost
```

- [ ] Conexão SSH funciona sem senha
- [ ] Sem erros de permissão

## 🔐 Secrets do GitHub

Vá para: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

### Secrets Obrigatórios:

- [ ] **SSH_HOST**
  - Exemplo: `seuservidor.com` ou `123.45.67.89`
  
- [ ] **SSH_USERNAME**
  - Exemplo: `tgoo-auth` (usuário do site no CloudPanel)
  
- [ ] **SSH_PRIVATE_KEY**
  - Conteúdo completo da chave privada
  - Incluindo `-----BEGIN OPENSSH PRIVATE KEY-----`
  - E `-----END OPENSSH PRIVATE KEY-----`
  
- [ ] **DEPLOY_PATH**
  - Exemplo: `/home/tgoo-auth/deployments/tgoo-auth-frontend`
  
- [ ] **VITE_API_URL**
  - Exemplo: `https://api.tgoo.eu`

### Secrets Opcionais:

- [ ] **SSH_PORT** (se diferente de 22)
- [ ] **VITE_APP_NAME** (se customizado)
- [ ] **VITE_ENVIRONMENT** (production/staging)

## 📝 Arquivo de Workflow

- [ ] Arquivo `.github/workflows/deploy.yml` existe
- [ ] Workflow está com sintaxe correta
- [ ] Branches corretas configuradas (main, production)

## 🧪 Testes

### Teste Local

```bash
npm install
npm run build
# Verificar se a pasta dist foi criada
ls -la dist/
```

- [ ] Build local funciona
- [ ] Pasta `dist` criada
- [ ] Sem erros de TypeScript
- [ ] Sem erros de lint

### Teste no GitHub Actions

1. Fazer commit de teste:
```bash
git add .
git commit -m "test: configuração de deploy"
git push origin main
```

- [ ] Workflow iniciou automaticamente
- [ ] Etapa "Checkout código" passou
- [ ] Etapa "Setup Node.js" passou
- [ ] Etapa "Instalar dependências" passou
- [ ] Etapa "Build do projeto" passou
- [ ] Etapa "Deploy via SSH" passou
- [ ] Etapa "Copiar arquivos via SCP" passou
- [ ] Etapa "Finalizar Deploy" passou

### Teste no Servidor

Conecte-se ao servidor e verifique:

```bash
cd /home/seusite/deployments/tgoo-auth-frontend
ls -la current/
cat current/build-info.txt
```

- [ ] Diretório `current` existe e tem conteúdo
- [ ] Arquivo `build-info.txt` existe
- [ ] Arquivos HTML/JS/CSS presentes
- [ ] Permissões corretas (755)

### Teste no Navegador

```bash
# Se htdocs está linkado
ls -la /home/seusite/htdocs
```

Acesse o site no navegador:

- [ ] Site carrega corretamente
- [ ] Sem erros 404
- [ ] Assets (CSS/JS) carregam
- [ ] Funcionalidades básicas funcionam
- [ ] Console do navegador sem erros críticos

## 🔄 Validação de Rollback

Teste o rollback simulando um erro:

1. Fazer commit que gera erro de build
2. Verificar se workflow falha
3. Verificar se rollback foi executado
4. Confirmar que versão anterior está ativa

- [ ] Rollback automático funciona
- [ ] Site continua no ar com versão anterior
- [ ] Notificação de erro recebida

## 📊 Monitoramento

- [ ] Logs do servidor acessíveis
- [ ] Logs do GitHub Actions legíveis
- [ ] Notificações configuradas (opcional)

## 🎯 Pós-Deploy

### Verificações Finais

- [ ] Site acessível pela URL pública
- [ ] HTTPS funcionando (se configurado)
- [ ] API conectando corretamente
- [ ] Login funcionando
- [ ] Funcionalidades principais testadas

### Documentação

- [ ] Documentação do deploy atualizada
- [ ] Equipe informada sobre processo
- [ ] Credenciais documentadas (de forma segura)
- [ ] Procedimento de rollback documentado

## 🚨 Troubleshooting

### Se o deploy falhar:

1. **Verificar logs no GitHub Actions**
   - Identificar qual etapa falhou
   - Ler mensagem de erro completa

2. **Problemas comuns:**

   - [ ] **Permissão negada SSH**: Verificar chave privada no secret
   - [ ] **Diretório não existe**: Verificar DEPLOY_PATH
   - [ ] **Build falha**: Verificar variáveis de ambiente
   - [ ] **SCP falha**: Verificar permissões no servidor

3. **Rollback manual se necessário:**
   ```bash
   ssh usuario@servidor
   cd /home/seusite/deployments/tgoo-auth-frontend
   rm -rf current
   mv backup current
   cp -r current/* /home/seusite/htdocs/
   ```

## 📞 Suporte

Se precisar de ajuda:

1. Consulte [docs/DEPLOY.md](../docs/DEPLOY.md)
2. Verifique logs detalhados
3. Revise este checklist
4. Contate o time de DevOps

---

**Data da última verificação:** _____________

**Responsável:** _____________

**Status:** [ ] Em configuração [ ] Testando [ ] Produção

