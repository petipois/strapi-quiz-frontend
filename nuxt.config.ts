import { defineNuxtConfig } from 'nuxt/config'
const strapiBaseUri = process.env.API_URL || "https://strapinuxt-quiz-app.onrender.com/";
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  modules: ['@nuxtjs/tailwindcss'],
  env: {
    strapiBaseUri,
  },
})
