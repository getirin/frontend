import HomePage from './pages/home.vue'
import NotFoundPage from './pages/not-found.vue'
import CarrierPage from './pages/carrier.vue'

import PanelRightPage from './pages/panel-right.vue'

export default [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/panel-right/',
    component: PanelRightPage
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
