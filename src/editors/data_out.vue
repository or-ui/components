<template>
    <or-textbox
        v-if="renderCondition"
        v-model="value"

        :name="fieldName"
        :readonly="readonly"
        :placeholder="template.placeholder"
        :help-text="template.helpText"
        :label="template.label"

        :step-id="step.id"
        :steps="steps"

        @input="$v.schema.$touch()"
        :invalid="$v.schema.$error"
        :error="error">
    </or-textbox>
</template>

<script>
    import {validators} from '../validators';

    const {required, jsIdentifier, validateIf, validateInput} = validators;

    import base from './_editor_base';

    export default {
        name     : 'edit-dataout',
        extends  : base,
        computed : {
            value : {
                get () {
                    return this.schema['dataOut'] || this.template.defaultName;
                },
                set (value) {
                    this.$set(this.template, 'defaultName', value);
                    this.$set(this.schema, 'dataOut', value);
                }
            },

            error () {
                if (!this.$v.schema.required) return `The ${this.fieldName} is required.`;
                //if (!this.$v.schema.mergeFieldName) return `The ${this.fieldName} must be a valid merge field name.`;
            }
        },

        validations () {
            return {
                schema : validator(this.template)
            };
        }
    };

    export const data = (template) => ({
        'dataOut' : template.defaultName
    });

    export const validator = (template) => {
        return {
            'dataOut' : validateIf(template.validateRequired, {required})
        };
    };

    export const meta = {
        name    : 'formDataOut',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
