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
        recentIncidents: [],
        serviceStatistics: {},
        defaults: {
            slowPoll: 60 * 1000,
            mediumPoll: 30 * 1000,
            fastPoll: 15 * 1000
        }
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
            if (newMeta.title != null) {
                state.title = newMeta.title
            }

            if (newMeta.subtitle != null) {
                state.subtitle = newMeta.subtitle
            }
        },
        setServiceStatistics(state, statistics) {
            Vue.set(state.serviceStatistics, statistics.key, statistics);
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
        },
        fetchServiceStatistics: async function (ctx, serviceId) {
            const statistics = {
                key: serviceId,
                uptime: [],
                metrics: []
            }

            const uptimeResponse = await axios.get(endpointBase + '/services/' + serviceId + "/uptime?limit=50")
            statistics.uptime = uptimeResponse.data

            const metricsResponse = await axios.get(endpointBase + '/services/' + serviceId + '/metrics')
            metricsResponse.data.forEach(async value => {
                const metricsDataResponse = await axios.get(endpointBase + '/metrics/' + value.id + '?limit=50')
                value.entries = metricsDataResponse.data
                statistics.metrics.push(value)
            })

            ctx.commit('setServiceStatistics', statistics)
        }
    },
    modules: {
    }
})
