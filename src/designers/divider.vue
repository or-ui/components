<template>
    <div class="wrapper" @click="show = true" v-html="hr"></div>
</template>

<script>
    export default {
        props : ['input'],

        computed : {
            hr () {
                return '<div style="border-bottom:2px solid #eee; margin:20px 0;"></div>';
            }
        }
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        padding: 0 10px;
        display: inline-block;
        flex-grow: 1;
    }
</style>
