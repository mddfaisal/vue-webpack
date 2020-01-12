<template>
    <div class="counter">
        {{ number }}
        <a href="#" @click.prevent="increment">+</a>
        <h1>Faisal</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            number: 1
        }
    },
    methods:{
        increment(){
            this.number++
        }
    }
}
</script>

