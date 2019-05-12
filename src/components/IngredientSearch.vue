<template>
    <div>
        <input type="text" :value="currentSearch" @input="search" />
        <ul>
            <li v-for="(result, index) in searchResults" v-bind:key="index">
                {{ result }}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'IngredientSearch', 
    computed: mapState('autocomplete', [
            'searchResults', 
            'currentSearch'
        ]
    ),
    methods: {
        search(e) {
            this.enterSearch(e.target.value);
        },
        ...mapActions('autocomplete', [
            'enterSearch'
        ]),
    }
}
</script>

<style>

</style>
