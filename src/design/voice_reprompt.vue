<template>
    <div class="voice-reprompt-input-component-wrapper">
        <div class="wrapper" @click="$refs.voiceRepromptModal.open()">
            <span>Voice reprompt</span>
            <div class="component-wrapper">
                <component
                    :is="componentTempName"
                    :label="input.data.label"
                    readonly
                    v-model="exampleValue"
                    :default-delay="defaultDelayNumber"
                    :start-text="input.data.startText"
                    :end-text="input.data.endText"
                    :max-sections="maxSections">
                </component>
                <div class="cover"></div>
            </div>
        </div>

        <or-modal ref="voiceRepromptModal" :remove-close-button="true"
                  :title="popupHeader"
                  class="form-text-reprompt-settings"
                  :contain-focus="false"
                  @close="handleModalClose">
            <or-textbox name="label" label="Label" placeholder="label text"
                        v-model="input.data.label"
                        help="input label text">
            </or-textbox>

            <or-textbox name="variable" label="Variable" placeholder="enter variable name"
                        v-model="input.data.variable"
                        help="name of variable in the code"></or-textbox>

            <or-textbox name="noReplyDelayVariable" label="No reply delay variable" placeholder="enter variable name"
                        v-model="input.data.noReplyDelayVariable"
                        help="name of variable in the code">
            </or-textbox>

            <or-textbox name="placeholder" label="Placeholder" placeholder="enter placeholder"
                        v-model="input.data.placeholder"
                        help="input placeholder text">
            </or-textbox>

            <or-voice-reprompt-bubble label="Default Message" placeholder="enter default reprompt message"
                                      :repeat-message="input.data.repeatMessage"
                                      v-model="input.data.defaultValue">
            </or-voice-reprompt-bubble>

            <or-textbox name="Default_Reprompt_Delay" label="Default reprompt delay" placeholder="enter number"
                        validation-rules="integer|max:60|min:0"
                        v-model="input.data.defaultDelay"
                        help-text="input default reprompt delay in seconds (maximum 60)">
            </or-textbox>

            <or-textbox name="Maximum_Number_of_Reprompt_Attempts" label="Maximum number of reprompt attempts"
                        placeholder="enter number"
                        v-model="input.data.maxSections" validation-rules="integer|min:0"
                        help-text="input maximum number of reprompt attempts">
            </or-textbox>

            <or-textbox name="startText" label="Wait for reply for label text" placeholder="enter text"
                        v-model="input.data.startText"
                        help="input Wait for reply for label text">
            </or-textbox>

            <or-textbox name="endText" label="Go down the no reply path label text" placeholder="enter text"
                        v-model="input.data.endText"
                        help="input Go down the no reply path label text">
            </or-textbox>

            <or-textbox name="repeatMessage" label="Repeat the first message after the reprompt label text"
                        placeholder="enter text"
                        v-model="input.data.repeatMessage"
                        help="input Repeat the first message after the reprompt label text">
            </or-textbox>

            <h2>Advanced</h2>
            <or-textbox name="renderCondition" label="Conditional rendering" placeholder="rule"
                        v-model="input.data.renderCondition"
                        help="conditional rendering rule">
            </or-textbox>

            <div slot="footer">
                <or-button color="primary"
                           type="secondary"
                           @click.prevent="$refs.voiceRepromptModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import * as _ from 'lodash';
    import later from 'later';
    import moment from 'moment-timezone';
    import Promise from 'bluebird';
    import registerComponent from '../../../../../../helpers/register_component';
    import stepMessageBus from '../../../../../../step_message_bus';
    import timestring from 'timestring';
    import uuid from 'uuid';
    import voiceRepromptCompiler from '../../../../../../mixins/generate_step_form/voice_reprompt';
    import Vue from 'vue';

    const componentRandomNamePartLength = 16;
    const DEFAULT_DELAY = 15;
    const DEFAULT_MAX_SECTIONS = 3;

    export default {
        props : ['input'],

        data () {
            return {
                componentTempName : ''
            };
        },

        created () {
            if (!this.input.data.componentName) {
                this.input.data.componentName = this.createComponentName();
            }
            this.updateComponentRegistration();
        },

        computed : {
            defaultDelayNumber () {
                return parseInt(this.input.data.defaultDelay, 10) || DEFAULT_DELAY;
            },

            popupHeader () {
                return 'Voice Reprompt Component Settings';
            },

            exampleValue () {
                return [{
                    time : this.defaultDelayNumber,
                    item : this.input.data.defaultValue
                }];
            },

            maxSections () {
                return parseInt(this.input.data.maxSections, 10) || DEFAULT_MAX_SECTIONS;
            }
        },

        methods : {
            handleModalClose () {
                this.updateComponentRegistration();
            },

            createComponentName () {
                const letters = 'abcdefghijklmnopqrstuvwxyz';
                const id = _.sampleSize(letters, componentRandomNamePartLength).join('');
                return `or-voice-reprompt-${id}`;
            },

            updateComponentRegistration () {
                const newComponentName = this.createComponentName();
                const componentCode = voiceRepromptCompiler.getComponent(this.input.data);

                const libs = {
                    uuid,
                    later,
                    moment,
                    timestring
                };
                const components = {};
                const args = {_, Vue, Promise, components, uuid, libs, eventHub : stepMessageBus};

                registerComponent.register({
                    name     : newComponentName,
                    template : '',
                    code     : componentCode,
                    style    : '',
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

    .voice-reprompt-input-component-wrapper {
        display: inline-block;
        flex-grow: 1;
        padding: 10px;
        .wrapper {
            .component-wrapper {
                position: relative;
                padding: 10px;

                .cover {
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    position: absolute;
                }
            }

            &:hover {
                border-color: black;
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .form-text-reprompt-settings {
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
