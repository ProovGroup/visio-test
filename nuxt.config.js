export default async () => ({
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Platform - Visio Freya',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/stylesheets/global.css', '~/assets/stylesheets/main.scss', '~/node_modules/bulma-calendar/dist/css/bulma-calendar.min.css'],
  styleResources: {
    scss: ['./assets/stylesheets/_variables.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vee-validate.client.ts',
    '@/plugins/vuex-persist.client.ts',
    '@/plugins/buefy.client.js',
    '@/plugins/auth/index.ts'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  loading: {
    color: '#448AFF',
    height: '5px'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-i18n',
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    lazy: true,
    langDir: 'lang/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'dashboard-freya_i18n',
      onlyOnRoot: true,
      alwaysRedirect: true
    },
    locales: [
      { code: 'fr', file: 'requester.ts', name: 'Français' }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  },

  publicRuntimeConfig: {
    ...((await import(`./env/${process.env.NODE_ENV}.ts`)).default)
  }
})
