import type { Config } from 'tailwindcss';

// Colors that change with the theme are CSS variables (see globals.css).
// brand.navy / accent are fixed brand colors used as backgrounds in both themes.
const themed = (name: string) => `rgb(var(--brand-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#123B4A',
          navyLight: '#1B4D5F',
          accent: '#14B8A6',
          accentHover: '#2DD4BF',
          bg: themed('bg'),
          surface: themed('surface'),
          card: themed('card'),
          border: themed('border'),
          text: themed('text'),
          muted: themed('muted'),
          ink: themed('ink'),
          teal: themed('teal'),
          mint: themed('mint'),
          mintBorder: themed('mint-border')
        }
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-heading)', 'system-ui', 'sans-serif']
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
        'dialog-in': {
          from: { opacity: '0', transform: 'translateY(12px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        'dialog-out': {
          from: { opacity: '1', transform: 'translateY(0) scale(1)' },
          to: { opacity: '0', transform: 'translateY(8px) scale(0.98)' }
        },
        'menu-in': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'pop-in': {
          from: { opacity: '0', transform: 'scale(0.6)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-end': {
          from: { opacity: '0', transform: 'translateX(var(--slide-x)) scale(0.98)' },
          to: { opacity: '1', transform: 'translateX(0) scale(1)' }
        },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(24px, -20px) scale(1.08)' }
        },
        gradient: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-in forwards',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-in forwards',
        'dialog-in': 'dialog-in 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
        'dialog-out': 'dialog-out 0.2s ease-in forwards',
        'menu-in': 'menu-in 0.2s ease-out',
        'pop-in': 'pop-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-end': 'slide-end 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 7s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        gradient: 'gradient 14s ease infinite'
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(18, 59, 74, 0.04), 0 1px 2px -1px rgba(18, 59, 74, 0.02)',
        pop: '0 4px 6px -1px rgba(18, 59, 74, 0.06), 0 2px 4px -2px rgba(18, 59, 74, 0.04)',
        modal: '0 20px 25px -5px rgba(18, 59, 74, 0.1), 0 8px 10px -6px rgba(18, 59, 74, 0.04)'
      }
    }
  },
  plugins: []
};

export default config;
