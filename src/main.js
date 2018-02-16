import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import Framework7 from 'framework7/dist/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js'
import Framework7Styles from 'framework7/dist/css/framework7.css'
import IconsStyles from './css/icons.css'
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA8VI7O2qYgTBk6Fymhm-pUm0Qq42IZOSA',
    libraries: 'places,drawing,visualization'
  }
})

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

Vue.component('google-map', VueGoogleMaps.Map)
Vue.component('google-marker', VueGoogleMaps.Marker)

new Vue({
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
  }
})
