# Changelog - Nova Identidade Visual

## 🌓 Update 2 - Dark Mode (05/02/2026)

### Implementação Completa de Dark Mode

#### Novos Arquivos
- ✅ `src/hooks/useTheme.ts` - Hook para gerenciamento de tema
- ✅ `src/components/common/ThemeToggle.tsx` - Botão toggle de tema

#### Funcionalidades
- ✅ Toggle de tema com animação suave (Sun/Moon icons)
- ✅ Persistência de preferência no localStorage
- ✅ Detecção automática da preferência do sistema
- ✅ Toggle disponível no Header (app principal)
- ✅ Toggle disponível na página de Login
- ✅ Transições suaves entre temas (300ms)
- ✅ Suporte completo a prefers-color-scheme

#### Cores Dark Mode Otimizadas
```css
/* Backgrounds mais escuros com tons terrosos */
--background: hsl(20 15% 7%)
--card: hsl(20 15% 10%)
--tgoo-bg-light: hsl(20 15% 12%)

/* Cores primárias mais brilhantes para melhor contraste */
--primary: hsl(13 73% 58%) - Laranja +5% luminosidade
--secondary: hsl(317 60% 50%) - Roxo +16% luminosidade

/* Texto com tons bege para suavidade */
--foreground: hsl(30 15% 95%)
--muted-foreground: hsl(30 15% 60%)

/* Bordas sutis */
--border: hsl(30 15% 20%)
```

#### Componentes Atualizados para Dark Mode
- **Header**: Background adaptativo, tema toggle integrado
- **Sidebar**: Gradientes ajustados, logo com brightness para dark
- **Login**: Background overlay mais intenso, toggle no canto superior
- **Dashboard**: Cards com bg-card/80 ao invés de bg-white/80
- **MainLayout**: Background via-background ao invés de via-white

#### Melhorias CSS
- ✅ Shadows mais intensas no dark mode
- ✅ Brightness no logo SVG para dark mode
- ✅ Backdrop-blur em cards para glassmorphism
- ✅ Classes dark: específicas para sombras

#### Documentação Atualizada
- ✅ `DESIGN_SYSTEM.md` - Seção completa sobre Dark Mode
- ✅ Exemplos de uso do hook useTheme
- ✅ Guia de cores para Light e Dark Mode
- ✅ Princípios de design atualizados

---

## 🎨 Update 1 - Identidade Visual Base (05/02/2026)

### 🎨 Mudanças Implementadas

#### 1. Sistema de Cores
- ✅ Implementado paleta de cores baseada no logo TGOO
- ✅ Cor primária: Laranja TGOO (#dc5528)
- ✅ Cor secundária: Roxo TGOO (#982173)
- ✅ Cor neutra: Bege TGOO (#beb7af)
- ✅ Variáveis CSS atualizadas no `index.css`
- ✅ Configuração do Tailwind atualizada com cores customizadas

#### 2. Componentes UI Atualizados

**Button (src/components/ui/button.tsx)**
- Adicionado gradientes para variantes default e secondary
- Efeito de hover com scale e shadow
- Border-radius aumentado para 12px (rounded-lg)
- Font-weight ajustado para semibold

**Card (src/components/ui/card.tsx)**
- Border aumentada para 2px
- Border-radius aumentado para 16px (rounded-xl)
- Shadow melhorada para shadow-lg
- Transição suave de shadow adicionada

**Input (src/components/ui/input.tsx)**
- Altura aumentada para 44px (melhor UX mobile)
- Border aumentada para 2px
- Focus ring com cor primária
- Hover state adicionado
- Border-radius aumentado para 12px

**Badge (src/components/ui/badge.tsx)**
- Adicionados gradientes sutis em todas as variantes
- Border aumentada para 2px
- Padding aumentado
- Hover state com shadow adicionado
- Font-weight ajustado para bold

#### 3. Layout e Navegação

**Login (src/pages/Login.tsx)**
- Logo TGOO adicionado no topo
- Background com gradiente usando cores da marca
- Overlay radial com cores da marca (laranja e roxo)
- Título com gradiente de texto
- Card com shadow-2xl e border-2
- Inputs com altura aumentada (44px)
- Badge de acesso SUPER_ADMIN redesenhado

**Sidebar (src/components/layout/Sidebar.tsx)**
- Background com gradiente (from-white to-tgoo-bg-light)
- Logo TGOO adicionado
- Items de menu com gradiente quando ativos
- Avatar com gradiente (from-primary to-secondary)
- Shadow-md adicionada no avatar
- Border-radius aumentado para rounded-xl

**Header (src/components/layout/Header.tsx)**
- Background semi-transparente com backdrop-blur
- Título com gradiente de texto
- Avatar com gradiente e border branca
- Dropdown melhorado com informações de role
- Badge de role com background secundário

**MainLayout (src/components/layout/MainLayout.tsx)**
- Background com gradiente sutil usando cores da marca

#### 4. Dashboard

**Dashboard (src/pages/Dashboard.tsx)**
- Header do dashboard com gradiente
- Cards de atividades recentes melhorados
- Badges de status atualizados com novas cores
- Hover effects adicionados nos itens

**StatsCard (src/components/dashboard/StatsCard.tsx)**
- Icons com gradientes de background
- Border aumentada para 2px
- Hover state com shadow-lg
- Título do valor com gradiente de texto
- Colors adaptadas para usar cores da marca TGOO

#### 5. Componentes Comuns

**LoadingSpinner (src/components/common/LoadingSpinner.tsx)**
- Efeito de duplo spinner com blur
- Background do fullscreen com gradiente
- Drop-shadow adicionada

**ConfirmDialog (src/components/common/ConfirmDialog.tsx)**
- Icons com background gradiente e rounded
- Layout melhorado
- Botões com largura flexível

#### 6. CSS Global (src/index.css)**
- Adicionadas variáveis CSS customizadas do TGOO
- Tema dark atualizado
- Font-smoothing e text-rendering otimizados
- Scroll-behavior smooth
- Focus states melhorados
- Text selection customizado
- Utility classes para gradientes (.gradient-primary, .gradient-secondary, .text-gradient)
- Utility classes para shadows (.shadow-brand, .shadow-brand-lg)

#### 7. Configuração

**tailwind.config.js**
- Adicionadas cores customizadas do TGOO (tgoo-orange, tgoo-purple, tgoo-beige, tgoo-bg-light)
- Border-radius aumentado para 0.75rem

**index.html**
- Favicon atualizado para usar logo.svg
- Meta tags adicionadas (description, theme-color, apple-mobile-web-app)
- Theme-color definido como laranja TGOO

#### 8. Documentação

**DESIGN_SYSTEM.md** (novo arquivo)
- Documentação completa do sistema de design
- Guia de cores com códigos HSL e uso
- Guia de tipografia
- Especificações de componentes
- Efeitos e transições
- Princípios de design
- Guidelines de acessibilidade

**README.md**
- Logo adicionado no topo
- Seção "Design System" adicionada
- Link para documentação do design system

**CHANGELOG_DESIGN.md** (este arquivo)
- Histórico completo de mudanças da identidade visual

### 🎯 Objetivos Alcançados

✅ Identidade visual consistente em toda a aplicação
✅ Uso das cores da marca TGOO (laranja, roxo, bege)
✅ Componentes UI modernos e atraentes
✅ Transições e animações suaves
✅ Melhor experiência do usuário (UX)
✅ Acessibilidade mantida
✅ Design responsivo
✅ Documentação completa do sistema de design

### 🚀 Melhorias de UX

- Touch targets aumentados (44px mínimo)
- Feedback visual em todos os elementos interativos
- Gradientes sutis para profundidade visual
- Shadows dinâmicas no hover
- Animações de scale nos botões
- Backdrop-blur para modernidade
- Border-radius consistentes
- Spacing generoso

### 📱 Responsividade

- Todos os componentes testados para mobile
- Touch targets adequados
- Layouts adaptáveis
- Textos legíveis em todas as resoluções

### ♿ Acessibilidade

- Contraste de cores adequado (WCAG AA)
- Focus states visíveis
- Labels descritivos
- Suporte a screen readers mantido
- Keyboard navigation funcional

### 🎨 Paleta de Cores Completa

```
Primária (Laranja TGOO):
- Base: #dc5528 (HSL: 13 73% 51%)
- Uso: Botões primários, links, destaques

Secundária (Roxo TGOO):
- Base: #982173 (HSL: 317 60% 34%)
- Uso: Elementos secundários, badges especiais

Neutra (Bege TGOO):
- Base: #beb7af (HSL: 30 15% 74%)
- Uso: Backgrounds sutis, estados muted

Accent (Roxo Claro):
- Base: HSL: 317 30% 92%
- Uso: Hover states, backgrounds de destaque

Background Light:
- Base: HSL: 30 30% 98%
- Uso: Backgrounds principais, áreas de conteúdo
```

### 📝 Próximos Passos (Opcionais)

- [x] Criar modo escuro completo ✅
- [ ] Adicionar animações mais elaboradas (framer-motion)
- [ ] Adicionar ilustrações customizadas
- [ ] Criar biblioteca de ícones customizados
- [ ] Implementar skeleton loaders
- [ ] Adicionar Easter eggs visuais
- [ ] Criar onboarding animado
- [ ] Implementar micro-interações

### 🔗 Arquivos Dark Mode

#### Novos Arquivos
- `src/hooks/useTheme.ts` (novo)
- `src/components/common/ThemeToggle.tsx` (novo)

#### Arquivos Modificados
- `src/index.css` (cores dark mode atualizadas)
- `src/components/layout/Header.tsx` (theme toggle adicionado)
- `src/components/layout/Sidebar.tsx` (ajustes dark mode)
- `src/components/layout/MainLayout.tsx` (background adaptativo)
- `src/pages/Login.tsx` (theme toggle + ajustes)
- `src/pages/Dashboard.tsx` (cards adaptáveis)
- `DESIGN_SYSTEM.md` (documentação dark mode)
- `CHANGELOG_DESIGN.md` (este arquivo atualizado)

---

### 🔗 Arquivos Base da Identidade Visual

#### Configuração
- `tailwind.config.js`
- `src/index.css`
- `index.html`

#### Componentes UI
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/badge.tsx`

#### Layout
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/MainLayout.tsx`

#### Páginas
- `src/pages/Login.tsx`
- `src/pages/Dashboard.tsx`

#### Dashboard
- `src/components/dashboard/StatsCard.tsx`

#### Componentes Comuns
- `src/components/common/LoadingSpinner.tsx`
- `src/components/common/ConfirmDialog.tsx`

#### Documentação
- `README.md` (atualizado)
- `DESIGN_SYSTEM.md` (novo)
- `CHANGELOG_DESIGN.md` (novo)

---

**Desenvolvido com ❤️ usando as cores da marca TGOO**
