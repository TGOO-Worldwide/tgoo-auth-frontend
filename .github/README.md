# GitHub Actions - Workflows

Esta pasta contém os workflows do GitHub Actions para CI/CD do projeto.

## 📁 Workflows Disponíveis

### 1. `deploy.yml` - Deploy para Produção

**Trigger:**
- Push para branch `main` ou `production`
- Manual via workflow_dispatch

**O que faz:**
1. ✅ Checkout do código
2. 📦 Setup Node.js 18
3. 📥 Instala dependências
4. 🔨 Build do projeto
5. 📄 Cria arquivo de info do build
6. 🚀 Deploy via SSH para servidor
7. 📤 Copia arquivos via SCP
8. ✅ Finaliza deploy e ajusta permissões
9. 🔄 Rollback automático em caso de erro

**Ambiente:** Production

### 2. `deploy-staging.yml` - Deploy para Staging

**Trigger:**
- Push para branch `develop` ou `staging`
- Manual via workflow_dispatch

**O que faz:**
- Mesmas etapas do deploy de produção
- Usa secrets específicos de staging
- Inclui validação de lint

**Ambiente:** Staging

## 🔐 Secrets Necessários

### Produção

Configure em: `Settings` → `Secrets and variables` → `Actions`

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `SSH_HOST` | Endereço do servidor | `seuservidor.com` |
| `SSH_USERNAME` | Usuário SSH | `tgoo-auth` |
| `SSH_PRIVATE_KEY` | Chave privada SSH | `-----BEGIN OPENSSH...` |
| `SSH_PORT` | Porta SSH (opcional) | `22` |
| `DEPLOY_PATH` | Caminho de deploy | `/home/tgoo-auth/deployments/app` |
| `VITE_API_URL` | URL da API | `https://api.tgoo.eu` |

### Staging (opcional)

Se usar staging, adicione com sufixo `_STAGING`:

- `SSH_HOST_STAGING`
- `SSH_USERNAME_STAGING`
- `SSH_PRIVATE_KEY_STAGING`
- `DEPLOY_PATH_STAGING`
- `VITE_API_URL_STAGING`
- `STAGING_URL`

## 🚀 Como Usar

### Deploy Automático

1. Faça suas alterações
2. Commit e push para a branch correta:
   ```bash
   git add .
   git commit -m "feat: nova funcionalidade"
   git push origin main  # Para produção
   # ou
   git push origin develop  # Para staging
   ```
3. O workflow inicia automaticamente

### Deploy Manual

1. Vá para a aba **Actions** no GitHub
2. Selecione o workflow desejado
3. Clique em **Run workflow**
4. Escolha a branch
5. Clique em **Run workflow** novamente

## 📊 Monitoramento

### Ver Status do Deploy

1. Vá para **Actions** no GitHub
2. Veja a lista de workflows
3. Clique em um para ver detalhes

### Badges (opcional)

Adicione ao README.md:

```markdown
![Deploy Status](https://github.com/seu-usuario/tgoo-auth-frontend/workflows/Deploy%20to%20CloudPanel/badge.svg)
```

## 🔍 Debug

### Ver Logs Detalhados

1. Clique no workflow em execução
2. Clique em cada step para expandir logs
3. Use os logs para identificar problemas

### Habilitar Debug Mode

Adicione secret:
- Nome: `ACTIONS_STEP_DEBUG`
- Valor: `true`

## ⚡ Otimizações

### Cache de Dependências

Os workflows já usam cache automático do npm via `setup-node` action:

```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'npm'
```

### Paralelização

Para builds mais complexos, considere:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x]
```

## 🔒 Segurança

### Boas Práticas

✅ **Fazer:**
- Usar secrets para dados sensíveis
- Manter chaves SSH seguras
- Revisar logs regularmente
- Atualizar actions periodicamente

❌ **Não fazer:**
- Commitar secrets no código
- Compartilhar chaves privadas
- Usar credenciais pessoais
- Ignorar falhas de segurança

### Renovação de Chaves

Recomendado anualmente:

1. Gerar novo par de chaves
2. Atualizar `SSH_PRIVATE_KEY`
3. Atualizar authorized_keys no servidor
4. Testar deploy

## 📝 Checklist de Configuração

Use o checklist completo: [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)

- [ ] Secrets configurados
- [ ] Servidor preparado
- [ ] Workflow testado
- [ ] Deploy funcionando
- [ ] Rollback testado

## 🆘 Troubleshooting

### Erro: "Permission denied (publickey)"

**Causa:** Chave SSH incorreta ou permissões erradas

**Solução:**
1. Verificar se o secret `SSH_PRIVATE_KEY` está correto
2. Incluir as linhas BEGIN e END
3. Verificar permissões no servidor

### Erro: "Directory not found"

**Causa:** `DEPLOY_PATH` incorreto

**Solução:**
1. Verificar caminho no servidor
2. Criar diretórios se necessário
3. Atualizar secret

### Build Falha

**Causa:** Erro no código ou variáveis faltando

**Solução:**
1. Testar build localmente
2. Verificar variáveis de ambiente
3. Ver logs detalhados

## 📚 Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [SSH Action](https://github.com/appleboy/ssh-action)
- [SCP Action](https://github.com/appleboy/scp-action)
- [Guia Completo de Deploy](../docs/DEPLOY.md)

## 🔄 Atualizações

Para atualizar os workflows:

1. Edite os arquivos `.yml`
2. Commit e push
3. Teste em staging primeiro
4. Deploy para produção

---

**Última atualização:** Fevereiro 2026  
**Maintainer:** Time TGOO
