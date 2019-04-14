<template>
    <div>
        <p> {{ name }} </p>
        <p> {{ quantity }} </p>
    </div>
</template>

<script>
export default {
    name: 'BowlItem', 
    props: {
        name: String, 
        quantity: Number
    }
}
</script>

<style>

</style>
