<template>
    <or-textbox
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
    </or-textbox>
</template>

<script>
    import {validators} from '../../validators';
    import * as _ from 'lodash';

    const {required, validateIf, validateInput} = validators;

    //import base from '../_editor_base';

    export default {
        name  : 'edit-exit-label',
        props : ['template', 'schema', 'step', 'steps', 'readonly'],

        computed : {
            value : {
                get () {
                    return this.schema['exitLabel'] || '';
                },
                set (value) {
                    this.$set(this.schema, 'exitLabel', value);
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
    }

    export const data = (template) => ({
        'exitLabel' : template.defaultValue
    });

    export const validator = (template) => {
        return {
            'exitLabel' : validateIf('', {required}) // TODO renderCondition
        };
    };

    export const meta = {
        name    : 'dynamicExitLabel',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
