<template>
    <or-collapsible
        v-if="renderCondition"

        :open="template.open"
        :header="template.header"
        :disable-ripple="true">
        <component
            v-for="input in template.inputs"
            v-bind:key="input.id"
            :is="getInputEditor(input.component)"
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
    import {mapGetters} from 'vuex';

    export default {
        extends  : base,
        computed : {
            ...mapGetters('plugins', [
                'getInputEditor'
            ])
        }
    };

    export const meta = {
        name    : 'formCollapsible',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
