<template>
    <or-textbox class="wrapper" name="label" placeholder="enter label" v-model="input.data.label"></or-textbox>
</template>

<script>
    import uuid from 'uuid';

    export default {
        props : ['input', 'index'],
        created () {
            const exit = this.input.data;
            if (!exit.label && exit.id) {
                // set exit label, if it's legacy one
                exit.label = exit.id;
            }
            if (!exit.id) {
                exit.id = uuid.v4();
            }
        }
    };

    export const label = '';
    export const data = {};

    export const meta = {
        name    : 'exitStatic',
        type    : 'onereach-studio-form-input',
        version : '1.0'
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
