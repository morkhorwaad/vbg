import Vue from 'vue'
import Vuex from 'vuex'

import ingredients from './modules/ingredients'
import bowl from './modules/bowl'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
      ingredients,
      bowl
  },
  strict: debug
})