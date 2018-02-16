import HomePage from './pages/home.vue'
import NotFoundPage from './pages/not-found.vue'

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
    path: '(.*)',
    component: NotFoundPage
  }
]
