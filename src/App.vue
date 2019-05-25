<template>
  <main>
    <Header />
    <section class="ingredient-selection">
      <IngredientSearch/>
      <IngredientList 
        v-for="(item, index) in ingredientCategories"
        v-bind:name="item.name"
        v-bind:ingredients="item.ingredients"
        v-bind:key="`ingredientlist-${index}`"
      ></IngredientList>
    </section>
    <aside>
      <Bowl />
    </aside>
  </main>
</template>

<script>
import IngredientList from "./components/IngredientList.vue"
import IngredientSearch from "./components/IngredientSearch.vue"
import Header from "./components/Header.vue"
import Bowl from './components/Bowl.vue'
import { INGREDIENT_CATEGORIES } from "../constants.js"
import { mapGetters } from 'vuex'

export default {
  name: "app",
  components: {
    Header,
    IngredientSearch,
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
</style>
