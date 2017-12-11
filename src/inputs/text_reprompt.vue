<template>
    <div class="text-reprompt-input-component-wrapper">
        <div class="wrapper" @click="$refs.textRepromptModal.open()">
            <span>Text reprompt</span>
            <div class="component-wrapper">
                <editor :template="input.data"
                        :schema="defaultStep.data"
                        :step="defaultStep"
                        :steps="[defaultStep]"
                        :readonly="true">
                </editor>
                <div class="cover"></div>
            </div>
        </div>

        <or-modal ref="textRepromptModal" :remove-close-button="true"
                  :title="popupHeader"
                  class="form-text-reprompt-settings"
                  :contain-focus="false">
            <or-textbox name="label" label="Label" placeholder="label text"
                        v-model="input.data.label"
                        help="input label text">
            </or-textbox>

            <or-textbox name="variable" label="Variable" placeholder="enter variable name"
                        v-model="input.data.variable"
                        help="name of variable in the code">
            </or-textbox>

            <or-textbox name="noReplyDelayVariable" label="No reply delay variable" placeholder="enter variable name"
                        v-model="input.data.noReplyDelayVariable"
                        help="name of variable in the code">
            </or-textbox>

            <or-textbox name="placeholder" label="Placeholder" placeholder="enter placeholder"
                        v-model="input.data.placeholder" help="input placeholder text">
            </or-textbox>

            <or-text-reprompt
                label="Default Value"
                :placeholder="input.data.placeholder"
                v-model="input.data.defaultValue"
                :no-reply-delay="defaultDelayNumber"
                :default-delay="defaultDelayNumber"
                :start-text="input.data.startText"
                :end-text="input.data.endText"
                :max-sections="maxSections"
                :repeat-message="input.data.repeatMessage">
            </or-text-reprompt>

            <or-textbox name="Default_Reprompt_Delay" label="Default reprompt delay" placeholder="enter number"
                        validation-rules="integer|max:3600|min:0"
                        v-model="input.data.defaultDelay"
                        help="input default reprompt delay in seconds (maximum 3600)">
            </or-textbox>

            <or-textbox name="Maximum_Number_of_Reprompt_Attempts" label="Maximum number of reprompt attempts"
                        placeholder="enter number"
                        v-model="input.data.maxSections" validation-rules="integer|min:0"
                        help="input maximum number of reprompt attempts">
            </or-textbox>

            <or-textbox name="startText" label="Wait for reply for label text" placeholder="enter text"
                        v-model="input.data.startText" help="input Wait for reply for label text">
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
                           @click.prevent="$refs.textRepromptModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import base from './_design_base';
    import editor, {data as stepData} from '../editors/text_reprompt.vue';
    import {mapGetters} from 'vuex';

    const DEFAULT_DELAY = 3600;
    const DEFAULT_MAX_SECTIONS = 3;

    export default {
        extends    : base,
        components : {
            editor
        },

        computed : {
            defaultDelayNumber () {
                return parseInt(this.input.data.defaultDelay, 10) || DEFAULT_DELAY;
            },

            popupHeader () {
                return 'Text Reprompt Component Settings';
            },

            exampleValue () {
                return [{
                    time : this.defaultDelayNumber,
                    item : this.input.data.defaultValue
                }];
            },

            maxSections () {
                return parseInt(this.input.data.maxSections, 10) || DEFAULT_MAX_SECTIONS;
            },

            defaultValue () {
                return stepData(this.input);
            }
        }
    };


    export const label = 'Text Reprompt';
    export const data = {
        label                : '',
        variable             : '',
        noReplyDelayVariable : 'noReplyDelay',
        defaultValue         : [],
        defaultDelay         : 3600,
        startText            : 'Wait for reply for',
        endText              : 'Go down the no reply path',
        maxSections          : 3,
        placeholder          : 'Enter text to read here',
        repeatMessage        : 'Repeat the first message after the reprompt',
        renderCondition      : ''
    };

    export const meta = {
        name    : 'formTextReprompt',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../scss/colors.scss';

    .text-reprompt-input-component-wrapper {
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
