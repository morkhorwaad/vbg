<template>
    <div class="ingredient">
        <b> {{ ingredientInfo.ingredientName }} </b>
        <i> Calories: {{ calories }}</i>
        <!-- <i> Carbs: {{ ingredient.nutrients.CHOCDF }}</i>
        <i> Fat: {{ ingredient.nutrients.FAT }}</i>
        <i> Protein: {{ ingredient.nutrients.PROCNT }}</i> -->
        <button>Add to bowl</button>
    </div>
</template>

<script>
export default {
    name: 'Ingredient',
    props: {
        ingredientInfo: Object
    }, 
    computed: {
        calories() {
            return this.ingredientInfo.totalNutrients == undefined
                ? 0
                : this.ingredientInfo.totalNutrients.ENERC_KCAL.quantity
        }
    }
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
