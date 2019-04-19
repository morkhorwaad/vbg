import { NUTRITION_FIELDS } from '../../constants.js'
import { getNutrientQuantity } from '../../common.js'

const state = {
  contents: []
  // { foodId: ddd, measure: xxxx, category: yyy, quantity: 2, name: zzz}
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
  }, 

  categories(state) {
    const bowlIngrByCategory = state.contents.reduce(
      (acc, cur) => {
        if(!acc[cur.category]) {
          acc[cur.category] = []
        }
        acc[cur.category].push(cur)
        return acc;
      },
      {}
    )

    return bowlIngrByCategory;
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

const EqualsIdAndCat = (foodId, category) => c => c.foodId == foodId && c.category == category;

const mutations = {
  incrementIngredientCount(state, { category, foodId }) {
    var toInc = state.contents.find(EqualsIdAndCat(foodId, category))
    if(toInc) {
      toInc.quantity++
    }
  }, 

  decrementIngredientCount(state, { category, foodId }) {
    var toDecIdx = state.contents.findIndex(EqualsIdAndCat(foodId, category))
    if(toDecIdx < 0) return;

    var toDec = state.contents[toDecIdx]

    if(toDec.quantity == 1) {
      state.contents.splice(toDecIdx, 1)
    }
    else {
      toDec.quantity--
    }
  },

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