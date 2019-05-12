import requester from '../requester';

const state = {
    currentSearch: "", 
    searchResults: []
}

const getters = {

}

const actions = {
    enterSearch({commit, dispatch}, payload) {
        commit('setSearch', payload)
        if(payload.length > 3) {
            dispatch('search')
        }
    },

    search({commit, state}) {
        requester.autocomplete(
            state.currentSearch, 
            r => commit('addResults', r))
    }
}

const mutations = {
    setSearch(state, payload) {
        state.currentSearch = payload
    },

    addResults(state, payload) {
        state.searchResults = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }