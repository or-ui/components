<template>
    <div>
        <div class="wrapper" @click="$refs.dataOutModal.open()">
            <editor :template="input.data" :step="defaultStep" :steps="[defaultStep]" :readonly="readonly">
            </editor>
        </div>

        <or-modal ref="dataOutModal" :remove-close-button="true" :title="popupHeader"
                  class="form-data-out-settings"
                  :contain-focus="false">
            <or-textbox name="label" label="Label" placeholder="label text" v-model="input.data.label"
                        help="data out label text">
            </or-textbox>

            <or-textbox name="placeholder" label="Placeholder" placeholder="enter placeholder"
                        v-model="input.data.placeholder" help="data out placeholder text">
            </or-textbox>

            <or-textbox name="helpText" label="Help Text" placeholder="enter help text"
                        v-model="input.data.helpText"
                        help="data out help text">
            </or-textbox>

            <or-textbox name="defaultName" label="Default Name"
                        v-model="input.data.defaultName"
                        help="variable default value">
            </or-textbox>

            <or-textbox name="renderCondition" label="Conditional rendering" placeholder="rule"
                        v-model="input.data.renderCondition"
                        help="conditional rendering rule"></or-textbox>

            <h2>Validation</h2>
            <or-switch name="required" label="Required"
                       v-model="input.data.validateRequired">
            </or-switch>

            <div slot="footer">
                <or-button color="primary" type="secondary"
                           @click.prevent="$refs.dataOutModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import base from './_design_base';
    import editor from './editors/data_out';

    export default {
        extends    : base,
        components : {editor},
        computed   : {
            popupHeader () {
                return `${this.input.data.label} Data Out Settings`;
            },

            label () {
                return this.input.data.defaultName || 'Data Out';
            }
        }
    };

    export const label = 'Merge field';
    export const data = {
        defaultValue     : '',
        defaultName      : '',
        renderCondition  : '',
        label            : 'Merge field',
        placeholder      : 'Merge field name',
        helpText         : 'Specify the name of the merge field where the step’s result will be stored and can be reused later in the flow.',
        validateRequired : false
    };

    export const meta = {
        name    : 'formDataOut',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .wrapper {
        padding: 0 10px;
        display: inline-block;
        flex-grow: 1;

        &:hover {
            border-color: black;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .wrapper.or-code-wrapper {
        .ace_scroller {
            cursor: pointer;
        }
    }

    .form-data-out-settings {
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
