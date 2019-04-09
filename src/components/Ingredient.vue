<template>
    <div class="ingredient">
        <b> {{ name.toUpperCase() }} </b>
        <i>{{ calorieString }}</i>
        <i>{{ carbString }} carbs</i>
        <i>{{ fatString }} fat</i>
        <i>{{ proteinString }} protein</i>
        <button>Add to bowl</button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

function getNutrientLabel(nutrients, field) {
    if(nutrients == undefined || nutrients.totalNutrients == undefined)
        return 0;
    
    return `${parseInt(nutrients.totalNutrients[field].quantity)}${nutrients.totalNutrients[field].unit}`
}

export default {
    name: 'Ingredient',
    props: {
        name: String, 
        category: String,
        foodId: String
    },
    computed: {
        ...mapState({
            nutrients(state) { 
                var nutrients = state.ingredients.nutritionInfo[this.foodId] 
                return nutrients == undefined ? {} : nutrients;
            }
        }),
        calorieString() { return getNutrientLabel(this.nutrients, "ENERC_KCAL") },
        carbString() { return getNutrientLabel(this.nutrients, "CHOCDF") },
        fatString() { return getNutrientLabel(this.nutrients, "FAT") },
        proteinString() { return getNutrientLabel(this.nutrients, "PROCNT") },
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
