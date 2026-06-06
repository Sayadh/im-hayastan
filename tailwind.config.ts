import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#C8102E', // deep Armenian red
          dark: '#7A1E2C' // dark wine
        },
        wine: '#7A1E2C',
        beige: '#F7F1E8', // warm beige
        gold: {
          DEFAULT: '#D6A84F', // gold accent
          dark: '#b88c38'
        },
        ink: '#1F2937' // dark gray text
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(31, 41, 55, 0.18)',
        card: '0 18px 50px -20px rgba(31, 41, 55, 0.35)'
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem'
      }
    }
  },
  plugins: []
}
