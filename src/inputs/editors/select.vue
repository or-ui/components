<template>
    <or-select
        v-if="renderCondition"
        v-model="value"

        :name="template.label || template.variable"
        :label="template.label"
        :help-text="template.helpText"
        :multiple="template.multiple"
        :readonly="readonly"
        :options="template.options"

        :step-id="step.id"
        :steps="steps"

        @input="$v.value.$touch()"
        :invalid="$v.value.$error"
        :error="error">
    </or-select>
</template>

<script>
    import {validators} from '../../validators';
    const {required} = validators;

    import base from './_editor_base.vue';

    export default {
        extends  : base,
        computed : {
            defaultValue () {
                return this.template.multiple ? this.template.defaultArrayValue : this.template.defaultValue;
            },
            error () {
                if (!this.$v.value.required) return `The ${this.fieldName} is required.`;
            }
        },
        validations () {
            if (!this.renderCondition) {value : {}};
            return {
                value : {
                    ... this.template.validateRequired ? {required} : {},
                }
            };
        }
    };
</script>
