# 📚 Índice Completo - Documentação de Deploy

Guia de navegação para toda a documentação de deploy automático.

## 🎯 Por Onde Começar?

### Primeira Vez? Comece Aqui! 👇

1. **[⚡ QUICK_START.md](./QUICK_START.md)** - 10 minutos para configurar
2. **[✅ Checklist](../.github/DEPLOY_CHECKLIST.md)** - Use enquanto configura
3. **[🚀 Teste seu primeiro deploy](#teste-seu-primeiro-deploy)**

### Já Configurou? 📖

- **[❓ FAQ](./DEPLOY_FAQ.md)** - Respostas rápidas
- **[📖 Guia Completo](./DEPLOY.md)** - Documentação detalhada
- **[🔧 Troubleshooting](#troubleshooting-rápido)**

## 📁 Estrutura da Documentação

```
tgoo-auth-frontend/
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml              # Workflow de Produção
│   │   └── deploy-staging.yml      # Workflow de Staging
│   ├── DEPLOY_CHECKLIST.md         # Checklist passo a passo
│   └── README.md                    # Info sobre workflows
│
├── docs/
│   ├── DEPLOY.md                    # 📖 Guia Completo (LEIA PRIMEIRO!)
│   ├── QUICK_START.md               # ⚡ Setup rápido (10 min)
│   ├── DEPLOY_FAQ.md                # ❓ Perguntas frequentes
│   ├── DEPLOY_INDEX.md              # 📚 Este arquivo
│   └── nginx-cloudpanel.conf        # Exemplo de config Nginx
│
├── scripts/
│   └── setup-server.sh              # Script automático de setup
│
├── env.example.txt                  # Exemplo de variáveis
└── README.md                        # README principal (atualizado)
```

## 📖 Guias por Objetivo

### 🎯 Quero Configurar Deploy Automático

1. **Rápido (10 min):** [QUICK_START.md](./QUICK_START.md)
2. **Detalhado (30 min):** [DEPLOY.md](./DEPLOY.md)
3. **Com Checklist:** [DEPLOY_CHECKLIST.md](../.github/DEPLOY_CHECKLIST.md)

### 🐛 Tenho um Problema

1. **Erros comuns:** [FAQ - Troubleshooting](./DEPLOY_FAQ.md#-troubleshooting)
2. **Guia detalhado:** [DEPLOY.md - Troubleshooting](./DEPLOY.md#-troubleshooting)
3. **Ver logs:** [Como debugar](#como-debugar)

### 🔧 Quero Customizar

1. **Adicionar variáveis:** [FAQ - Variáveis](./DEPLOY_FAQ.md#-configuração-e-variáveis)
2. **Múltiplos ambientes:** [FAQ - Ambientes](./DEPLOY_FAQ.md#-múltiplos-ambientes)
3. **Notificações:** [FAQ - Monitoramento](./DEPLOY_FAQ.md#-monitoramento)
4. **Modificar workflows:** [.github/README.md](../.github/README.md)

### 📚 Quero Entender Como Funciona

1. **Visão geral:** [DEPLOY.md](./DEPLOY.md)
2. **Workflows:** [.github/README.md](../.github/README.md)
3. **FAQ completo:** [DEPLOY_FAQ.md](./DEPLOY_FAQ.md)

## 🚀 Teste Seu Primeiro Deploy

### Pré-requisitos
- [ ] Servidor CloudPanel configurado
- [ ] Acesso SSH funcionando
- [ ] Repositório no GitHub

### Setup Rápido (Opção 1 - Automático)

```bash
# No servidor
ssh seu-usuario@seu-servidor.com
cd /home/seusite
curl -O https://raw.githubusercontent.com/.../scripts/setup-server.sh
bash setup-server.sh
```

### Setup Rápido (Opção 2 - Manual)

```bash
# No servidor
mkdir -p /home/seusite/deployments/tgoo-auth-frontend/{current,backup,temp}
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys ~/.ssh/github_deploy
chmod 700 ~/.ssh
cat ~/.ssh/github_deploy  # Copie esta chave!
```

### Configurar GitHub

No GitHub → Settings → Secrets → New secret:

```
SSH_HOST → seu-servidor.com
SSH_USERNAME → seusite
SSH_PRIVATE_KEY → [cole a chave copiada]
DEPLOY_PATH → /home/seusite/deployments/tgoo-auth-frontend
VITE_API_URL → https://api.seudominio.com
```

### Testar Deploy

```bash
# No seu computador
git add .
git commit -m "feat: configurar deploy"
git push origin main
```

GitHub → Actions → Acompanhe! 🎉

## 🔧 Troubleshooting Rápido

### ❌ Permission denied (publickey)

```bash
# Verifique no servidor
cat ~/.ssh/authorized_keys
ls -la ~/.ssh/

# No GitHub, verifique se o secret SSH_PRIVATE_KEY:
# - Está completo (BEGIN até END)
# - Não tem espaços extras
# - É exatamente o conteúdo do arquivo
```

### ❌ Directory not found

```bash
# Crie os diretórios
ssh usuario@servidor
mkdir -p /home/seusite/deployments/tgoo-auth-frontend/{current,backup,temp}
chmod -R 755 /home/seusite/deployments
```

### ❌ Build failed

```bash
# Teste localmente
npm run build

# Verifique variáveis de ambiente
# GitHub → Settings → Secrets → Verifique VITE_API_URL
```

### ❌ Site não atualiza

```bash
# No servidor
cd /home/seusite/deployments/tgoo-auth-frontend/current
ls -la  # Verificar se arquivos estão atualizados
cat build-info.txt  # Ver info do último deploy

# Limpar cache do navegador
# Ctrl + Shift + R (ou Cmd + Shift + R no Mac)
```

## 🎓 Como Debugar

### 1. Ver Logs no GitHub

```
GitHub → Actions → Último workflow → Clicar no job → Expandir steps
```

### 2. Ver Logs no Servidor

```bash
ssh usuario@servidor

# Nginx access logs
tail -f /var/log/nginx/seusite-access.log

# Nginx error logs
tail -f /var/log/nginx/seusite-error.log

# Info do último deploy
cat /home/seusite/deployments/tgoo-auth-frontend/current/build-info.txt
```

### 3. Habilitar Debug Mode

No GitHub → Settings → Secrets → New secret:
```
Name: ACTIONS_STEP_DEBUG
Value: true
```

## 📊 Comandos Úteis

### Servidor

```bash
# Conectar
ssh seu-usuario@seu-servidor.com

# Ver estrutura de deploy
tree -L 3 /home/seusite/deployments/

# Ver último deploy
cat /home/seusite/deployments/tgoo-auth-frontend/current/build-info.txt

# Ver tamanho dos arquivos
du -sh /home/seusite/deployments/tgoo-auth-frontend/*

# Rollback manual
cd /home/seusite/deployments/tgoo-auth-frontend
rm -rf current && mv backup current
cp -r current/* ../../htdocs/

# Ver processos
ps aux | grep node
```

### GitHub

```bash
# Ver workflows disponíveis
gh workflow list

# Ver runs recentes
gh run list

# Ver logs do último run
gh run view --log

# Trigger manual
gh workflow run deploy.yml
```

### Local

```bash
# Testar build
npm run build

# Verificar tamanho do build
du -sh dist/

# Ver estrutura do build
tree dist/

# Simular variáveis de produção
VITE_API_URL=https://api.prod.com npm run build
```

## 🔗 Links Rápidos

### Documentação

| Documento | Quando Usar | Tempo |
|-----------|-------------|-------|
| [QUICK_START](./QUICK_START.md) | Primeira configuração | 10 min |
| [DEPLOY](./DEPLOY.md) | Entender tudo | 30 min |
| [FAQ](./DEPLOY_FAQ.md) | Dúvidas específicas | 2-5 min |
| [CHECKLIST](../.github/DEPLOY_CHECKLIST.md) | Validar setup | 15 min |
| [Workflows](../.github/README.md) | Customizar | 10 min |

### Recursos Externos

- 📚 [GitHub Actions Docs](https://docs.github.com/en/actions)
- 🔐 [SSH Key Guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- ☁️ [CloudPanel Docs](https://www.cloudpanel.io/docs/)
- ⚡ [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

## 💡 Dicas Pro

### Performance

1. **Use cache de npm** (já configurado ✅)
2. **Otimize build do Vite:**
   ```js
   // vite.config.ts
   build: {
     minify: 'terser',
     terserOptions: {
       compress: {
         drop_console: true
       }
     }
   }
   ```

3. **Comprima assets:**
   ```bash
   # No servidor, habilitar gzip no nginx
   ```

### Segurança

1. **Rotacione chaves SSH anualmente**
2. **Use GitHub Environments para proteção**
3. **Ative 2FA no GitHub**
4. **Monitore logs de acesso SSH**
5. **Use HTTPS (Let's Encrypt no CloudPanel)**

### Produtividade

1. **Crie aliases:**
   ```bash
   # ~/.bashrc
   alias deploy-logs="gh run view --log"
   alias deploy-run="gh workflow run deploy.yml"
   alias server-ssh="ssh usuario@servidor"
   ```

2. **Use GitHub CLI:**
   ```bash
   gh extension install actions/gh-actions-cache
   ```

3. **Configure notificações:**
   - Slack
   - Discord
   - Email

## 📞 Suporte

### Em Ordem de Prioridade

1. ✅ **Consulte a [FAQ](./DEPLOY_FAQ.md)**
2. ✅ **Veja logs detalhados no GitHub Actions**
3. ✅ **Revise o [Checklist](../.github/DEPLOY_CHECKLIST.md)**
4. ✅ **Leia o [Guia Completo](./DEPLOY.md)**
5. ✅ **Verifique Issues no GitHub do projeto**

### Criar Issue

Se nada funcionar, crie uma issue com:

```markdown
## 🐛 Descrição do Problema
[Descreva o problema]

## 🔍 O que tentei
- [ ] Li a FAQ
- [ ] Verifiquei os logs
- [ ] Revisei o checklist

## 📋 Ambiente
- OS: [Windows/Mac/Linux]
- Node Version: [18.x]
- CloudPanel Version: [v2.x]

## 📸 Logs
[Cole logs relevantes]
```

## ✅ Checklist Final

Antes de considerar o setup completo:

- [ ] Deploy automático funcionando
- [ ] Deploy manual testado
- [ ] Rollback testado
- [ ] Secrets configurados e validados
- [ ] Site acessível e funcional
- [ ] Equipe treinada (se aplicável)
- [ ] Documentação lida
- [ ] Backup testado

## 🎉 Próximos Passos

Deploy configurado? Ótimo! Considere:

1. **Staging Environment**
   - Use `deploy-staging.yml`
   - Configure secrets de staging
   - Teste antes de produção

2. **Monitoramento**
   - Configure notificações
   - Adicione health checks
   - Monitor de uptime

3. **CI/CD Avançado**
   - Testes automatizados
   - Lighthouse CI
   - Visual regression testing

4. **Performance**
   - CDN (Cloudflare)
   - Image optimization
   - Code splitting

---

## 🌟 Contribuir

Encontrou algo que pode melhorar?

1. Fork o projeto
2. Adicione/melhore a documentação
3. Submeta um PR

---

**Última atualização:** Fevereiro 2026  
**Versão da Documentação:** 1.0.0  
**Mantenedor:** Time TGOO

**Status:** ✅ Produção Ready
