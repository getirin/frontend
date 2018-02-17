import HomePage from './pages/home.vue'
import NotFoundPage from './pages/not-found.vue'
import CarrierPage from './pages/carrier.vue'

export default [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/carrier/:slug',
    component: CarrierPage
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
]
