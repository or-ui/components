<template>
    <or-list
        v-if="renderCondition"
        v-model="value"

        :steps="steps"
        :step-id="step.id"

        :drag-handle-right="template.dragHandleRight ? 'drag-handle-right' : ''"
        :add-button-label="template.addButtonLabel ? template.addButtonLabel : ''"

        :readonly="readonly">

        <template scope="item">
            <component v-for="input in template.inputs"
                       :key="input.id"
                       :is="getInputEditor(input.component)"

                       :schema="item.item"
                       :step="step"
                       :steps="item.steps"
                       :readonly="readonly"
                       :template="input.data">
            </component>
        </template>
    </or-list>
</template>

<script>
    import base from './_editor_base';
    import {validators} from '_validators';
    import {mapGetters} from 'vuex';
    import * as _ from 'lodash';

    const {validateInput} = validators;

    export default {
        name     : 'edit-list',
        extends  : base,
        computed : {
            ...mapGetters('plugins', [
                'getInputEditor',
                'getValidator'
            ])
        }
    };

    export const data = (template) => ({
        [template.variable] : []
    });

    export const validator = (template, getValidator) => {
        return validateInput(template, {
            $each : _.assign({}, ..._.map(template.inputs, getValidator))
        });
    };

    export const meta = {
        name    : 'formList',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>


