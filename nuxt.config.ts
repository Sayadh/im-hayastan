// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  // Server-side only values live here. NEVER expose secrets to the client.
  runtimeConfig: {
    // Private — only available on the server (e.g. server/api routes).
    openaiApiKey: process.env.OPENAI_API_KEY ?? '',
    // public: values exposed to the client (no secrets!)
    public: {
      appName: 'Armenia Travel'
    }
  },

  typescript: {
    strict: true,
    typeCheck: false // set true once vue-tsc is installed in CI
  }
})
