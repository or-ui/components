<template>
    <or-textbox class="wrapper" name="label" placeholder="enter label" v-model="exit.data.label"></or-textbox>
</template>

<script>
    import uuid from 'uuid';

    export default {
        props : ['exit', 'index'],
        created () {
            const exit = this.exit.data;
            if (!exit.label && exit.id) {
                // set exit label, if it's legacy one
                exit.label = exit.id;
            }
            if (!exit.id) {
                exit.id = uuid.v4();
            }
        }
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        display: inline-block;

        &:hover {
            border-color: black;
        }
    }
</style>
