<template>
    <or-collapsible
        v-if="renderCondition"

        :open="template.open"
        :header="template.header"
        :disable-ripple="true">
        <component
            v-for="input in template.inputs"
            :key="input.id"
            :is="getInputEditor(input.component)"
            :schema="schema"
            :readonly="readonly"
            :step="step"
            :steps="steps"
            :step-id="step.id"
            :template="input.data">
        </component>
    </or-collapsible>
</template>

<script>
    import base from './_editor_base';
    import {validators} from '../validators';
    import {mapGetters} from 'vuex';

    const {validateInput} = validators;

    export default {
        name     : 'edit-collapsible',
        extends  : base,
        computed : {
            ...mapGetters('plugins', [
                'getInputEditor'
            ])
        }
    };

    export const data = (template) => ({});

    export const validator = (template, getValidator) => {
        return _.assign({}, ..._.map(template.inputs, getValidator));
    };

    export const meta = {
        name    : 'formCollapsible',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
