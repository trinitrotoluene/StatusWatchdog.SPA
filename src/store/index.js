import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        title: "Title",
        subtitle: "Subtitle",
        services: []
    },
    mutations: {
        setServices(newServices) {
            state.services = newServices
        }
    },
    actions: {
    },
    modules: {
    }
})
