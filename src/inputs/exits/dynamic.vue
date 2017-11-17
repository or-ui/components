<template>
    <div class="wrapper">Dynamic exits</div>
</template>

<script>
    export default {
        props : ['exit', 'index'],
        created () {
            this.updateIndex();
        },

        methods : {
            updateIndex () {
                this.exit.data.index = this.index;
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
