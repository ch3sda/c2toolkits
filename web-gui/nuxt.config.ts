import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  vite: {
    plugins: [tsconfigPaths()]
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css', // your main CSS file
    viewer: true
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      title: 'C2Toolkits - by ch3sda',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'C2Toolkits - Encoding & Recon Tools' }
      ]
    }
  },

  nitro: {
    experimental: {
      openAPI: true
    }
  }
})
