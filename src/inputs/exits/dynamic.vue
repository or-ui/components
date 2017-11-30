<template>
    <div class="wrapper">Dynamic exits</div>
</template>

<script>
    export default {
        props : ['input', 'index'],
        created () {
            this.updateIndex();
        },

        methods : {
            updateIndex () {
                this.input.data.index = this.index;
            }
        },

        watch : {
            index : {
                handler () {
                    this.updateIndex();
                },
                deep : true
            }
        }
    };

    export const label = '';
    export const data = {};

    export const meta = {
        name    : 'exitDynamic',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        display: inline-block;
        line-height: 40px;

        &:hover {
            border-color: black;
        }
    }
</style>
