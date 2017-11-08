<template>
    <div class="textbox-input-component-wrapper">
        <div class="wrapper" @click="$refs.textboxModal.open()">
            <or-text-expression :label="label" :help-text="input.data.helpText" :placeholder="input.data.placeholder"
                                :value="input.data.defaultValue" :multi-line="input.data.multiline"
                                :readonly="true"></or-text-expression>
        </div>

        <or-modal ref="textboxModal" :remove-close-button="true"
                  :title="popupHeader"
                  class="form-text-box-settings"
                  :contain-focus="false">
            <or-textbox name="label" label="Label" placeholder="label text" v-model="input.data.label"
                        help="input label text">
            </or-textbox>

            <or-textbox name="variable" label="Variable" placeholder="enter variable name" v-model="input.data.variable"
                        help="name of variable in the code"></or-textbox>

            <or-textbox name="placeholder" label="Placeholder" placeholder="enter placeholder"
                        v-model="input.data.placeholder" help="input placeholder text"></or-textbox>

            <or-textbox name="helpText" label="Help Text" placeholder="enter help text" v-model="input.data.helpText"
                        help="input help text"></or-textbox>

            <or-text-expression label="Default Value" placeholder="enter default value"
                                v-model="input.data.defaultValue" :disable-variables="true"
                                help-text="variable default value"></or-text-expression>

            <or-switch name="multiline" label="Multi-line" v-model="input.data.multiline"></or-switch>

            <or-textbox name="renderCondition" label="Conditional rendering" placeholder="rule"
                        v-model="input.data.renderCondition"
                        help="conditional rendering rule"></or-textbox>

            <h2>Validation</h2>
            <or-switch name="required" label="Required" v-model="input.data.validateRequired"></or-switch>

            <div slot="footer">
                <or-button color="primary"
                           type="secondary"
                           @click.prevent="$refs.textboxModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script type="text/babel">
    export default {
        props : ['input'],

        computed : {
            popupHeader () {
                return `${this.input.data.label || this.input.data.placeholder} Text box Settings`;
            },

            label () {
                return this.input.data.label || `Text box ${this.input.data.multiline ? '(Multi-line)' : '(Single line)'}`;
            }
        }
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .textbox-input-component-wrapper {
        padding: 0 10px;
        display: inline-block;
        flex-grow: 1;
        .wrapper {
            &:hover {
                border-color: black;
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .form-text-box-settings {
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
