/* eslint-disable */
import { validators } from './validators';

export default {
    props: ['template', 'step', 'steps', 'readonly'],
    computed: {
        code() {
            return this.step.data[this.template.variable];
        },
        error() {
            return 'alarm!';
        },
        renderCondition() {
            if (!this.template.renderCondition) {
                return true;
            }
            // eslint-disable-next-line
            const evalCondition = new Function('schema', `return (${this.template.renderCondition})`);
            return evalCondition(this.step.data);
        }
    },
    validations: {
        code: {
            required: validators.required,
            jsCode(value) {
                return validators.jsCode(value);
            }
        }
    },
    created() {
        console.log('created', this.value, this.template);
    },
    template: `
<or-code
    v-bind:label="template.label"
    :disabled="readonly"
    :step-id="step.id"
    :steps="steps"
    :invalid="$v.code.$error"
    :error="error"
    @input="$v.code.$touch()"
    v-if="renderCondition"
    v-bind:help-text="template.helpText"
    v-model="step.data[template.variable]">
</or-code>`
};
