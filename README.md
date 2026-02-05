# TGOO Auth Master - Frontend

<div align="center">
  <img src="./logo.svg" alt="TGOO Logo" width="200"/>
</div>

Plataforma Master de Autenticação do ecossistema TGOO. Interface administrativa para gerenciar todas as plataformas e usuários do sistema de autenticação centralizado.

## 🎨 Design System

Esta aplicação segue um sistema de design consistente baseado nas cores da marca TGOO:

- **🟠 Laranja TGOO (#dc5528)**: Cor primária usada em botões principais, links e destaques
- **🟣 Roxo TGOO (#982173)**: Cor secundária para elementos de apoio e badges
- **🟤 Bege TGOO (#beb7af)**: Cor neutra para backgrounds sutis e estados muted

### 🌓 Dark Mode

A aplicação possui suporte completo a Dark Mode:

- **Toggle automático**: Botão no Header e na página de Login
- **Persistência**: Preferência salva automaticamente
- **Sistema**: Respeita `prefers-color-scheme` do navegador
- **Otimizado**: Cores ajustadas para melhor contraste no modo escuro

```tsx
// Usar o tema programaticamente
import { useTheme } from '@/hooks/useTheme';

const { theme, toggleTheme } = useTheme();
```

Para mais detalhes sobre o sistema de design, consulte [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

## 🚀 Tecnologias

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod
- **Tables**: TanStack Table
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Formatting**: date-fns

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Backend da API rodando (padrão: `http://localhost:3001`)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <repo-url>
cd tgoo-auth-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.development
```

Edite `.env.development` com suas configurações:
```env
VITE_API_URL=http://localhost:3001/api
VITE_PLATFORM_CODE=auth_tgoo
VITE_APP_NAME=TGOO Auth Master
```

## 🏃 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Imagens, ícones, etc
├── components/
│   ├── ui/             # Componentes base (Shadcn/ui)
│   ├── layout/         # Layout (Sidebar, Header, MainLayout)
│   ├── dashboard/      # Componentes do Dashboard
│   ├── platforms/      # Componentes de Plataformas
│   ├── users/          # Componentes de Usuários
│   └── common/         # Componentes comuns
├── pages/              # Páginas principais
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Platforms.tsx
│   ├── Users.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── services/           # Serviços de API
│   ├── api.ts
│   ├── auth.service.ts
│   ├── platform.service.ts
│   └── user.service.ts
├── hooks/              # Hooks customizados
├── store/              # Zustand stores
├── types/              # TypeScript types
├── utils/              # Utilitários
├── routes/             # Configuração de rotas
├── App.tsx
├── main.tsx
└── index.css
```

## 🔐 Autenticação

A aplicação requer autenticação como **SUPER_ADMIN** para acessar qualquer funcionalidade. O token JWT é armazenado localmente e renovado automaticamente.

### Fluxo de Autenticação:
1. Login com email e senha na plataforma master (`auth_tgoo`)
2. Verificação de role SUPER_ADMIN
3. Armazenamento do token JWT
4. Proteção de todas as rotas privadas

## 📱 Funcionalidades

### Dashboard
- Visão geral do sistema
- Estatísticas de plataformas e usuários
- Listagem de atividades recentes

### Gerenciamento de Plataformas
- Listar todas as plataformas
- Criar nova plataforma
- Editar plataforma existente
- Visualizar estatísticas por plataforma

### Gerenciamento de Usuários
- Listar todos os usuários
- Criar novo usuário
- Visualizar e editar informações
- Filtrar por plataforma, role e status

### Configurações
- Visualizar perfil do SUPER_ADMIN
- Alterar senha
- Gerenciar preferências

## 🎨 Design System

### Cores Principais
- Primary: `#3B82F6` (Azul)
- Success: `#10B981` (Verde)
- Warning: `#F59E0B` (Laranja)
- Danger: `#EF4444` (Vermelho)
- Info: `#8B5CF6` (Roxo)

### Breakpoints Responsivos
- Mobile: `375px` e acima
- Tablet: `768px` e acima
- Desktop: `1024px` e acima
- Large Desktop: `1280px` e acima

## 🔒 Segurança

- Validação de inputs no frontend e backend
- Sanitização de dados
- Tokens JWT com expiração
- Rotas protegidas por role
- HTTPS obrigatório em produção
- Content Security Policy

## 🐛 Debug

Para debug e desenvolvimento:

1. Verifique os logs do console do navegador
2. Use as React DevTools
3. Verifique a aba Network para requisições API
4. Logs do Zustand estão disponíveis nas DevTools

## 📚 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build
- `npm run lint` - Executa ESLint

## 🚀 Deploy

Este projeto está configurado para deploy automático via GitHub Actions para servidores CloudPanel.

### Deploy Automático

O deploy é acionado automaticamente quando você faz push para:
- Branch `main` → Deploy para Produção
- Branch `develop/staging` → Deploy para Staging

### Configuração do Deploy

1. **No Servidor CloudPanel:**
```bash
# Execute o script de setup
bash scripts/setup-server.sh
```

2. **No GitHub:**
   - Vá para Settings → Secrets and variables → Actions
   - Adicione os secrets conforme instruções exibidas pelo script

3. **Secrets Necessários:**
   - `SSH_HOST` - Endereço do servidor
   - `SSH_USERNAME` - Usuário SSH
   - `SSH_PRIVATE_KEY` - Chave privada SSH
   - `DEPLOY_PATH` - Caminho de deploy no servidor
   - `VITE_API_URL` - URL da API backend

📖 **Guia Completo de Deploy:** [docs/DEPLOY.md](./docs/DEPLOY.md)

### Deploy Manual

Para fazer deploy manual via GitHub Actions:
1. Vá para a aba **Actions**
2. Selecione **Deploy to CloudPanel**
3. Clique em **Run workflow**
4. Escolha a branch e confirme

### Estrutura de Deploy

```
servidor/
└── deployments/
    └── tgoo-auth-frontend/
        ├── current/      # Versão ativa
        ├── backup/       # Backup da versão anterior
        └── temp/         # Temporário para novos deploys
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e pertence ao ecossistema TGOO.

## 📞 Suporte

Para suporte e dúvidas:
- Email: suporte@tgoo.eu
- Documentação: [FRONTEND_MASTER_GUIDE.md](./FRONTEND_MASTER_GUIDE.md)
- Backend: [docs/backend/INTEGRATION_GUIDE.md](./docs/backend/INTEGRATION_GUIDE.md)

---

**Desenvolvido por TGOO** 🚀
