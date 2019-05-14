import Vue from 'vue';
import requester from '../requester'
import { INGREDIENT_CATEGORIES, STARTING_INGREDIENTS } from '../../../constants.js';

const state = {
  labels: [],
  nutritionInfo: {}
}

const getters = {
  getIngredientsByCategory: state => category => {
    return getIngredientsInCategory(state.labels, category)
  }, 

  ingredientCategoryLists: state => {
    return INGREDIENT_CATEGORIES.reduce(
      (acc, cur) => {
        const ingrList = getIngredientsInCategory(state.labels, cur);
        acc.push({ name: cur, ingredients: ingrList});
        return acc;
      }, 
      []
    )
  }, 

  nutrientsByFoodId: state => foodId => state.nutritionInfo[foodId]
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
      requester.getFoodIds(
        STARTING_INGREDIENTS,
        ingredients => {
          commit('setInitialIngredients', ingredients)
          dispatch('getNutrientData', ingredients)
        }
      )
  },

  getNutrientData({commit}, ingredients) {
    requester.getNutritionInfo(
      ingredients, 
      info => commit('addNutritionInfo', info)
    )
  }
}

const mutations = {
  setInitialIngredients(state, payload) {
    state.labels = payload
  },

  addNutritionInfo(state, payload) {
    payload.forEach(n => {
      const { foodId, ingredientName, ...nutritionInfo } = n
      Vue.set(state.nutritionInfo, n.foodId, nutritionInfo)
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