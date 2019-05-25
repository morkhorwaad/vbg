<template>
  <section class="ingredient-list-container">
    <header>
      <h1>{{ name }}</h1>
    </header>
    <div class="ingredient-list">
      <Ingredient
        v-for="(item, index) in ingredients"
        v-bind:index="index"
        v-bind:name="item.ingredientName"
        v-bind:category="item.category"
        v-bind:foodId="item.foodId"
        v-bind:key="item.id"
      ></Ingredient>
    </div>
  </section>
</template>

<script>
import Ingredient from "./Ingredient.vue";

export default {
    name: 'IngredientList',
    props: {
        name: String, 
        ingredients: Array
    }, 
    components: {
        Ingredient
    }
}
</script>

<style lang="scss">
  .ingredient-list-container {
    margin-bottom: 5vh;
  }
  .ingredient-list {
    display: flex;
    flex-flow: row wrap;

    > * {
      margin-right: 10px;
    }
  }
  header {
    grid-column: 1/-1;
  }
</style>

