import Vue from 'vue'
import VueRouter from 'vue-router'
import StatusPage from '../views/StatusPage.vue'
import Service from '../views/Service.vue'
import Incident from '../views/Incident.vue'
import Maintenance from '../views/Maintenance.vue'

require('chart.js')
require('moment')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'statusPage',
        component: StatusPage
    },
    {
        path: '/service/:id',
        name: 'service',
        component: Service
    },
    {
        path: '/incident/:id',
        name: 'incident',
        component: Incident
    },
    {
        path: '/maintenance/:id',
        name: 'maintenance',
        component: Maintenance
    }
]

const router = new VueRouter({
    routes
})

export default router
