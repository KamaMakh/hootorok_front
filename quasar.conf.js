// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = () => ({
  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  boot: [
    'i18n',
    'axios',
  ],

  css: [
    'app.styl',
  ],

  extras: [
    // 'ionicons-v4',
    // 'mdi-v3',
    // 'fontawesome-v5',
    // 'eva-icons',
    // 'themify',
    // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

    'roboto-font', // optional, you are not bound to it
    'material-icons', // optional, you are not bound to it
  ],

  framework: {
    // iconSet: 'ionicons-v4',
    // lang: 'de', // Quasar language
    cssAddon: true,
    // all: true, // --- includes everything; for dev only!

    components: [
      'QLayout',
      'QHeader',
      'QFooter',
      'QDrawer',
      'QPageContainer',
      'QPage',
      'QToolbar',
      'QToolbarTitle',
      'QBtn',
      'QIcon',
      'QList',
      'QItem',
      'QItemSection',
      'QItemLabel',
      'QSelect',
      'QMarkupTable',
      'QBtnToggle',
      'QOptionGroup',
      'QTable',
      'QTh',
      'QTr',
      'QTd',
      'QDialog',
      'QCheckbox',
      'QInput',
      'QBanner',
      'QDialog',
      'QCarousel',
      'QCarouselControl',
      'QCarouselSlide',
      'QCard',
      'QCardSection',
      'QCardActions',
      'QDate',
      'QField',
      'QMenu',
      'QSeparator',
      'QBtnGroup',
      'QImg',
      'QPagination',
      'QTooltip',
      'QPopupProxy',
      'QSpace',
    ],

    directives: [
      'Ripple',
      'ClosePopup',
    ],

    // Quasar plugins
    plugins: [
      'Notify',
      'Cookies',
      'Dialog',
      'LoadingBar',
    ],
  },

  preFetch: true,

  supportIE: false,

  build: {
    transpileDependencies: [/vue-yandex-maps/],
    scopeHoisting: true,
    // vueRouterMode: 'history',
    // vueCompiler: true,
    // gzip: true,
    // analyze: true,
    // extractCSS: false,
    extendWebpack(cfg) {
      cfg.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint').CLIEngine.getFormatter('stylish'),
        },
      });
    },
  },

  devServer: {
    // https: true,
    // port: 8080,
    open: true, // opens browser window automatically
  },

  // animations: 'all', // --- includes all animations
  animations: [],

  ssr: {
    pwa: false,
  },

  pwa: {
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {}, // only for NON InjectManifest
    manifest: {
      // name: 'Hutorok site',
      // short_name: 'Hutorok site',
      // description: 'New site of recreation center Hutorok',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#027be3',
      icons: [
        {
          src: 'statics/icons/favicon_32.ico',
          sizes: '32x32',
          type: 'image/ico',
        },
        // {
        //   src: 'statics/icons/icon-192x192.png',
        //   sizes: '192x192',
        //   type: 'image/png',
        // },
      ],
    },
  },

  cordova: {
    // id: 'org.cordova.quasar.app',
    // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
  },

  electron: {
    // bundler: 'builder', // or 'packager'

    extendWebpack(cfg) {
      // do something with Electron main process Webpack cfg
      // chainWebpack also available besides this extendWebpack
    },

    packager: {
      // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

      // OS X / Mac App Store
      // appBundleId: '',
      // appCategoryType: '',
      // osxSign: '',
      // protocol: 'myapp://path',

      // Windows only
      // win32metadata: { ... }
    },

    builder: {
      // https://www.electron.build/configuration/configuration

      // appId: 'hutorok'
    },
  },
});
