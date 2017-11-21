<template>
    <or-code
        v-if="renderCondition"
        v-model="value"

        :label="template.label"
        :help-text="template.helpText"
        :readonly="readonly"

        :step-id="step.id"
        :steps="steps"

        @input="$v.value.$touch()"
        :invalid="$v.value.$error"
        :error="error">
    </or-code>
</template>

<script>
    import {validators} from '../validators';

    const {required, jsCode, jsExpression} = validators;

    import base from './_editor_base';

    export default {
        extends  : base,
        computed : {
            error () {
                if (!this.$v.value.jsCode) return `The ${this.fieldName} is not a valid JavaScript code.`;
                if (!this.$v.value.jsExpression) return `The ${this.fieldName} is not a valid JavaScript expression.`;
                if (!this.$v.value.required) return `The ${this.fieldName} is required.`;
            }
        },
        validations () {
            return {
                value : validator(this.template, this.renderCondition)
            };
        }
    };

    export const validator = (template, renderCondition) => {
        return renderCondition ? {
            ... template.validateCode ? {jsCode} : {},
            ... template.validateExpression ? {jsExpression} : {},
            ... template.validateRequired ? {required} : {}
        } : {}
    };

    export const meta = {
        name    : 'formCode',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
