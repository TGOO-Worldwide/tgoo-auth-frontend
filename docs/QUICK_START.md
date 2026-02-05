# 🚀 Quick Start - Deploy Automático

Guia rápido para configurar o deploy automático em **10 minutos**.

## ⚡ Passos Rápidos

### 1️⃣ No Servidor (5 minutos)

```bash
# Conectar ao servidor
ssh seu-usuario@seu-servidor.com

# Executar script de setup (opção mais fácil)
cd /caminho/do/projeto
bash scripts/setup-server.sh
```

**OU fazer manualmente:**

```bash
# Criar estrutura
mkdir -p /home/seusite/deployments/tgoo-auth-frontend/{current,backup,temp}

# Gerar chave SSH
ssh-keygen -t ed25519 -C "github-deploy" -f ~/.ssh/github_deploy -N ""

# Adicionar ao authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys ~/.ssh/github_deploy
chmod 700 ~/.ssh

# Copiar chave privada
cat ~/.ssh/github_deploy
# ⚠️ COPIE TODO O CONTEÚDO (BEGIN até END)
```

### 2️⃣ No GitHub (3 minutos)

1. Vá para: **Settings** → **Secrets and variables** → **Actions**

2. Clique em **New repository secret** e adicione:

```yaml
SSH_HOST: seu-servidor.com
SSH_USERNAME: seusite
SSH_PRIVATE_KEY: [cole a chave privada completa]
DEPLOY_PATH: /home/seusite/deployments/tgoo-auth-frontend
VITE_API_URL: https://api.seudominio.com
```

### 3️⃣ Testar Deploy (2 minutos)

```bash
# No seu computador
git add .
git commit -m "feat: configurar deploy automático"
git push origin main
```

Vá para **Actions** no GitHub e acompanhe o deploy! 🎉

## ✅ Verificar se Funcionou

### No GitHub
✅ Workflow rodou sem erros  
✅ Todos os steps verdes

### No Servidor
```bash
ssh seu-usuario@seu-servidor.com
cd /home/seusite/deployments/tgoo-auth-frontend/current
ls -la
cat build-info.txt
```

✅ Arquivos presentes  
✅ build-info.txt existe

### No Navegador
✅ Site carrega  
✅ Sem erros 404  
✅ Funcionalidades funcionam

## 🎯 Comandos Úteis

### Ver logs do último deploy
```bash
# No GitHub: Actions → último workflow → ver logs
```

### Fazer rollback manual
```bash
ssh seu-usuario@seu-servidor.com
cd /home/seusite/deployments/tgoo-auth-frontend
rm -rf current && mv backup current
cp -r current/* ../htdocs/
```

### Deploy manual
```bash
# No GitHub: Actions → Deploy to CloudPanel → Run workflow
```

## 🆘 Problemas?

### ❌ "Permission denied (publickey)"
- Verifique se copiou a chave privada COMPLETA
- Incluindo as linhas `-----BEGIN` e `-----END`

### ❌ "Directory not found"
- Verifique se criou os diretórios no servidor
- Confirme o `DEPLOY_PATH` no GitHub

### ❌ Build falha
- Teste localmente: `npm run build`
- Verifique as variáveis de ambiente

## 📚 Próximos Passos

✅ Deploy configurado!

**Agora você pode:**
- [ ] Configurar deploy de staging (opcional)
- [ ] Adicionar notificações (Slack/Discord)
- [ ] Configurar domínio customizado
- [ ] Ativar HTTPS no CloudPanel

## 📖 Documentação Completa

- [Guia Completo de Deploy](./DEPLOY.md)
- [Checklist Detalhado](../.github/DEPLOY_CHECKLIST.md)
- [Workflows](../.github/README.md)

---

**Tempo total:** ~10 minutos  
**Dificuldade:** ⭐⭐ (Fácil)  
**Status:** ✅ Pronto para usar
