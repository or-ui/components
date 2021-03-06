<template>
    <div class="wildcard-input-component-wrapper">
        <div class="wrapper" @click="openSettingsPopup">
            <span>Wildcard component</span>
            <div class="component-wrapper">
                <span v-if="componentLogicError" class="logic-error">
                    Component can not be displayed because of the error in its logic
                </span>
                <editor @click.native.prevent
                        :template="input.data"
                        :schema="defaultStep.data"
                        :step="safeStep"
                        :steps="[safeStep]"
                        :readonly="true">
                </editor>
                <div class="cover"></div>
            </div>
        </div>

        <or-modal v-if="popupOpened"
                  ref="wildcardModal"
                  :title="popupHeader"
                  :dismissible="false"
                  class="wildcard-settings max-width max-height"
                  :contain-focus="false">
            <or-tabs class="flex" disable-ripple>
                <or-tab title="Component template">
                    <!-- component template-->
                    <or-code label="Component template"
                             v-model="input.data.componentTemplate"
                             mode='html'
                             help-text="Vue.js component template"
                             :adjust-to-height="true"></or-code>
                </or-tab>
                <or-tab title="Logic">
                    <!-- component logic -->
                    <or-code label="Component logic"
                             v-model="input.data.componentLogic"
                             help-text="Vue.js component logic"
                             :adjust-to-height="true"></or-code>
                </or-tab>
                <or-tab title="Styles">
                    <!-- component styles -->
                    <or-code label="Styles data"
                             v-model="input.data.componentOriginalStyles"
                             mode='scss'
                             help-text="styles data applied to your template"
                             :adjust-to-height="true"></or-code>
                </or-tab>
                <or-tab title="Form template">
                    <!-- component template -->
                    <or-code label="Step form template"
                             v-model="input.data.formTemplate"
                             mode='html'
                             help-text="Vue.js component template"
                             :adjust-to-height="true"></or-code>
                </or-tab>
                <or-tab title="Data">
                    <!-- data object -->
                    <or-code label="Step data"
                             mode="json"
                             v-model="input.data.data"
                             help-text="data object with initial values for the form"
                             :adjust-to-height="true"></or-code>
                </or-tab>
                <or-tab title="Validation">
                    <!-- validators object -->
                    <or-code label="Step data validation"
                             v-model="input.data.validators"
                             help-text="validation schema for every data element"
                             :adjust-to-height="true"></or-code>
                </or-tab>
                <or-tab title="Describe templates">
                    <!-- component to define list of templates -->
                    <declare-templates :templates.sync="input.data.wildcardTemplates"></declare-templates>
                </or-tab>
            </or-tabs>

            <div slot="footer">
                <or-button color="primary"
                           type="secondary"
                           @click.prevent="closeSettingsPopup">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import * as _ from 'lodash';
    import declareTemplates from './wildcard/declare_templates.vue';
    import {OrList} from 'or-ui';
    import Promise from 'bluebird';
    // import stepMessageBus from '../../../../../../step_message_bus';
    import {validators} from '_validators';
    import Vue from 'vue';
    import base from './_design_base';
    import editor from '../editors/wildcard.vue';

    export default {
        extends : base,

        components : {
            declareTemplates,
            editor
        },

        data () {
            return {
                componentLogicError : false,
                popupOpened         : false
            };
        },

        computed : {
            popupHeader () {
                return 'Wildcard Component Settings';
            },

            safeStep () {
                return this.step || {data : {}};
            }
        },

        methods : {
            openSettingsPopup () {
                this.popupOpened = true;
                this.$nextTick(() => {
                    this.$refs.wildcardModal.open();
                });
            },

            closeSettingsPopup () {
                // this.updateComponentRegistration();
                this.$refs.wildcardModal.close();
                this.popupOpened = false;
            }
        }
    };

    export const label = 'Wildcard';
    export const data = {
        formTemplate            : '<wildcard v-model="schema.stepVariable"></wildcard>',
        componentTemplate       : '<div><or-textbox name="wildcardInput" label="wildcard Input Label" v-model="computedValue"></or-textbox></div>',
        componentLogic          :
            "{\n  computed : {\n    computedValue : {\n      get () { return this.value; },\n      set (value) { this.$emit('input', value); }\n    }\n  },\n  props : {\n    value : {\n      type : String,\n      default : ''\n    }\n  }\n}",
        data                    : '{"stepVariable": "defaultValue"}',
        validators              : '{}',
        componentOriginalStyles : '',
        componentCompiledStyles : '',
        wildcardTemplates       : []
    };

    export const meta = {
        name    : 'formWildcard',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };

</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../scss/colors.scss';

    & {
        display: flex;
        flex-grow: 1;
        padding: 10px;
        .wrapper {
            .component-wrapper {
                position: relative;
                padding: 10px;

                .logic-error {
                    color: $danger;
                }

                .cover {
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    position: absolute;
                    border: 1px dashed #aaa;
                    cursor: pointer;
                    z-index: 2;
                }
            }

            &:hover {
                border-color: black;
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .wildcard-settings {
        .ui-tab {
            display: flex;
            .or-code {
                flex-grow: 1;
            }
        }
    }
</style>
