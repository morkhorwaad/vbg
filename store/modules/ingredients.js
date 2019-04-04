import edamam from '../../api/edamam.js'
import { ingredientCategories } from '../../constants.js'

const state = {
  Base: [], 
  Veggies: [], 
  Protein: [], 
  Dressing: []
}

const getters = {}

const actions = {
  getInitialIngredients({commit}) {
    Object.values(ingredientCategories).forEach(category => {
      edamam.getIngredientInfo(category.starter, ingredients => commit('addIngredients', {type: category.name, ingredients}))
    })
  }
}

const mutations = {
  addIngredient(state, payload) {
    if(!payload.type) return;
    state[payload.type] = [...state[payload.type], payload.ingredient]
  },

  addIngredients(state, payload) {
    if(!payload.type) return;
    state[payload.type] = [ ...state[payload.type], ...payload.ingredients]
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }