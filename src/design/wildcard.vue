<template>
    <div class="wildcard-input-component-wrapper">
        <div class="wrapper" @click="openSettingsPopup">
            <span>Wildcard component</span>
            <div class="component-wrapper">
                <span v-if="componentLogicError" class="logic-error">
                    Component can not be displayed because of the error in its logic
                </span>
                <component v-else :is="componentTempName" @click.native.prevent></component>
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
    import later from 'later';
    import moment from 'moment-timezone';
    import {OrList} from 'or-ui';
    import Promise from 'bluebird';
    import registerComponent from '../../../../../../helpers/register_component';
    import stepMessageBus from '../../../../../../step_message_bus';
    import timestring from 'timestring';
    import uuid from 'uuid';
    import {validators} from '../../../../../../validators';
    import Vue from 'vue';
    import wildcard from '../../../../../../mixins/generate_step_form/wildcard';

    const componentRandomNamePartLength = 16;

    export default {
        props : ['input'],

        components : {
            declareTemplates
        },

        data () {
            return {
                componentTempName   : '',
                componentLogicError : false,
                popupOpened         : false
            };
        },

        created () {
            if (!this.input.data.componentName) {
                this.input.data.componentName = this.createComponentName();
            }
            if (!this.input.data.formTemplate) {
                this.input.data.formTemplate = `<${this.input.data.componentName} v-model="schema.stepVariable"></${this.input.data.componentName}>`;
            }
            this.updateComponentRegistration();
        },

        beforeDestroy () {
            if (this.componentTempName) {
                registerComponent.unregister(this.componentTempName);
            }
        },

        computed : {
            popupHeader () {
                return 'Wildcard Component Settings';
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
                this.updateComponentRegistration();
                this.$refs.wildcardModal.close();
                this.popupOpened = false;
            },

            createComponentName () {
                const letters = 'abcdefghijklmnopqrstuvwxyz';
                const id = _.sampleSize(letters, componentRandomNamePartLength).join('');
                return `or-wildcard-${id}`;
            },

            updateComponentRegistration () {
                const newComponentName = this.createComponentName();

                const libs = {
                    uuid,
                    later,
                    moment,
                    timestring
                };
                const components = {
                    list : Vue.extend(OrList)
                };

                const args = {_, Vue, Promise, components, uuid, libs, eventHub : stepMessageBus, validators};

                registerComponent.register({
                    name        : newComponentName,
                    template    : `<div class="${newComponentName}">${this.input.data.componentTemplate}</div>`,
                    code        : wildcard.generateComponentLogic(this.input.data.componentLogic, this.input.data.wildcardTemplates),
                    style       : this.input.data.componentOriginalStyles,
                    noWrapStyle : true,
                    args
                })
                    .then(() => {
                        if (this.componentTempName) {
                            registerComponent.unregister(this.componentTempName);
                        }
                        this.componentTempName = newComponentName;
                        this.componentLogicError = false;
                    })
                    .catch(() => {
                        this.componentLogicError = true;
                    });
            }
        }
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../../../../../../scss/colors';

    .wildcard-input-component-wrapper {
        display: inline-block;
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
