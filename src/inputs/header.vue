<template>
    <div class="header-input">
        <div class="wrapper" @click="$refs.headerModal.open()">
            <editor :template="input.data" :schema="defaultStep.data"></editor>
        </div>

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
    import base from './_design_base.vue';
    import editor from '../editors/header';

    export default {
        extends    : base,
        components : {
            editor
        },

        computed : {
            label () {
                return this.input.data.header || 'Header';
            },

            popupHeader () {
                return `${this.input.data.header} Header Settings`;
            }
        }
    };

    export const label = 'Header';
    export const data = {
        header : 'Header'
    };

    export const meta = {
        name    : 'formHeader',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    div {
        display: flex;
        flex-grow: 1;
    }

    .header-input {
        .wrapper {
            padding: 0 10px;
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
