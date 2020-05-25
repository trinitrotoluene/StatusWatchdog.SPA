import Vue from 'vue'
import VueRouter from 'vue-router'
import StatusPage from '../views/StatusPage.vue'
import Service from '../views/Service.vue'
import Incident from '../views/Incident.vue'
import Maintenance from '../views/Maintenance.vue'

require('bulma/css/bulma.css')
require('chart.js')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'StatusPage',
    component: StatusPage
  },
  {
    path: '/service/:id',
    name: 'Service',
    component: Service
  },
  {
    path: '/incident/:id',
    name: 'Incident',
    component: Incident
  },
  {
    path: '/maintenance/:id',
    name: 'Maintenance',
    component: Maintenance
  }
]

const router = new VueRouter({
  routes
})

export default router
