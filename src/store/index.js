import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const axios = require('axios')
const endpointBase = '/api/v1'

export default new Vuex.Store({
    state: {
        title: "Title",
        subtitle: "Subtitle",
        services: [],
        incidents: [],
        recentIncidents: []
    },
    mutations: {
        setServices(state, newServices) {
            state.services = newServices
        },
        setIncidents(state, newIncidents) {
            state.incidents = newIncidents
        },
        setRecentIncidents(state, newRecentIncidents) {
            state.recentIncidents = newRecentIncidents
        },
        setMeta(state, newMeta) {
            state.title = newMeta.title
            state.subtitle = newMeta.subtitle
        }
    },
    actions: {
        fetchMeta: async function (ctx) {
            const response = await axios.post(endpointBase + '/kv', ['title', 'subtitle'])
            ctx.commit('setMeta', response.data)
        },
        fetchServices: async function (ctx) {
            const response = await axios.get(endpointBase + '/services')
            ctx.commit('setServices', response.data)
        },
        fetchIncidents: async function (ctx) {
            const response = await axios.get(endpointBase + '/incidents')
            ctx.commit('setIncidents', response.data)
        },
        fetchRecentIncidents: async function (ctx) {
            const response = await axios.get(endpointBase + '/incidents/recent')
            ctx.commit('setRecentIncidents', response.data)
        }
    },
    modules: {
    }
})
