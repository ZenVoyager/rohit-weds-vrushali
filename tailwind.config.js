/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: 'rgb(var(--royal-maroon-rgb) / <alpha-value>)',
        burgundy: 'rgb(var(--wedding-burgundy-rgb) / <alpha-value>)',
        gold: 'rgb(var(--antique-gold-rgb) / <alpha-value>)',
        ivory: 'rgb(var(--warm-ivory-rgb) / <alpha-value>)',
        champagne: 'rgb(var(--champagne-beige-rgb) / <alpha-value>)',
        espresso: 'rgb(var(--dark-espresso-rgb) / <alpha-value>)',
        terracotta: 'rgb(var(--terracotta-rose-rgb) / <alpha-value>)',
        cream: 'rgb(var(--soft-cream-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Lato', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        names: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        deva: ['"Noto Serif Devanagari"', '"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(212,175,106,0.55), 0 18px 40px -18px rgba(107,23,40,0.45)',
        soft: '0 18px 44px -22px rgba(59,33,28,0.45)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-2.5deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(212,175,106,0.55)' },
          '100%': { boxShadow: '0 0 0 22px rgba(212,175,106,0)' },
        },
        scrollDot: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(16px)', opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        sway: 'sway 6s ease-in-out infinite',
        'spin-slow': 'spinSlow 60s linear infinite',
        shimmer: 'shimmer 4s linear infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'scroll-dot': 'scrollDot 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
