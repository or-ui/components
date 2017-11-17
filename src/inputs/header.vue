<template>
    <div class="header-input">
        <div class="wrapper" @click="$refs.headerModal.open()">
            <editor :template="input.data"></editor>
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
    import editor from './editors/header';

    export default {
        components : {
            editor
        },

        props : ['input'],

        computed : {
            label () {
                return this.input.data.header || 'Header';
            },

            popupHeader () {
                return `${this.input.data.header} Header Settings`;
            },

            step () {
                return {data : {}};
            }
        }
    };

    export const label = 'Header';
    export const data = {
        header : ''
    };

    export const meta = {
        name    : 'formHeader',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .header-input {
        .wrapper {
            padding: 0 10px;
            display: flex;
            flex-grow: 1;
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
