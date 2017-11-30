<template>
    <or-text-expression
        v-if="renderCondition"
        v-model="value"

        :readonly="readonly"
        :multi-line="template.multiline"
        :placeholder="template.placeholder"
        :help-text="template.helpText"
        :label="template.label"

        :step-id="step.id"
        :steps="steps"

        @input="$v.schema.$touch()"
        :invalid="$v.schema.$error"
        :error="error">
    </or-text-expression>
</template>

<script>
    import {validators} from '../validators';
    import * as _ from 'lodash';

    const {required, jsExpression, jsExpressionNonEmptyString, validateIf, validateInput} = validators;

    import base from './_editor_base';

    export default {
        name     : 'edit-textbox',
        extends  : base,
        computed : {
            error () {
                if (!this.$v.schema.jsExpression) return `The ${this.fieldName} is not a valid JavaScript expression.`;
                if (!this.$v.schema.required || !this.$v.schema.jsExpressionNonEmptyString) return `The ${this.fieldName} is required.`;
            }
        },
        validations () {
            return {
                schema : validator(this.template)
            };
        }
    }

    export const data = (template) => ({
        [template.variable] : template.defaultValue
    });

    export const validator = (template) => {
        return validateInput(template, {
            jsExpression,
            validateIf : validateIf(template.validateRequired, {required, jsExpressionNonEmptyString})
        });
    };

    export const meta = {
        name    : 'formTextBox',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
