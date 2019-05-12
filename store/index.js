import Vue from 'vue'
import Vuex from 'vuex'

import ingredients from './modules/ingredients'
import bowl from './modules/bowl'
import autocomplete from './modules/autocomplete'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
      ingredients,
      bowl,
      autocomplete
  },
  strict: debug
})