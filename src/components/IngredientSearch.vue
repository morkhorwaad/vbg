<template>
    <div class="ingredient-search">
        <label for="ingredientSearch">Search for some ingredients</label>
        <input id="ingredientSearch" type="text" :value="currentSearch" @input="search" />
        <IngredientResult 
            v-for="(result, index) in searchResults" 
            v-bind:key="index"
            v-bind:ingredientName="result"
            v-bind:buttons="INGREDIENT_CATEGORIES"
            v-bind:buttonClick="addFoundIngredient">
        </IngredientResult>
    </div>
</template>

<script>
import { INGREDIENT_CATEGORIES } from '../../constants'
import IngredientResult from './IngredientResult.vue'
import { mapState, mapActions } from 'vuex'
export default {
    name: 'IngredientSearch', 
    computed: mapState('autocomplete', [
            'searchResults', 
            'currentSearch'
        ]
    ),
    data() {
        return { INGREDIENT_CATEGORIES }
    },
    methods: {
        search(e) {
            this.enterSearch(e.target.value);
        },
        addFoundIngredient(name, category) {
            const newIngredient = { name, category }
            this.getIngredients([newIngredient])
        },
        ...mapActions('autocomplete', [
            'enterSearch'
        ]),
        ...mapActions('ingredients', [
            'getIngredients'
        ])
    },
    components: {
        IngredientResult
    }
}
</script>

<style lang="scss">
    .ingredient-search {
        display: flex;
        flex-flow: column nowrap;
        max-width: 250px;
    }
</style>
