#!/bin/bash

# ============================================
# Script de Setup do Servidor CloudPanel
# Para Deploy Automático via GitHub Actions
# ============================================

set -e

echo "🚀 Setup do Servidor CloudPanel para Deploy Automático"
echo "========================================================"
echo ""

# Verificar se está rodando como usuário correto (não root)
if [ "$EUID" -eq 0 ]; then 
   echo "❌ Não execute este script como root!"
   echo "Execute como o usuário do site no CloudPanel"
   exit 1
fi

# Solicitar informações
read -p "Digite o nome do site (ex: tgoo-auth): " SITE_NAME
read -p "Digite o caminho do home (ex: /home/tgoo-auth): " HOME_PATH

DEPLOY_BASE="$HOME_PATH/deployments"
DEPLOY_PATH="$DEPLOY_BASE/$SITE_NAME"
SSH_DIR="$HOME/.ssh"

echo ""
echo "📋 Configuração:"
echo "  Site: $SITE_NAME"
echo "  Home: $HOME_PATH"
echo "  Deploy Path: $DEPLOY_PATH"
echo ""
read -p "Confirma estas informações? (s/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "❌ Operação cancelada"
    exit 1
fi

# Criar estrutura de diretórios
echo ""
echo "📁 Criando estrutura de diretórios..."
mkdir -p "$DEPLOY_PATH"/{current,backup,temp}
echo "✅ Diretórios criados"

# Configurar SSH
echo ""
echo "🔐 Configurando SSH..."
mkdir -p "$SSH_DIR"
chmod 700 "$SSH_DIR"

# Verificar se já existe uma chave
if [ -f "$SSH_DIR/github_deploy" ]; then
    echo "⚠️  Chave SSH já existe em $SSH_DIR/github_deploy"
    read -p "Deseja criar uma nova chave? Isso irá SOBRESCREVER a existente! (s/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        echo "Pulando criação de chave SSH..."
    else
        ssh-keygen -t ed25519 -C "github-actions-$SITE_NAME" -f "$SSH_DIR/github_deploy" -N ""
    fi
else
    ssh-keygen -t ed25519 -C "github-actions-$SITE_NAME" -f "$SSH_DIR/github_deploy" -N ""
fi

# Adicionar chave ao authorized_keys
if [ -f "$SSH_DIR/github_deploy.pub" ]; then
    cat "$SSH_DIR/github_deploy.pub" >> "$SSH_DIR/authorized_keys"
    chmod 600 "$SSH_DIR/authorized_keys"
    echo "✅ Chave pública adicionada ao authorized_keys"
fi

# Ajustar permissões
echo ""
echo "🔧 Ajustando permissões..."
chmod 600 "$SSH_DIR/github_deploy"
chmod 644 "$SSH_DIR/github_deploy.pub"
chmod -R 755 "$DEPLOY_PATH"
echo "✅ Permissões ajustadas"

# Criar link simbólico para htdocs (se existir)
if [ -d "$HOME_PATH/htdocs" ]; then
    echo ""
    read -p "Deseja criar link simbólico de $DEPLOY_PATH/current para htdocs? (s/N): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        # Fazer backup do htdocs original
        if [ -d "$HOME_PATH/htdocs" ] && [ ! -L "$HOME_PATH/htdocs" ]; then
            mv "$HOME_PATH/htdocs" "$HOME_PATH/htdocs.backup.$(date +%Y%m%d_%H%M%S)"
            echo "✅ Backup do htdocs original criado"
        fi
        
        ln -sfn "$DEPLOY_PATH/current" "$HOME_PATH/htdocs"
        echo "✅ Link simbólico criado"
    fi
fi

# Exibir chave privada
echo ""
echo "=========================================="
echo "🔑 CHAVE PRIVADA SSH"
echo "=========================================="
echo ""
echo "⚠️  COPIE TODO O CONTEÚDO ABAIXO (incluindo as linhas BEGIN e END)"
echo "e adicione como secret SSH_PRIVATE_KEY no GitHub:"
echo ""
echo "----------------------------------------"
cat "$SSH_DIR/github_deploy"
echo "----------------------------------------"
echo ""

# Resumo final
echo ""
echo "=========================================="
echo "✅ SETUP CONCLUÍDO!"
echo "=========================================="
echo ""
echo "📋 Informações para configurar no GitHub Secrets:"
echo ""
echo "SSH_HOST: $(hostname -f || hostname -I | awk '{print $1}')"
echo "SSH_USERNAME: $(whoami)"
echo "SSH_PORT: 22"
echo "DEPLOY_PATH: $DEPLOY_PATH"
echo ""
echo "🔑 Adicione os seguintes secrets no GitHub:"
echo "  1. SSH_HOST"
echo "  2. SSH_USERNAME"
echo "  3. SSH_PRIVATE_KEY (a chave exibida acima)"
echo "  4. SSH_PORT (opcional, padrão: 22)"
echo "  5. DEPLOY_PATH"
echo "  6. VITE_API_URL (URL da sua API)"
echo ""
echo "📖 Veja o guia completo em: docs/DEPLOY.md"
echo ""
echo "🧪 Para testar o SSH:"
echo "  ssh -i $SSH_DIR/github_deploy $(whoami)@localhost"
echo ""
