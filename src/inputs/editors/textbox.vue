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

        @input="$v.value.$touch()"
        :invalid="$v.value.$error"
        :error="error">
    </or-text-expression>
</template>

<script>
    import {validators} from '../../validators';
    const {required, jsExpression, jsExpressionNonEmptyString} = validators;

    import base from './_editor_base';

    export default {
        extends  : base,
        computed : {
            error () {
                if (!this.$v.value.jsExpression) return `The ${this.fieldName} is not a valid JavaScript expression.`;
                if (!this.$v.value.required || !this.$v.value.jsExpressionNonEmptyString) return `The ${this.fieldName} is required.`;
            }
        },
        validations () {
            if (!this.renderCondition) {value : {}};
            return {
                value : {
                    jsExpression,
                    ... this.template.validateRequired ? {required, jsExpressionNonEmptyString} : {}
                }
            };
        }
    }
</script>
