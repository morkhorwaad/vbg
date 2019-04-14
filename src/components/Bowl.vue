<template>
    <section>
        <header>
            <h1>Current Bowl:</h1>
        </header>

        <BowlItem
            v-for="(item, index) in bowlContents"
            v-bind:index="index"
            v-bind:name="item.name"
            v-bind:quantity="item.quantity"
            v-bind:key="item.id"
      ></BowlItem>

      <h2>Totals:</h2>
      <p>Calories: {{ totalCalories }} </p>
      <!-- <p>Protein: {{ totalProtein }} </p>
      <p>Carbs: {{ totalCarbs }} </p>
      <p>Fat: {{ totalFat }} </p> -->
    </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BowlItem from './BowlItem'
import { NUTRITION_FIELDS } from '../../constants.js'

export default {
    name: 'Bowl', 
    components: {
        BowlItem
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
            totalNutrients: 'bowl/totalNutrients'
        }), 
        totalCalories() {
            return parseInt(this.totalNutrients[this.NUTRITION_FIELDS.CALORIES.name]);
        }
    }
}
</script>

<style>

</style>
