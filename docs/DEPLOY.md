# 🚀 Guia de Deploy Automático - CloudPanel

Este guia explica como configurar o deploy automático usando GitHub Actions para um servidor CloudPanel via SSH.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Configuração do Servidor](#configuração-do-servidor)
- [Configuração do GitHub](#configuração-do-github)
- [Testando o Deploy](#testando-o-deploy)
- [Troubleshooting](#troubleshooting)

## 🔧 Pré-requisitos

- Servidor CloudPanel configurado e rodando
- Acesso SSH ao servidor
- Repositório no GitHub
- Node.js 18+ no servidor (geralmente já vem no CloudPanel)

## 🖥️ Configuração do Servidor

### 1. Criar Chave SSH no Servidor

Conecte-se ao seu servidor CloudPanel via SSH e execute:

```bash
# Conectar ao servidor
ssh seu-usuario@seu-servidor.com

# Criar par de chaves SSH (se ainda não existir)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy

# Adicionar a chave pública ao authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Ajustar permissões
chmod 600 ~/.ssh/github_deploy
chmod 644 ~/.ssh/github_deploy.pub
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Copiar a chave privada (você vai precisar dela no GitHub)
cat ~/.ssh/github_deploy
```

**⚠️ IMPORTANTE:** Copie o conteúdo completo da chave privada (desde `-----BEGIN OPENSSH PRIVATE KEY-----` até `-----END OPENSSH PRIVATE KEY-----`).

### 2. Preparar Estrutura de Diretórios

No CloudPanel, o diretório geralmente é algo como:

```bash
# Navegar para o diretório do site
cd /home/seusite/htdocs

# Voltar um nível e criar estrutura
cd ..
mkdir -p deployments/tgoo-auth-frontend
cd deployments/tgoo-auth-frontend

# Criar diretórios necessários
mkdir -p current backup temp

# O htdocs será o link ou diretório público
```

### 3. Configurar Permissões

```bash
# Ajustar proprietário (substitua 'seusite' pelo seu usuário)
chown -R seusite:seusite /home/seusite/deployments
chmod -R 755 /home/seusite/deployments

# Se necessário, criar link simbólico
ln -s /home/seusite/deployments/tgoo-auth-frontend/current /home/seusite/htdocs
```

## 🔐 Configuração do GitHub

### 1. Adicionar Secrets no GitHub

Vá para seu repositório no GitHub:
1. Clique em **Settings** (Configurações)
2. No menu lateral, clique em **Secrets and variables** → **Actions**
3. Clique em **New repository secret**

Adicione os seguintes secrets:

#### `SSH_HOST`
```
seu-servidor.com
# ou o IP do servidor: 123.456.789.012
```

#### `SSH_USERNAME`
```
seusite
# ou o usuário CloudPanel específico do site
```

#### `SSH_PRIVATE_KEY`
```
-----BEGIN OPENSSH PRIVATE KEY-----
[cole aqui a chave privada completa que você copiou]
-----END OPENSSH PRIVATE KEY-----
```

#### `SSH_PORT` (opcional)
```
22
# Use se sua porta SSH for diferente da padrão
```

#### `DEPLOY_PATH`
```
/home/seusite/deployments/tgoo-auth-frontend
# Caminho completo para o diretório de deploy
```

#### `VITE_API_URL` (variável de ambiente da aplicação)
```
https://api.seudominio.com
# URL da sua API backend
```

### 2. Adicionar Variáveis Adicionais (se necessário)

Se sua aplicação usa outras variáveis de ambiente, adicione-as como secrets também:

- `VITE_APP_NAME`
- `VITE_API_TIMEOUT`
- etc.

## 🧪 Testando o Deploy

### Deploy Automático

O deploy é acionado automaticamente quando você faz push para as branches:
- `main`
- `production`

```bash
# Fazer uma alteração
git add .
git commit -m "test: testando deploy automático"
git push origin main
```

### Deploy Manual

Você também pode executar o deploy manualmente:

1. Vá para **Actions** no GitHub
2. Selecione o workflow **Deploy to CloudPanel**
3. Clique em **Run workflow**
4. Selecione a branch
5. Clique em **Run workflow**

## 📊 Monitoramento

### Verificar Status do Deploy

1. Vá para a aba **Actions** no GitHub
2. Veja o progresso em tempo real
3. Logs detalhados de cada step

### Verificar no Servidor

```bash
# Conectar ao servidor
ssh seu-usuario@seu-servidor.com

# Ver informações do último deploy
cd /home/seusite/deployments/tgoo-auth-frontend/current
cat build-info.txt

# Ver logs (se configurado)
tail -f /var/log/nginx/seusite-access.log
```

## 🔍 Troubleshooting

### Erro: Permission denied (publickey)

**Problema:** GitHub Actions não consegue conectar via SSH.

**Solução:**
```bash
# No servidor, verificar authorized_keys
cat ~/.ssh/authorized_keys

# Verificar permissões
ls -la ~/.ssh/

# A chave privada no GitHub deve ser EXATAMENTE igual
# Incluindo as linhas BEGIN e END
```

### Erro: No such file or directory

**Problema:** O caminho de deploy não existe.

**Solução:**
```bash
# Criar o diretório
mkdir -p /home/seusite/deployments/tgoo-auth-frontend
cd /home/seusite/deployments/tgoo-auth-frontend
mkdir -p current backup temp
```

### Erro: Build failed

**Problema:** Erro durante o build do Vite.

**Solução:**
- Verifique se todas as variáveis de ambiente estão configuradas
- Verifique os logs no GitHub Actions
- Teste o build localmente: `npm run build`

### Site não atualiza após deploy

**Problema:** Arquivos foram enviados mas o site não mudou.

**Solução:**
```bash
# Verificar se htdocs está correto
cd /home/seusite
ls -la htdocs/

# Limpar cache do navegador
# Ou adicionar cache busting no Vite

# Verificar permissões
chmod -R 755 htdocs/
```

### Rollback Manual

Se precisar reverter para o backup anterior:

```bash
# Conectar ao servidor
ssh seu-usuario@seu-servidor.com

# Ir para o diretório
cd /home/seusite/deployments/tgoo-auth-frontend

# Reverter
rm -rf current
mv backup current

# Atualizar htdocs se necessário
rm -rf /home/seusite/htdocs/*
cp -r current/* /home/seusite/htdocs/
chmod -R 755 /home/seusite/htdocs/
```

## 🎯 Melhorias Futuras

### 1. Notificações

Adicionar notificações do Slack/Discord/Email:

```yaml
- name: Notificar Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 2. Deploy para Múltiplos Ambientes

Criar workflows separados:
- `deploy-staging.yml` (branch: develop)
- `deploy-production.yml` (branch: main)

### 3. Testes Automatizados

Adicionar testes antes do deploy:

```yaml
- name: Executar testes
  run: npm test

- name: Executar lint
  run: npm run lint
```

### 4. Cache de Dependências

Já configurado no workflow, mas pode ser otimizado:

```yaml
- name: Cache node_modules
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs no GitHub Actions
2. Verifique os logs do servidor
3. Consulte a [documentação do CloudPanel](https://www.cloudpanel.io/docs/)
4. Revise este guia completamente

## 📝 Checklist de Deploy

- [ ] Chave SSH criada no servidor
- [ ] Chave privada adicionada aos Secrets do GitHub
- [ ] Todos os secrets configurados corretamente
- [ ] Diretórios de deploy criados no servidor
- [ ] Permissões ajustadas
- [ ] Variáveis de ambiente configuradas
- [ ] Workflow testado manualmente
- [ ] Deploy automático funcionando
- [ ] Site acessível e funcionando

---

**Última atualização:** Fevereiro 2026  
**Versão:** 1.0.0
