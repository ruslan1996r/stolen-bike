import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// http://localhost:5000
// https://git.heroku.com/stolen-b.git
const url = 'http://localhost:5000'
export default new Vuex.Store({
  state: {
    bicycles: [],
    policemans: [],
    policeman: null,
    loading: false
  },
  mutations: {
    setBicycles(state, bicycles) {
      state.bicycles = bicycles
    },
    addBicycle(state, bicycle) {
      state.bicycles.push(bicycle)
    },
    mutateBicycle(state, { bikeId, newStatus }) {
      state.bicycles.find(b => b._id === bikeId).status = newStatus
    },
    setPolicemans(state, policemans) {
      state.policemans = policemans
    },
    setPoliceman(state, policeman) {
      state.policeman = policeman,
        state.policemans.push(policeman)
    },
    mutatePolice(state, { policeId, bicycle }) {
      state.policemans.find(p => p._id === policeId).bicycle = bicycle
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    logout(state) {
      state.policeman = null
    },
  },
  actions: {
    async getBicycles({ commit }) {
      commit('setLoading', true)
      const res = await fetch(url + "/").then(res => res.json());
      commit('setBicycles', res.bicycles)
      commit('setLoading', false)
    },
    async getPolicemans({ commit }) {
      commit('setLoading', true)
      const res = await fetch(url + "/policemans").then(res => res.json());
      commit('setPolicemans', res.policemans)
      commit('setLoading', false)
    },
    async searchBicycle({ commit }) {
      const policeId = this.state.policemans.find(p => p.bicycle === null)._id

      const res = await fetch(url + "/search", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ policeId })
      }).then(res => res.json());

      commit('mutateBicycle', { bikeId: res.freePoliceman.bicycle._id, newStatus: "SEARCH" })
      commit('mutatePolice', { policeId: res.freePoliceman._id, bicycle: res.freePoliceman.bicycle })
    },
    async createStolenBicycle({ commit }, { description }) {
      const res = await fetch(url + "/",
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description })
        }).then(res => res.json());
      console.log(res.newBicycle, "res.newBicycle?")
      commit("addBicycle", res.newBicycle)
    },
    async registerPoliceman({ commit }, { name }) {
      const res = await fetch(url + "/policeman",
        {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name })
        }).then(res => res.json());
      commit('setPoliceman', res.policeman)
    },

    async bikeFound({ commit, dispatch }, { bikeId, role }) {
      const res = await fetch(url + "/",
        {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bikeId,
            role
          })
        }).then(res => res.json())
      if (res.policeId) {
        commit('mutateBicycle', { bikeId, newStatus: "FOUND" })
        commit('mutatePolice', { policeId: res.policeId, bicycle: null })
        await dispatch('searchBicycle')
      }
    }
  },

  getters: {
    bicycles: state => state.bicycles,
    loading: state => state.loading,
    policemans: state => state.policemans,
    policeman: state => state.policeman
  },
  modules: {
  }
})
