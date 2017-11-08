<template>
<div>
    <div class="wrapper" @click="$refs.headerModal.open()"><h4>{{label}}</h4></div>

    <or-modal ref="headerModal" :remove-close-button="true"
              :title="popupHeader"
              class="form-header-list"
              :contain-focus="false">
        <or-textbox name="header" label="Text" placeholder="header text" v-model="input.data.header"
                    help="this value will be displayed as a header text in a form"></or-textbox>

        <div slot="footer">
            <or-button color="default" @click.prevent="$refs.headerModal.close()">Close</or-button>
        </div>
    </or-modal>
</div>
</template>

<script>
    export default {
        props : ['input'],

        computed : {
            popupHeader () {
                return `${this.input.data.header} Header Settings`;
            },

            label () {
                return this.input.data.header || 'Header';
            }
        }
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        padding: 0 10px;
        display: inline-block;
        flex-grow: 1;

        h4 {
            line-height: 40px;
            margin-bottom: 0;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .form-header-settings {
        .ui-modal__container {
            display: flex;
            flex-direction: column;
            max-height: 90vh;

            .ui-modal__header {
                flex-shrink: 0;
            }
            .ui-modal__body {
                flex-grow: 1;
                overflow-y: auto;
            }
            .ui-modal__footer {
                flex-shrink: 0;
                margin-top: 0;
            }
        }
    }
</style>
