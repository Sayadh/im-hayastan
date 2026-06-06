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
          DEFAULT: '#C8102E', // Armenian flag red
          dark: '#8f0b20'
        }
      }
    }
  },
  plugins: []
}
