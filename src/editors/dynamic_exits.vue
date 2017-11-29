<template>
    <or-list
        v-if="renderCondition"
        v-model="value"

        :steps="steps"
        :step-id="step.id"

        :drag-handle-right="template.dragHandleRight ? 'drag-handle-right' : ''"
        :add-button-label="template.addButtonLabel ? template.addButtonLabel : ''"

        @data-change="updateExits"
        :new-item-method="getNewItem"

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
    import uuid from 'uuid';

    const {validateInput} = validators;

    export default {
        extends  : base,
        computed : {
            ...mapGetters('plugins', [
                'getInputEditor',
                'getValidator',
                'getInputData'
            ]),

            stepData () {
                console.log('_____________', this.template.inputs);
                return _.merge({}, ..._.map(this.template.inputs, input => this.getInputData(input)));
            }
        },

        methods: {
            getNewItem () {
                return _.assign(this.stepData, {exitId : uuid.v4()}); // TODO
            },

            calculateExitLabel : function (item) {
                const calculateLabel = new Function('item', this.template.labelFunction);
                return calculateLabel(item);
            },

            updateExits : function (params) {
                if (_.isEmpty(params.oldItems) && _.isEmpty(params.newItems)) {
                    // Items reordered
                    const newDynamicExits = _.map(params.allItems, function (item) {
                        const exit = _.find(this.schema.exits, {id : item.exitId});
                        return {
                            id : item.exitId,
                            label : this.calculateExitLabel(item),
                            stepId : exit ? exit.stepId : ''
                        };
                    }.bind(this));
                    _.forEach(newDynamicExits, function (item, index) {
                        const exitIndex = this.schema.dynamicExitsArrayStart + index; // TODO:
                        this.schema.exits[exitIndex].id = item.id;
                        this.schema.exits[exitIndex].label = item.label;
                        this.schema.exits[exitIndex].stepId = item.stepId;
                    }.bind(this));
                } else if (_.isEmpty(params.oldItems) && !_.isEmpty(params.newItems)) {
                    // Item added
                    const newItem = params.newItems[0];
                    const lastDynamicExitIndex = _.findLastIndex(this.schema.exits, {dynamic : true});
                    const index = lastDynamicExitIndex === -1 ? this.schema.dynamicExitsArrayStart : lastDynamicExitIndex + 1; // TODO
                    this.schema.exits.splice(index, 0, {
                        label    : this.calculateExitLabel(newItem),
                        id       : newItem.exitId,
                        stepId   : '',
                        dynamic  : true
                    });
                } else if (!_.isEmpty(params.oldItems) && _.isEmpty(params.newItems)) {
                    // Item removed
                    const removedItem = params.oldItems[0];
                    this.schema.exits.splice(_.findIndex(this.schema.exits, {id : removedItem.exitId}), 1);
                } else if (!_.isEmpty(params.oldItems) && !_.isEmpty(params.newItems)) {
                    // Item updated
                    const oldItemValue = params.oldItems[0];
                    const newItemValue = params.newItems[0];
                    const changedItemIndex = _.findIndex(this.schema.exits, {id : oldItemValue.exitId});
                    this.schema.exits[changedItemIndex].id = newItemValue.exitId;
                    this.schema.exits[changedItemIndex].label = this.calculateExitLabel(newItemValue);
                }
            }
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
        name    : 'formDynamicExits',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>


