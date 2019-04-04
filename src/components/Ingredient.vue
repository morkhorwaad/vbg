<template>
    <div class="ingredient">
        <b> {{name}} </b>
        <i> {{ calorieCount }}</i>
        <button>Add to bowl</button>
    </div>
</template>

<script>
export default {
    name: 'Ingredient',
    props: {
        name: String, 
        calorieCount: Number 
    }
}
</script>

<style>
    .ingredient {
        width: 100px;
        height: 100px;
        border: 1px solid black;
        display: flex;
        flex-flow: column nowrap;
    }

    button {
        margin-top: auto;
    }
</style>
