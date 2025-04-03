/**
 * Droker Agentic Hub Design System
 * 
 * This file provides utility functions and constants for applying the design system
 * consistently across the application.
 */

import { cn } from './utils';

/**
 * Component style definitions that can be used throughout the application
 */
export const ds = {
  // Layout containers
  container: {
    base: 'bg-background text-foreground',
    card: 'bg-background dark:bg-card border border-border rounded-lg shadow-sm',
    section: 'py-6',
  },
  
  // Typography
  text: {
    title: 'text-3xl font-light text-foreground',
    subtitle: 'text-xl font-light text-foreground',
    body: 'text-base font-light text-foreground',
    muted: 'text-sm text-muted-foreground font-light',
    link: 'text-primary hover:underline cursor-pointer',
  },
  
  // Card components
  card: {
    root: 'ds-card',
    header: 'ds-card-header',
    body: 'ds-card-body',
    footer: 'ds-card-footer',
    title: 'ds-card-title',
    description: 'ds-card-description',
  },
  
  // Button variants
  button: {
    base: 'ds-button',
    primary: 'ds-button-primary',
    secondary: 'ds-button-secondary',
    outline: 'ds-button-outline',
    sizes: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4',
      lg: 'h-12 px-6',
    },
  },
  
  // Form elements
  form: {
    label: 'block text-sm font-light text-foreground mb-1',
    input: 'w-full px-3 py-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
    select: 'w-full px-3 py-2 border border-border bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
    checkbox: 'h-4 w-4 rounded border-border text-primary focus:ring-primary',
    error: 'text-sm text-destructive mt-1',
  },
  
  // Navigation
  nav: {
    item: 'ds-nav-item',
    itemActive: 'ds-nav-item-active',
  },
  
  // Table styles
  table: {
    root: 'ds-table',
    header: 'ds-table-header',
    headerCell: 'ds-table-header-cell',
    row: 'ds-table-row',
    cell: 'ds-table-cell',
  },
  
  // Status indicators
  status: {
    success: 'text-success',
    error: 'text-destructive',
    warning: 'text-warning',
    info: 'text-info',
  },
  
  // Utility classes
  utils: {
    srOnly: 'sr-only',
    roundedFull: 'rounded-full',
    roundedNone: 'rounded-none',
    shadow: 'shadow-sm',
    shadowMd: 'shadow-md',
    shadowLg: 'shadow-lg',
  },
};

/**
 * Theme-aware variants for common components
 */
export const themeAware = {
  // Background variants
  bg: {
    primary: 'bg-background dark:bg-background',
    secondary: 'bg-muted dark:bg-muted',
    card: 'bg-background dark:bg-card',
    transparent: 'bg-transparent',
  },
  
  // Text variants
  text: {
    primary: 'text-foreground',
    secondary: 'text-muted-foreground',
    brand: 'text-primary',
  },
  
  // Border variants
  border: {
    base: 'border-border',
    subtle: 'border-muted',
  },
};

export default ds;
