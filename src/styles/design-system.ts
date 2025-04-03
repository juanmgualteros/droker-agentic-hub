/**
 * Droker Agentic Hub Design System
 * 
 * This file defines the core design tokens and styles for the application.
 * It serves as a single source of truth for colors, typography, spacing, and component styles.
 */

// -----------------------------------------------------------------------------
// Color System
// -----------------------------------------------------------------------------

/**
 * Base color palette - HSL values that will be used to generate the theme
 * These are referenced in globals.css as CSS variables
 */
export const colors = {
  // Primary brand colors
  primary: {
    light: 'hsl(215, 100%, 50%)',
    dark: 'hsl(215, 100%, 60%)',
  },
  
  // Background colors
  background: {
    light: 'hsl(0, 0%, 100%)',
    dark: 'hsl(220, 15%, 16%)',
  },
  
  // Card and elevated surface colors
  card: {
    light: 'hsl(0, 0%, 100%)',
    dark: 'hsl(220, 15%, 20%)',
  },
  
  // Muted background colors for subtle emphasis
  muted: {
    light: 'hsl(220, 15%, 95%)',
    dark: 'hsl(220, 15%, 25%)',
  },
  
  // Text colors
  foreground: {
    light: 'hsl(220, 15%, 20%)',
    dark: 'hsl(220, 15%, 95%)',
  },
  
  // Secondary text colors
  mutedForeground: {
    light: 'hsl(220, 10%, 50%)',
    dark: 'hsl(220, 10%, 70%)',
  },
  
  // Border colors
  border: {
    light: 'hsl(220, 15%, 90%)',
    dark: 'hsl(220, 15%, 30%)',
  },
  
  // Accent colors for hover states
  accent: {
    light: 'hsl(220, 15%, 92%)',
    dark: 'hsl(220, 15%, 25%)',
  },
  
  // Status colors
  success: {
    light: 'hsl(145, 65%, 42%)',
    dark: 'hsl(145, 65%, 52%)',
  },
  warning: {
    light: 'hsl(38, 92%, 50%)',
    dark: 'hsl(38, 92%, 60%)',
  },
  error: {
    light: 'hsl(0, 85%, 60%)',
    dark: 'hsl(0, 85%, 65%)',
  },
  info: {
    light: 'hsl(215, 100%, 50%)',
    dark: 'hsl(215, 100%, 60%)',
  },
};

// -----------------------------------------------------------------------------
// Typography System
// -----------------------------------------------------------------------------

export const typography = {
  // Font family
  fontFamily: 'Comfortaa, system-ui, sans-serif',
  
  // Font weights
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  
  // Font sizes
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// -----------------------------------------------------------------------------
// Spacing System
// -----------------------------------------------------------------------------

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// -----------------------------------------------------------------------------
// Border Radius System
// -----------------------------------------------------------------------------

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// -----------------------------------------------------------------------------
// Shadow System
// -----------------------------------------------------------------------------

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// -----------------------------------------------------------------------------
// Component Style Definitions
// -----------------------------------------------------------------------------

/**
 * Component style definitions
 * These define the base styles for common components
 */
export const componentStyles = {
  // Card styles
  card: {
    base: 'bg-background dark:bg-card border border-border rounded-lg shadow-sm',
    header: 'p-6 border-b border-border',
    body: 'p-6',
    footer: 'p-6 border-t border-border',
    title: 'text-xl font-light text-foreground',
    description: 'text-sm text-muted-foreground font-light',
  },
  
  // Button styles
  button: {
    base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    sizes: {
      sm: 'h-9 px-3 rounded-md',
      md: 'h-10 py-2 px-4',
      lg: 'h-11 px-8 rounded-md',
      icon: 'h-10 w-10',
    },
  },
  
  // Input styles
  input: {
    base: 'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  },
  
  // Table styles
  table: {
    base: 'w-full text-sm',
    header: 'border-b border-border bg-muted/50',
    headerCell: 'px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground',
    row: 'border-b border-border bg-background transition-colors hover:bg-muted/50',
    cell: 'px-4 py-3 text-foreground',
  },
  
  // Navigation styles
  navigation: {
    base: 'flex flex-col w-64 bg-background border-r border-border',
    item: 'flex items-center px-4 py-2 text-sm font-light text-foreground hover:bg-muted',
    activeItem: 'bg-muted text-foreground',
  },
  
  // Page layout styles
  pageLayout: {
    base: 'min-h-screen bg-background',
    main: 'flex-1 px-8 py-6',
    header: 'text-3xl font-light text-foreground',
    description: 'mt-2 text-sm text-muted-foreground',
  },
};

// Export everything as a design system object
export const designSystem = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  componentStyles,
};

export default designSystem;
