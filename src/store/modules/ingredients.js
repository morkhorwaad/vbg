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
  getInitialIngredients: ({dispatch}) => dispatch('getIngredients', STARTING_INGREDIENTS),

  getIngredients({commit, dispatch}, ingredients) {
    requester.getFoodIds(
      ingredients,
      results => {
        commit('addIngredients', results)
        dispatch('getNutrientData', results)
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
  addIngredients(state, payload) {
    payload.forEach(ingredient => {
      const existingIng = state.labels.find(i => i.foodId == ingredient.foodId)
      if(!existingIng) {
        state.labels.push(ingredient)
      }
    })
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