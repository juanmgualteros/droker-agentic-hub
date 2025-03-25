type FontSize = [string, { lineHeight: string }];

export const typography = {
  fonts: {
    comfortaa: 'var(--font-comfortaa)',
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  sizes: {
    xs: ['0.75rem', { lineHeight: '1rem' }] as FontSize,
    sm: ['0.875rem', { lineHeight: '1.25rem' }] as FontSize,
    base: ['1rem', { lineHeight: '1.5rem' }] as FontSize,
    lg: ['1.125rem', { lineHeight: '1.75rem' }] as FontSize,
    xl: ['1.25rem', { lineHeight: '1.75rem' }] as FontSize,
    '2xl': ['1.5rem', { lineHeight: '2rem' }] as FontSize,
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }] as FontSize,
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }] as FontSize,
  },
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  leading: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} 