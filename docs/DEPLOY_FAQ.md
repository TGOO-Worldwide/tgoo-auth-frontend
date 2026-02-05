# ❓ FAQ - Deploy Automático CloudPanel

Perguntas frequentes sobre o deploy automático via GitHub Actions.

## 🔐 Segurança e SSH

### P: A chave SSH é segura no GitHub?

**R:** Sim! Os GitHub Secrets são:
- Criptografados em repouso
- Nunca expostos nos logs
- Acessíveis apenas durante a execução do workflow
- Não visíveis mesmo para colaboradores

### P: Preciso de uma chave SSH diferente por projeto?

**R:** Recomendamos sim, para melhor isolamento de segurança. Mas você pode usar a mesma chave para múltiplos projetos se preferir.

### P: Como renovar a chave SSH?

**R:** 
1. Gere nova chave no servidor: `ssh-keygen -t ed25519 -f ~/.ssh/github_deploy_new`
2. Adicione ao authorized_keys: `cat ~/.ssh/github_deploy_new.pub >> ~/.ssh/authorized_keys`
3. Atualize o secret `SSH_PRIVATE_KEY` no GitHub
4. Teste o deploy
5. Remova a chave antiga

## 🚀 Deploy e Workflow

### P: O deploy roda em toda branch?

**R:** Não, apenas nas branches configuradas:
- `main` e `production` → deploy.yml (Produção)
- `develop` e `staging` → deploy-staging.yml (Staging)

### P: Posso fazer deploy manual?

**R:** Sim! Vá para Actions → selecione o workflow → "Run workflow"

### P: Quanto tempo demora um deploy?

**R:** Geralmente 2-5 minutos:
- Checkout: ~10s
- Install: ~30s-2min (com cache)
- Build: ~30s-1min
- Deploy: ~30s-1min

### P: Posso cancelar um deploy em andamento?

**R:** Sim! Clique no workflow em execução e depois em "Cancel workflow". O servidor ficará no estado anterior.

### P: O deploy pode derrubar meu site?

**R:** Não! O processo usa:
- Diretórios temporários
- Backup automático da versão anterior
- Rollback automático em caso de erro
- Deploy atômico (muda tudo de uma vez)

## 🔄 Rollback e Backup

### P: Como fazer rollback?

**R:** Automático em caso de erro. Manual:
```bash
ssh usuario@servidor
cd /home/site/deployments/app
rm -rf current && mv backup current
cp -r current/* ../htdocs/
```

### P: Quantos backups são mantidos?

**R:** Apenas 1 (a versão imediatamente anterior). Para mais backups, você precisa configurar manualmente.

### P: O rollback afeta o banco de dados?

**R:** Não! Este deploy é apenas para frontend. Migrações de DB são responsabilidade sua.

## 📁 Estrutura e Arquivos

### P: Onde ficam os arquivos no servidor?

**R:**
```
/home/seusite/
├── htdocs/              → Link ou cópia do current
└── deployments/
    └── app/
        ├── current/     → Versão ativa
        ├── backup/      → Versão anterior
        └── temp/        → Deploy em andamento
```

### P: O que é o arquivo build-info.txt?

**R:** Contém informações do deploy:
- Data/hora do build
- Commit SHA
- Branch
- Útil para debug e rastreamento

### P: Preciso do diretório htdocs?

**R:** Depende do CloudPanel. Geralmente sim. O workflow copia `current/*` para `htdocs/` automaticamente.

## 🔧 Configuração e Variáveis

### P: Como adicionar novas variáveis de ambiente?

**R:** 
1. Adicione o secret no GitHub (ex: `VITE_NEW_VAR`)
2. Atualize o workflow:
```yaml
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
  VITE_NEW_VAR: ${{ secrets.VITE_NEW_VAR }}  # <-- adicione aqui
```

### P: As variáveis de ambiente são diferentes por ambiente?

**R:** Podem ser! Use secrets com sufixos:
- Produção: `VITE_API_URL`
- Staging: `VITE_API_URL_STAGING`

### P: Como ver as variáveis durante o build?

**R:** Você não pode (por segurança), mas pode fazer debug com:
```yaml
- name: Debug
  run: echo "API URL is configured"  # NÃO mostre o valor real!
```

## 🐛 Troubleshooting

### P: "Error: Process completed with exit code 1" - O que fazer?

**R:**
1. Veja os logs detalhados do step que falhou
2. Teste localmente: `npm run build`
3. Verifique se todas as variáveis estão configuradas

### P: "Permission denied (publickey)" - Como resolver?

**R:**
1. Verifique se o secret `SSH_PRIVATE_KEY` está correto
2. Deve incluir `-----BEGIN OPENSSH PRIVATE KEY-----`
3. Verifique permissões no servidor: `ls -la ~/.ssh/`

### P: Build funciona local mas falha no GitHub

**R:** Provavelmente falta variável de ambiente:
1. Verifique o erro exato
2. Compare `.env.local` com secrets do GitHub
3. Adicione secrets faltantes

### P: Deploy sucesso mas site não atualiza

**R:**
1. Limpe cache do navegador (Ctrl+Shift+R)
2. Verifique se htdocs foi atualizado: `ls -la /home/site/htdocs/`
3. Veja data de modificação dos arquivos

### P: Como ver logs do servidor?

**R:**
```bash
ssh usuario@servidor

# Logs do Nginx
tail -f /var/log/nginx/seusite-access.log
tail -f /var/log/nginx/seusite-error.log

# Último deploy
cat /home/site/deployments/app/current/build-info.txt
```

## 💰 Custos e Limites

### P: GitHub Actions é grátis?

**R:** 
- Repositórios públicos: Ilimitado e grátis
- Repositórios privados: 2000 minutos/mês grátis (mais que suficiente)
- 1 deploy ≈ 3-5 minutos
- ~400-600 deploys grátis por mês

### P: CloudPanel cobra pelo deploy?

**R:** Não! O CloudPanel é grátis. Você paga apenas pelo servidor (VPS/Cloud).

### P: Há limite de tamanho do deploy?

**R:** Não oficial, mas praticamente:
- Build típico: 10-50MB
- Limite prático do SCP: ~1GB
- Seu site provavelmente é bem menor

## 🔄 Múltiplos Ambientes

### P: Como configurar staging e production?

**R:** Use dois workflows:
- `deploy.yml` → produção (branch main)
- `deploy-staging.yml` → staging (branch develop)

Cada um com seus próprios secrets.

### P: Posso ter mais de 2 ambientes?

**R:** Sim! Crie mais workflows:
- `deploy-dev.yml`
- `deploy-qa.yml`
- `deploy-production.yml`

### P: Como promover staging para produção?

**R:** Faça merge da branch:
```bash
git checkout main
git merge develop
git push origin main
```

## 📊 Monitoramento

### P: Como receber notificações de deploy?

**R:** Adicione step no workflow:
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### P: Posso integrar com Discord/Telegram?

**R:** Sim! Existem actions para vários serviços:
- Discord: `sarisia/actions-status-discord`
- Telegram: `appleboy/telegram-action`
- Email: `dawidd6/action-send-mail`

### P: Como monitorar tempo de deploy?

**R:** O GitHub Actions mostra automaticamente:
- Tempo total
- Tempo por step
- Histórico de execuções

## 🚦 Performance

### P: Como acelerar o deploy?

**R:**
1. **Cache já configurado** ✅ (`setup-node` com cache)
2. Use `npm ci` em vez de `npm install` ✅ (já configurado)
3. Otimize o build do Vite
4. Use `skip_cleanup: true` no SCP

### P: Posso fazer deploy paralelo de múltiplos projetos?

**R:** Sim! Cada projeto tem seu próprio workflow e roda independentemente.

### P: O cache de npm sempre funciona?

**R:** Sim, exceto quando:
- `package-lock.json` muda
- Você usa "Re-run jobs" no GitHub
- Cache expira (7 dias sem uso)

## 🔨 Customização

### P: Posso adicionar testes antes do deploy?

**R:** Sim! Adicione antes do build:
```yaml
- name: Run tests
  run: npm test

- name: Build
  run: npm run build
```

### P: Como executar comandos customizados no servidor após deploy?

**R:** Adicione no final do script SSH:
```yaml
script: |
  cd ${{ secrets.DEPLOY_PATH }}
  # ... deploy normal ...
  
  # Seus comandos customizados
  pm2 restart app
  php artisan cache:clear
```

### P: Posso usar Docker?

**R:** Sim, mas o workflow seria diferente. Este guia é para deploy tradicional de arquivos estáticos.

## 📱 CloudPanel Específico

### P: Funciona com qualquer versão do CloudPanel?

**R:** Sim! CloudPanel v1 e v2.

### P: Preciso configurar algo no CloudPanel?

**R:** Não, apenas ter o site criado. O resto é via SSH.

### P: Como configurar SSL/HTTPS?

**R:** No CloudPanel:
1. Sites → seu site → SSL/TLS
2. Let's Encrypt (gratuito)
3. O deploy usa a configuração existente

### P: Funciona com subdomínios?

**R:** Sim! Configure o subdomínio no CloudPanel normalmente.

## 🎓 Aprendizado

### P: Onde aprender mais sobre GitHub Actions?

**R:**
- [Documentação Oficial](https://docs.github.com/en/actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
- [Awesome Actions](https://github.com/sdras/awesome-actions)

### P: Preciso saber SSH?

**R:** Básico sim. Comandos úteis:
```bash
ssh usuario@servidor  # Conectar
ls -la               # Listar arquivos
cd /path             # Navegar
cat arquivo          # Ver conteúdo
chmod 755 pasta      # Permissões
```

### P: Preciso saber DevOps?

**R:** Não! Este setup é beginner-friendly. Você aprende fazendo.

## 🤝 Colaboração

### P: Outros desenvolvedores podem fazer deploy?

**R:** Sim! Qualquer um com push access à branch configurada.

### P: Como dar acesso só para ver, não para modificar secrets?

**R:** Use GitHub Environments:
1. Settings → Environments → New
2. Configure required reviewers
3. Use `environment: production` no workflow

### P: Posso ter proteção de branch?

**R:** Sim e recomendado!
1. Settings → Branches → Add rule
2. Require pull request reviews
3. Require status checks (actions) to pass

---

## 🆘 Ainda tem dúvidas?

1. ✅ Leia o [Guia Completo](./DEPLOY.md)
2. ✅ Veja o [Quick Start](./QUICK_START.md)
3. ✅ Use o [Checklist](../.github/DEPLOY_CHECKLIST.md)
4. ✅ Verifique os logs do GitHub Actions
5. ✅ Consulte a [documentação do CloudPanel](https://www.cloudpanel.io/docs/)

---

**Última atualização:** Fevereiro 2026  
**Contribua:** Encontrou algo que falta? Adicione à FAQ! 🙌
