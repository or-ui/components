<template>
    <div>
        <component
            v-for="input in stepTemplate.formBuilder.stepInputs"
            :key="input.id"
            :is="getInputEditor(input.component)"
            is-new="isNew"
            :readonly="readonly"
            :schema="schema"
            :step-template="stepTemplate"
            :step="step"
            :steps="steps"
            :step-id="stepId"
            :template="input.data">
        </component>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name     : 'edit-form',
        props    : ['stepTemplate', 'schema', 'step', 'steps', 'stepId', 'readonly', 'isNew'],
        computed : {
            ...mapGetters('plugins', [
                'getInputEditor'
            ])
        }
    };

    export const meta = {
        name    : 'form',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>


<style scoped lang="scss" rel="stylesheet/scss">
    h4 {
        line-height: 40px;
        margin-bottom: 0;
    }
</style>

