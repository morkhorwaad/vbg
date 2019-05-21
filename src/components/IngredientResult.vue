<template>
    <div class="ingredient-result"> 
        <p> {{ ingredientName }}</p>
        <button v-for="(btn, idx) in buttons" v-bind:key="idx" @click="buttonClick(ingredientName, btn)">
            {{ btn }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'IngredientResult',
    props: {
        ingredientName: String, 
        buttons: Array, 
        buttonClick: Function
    }
}
</script>

<style>
</style>
