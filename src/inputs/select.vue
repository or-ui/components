<template>
    <div class="select-list-component-wrapper">
        <div class="wrapper" @click="$refs.selectModal.open()">
            <editor :template="input.data"
                    :schema="defaultStep.data"
                    :step="defaultStep"
                    :steps="[defaultStep]"
                    :readonly="readonly">
            </editor>
            <!--
                        <or-select v-if="input.data.multiple" :name="input.data.variable" :label="input.data.label"
                                   :placeholder="placeholder" :options="options" v-model="defaultArrayValue" :disabled="true"></or-select>
                        <or-select v-else :name="input.data.variable" :label="input.data.label"
                                   :placeholder="placeholder" :options="options" v-model="input.data.defaultValue"
                                   :disabled="true"></or-select> -->
        </div>

        <or-modal ref="selectModal" :remove-close-button="true"
                  class="max-height form-select-settings"
                  :title="popupHeader"
                  :contain-focus="false">
            <div class="modal-main">
                <or-textbox name="label" label="Label" placeholder="label text" v-model="input.data.label"
                            help="dropdown label text">
                </or-textbox>

                <or-textbox name="variable" label="Variable" placeholder="variable name" v-model="input.data.variable"
                            help="name of variable in the code">
                </or-textbox>

                <or-textbox name="placeholder" label="Placeholder" placeholder="placeholder text"
                            v-model="input.data.placeholder" help="dropdown placeholder text">
                </or-textbox>

                <or-textbox name="helpText" label="Help Text" placeholder="help text" v-model="input.data.helpText"
                            help="dropdown help text"></or-textbox>

                <or-select v-if="input.data.multiple" name="defaultValue" label="Default Value"
                           placeholder="select default value"
                           v-model="input.data.defaultArrayValue" :options="options"
                           help="variable default value" :multiple="true">
                </or-select>

                <or-select v-else name="defaultValue" label="Default Value"
                           placeholder="select default value"
                           v-model="input.data.defaultValue" :options="options"
                           help="variable default value">
                </or-select>

                <or-switch name="multiple" label="Multiple" v-model="input.data.multiple"></or-switch>

                <or-textbox name="renderCondition" label="Conditional rendering" placeholder="rule"
                            v-model="input.data.renderCondition"
                            help="conditional rendering rule">
                </or-textbox>

                <h2>Validation</h2>
                <or-switch name="required" label="Required" v-model="input.data.validateRequired"></or-switch>

                <select-options label="Options" type="selectOption" v-model="input.data.options"></select-options>
            </div>

            <div slot="footer">
                <or-button color="primary"
                           type="secondary"
                           @click.prevent="$refs.selectModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {OrList} from 'or-ui';
    import selectOption from './select/option';
    import Vue from 'vue';

    import base from './_design_base';
    import editor from '../editors/select';

    export default {
        extends : base,

        components : {
            editor,
            selectOptions : {
                extends : OrList,

                components : {
                    selectOption
                },

                methods : {
                    getNewItem () {
                        return {
                            value : '',
                            label : ''
                        };
                    }
                }
            }
        },

        data () {
            return {
                show : false
            };
        },

        computed : {
            defaultStep () {
                return this.step || {
                    data : {
                        [this.input.data.variable] : this.input.data.multiple ? this.defaultArrayValue : this.input.data.defaultValue
                    }
                };
            },

            popupHeader () {
                return `${this.input.data.label || this.input.data.placeholder} Drop down Settings`;
            },

            placeholder () {
                return this.input.data.placeholder || 'Select Field (Drop down)';
            },

            options () {
                return this.input.data.options;
            },

            defaultArrayValue () {
                return _.map(this.input.data.defaultArrayValue, value => _.find(this.input.data.options, {value}).text).join(', '); // || this.placeholder;
            }
        },

        watch : {
            'input.data.options' : {
                handler () {
                    const arrayValue = this.input.data.defaultArrayValue;
                    if (_.isArray(arrayValue)) {
                        this.input.data.defaultArrayValue = _.filter(arrayValue, value => !_.isUndefined(_.find(this.input.data.options, {value})));
                    }

                    if (!_.find(this.input.data.options, {value : this.input.data.defaultValue})) {
                        this.input.data.defaultValue = '';
                    }
                },
                deep : true
            }
        }
    };

    export const label = 'Drop down';
    export const data = {
        defaultArrayValue : [],
        defaultValue      : '',
        label             : '',
        multiple          : false,
        options           : [],
        placeholder       : '',
        helpText          : '',
        variable          : '',
        renderCondition   : '',
        validateRequired  : false
    };

    export const meta = {
        name    : 'formSelect',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .select-list-component-wrapper {
        padding: 0 10px;
        display: inline-block;
        flex-grow: 1;
        .wrapper {

        }

        .modal-main {
            overflow-y: auto;
            padding: 0 24px;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .form-select-settings {
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
