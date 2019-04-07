import edamam from '../../api/edamam.js'
import { ingredientCategories } from '../../constants.js'

const state = {
  Base: [], 
  Veggies: [], 
  Protein: [], 
  Dressing: []
}

const getters = {
  getIngredientDisplayInfoByType: state => type => {
    return state[type].map(i => {
      return { ingredientName: i.ingredientName, foodId: i.foodId }
    })
  }
}

const actions = {
  getInitialIngredients({commit, dispatch}) {
    Object.values(ingredientCategories).forEach(category => {
      edamam.getParsedIngredientInfo(category.starter, ingredients => {
        commit('addInitialIngredients', {type: category.name, ingredients})
        dispatch('getNutrientData', { category: category.name, ingredients })
      })
    })
  },

  getNutrientData({commit}, { category, ingredients }) {
      edamam.getNutritionInfo(
        ingredients.map(i => i.foodId), 
        info => commit('addNutritionInfo', {type: category, info }))
  }
}

const mutations = {
  addInitialIngredients(state, payload) {
    if(!payload.type) return;
    state[payload.type] = [ ...state[payload.type], ...payload.ingredients]
  }, 

  addNutritionInfo(state, payload) {
    // for each of the returned nutrition objects, put it in the state
    payload.info.forEach(n => {
      const ingrIdx = state[payload.type].findIndex(i => i.foodId == n.foodId)
      if(ingrIdx < 0) return;
      const newIngr = Object.assign(state[payload.type][ingrIdx], n)
      state[payload.type].splice(ingrIdx, 1, newIngr)
    })
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }