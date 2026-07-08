/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-soft': 'var(--color-primary-soft)',
        'primary-glow': 'var(--color-primary-glow)',
        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        'accent-soft': 'var(--color-accent-soft)',
        'accent-glow': 'var(--color-accent-glow)',
        bg: 'var(--color-bg)',
        cream: 'var(--color-cream)',
        surface: 'var(--color-surface)',
        'surface-dark': 'var(--color-surface-dark)',
        ink: 'var(--color-text)',
        'ink-inverse': 'var(--color-ink-inverse)',
        'ink-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        display: ['var(--font-heading)'],
        sans: ['var(--font-body)'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) * 1.4)',
        xl: 'calc(var(--radius) * 2)',
      },
      maxWidth: {
        page: 'var(--maxw)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 0, 127, 0.35)',
        'glow-green': '0 0 40px rgba(49, 92, 43, 0.35)',
        card: '0 2px 12px rgba(20, 33, 26, 0.06)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
