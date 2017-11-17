<template>
    <h4>{{template.header}}</h4>
</template>

<script>
    export default {
        props: ['template']
    };
</script>


<style scoped lang="scss" rel="stylesheet/scss">
    h4 {
        line-height: 40px;
        margin-bottom: 0;
    }
</style>
