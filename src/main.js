import Vue from 'vue'
import Framework7 from 'framework7/dist/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js'
import Framework7Styles from 'framework7/dist/css/framework7.css'
import IconsStyles from './css/icons.css'
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7)

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
