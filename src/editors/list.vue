<template>
    <or-list
        v-if="renderCondition"
        v-model="value"

        :steps="steps"
        :step-id="step.id"

        :drag-handle-right="template.dragHandleRight ? 'drag-handle-right' : ''"
        :add-button-label="template.addButtonLabel ? template.addButtonLabel : ''"

        @input="$v.value.$touch()"
        :invalid="$v.value.$error"

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
    import {validators} from '../validators';
    import {mapGetters} from 'vuex';
    import * as _ from 'lodash';

    export default {
        extends  : base,
        computed : {
            ...mapGetters('plugins', [
                'getInputEditor',
                'getValidator'
            ])
        },
        validations () {
            return {value : validator(this.template, this.renderCondition, this.getValidator)};
        }
    };

    export const validator = (template, renderCondition, getValidator) => {
        const validate = _.reduce(template.inputs, (result, input) => {
            result[input.data.variable] = getValidator(input.component)(input.data, true, getValidator); // TODO: renderCondition (true)
            return result;
        }, {});

        return {
            each (value, schema) {
                return validators.each(validate)(value, schema);
            }
        };
    };

    export const meta = {
        name    : 'formList',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>


