import Vue from 'vue'
import Vuex from 'vuex'

// 3th. parties. Such as maps, UI kit etc.
import * as VueGoogleMaps from 'vue2-google-maps'
import Framework7 from 'framework7/dist/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js'
import Framework7Styles from 'framework7/dist/css/framework7.css'

// External StyleSheets
import IconsStyles from './css/icons.css'
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import Store
import storeOptions from './store'

// Import App Component
import App from './app'

import Moment from 'vue-moment'

const moment = require('moment')
require('moment/locale/tr')

// Init Vuex Store
Vue.use(Vuex)

Vue.use(Moment, {
  moment
});

// Init Google Maps
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA8VI7O2qYgTBk6Fymhm-pUm0Qq42IZOSA',
    libraries: 'places,drawing,visualization'
  }
})

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

// Initial G-* things.
Vue.component('google-map', VueGoogleMaps.Map)
Vue.component('google-marker', VueGoogleMaps.Marker)

// Bind store to vuex
const store = new Vuex.Store(storeOptions)

const vue = new Vue({
  el: '#app',
  template: '<app/>',
  framework7: {
    id: 'com.cagatay.getirin', // App bundle ID
    name: 'Getir.in', // App name
    theme: 'ios', // Automatic theme detection
    // App routes
    routes: Routes,
  },
  // Register App Component
  components: {
    app: App
  },
  store
})

window.vue = vue
