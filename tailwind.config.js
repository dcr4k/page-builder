/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#00e599', // Vibrant mint/emerald green from BioCraft Studio logo
          600: '#05cd88',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        studio: {
          black: '#111317',       // Cinza escuro profundo (quase preto)
          panel: '#16191f',       // Painéis e cabeçalho cinza escuro
          card: '#1d222a',        // Cards e botões secundários com ótimo contraste
          input: '#13161c',       // Inputs e seletores
          border: '#2a323d',      // Bordas nítidas com contraste ideal
          borderSubtle: '#20262f', // Bordas secundárias
          hover: '#262d38',       // Superfície de hover
          borderBrand: 'rgba(0, 229, 153, 0.35)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.95' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
