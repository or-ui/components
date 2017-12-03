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
        :placeholder="template.placeholder"

        :step-id="step.id"
        :steps="steps"

        @input="$v.schema.$touch()"
        :invalid="$v.schema.$error"
        :error="error">
    </or-select>
</template>

<script>
    import {validators} from '../validators';

    const {required, validateInput, validateIf} = validators;

    import base from './_editor_base.vue';

    export default {
        name     : 'edit-select',
        extends  : base,
        computed : {
            defaultValue () {
                return this.template.multiple
                    ? this.template.defaultArrayValue
                    : this.template.defaultValue;
            },

            value : {
                get () {
                    return this.template.multiple
                        ? this.schema[this.template.variable] || this.template.defaultArrayValue
                        : this.schema[this.template.variable] || this.template.defaultValue;
                },
                set (value) {
                    this.$set(this.schema, this.template.variable, value);
                }
            },

            error () {
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
        [template.variable] : template.multiple
            ? template.defaultArrayValue
            : template.defaultValue
    });

    export const validator = (template) => {
        return validateInput(template, {
            validateIf : validateIf(template.validateRequired, {required})
        });
    };

    export const meta = {
        name    : 'formSelect',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
