<template>
    <div class="code-input-component-wrapper">
        <div class="or-code-wrapper wrapper" @click.prevent="$refs.codeSettings.open()">
            <editor :template="input.data" :step="defaultStep" :steps="[defaultStep]" :readonly="readonly">
            </editor>
        </div>

        <or-modal ref="codeSettings" :remove-close-button="true"
                  :title="popupHeader"
                  class="form-code-settings"
                  :contain-focus="false">
            <or-textbox name="label" label="Label" placeholder="label text" v-model="input.data.label"
                        help="input label text">
            </or-textbox>

            <or-textbox name="variable" label="Variable" placeholder="enter variable name"
                        v-model="input.data.variable"
                        help="name of variable in the code">
            </or-textbox>

            <or-textbox name="helpText" label="Help Text" placeholder="enter help text"
                        v-model="input.data.helpText"
                        help="input help text">
            </or-textbox>

            <or-code label="Default Value" v-model="input.data.defaultValue"
                     help="variable default value">
            </or-code>

            <or-textbox name="renderCondition" label="Conditional rendering" placeholder="rule"
                        v-model="input.data.renderCondition"
                        help="conditional rendering rule">
            </or-textbox>

            <h2>Validation</h2>
            <or-switch name="required" label="Required"
                       v-model="input.data.validateRequired">
            </or-switch>

            <or-switch name="required" label="Validate as Code"
                       v-model="validateCode">
            </or-switch>

            <or-switch name="required" label="Validate as Expression"
                       v-model="validateExpression">
            </or-switch>

            <div slot="footer">
                <or-button color="primary" type="secondary" @click.prevent="$refs.codeSettings.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import base from './_design_base.vue';
    import editor from './editors/code.vue';

    export default {
        extends : base,

        components : {
            editor
        },

        computed : {
            label () {
                return this.input.data.defaultValue || 'Code';
            },

            popupHeader () {
                return `${this.input.data.label} Code Settings`;
            },

            validateCode : {
                get () {
                    return this.input.data.validateCode;
                },

                set (value) {
                    this.input.data.validateCode = value;
                    if (value) {
                        this.input.data.validateExpression = false;
                    }
                }
            },

            validateExpression : {
                get () {
                    return this.input.data.validateExpression;
                },

                set (value) {
                    this.input.data.validateExpression = value;
                    if (value) {
                        this.input.data.validateCode = false;
                    }
                }
            }
        }
    };

    export const label = 'Code';
    export const data = {
        defaultValue       : '',
        label              : '',
        variable           : '',
        helpText           : '',
        renderCondition    : '',
        validateRequired   : false,
        validateExpression : false,
        validateCode       : false
    };

    export const meta = {
        name    : 'formCode',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };

</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .code-input-component-wrapper {
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
    .wrapper.or-code-wrapper {
        .ace_scroller {
            cursor: pointer;
        }
    }

    .form-code-settings {
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
