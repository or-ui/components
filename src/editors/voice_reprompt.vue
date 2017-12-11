<template>
    <or-voice-reprompt
        v-if="renderCondition"
        v-model="value"
        :readonly="readonly"

        :label="template.label"
        :placeholder="template.placeholder"
        :no-reply-delay="defaultDelayNumber"
        :default-delay="defaultDelayNumber"
        :max-sections="maxSectionsNumber"
        :start-text="template.startText || ''"
        :end-text="template.endText || ''"
        :repeat-message="template.repeatMessage"
        :add-audio-text="template.addAudioText"

        :step-id="step.id"
        :steps="steps">
    </or-voice-reprompt>
</template>

<script>
    import base from './_editor_base';

    const DEFAULT_DELAY = 15;
    const DEFAULT_MAX_SECTIONS = 3;

    export default {
        name     : 'edit-voice-reprompt',
        extends  : base,
        computed : {
            value : {
                get () {
                    return this.schema[this.template.variable] = (this.schema[this.template.variable] || this.template.defaultValue);
                },
                set (value) {
                    this.$set(this.schema, this.template.variable, value);
                }
            },

            noReplyDelay () {
                return this.schema[this.template.noReplyDelayVariable];
            },

            defaultDelayNumber () {
                return parseInt(this.template.defaultDelay, 10) || DEFAULT_DELAY;
            },


            maxSectionsNumber () {
                return parseInt(this.template.maxSections, 10) || DEFAULT_MAX_SECTIONS;
            }
        }
    }

    export const data = (template) => ({
        [template.variable]             : template.defaultValue,
        [template.noReplyDelayVariable] : template.defaultDelay || DEFAULT_DELAY,
    });

    export const validator = (template) => ({});

    export const meta = {
        name    : 'formVoiceReprompt',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
