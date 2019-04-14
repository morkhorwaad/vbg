<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <IngredientList 
      v-for="(item, index) in ingredientCategories"
      v-bind:name="item.name"
      v-bind:ingredients="item.ingredients"
      v-bind:key="`ingredientlist-${index}`"
    ></IngredientList>
    <Bowl />
  </div>
</template>

<script>
import IngredientList from "./components/IngredientList.vue"
import Bowl from './components/Bowl.vue'
import { INGREDIENT_CATEGORIES } from "../constants.js"
import { mapGetters } from 'vuex'

export default {
  name: "app",
  components: {
    IngredientList, 
    Bowl
  }, 
  computed: {
    ...mapGetters({
      ingredientCategories: 'ingredients/ingredientCategoryLists'
    })
  },
  created() {
    this.$store.dispatch('ingredients/getInitialIngredients')
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
