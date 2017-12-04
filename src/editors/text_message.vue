<template>
    <or-text-message
        v-if="renderCondition"
        :readonly="readonly"
        v-model="value"

        :label="template.label"
        :placeholder="template.placeholder"
        :max-char-length="maxCharLength"
        :merge-field-in-use-message="template.mergeFieldInUseMessage"
        :in-char-limit-message="template.inCharLimitMessage"
        :not-in-char-limit-message="template.notInCharLimitMessage"
        :display-char-counter="template.displayCharCounter ? '' : false"
        :step-id="step.id"
        :steps="steps"

        @input="$v.schema.$touch()"
        :invalid="$v.schema.$error"
        :error="error">
    </or-text-message>
</template>

<script>
    import {validators} from '../validators';
    import * as _ from 'lodash';

    const {required, jsExpressionNonEmptyString, validateIf, validateInput} = validators;

    import base from './_editor_base';

    export default {
        name     : 'edit-textbox',
        extends  : base,
        computed : {
            value : {
                get () {
                    const defaultValue = this.template.defaultValue;
                    const valueToPopulate = defaultValue.replace(/['"`]/g, '') ? defaultValue : `'${this.template.placeholder}'`;
                    return this.schema[this.template.variable] || valueToPopulate;
                },
                set (value) {
                    this.$set(this.schema, this.template.variable, value);
                }
            },

            maxCharLength () {
                return parseInt(this.template.maxCharLength, 10) || 0;
            },

            error () {
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
            validateIf : validateIf(template.validateRequired, {required, jsExpressionNonEmptyString})
        });
    };

    export const meta = {
        name    : 'formTextMessage',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
