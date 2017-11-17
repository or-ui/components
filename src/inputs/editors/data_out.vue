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
    import {validators} from '../../validators';
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
            if (!this.renderCondition) {value : {}};
            return {
                value : {
                    ... this.template.validateRequired   ? {required}     : {}
                }
            };
        }
    };


//    import * as _ from 'lodash';
//    import {escapeHtmlPropValue, escapeHtmlQuotes} from './helpers';
//
//    export default {
//        compile (inputData) {
//            const labelText = escapeHtmlPropValue(inputData.label);
//            const varName = 'dataOut';
//            const fieldName = inputData.label || varName;
//            const name = `name="${labelText || varName}"`;
//            const value = `v-model="schema.${varName}"`;
//            const label = labelText ? `label="${labelText}"` : 'Data Out';
//            const helpText = inputData.helpText ? `help-text="${escapeHtmlPropValue(inputData.helpText)}"` : '';
//            const placeholder = inputData.placeholder ? `placeholder="${escapeHtmlPropValue(inputData.placeholder)}"` : '';
//            const renderCondition = inputData.renderCondition ? `v-if="${escapeHtmlQuotes(inputData.renderCondition)}"` : '';
//            const readonly = ':disabled="readonly"';
//            let error = '';
//            if (varName) {
//                error = `:error="${varName}Error" :invalid="$v.schema.${varName}.$error" @input="$v.schema.${varName}.$touch()"`;
//            }
//            const template = `<or-textbox ${error} ${readonly} ${renderCondition} ${name} ${label} ${helpText} ${value} ${placeholder}></or-textbox>`;
//
//            const data = {};
//            const messages = [`if (!this.$v.schema.${varName}.mergeFieldName) { return ${JSON.stringify(`The ${fieldName} must be a valid merge field name.`)};  }`];
//            const rules = [`jsIdentifier (value, schema) { if (${inputData.renderCondition || 'true'}) { return validators.mergeFieldName(value); } return true; }`];
//
//            data[varName] = inputData.defaultName || '';
//
//            if (inputData.validateRequired) {
//                rules.push(`required (value, schema) { if (${inputData.renderCondition || 'true'}) { return validators.required(value); } return true; }`);
//                messages.push(`if (!this.$v.schema.${varName}.required) { return ${JSON.stringify(`The ${fieldName} is required.`)};  }`);
//            }
//
//            const validators = `${varName} : { ${_.join(rules)} }`;
//            const mixin = `{
//                    computed : {
//                        ${varName}Error () {
//                            ${_.join(messages, '\n')}
//                        }
//                    }
//                }`;
//
//            return {template, data, validators, mixin};
//        }
//    };
</script>
