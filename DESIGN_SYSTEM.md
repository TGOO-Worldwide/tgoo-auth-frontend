# TGOO Auth - Sistema de Design

## 🌓 Suporte a Dark Mode

A aplicação possui suporte completo a Dark Mode com transição suave entre temas:
- **Toggle de Tema**: Disponível no Header e na página de Login
- **Persistência**: Preferência salva no localStorage
- **Sistema**: Respeita a preferência do sistema operacional
- **Transição**: Animações suaves ao alternar entre temas

### Como Usar
```typescript
import { useTheme } from '@/hooks/useTheme';

const { theme, toggleTheme } = useTheme();
```

## Paleta de Cores

### Cores Principais (do Logo)

```css
/* Laranja TGOO - Cor Primária */
--tgoo-orange: #dc5528 (HSL: 13 73% 51%)
Uso: Botões primários, links, destaques principais

/* Roxo TGOO - Cor Secundária */
--tgoo-purple: #982173 (HSL: 317 60% 34%)
Uso: Elementos secundários, badges de status, acentos

/* Bege TGOO - Cor Neutra */
--tgoo-beige: #beb7af (HSL: 30 15% 74%)
Uso: Backgrounds sutis, estados muted, separadores
```

### Cores do Sistema

#### Light Mode
```css
/* Background */
--background: #ffffff
--tgoo-bg-light: #faf9f8 - Background claro com tom bege

/* Texto */
--foreground: #2b2520 (tons terrosos escuros)
--muted-foreground: #5c5347

/* Borda */
--border: #e8e3dd (tom bege claro)

/* Accent */
--accent: #f5f1ee (roxo muito claro para hover states)
--accent-foreground: #982173 (roxo para texto em accent)

/* Cards */
--card: #ffffff
--card-foreground: #2b2520
```

#### Dark Mode
```css
/* Background */
--background: hsl(20 15% 7%) - Marrom escuro
--tgoo-bg-light: hsl(20 15% 12%) - Marrom menos escuro

/* Texto */
--foreground: hsl(30 15% 95%) - Bege claro
--muted-foreground: hsl(30 15% 60%)

/* Cores Principais Ajustadas */
--primary: hsl(13 73% 58%) - Laranja mais brilhante
--secondary: hsl(317 60% 50%) - Roxo mais brilhante

/* Borda */
--border: hsl(30 15% 20%)

/* Accent */
--accent: hsl(317 40% 15%) - Roxo escuro
--accent-foreground: hsl(317 60% 80%)

/* Cards */
--card: hsl(20 15% 10%)
--card-foreground: hsl(30 15% 95%)
```

**Nota sobre Dark Mode**: As cores primárias (laranja e roxo) são ligeiramente mais brilhantes no modo escuro para manter boa legibilidade e contraste.

## Tipografia

### Família de Fontes
- Sistema padrão: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial`
- Peso: Regular (400), Medium (500), Semibold (600), Bold (700)

### Escalas de Tamanho
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)

## Componentes

### Botões

#### Primary Button
- Background: Gradiente `from-primary to-primary/90`
- Text: Branco
- Hover: Shadow-lg, scale-[1.02]
- Border-radius: 0.75rem (12px)

#### Secondary Button
- Background: Gradiente `from-secondary to-secondary/90`
- Text: Branco
- Hover: Shadow-lg, scale-[1.02]

#### Outline Button
- Border: 2px border-input
- Hover: bg-accent, border-primary/50

### Cards

- Background: white/80 com backdrop-blur-sm
- Border: 2px solid border
- Border-radius: 1rem (16px) - xl ou 1.5rem (24px) - 2xl
- Shadow: Sutil, aumenta no hover
- Hover: shadow-xl transition-shadow

### Inputs

- Height: 2.75rem (44px) para melhor UX mobile
- Border: 2px na variant outline
- Border-radius: 0.75rem (12px)
- Focus: Ring com cor primary

### Badges/Status

#### Status Ativo
- Background: emerald-100
- Text: emerald-700
- Border: emerald-200

#### Status Pendente
- Background: amber-100
- Text: amber-700
- Border: amber-200

#### Status Inativo/Bloqueado
- Background: red-100
- Text: red-700
- Border: red-200

## Efeitos e Transições

### Shadows
```css
/* Card padrão */
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)

/* Card hover */
shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)

/* Card com cor */
shadow-primary/30: sombra com tom laranja
```

### Transitions
- Padrão: `transition-all duration-200`
- Colors: `transition-colors duration-200`
- Shadow: `transition-shadow duration-200`

### Hover Effects
- Buttons: Scale 1.02 + shadow
- Cards: Aumentar shadow
- Links: Underline ou mudança de cor

## Backgrounds

### Login Page
```css
bg-gradient-to-br from-tgoo-bg-light via-white to-accent
+ radial-gradient overlay com from-tgoo-orange/5 to-tgoo-purple/5
```

### Main Layout
```css
bg-gradient-to-br from-tgoo-bg-light via-white to-accent/20
```

### Sidebar
```css
bg-gradient-to-b from-white to-tgoo-bg-light
```

### Header
```css
bg-white/80 backdrop-blur-md
```

## Ícones

- Tamanho padrão: 1.25rem (20px)
- Tamanho pequeno: 1rem (16px)
- Sempre acompanhados de label para acessibilidade
- Cores: Seguem as cores dos componentes pais

## Gradientes de Texto

Para títulos e destaques:
```css
bg-gradient-to-r from-primary to-secondary
bg-clip-text text-transparent
```

## Espaçamento

Seguindo escala do Tailwind:
- 1: 0.25rem (4px)
- 2: 0.5rem (8px)
- 3: 0.75rem (12px)
- 4: 1rem (16px)
- 6: 1.5rem (24px)
- 8: 2rem (32px)

## Border Radius

- sm: 0.5rem (8px) - Elementos pequenos
- md: 0.75rem (12px) - Padrão (buttons, inputs)
- lg: 1rem (16px) - Cards pequenos
- xl: 1.5rem (24px) - Cards grandes

## Acessibilidade

- Contraste mínimo: 4.5:1 para texto normal
- Contraste mínimo: 3:1 para texto grande
- Focus states visíveis em todos os elementos interativos
- Suporte a prefers-reduced-motion
- Labels descritivos para screen readers

## Componentes de Tema

### ThemeToggle
Botão para alternar entre light e dark mode:

```tsx
import ThemeToggle from '@/components/common/ThemeToggle';

// Uso básico
<ThemeToggle />

// Com variantes
<ThemeToggle variant="outline" className="shadow-lg" />
```

### Hook useTheme
Hook para gerenciar o tema da aplicação:

```tsx
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Tema atual: {theme}
    </button>
  );
}
```

## Princípios de Design

1. **Consistência**: Use sempre as cores da marca (laranja, roxo, bege)
2. **Hierarquia Visual**: Títulos com gradientes, subtítulos em muted
3. **Espaçamento Generoso**: Use padding e margin para respirar
4. **Feedback Visual**: Sempre forneça feedback em hover/click
5. **Performance**: Use backdrop-blur e gradientes com moderação
6. **Responsividade**: Mobile-first, touch targets de 44x44px mínimo
7. **Dark Mode First**: Teste sempre nos dois temas ao desenvolver novos componentes