<template>
    <div class="text-message-input-component-wrapper">
        <div class="wrapper" @click="$refs.textMessageModal.open()">
            <editor :template="input.data"
                    :schema="defaultStep.data"
                    :step="defaultStep"
                    :steps="[defaultStep]"
                    :readonly="true">
            </editor>
        </div>

        <or-modal ref="textMessageModal" :remove-close-button="true"
                  :title="popupHeader"
                  class="form-text-message-settings"
                  :contain-focus="false">
            <or-textbox name="label" label="Label" placeholder="label text"
                        v-model="input.data.label"
                        help="input label text">
            </or-textbox>

            <or-textbox name="variable" label="Variable" placeholder="enter variable name"
                        v-model="input.data.variable"
                        help="name of variable in the code"></or-textbox>

            <or-textbox name="placeholder" label="Placeholder"
                        placeholder="enter placeholder"
                        v-model="input.data.placeholder" help="input placeholder text">
            </or-textbox>

            <or-text-message label="Default Value" placeholder="enter default value"
                             :max-char-length="maxCharLength"
                             :display-char-counter="input.data.displayCharCounter"
                             :merge-field-in-use-message="input.data.mergeFieldInUseMessage"
                             :in-char-limit-message="input.data.inCharLimitMessage"
                             :not-in-char-limit-message="input.data.notInCharLimitMessage"
                             v-model="input.data.defaultValue" :disable-variables="true">
            </or-text-message>

            <h2>Character Count</h2>
            <or-switch name="displayCharCounter" label="Display character count"
                       v-model="input.data.displayCharCounter">
            </or-switch>

            <or-textbox v-if="input.data.displayCharCounter" name="maxCharLength"
                        label="Max character count"
                        placeholder="enter number"
                        v-model="input.data.maxCharLength"
                        help="input max character count">
            </or-textbox>

            <or-code v-if="input.data.displayCharCounter" mode="html"
                     disable-variables
                     label="Merge Field In Use message"
                     v-model="input.data.mergeFieldInUseMessage">
            </or-code>

            <or-code v-if="input.data.displayCharCounter" mode="html"
                     disable-variables
                     label="In Character Limit message"
                     v-model="input.data.inCharLimitMessage">
            </or-code>

            <or-code v-if="input.data.displayCharCounter" mode="html"
                     disable-variables
                     label="Not In Character Limit message"
                     v-model="input.data.notInCharLimitMessage">
            </or-code>

            <h2>Advanced</h2>
            <or-textbox name="renderCondition" label="Conditional rendering"
                        placeholder="rule"
                        v-model="input.data.renderCondition"
                        help="conditional rendering rule">
            </or-textbox>

            <h2>Validation</h2>
            <or-switch name="required" label="Required" v-model="input.data.validateRequired"></or-switch>

            <div slot="footer">
                <or-button color="primary" type="secondary"
                           @click.prevent="$refs.textMessageModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script type="text/babel">
    import base from './_design_base';
    import editor from '../editors/text_message';
    import {mapGetters} from 'vuex';

    export default {
        extends    : base,
        components : {
            editor
        },

        computed : {
            ...mapGetters('plugins', [
                'getInputDesign'
            ]),
            popupHeader () {
                return `${this.input.data.label || this.input.data.placeholder} Text message Settings`;
            },

            label () {
                return this.input.data.label || 'Text message';
            },

            maxCharLength () {
                return parseInt(this.input.data.maxCharLength, 10) || 0;
            }
        }
    };

    export const label = 'Text Message';
    export const data = {
        defaultValue           : '``',
        label                  : 'Text message',
        placeholder            : '',
        variable               : '',
        validateRequired       : false,
        maxCharLength          : 160,
        displayCharCounter     : true,
        mergeFieldInUseMessage :
            '<p>We cannot calculate the exact amount of characters in your message because it contains a variable.</p>\n<p>There are %currentCharCount% characters excluding the variable in your message.</p>',
        inCharLimitMessage     :
            '<p>The character limit for an SMS message is %maxCharLength% characters.</p>\n<p>If your message contains more characters, it will be broken down into more than one SMS message.</p>',
        notInCharLimitMessage  : 'You have exceeded amount of characters that can be sent via a single SMS.',
        renderCondition        : ''
    };

    export const meta = {
        name    : 'formTextMessage',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .text-message-input-component-wrapper {
        padding: 0 10px;
        display: inline-block;
        flex-grow: 1;
        .wrapper {
            cursor: pointer;
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .form-text-message-settings {
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
