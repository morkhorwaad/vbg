<template>
    <div class="ingredient">
        <b> {{ name }} </b>
        <!-- <i> Calories: {{ ingredient.nutrients.ENERC_KCAL }}</i>
        <i> Carbs: {{ ingredient.nutrients.CHOCDF }}</i>
        <i> Fat: {{ ingredient.nutrients.FAT }}</i>
        <i> Protein: {{ ingredient.nutrients.PROCNT }}</i> -->
        <button>Add to bowl</button>
    </div>
</template>

<script>
export default {
    name: 'Ingredient',
    props: {
        name: String, 
        foodId: String
    }, 

}
</script>

<style>
    .ingredient {
        border: 1px solid black;
        display: flex;
        flex-flow: column nowrap;
    }

    button {
        margin-top: auto;
    }
</style>
