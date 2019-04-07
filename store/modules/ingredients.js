import edamam from '../../api/edamam.js'
import { INGREDIENT_CATEGORIES, STARTING_INGREDIENTS } from '../../constants.js'

const state = {
  ingredients: []
}

const getters = {
  getIngredientsByCategory: state => category => {
    return getIngredientsInCategory(state.ingredients, category)
  }, 

  ingredientCategoryLists: state => {
    return INGREDIENT_CATEGORIES.reduce(
      (acc, cur) => {
        const ingrList = getIngredientsInCategory(state.ingredients, cur);
        acc.push({ name: cur, ingredients: ingrList});
        return acc;
      }, 
      []
    )
  }
}

function getIngredientsInCategory(ingredients, category) {
  return ingredients.reduce(
    (acc, cur) => {
      if(cur.category == category) { acc.push(cur) }
      return acc;
    },
    []
  )
} 

const actions = {
  getInitialIngredients({commit, dispatch}) {
      edamam.getParsedIngredientInfo(
        STARTING_INGREDIENTS,
        ingredients => {
          commit('setInitialIngredients', ingredients)
          dispatch('getNutrientData', ingredients)
        }
      )
  },

  getNutrientData({commit}, ingredients) {
    edamam.getNutritionInfo(
      ingredients, 
      info => commit('setInitialIngredients', info)
    )
  }
}

const mutations = {
  setInitialIngredients(state, payload) {
    state.ingredients = payload
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }