<template>
    <div class="switch-input-component-wrapper">
        <div class="wrapper" @click.stop="$refs.switchModal.open()"><editor :template="input.data" :schema="defaultStep.data" :step="defaultStep"
                    :steps="[defaultStep]"></editor></div>

        <or-modal ref="switchModal" :remove-close-button="true" :title="popupHeader" class="form-switch-settings"
                  :contain-focus="false">
            <or-textbox name="variable" label="Variable" placeholder="enter variable name" v-model="input.data.variable"
                        help="name of variable in the code">
            </or-textbox>

            <or-textbox name="label" label="Label" placeholder="enter label"
                        v-model="input.data.label" help="switch label text">
            </or-textbox>

            <or-switch name="labelLeft" label="Display label left of the switch"
                       v-model="input.data.labelLeft">
            </or-switch>

            <or-switch name="defaultValue" label="Default state" :label-left="true"
                       v-model="input.data.defaultValue">
            </or-switch>

            <or-textbox name="renderCondition" label="Conditional rendering" placeholder="rule"
                        v-model="input.data.renderCondition"
                        help="conditional rendering rule">
            </or-textbox>

            <div slot="footer">
                <or-button color="primary" type="secondary"
                           @click.prevent="$refs.switchModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import editor from '../editors/switch.vue';
    import base from './_design_base';

    export default {
        extends : base,

        components : {
            editor
        },

        computed : {
            popupHeader () {
                return `${this.input.data.label} Switch Settings`;
            },

            label () {
                return this.input.data.label || 'Switch';
            }
        }
    };

    export const label = 'Switch';
    export const data = {
        defaultValue    : false,
        label           : 'Switch',
        labelLeft       : false,
        variable        : '',
        renderCondition : ''
    };

    export const meta = {
        name    : 'formSwitch',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .switch-input-component-wrapper {
        padding-left: 10px;
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
    .form-switch-settings {
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
