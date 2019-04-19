<template>
    <section>
        <header>
            <h1> {{ categoryName }} </h1>
        </header>

        <BowlItem
                v-for="(item, index) in categoryContents"
                v-bind:index="index"
                v-bind:name="item.name"
                v-bind:foodId="item.foodId"
                v-bind:category="categoryName"
                v-bind:quantity="item.quantity"
                v-bind:key="item.id"
        ></BowlItem>
    </section>
</template>

<script>
import BowlItem from './BowlItem.vue'

export default {
    name: 'BowlCategory', 
    components: {
        BowlItem
    },
    props: {
        categoryName: String, 
        categoryContents: Array
    }
}
</script>

<style>

</style>
