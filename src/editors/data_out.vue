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

        @input="$v.value.$touch()"
        :invalid="$v.value.$error"
        :error="error">
    </or-textbox>
</template>

<script>
    import {validators} from '../validators';

    const {required} = validators;

    import base from './_editor_base';

    export default {
        extends  : base,
        computed : {
            error () {
                if (!this.$v.value.required) return `The ${this.fieldName} is required.`;
            }
        },
        validations () {
            return {
                value : validator(this.template)
            };
        }
    };

    export const validator = (template) => {
        throw new Error('TODO');
        return renderCondition ? {
            ... template.validateRequired ? {required} : {}
        } : {}
    };

    export const meta = {
        name    : 'formDataOut',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
