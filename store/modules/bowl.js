import { NUTRITION_FIELDS } from '../../constants.js'
import { getNutrientQuantity } from '../../common.js'

const state = {
  contents: []
  // { foodId: ddd, measure: xxxx, category: yyy, quantity: 2}
}

const getters = {
  totalNutrients(state, getters, rootState) {
    // iterate over items in bowl
    // look up nutrition information
    const nutrients = state.contents.reduce(
      (acc, cur) => {
        const nInfo = rootState.ingredients.nutritionInfo[cur.foodId];
        Object.values(NUTRITION_FIELDS).forEach(n => acc[n.name] += cur.quantity * getNutrientQuantity(nInfo, n.field))
        return acc;
      }, 
      Object.values(NUTRITION_FIELDS).reduce((acc, cur) => Object.assign(acc, {[cur.name]: 0}), {})
    )

    return nutrients;
    // calculate nutrition quantity based on measure
    // aggregate
  }
}

const actions = {
  addToBowl({commit, state}, payload) {
    console.log("Adding " + payload.name + " to category " + payload.category)
    // check to see if the category exists
    if(state.contents.find(c => c.foodId == payload.foodId)) {
      commit('incrementIngredientCount', payload)
    } else {
      commit('addIngredient', payload)
    }
  }
}

const mutations = {
  incrementIngredientCount(state, { foodId }) {
    var toInc = state.contents.find(c => c.foodId == foodId)
    toInc.quantity++
  }, 

  // I kinda don't like that these are bundled, but at the same time, 
  // there should never be a state where there is a foodId in contents
  // that doesn't have any measures attached to it. 
  addIngredient(state, { foodId, category, name }) {
    const newIngr = {
      foodId, 
      name,
      category, 
      quantity: 1
    }
    state.contents.push(newIngr)
  }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }