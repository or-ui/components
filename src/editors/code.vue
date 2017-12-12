<template>
    <or-code
        v-if="renderCondition"
        v-model="value"

        :label="template.label"
        :help-text="template.helpText"
        :readonly="readonly"

        :step-id="step.id"
        :steps="steps"

        @input="$v.schema.$touch()"
        :invalid="$v.schema.$error"
        :error="error">
    </or-code>
</template>

<script>
    import {validators} from '_validators';

    const {required, jsCode, jsExpression, validateInput, validateIf} = validators;

    import base from './_editor_base';

    export default {
        name     : 'edit-code',
        extends  : base,
        computed : {
            error () {
                if (!this.$v.schema.jsCode) return `The ${this.fieldName} is not a valid JavaScript code.`;
                if (!this.$v.schema.jsExpression) return `The ${this.fieldName} is not a valid JavaScript expression.`;
                if (!this.$v.schema.required) return `The ${this.fieldName} is required.`;
            }
        },
        validations () {
            return {
                schema : validator(this.template)
            };
        }
    };

    export const data = (template) => ({
        [template.variable] : template.defaultValue
    });

    export const validator = (template) => {
        return validateInput(template, {
            validateIf : validateIf(template.renderCondition, {
                ... template.validateCode ? {jsCode} : {},
                ... template.validateExpression ? {jsExpression} : {},
                ... template.validateRequired ? {required} : {}
            })
        });
    };

    export const meta = {
        name    : 'formCode',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
