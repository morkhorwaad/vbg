<template>
    <section>
        <header>
            <h1>Current Bowl:</h1>
        </header>

        <BowlCategory
            v-for="(item, index) in categories"
            v-bind:index="index"
            v-bind:categoryName="item.name"
            v-bind:categoryContents="item.contents"
            v-bind:key="item.id"
      ></BowlCategory>

      <h2>Totals:</h2>
      <p>Calories: {{ totalCalories }} </p>
      <!-- <p>Protein: {{ totalProtein }} </p>
      <p>Carbs: {{ totalCarbs }} </p>
      <p>Fat: {{ totalFat }} </p> -->
    </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BowlCategory from './BowlCategory'
import { NUTRITION_FIELDS } from '../../constants.js'

export default {
    name: 'Bowl', 
    components: {
        BowlCategory
    },
    data() {
        return {
            NUTRITION_FIELDS
        }
    },
    computed: {
        ...mapState({
            bowlContents: state => state.bowl.contents
        }), 
        ...mapGetters({
            totalNutrients: 'bowl/totalNutrients', 
            bowlCategories: 'bowl/categories'
        }), 
        categories() {
            return this.bowlCategories == undefined || this.bowlCategories == {}
                ? []
                : Object.keys(this.bowlCategories).map(c => {
                    return { name: c, contents: this.bowlCategories[c] }
                })
        },
        totalCalories() {
            return parseInt(this.totalNutrients[this.NUTRITION_FIELDS.CALORIES.name]);
        }
    }
}
</script>

<style>

</style>
