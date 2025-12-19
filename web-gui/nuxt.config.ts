import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  devtools: { enabled: true },
compatibilityDate: '2025-12-20', // Add this line
  css: [
    '~/assets/css/main.css',
    '~/assets/css/scroll-animate.css' // 🔥 REQUIRED
  ],

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  vite: {
    plugins: [tsconfigPaths()]
  },

  tailwindcss: {
    viewer: true
  },

  app: {
    head: {
      title: 'C2Toolkits - by ch3sda',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'C2Toolkits - Encoding, Recon & Cybersecurity Learning Tools'
        }
      ]
    }
  },

  nitro: {
    experimental: {
      openAPI: true
    }
  }
})
