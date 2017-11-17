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
    import {validators} from '../../validators';
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
            if (!this.renderCondition) {value : {}};
            return {
                value : {
                    ... this.template.validateCode       ? {jsCode}       : {},
                    ... this.template.validateExpression ? {jsExpression} : {},
                    ... this.template.validateRequired   ? {required}     : {}
                }
            };
        }
    };
</script>
