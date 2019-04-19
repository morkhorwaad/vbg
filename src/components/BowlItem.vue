<template>
    <div>
        <p> {{ name }} </p>
        <p> {{ quantity }} </p>
        <div class="row">
            <button v-on:click="increment">add</button>
            <button v-on:click="decrement">remove</button>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'BowlItem', 
    props: {
        name: String, 
        foodId: String, 
        quantity: Number, 
        category: String
    }, 
    methods: {
        ...mapMutations({
            incrementIngrCount: 'bowl/incrementIngredientCount', 
            decrementIngrCount: 'bowl/decrementIngredientCount'
        }), 
        increment() {
            const payload = { category: this.category, foodId: this.foodId }
            this.incrementIngrCount(payload)
        }, 
        decrement() {
            const payload = { category: this.category, foodId: this.foodId }
            this.decrementIngrCount(payload)
        }
    }
}
</script>

<style>
    .row {
        display: flex;
        flex-flow: row nowrap;
    }
</style>
