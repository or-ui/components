<template>
    <div class="dynamic-exists-input-wrapper">
        <div class="wrapper">
            <div class="ui-textbox-label-text">{{header}}</div>
            <ul class="form-dynamic-exits step-input-list" v-dragula="inputs" bag="inputs">
                <li :class="`design-${input.component}`" v-for="(input, index) in inputs" :key="input.id">
                    <or-icon class="handle" icon="drag_handle"></or-icon>
                    <component :is="getInputDesign(input.component)"
                               :step="step"
                               :input="input">
                    </component>
                    <or-icon-button type="flat" icon="close" class="remove-btn"
                                    @click="removeInput(index)">
                    </or-icon-button>
                </li>
            </ul>
            <div class="button-bar">
                <or-button :disable-ripple="true" type="secondary" color="primary" class="collapsible-settings"
                           @click.stop.prevent="showSettings">Settings
                </or-button>
                <or-button :disable-ripple="true" type="secondary" icon="add" color="primary" class="add-form-component"
                           ref="triggerInputsList">
                    Add Component
                </or-button>
            </div>
        </div>

        <or-popover ref="componentsListPopover" trigger="triggerInputsList" dropdown-position="right middle"
                    close-on-blur>
            <ul class="list-available-inputs-list">
                <li v-for="input in usableInputs" class="available-input">
                    <or-button @click.prevent.stop="addInput(input)">{{ input.label }}</or-button>
                </li>
            </ul>
        </or-popover>

        <or-modal ref="dynamicExitsModal" :remove-close-button="true"
                  :title="popupHeader"
                  class="form-dynamic-exits-settings"
                  :contain-focus="false">
            <or-textbox name="label" label="Text" placeholder="label text" v-model="input.data.label"
                        help="list label">
            </or-textbox>

            <or-textbox name="variable" label="Variable" placeholder="enter variable name"
                        v-model="input.data.variable"
                        help="name of variable in the code"></or-textbox>

            <or-textbox name="addButtonLabel" label="Add button label" placeholder="enter add button label"
                        v-model="input.data.addButtonLabel"
                        help="add button label"></or-textbox>

            <or-switch name="dragHandleRight" label="Drag Handle Right"
                       v-model="input.data.dragHandleRight">
            </or-switch>

            <or-switch name="singleline" label="Singleline" v-model="input.data.singleline"></or-switch>

            <or-switch name="hasDefaultItem" label="Has one item by default"
                       v-model="input.data.hasDefaultItem">
            </or-switch>

            <or-code label="Exit label function" v-model="input.data.labelFunction"
                     help="how to calculate exit label">
            </or-code>

            <or-textbox name="renderCondition" label="Conditional rendering" placeholder="rule"
                        v-model="input.data.renderCondition"
                        help="conditional rendering rule">
            </or-textbox>

            <div slot="footer">
                <or-button color="primary"
                           type="secondary"
                           @click.prevent="$refs.dynamicExitsModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import * as _ from 'lodash';
    import base from './_design_base.vue';
    import dynamicExitLabel from './exits/label';
    import {mapGetters} from 'vuex';
    import {messageBus} from 'or-ui';
    import uuid from 'uuid';

    export default {
        extends    : base,

        computed : {
            ...mapGetters('plugins', [
                'getInputDesign',
                'availableInputs'
            ]),

            header () {
                return this.input.data.label ? `${this.input.data.label} (Dynamic Exits)` : 'Dynamic Exits';
            },

            inputs () {
                return this.input.data.inputs;
            },

            popupHeader () {
                return `${this.input.data.label} Dynamic Exits Settings`;
            },

            usableInputs () {
                return _.reject(this.availableInputs, 'meta.private');
            }
        },

        mounted () {
            // This is the dirtiest hack I ever made, I feel deeply ashamed, but have no other options at this point
            // due to how vue-dragula plugin works whenever there are multiple containers for a bag
            // it does not consistently adds them to the inner dragula lists and this weird "model update" is required
            // to fix the structures O_O
            // TODO update to vue2-dragula when there is a stable release
            const dummyInput = this.addInput(_.find(this.availableInputs, {component : 'formHeader'}));
            this.$nextTick(() => {
                this.removeInput(_.findIndex(this.input.data.inputs, {id : dummyInput.id}));
            });
        },

        methods : {
            itemRemovedHandler () {
                messageBus.$emit('step-template-design::item-removed');
            },

            addInput (input) {
                const clonedInput = _.cloneDeep(input);
                clonedInput.id = uuid.v4();
                this.input.data.inputs.push(clonedInput);
                this.$refs.componentsListPopover.close();
                return clonedInput;
            },

            removeInput (inputToDeleteIndex) {
                this.input.data.inputs.splice(inputToDeleteIndex, 1);
                messageBus.$emit('step-template-design::item-removed');
            },

            showSettings () {
                this.$refs.dynamicExitsModal.open();
            }
        },

        props : ['input']
    };


    export const label = 'List';
    export const data = {
        label           : '',
        variable        : 'conditions',
        addButtonLabel  : '',
        dragHandleRight : '',
        hasDefaultItem  : '',
        renderCondition : '',
        singleline      : false,
        labelFunction   : 'return item.exitLabel',
        inputs          : [
            {
                component : 'dynamicExitLabel',
                data      : {
                    defaultValue : '',
                    label        : '',
                    placeholder  : 'label',
                    helpText     : 'Exit label.'
                },
                label     : 'Exit label'
            }
        ]
    };

    export const meta = {
        name    : 'formDynamicExits',
        type    : 'onereach-studio-form-input',
        private : true,
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../scss/colors.scss';

    .gu-mirror {
        display: none;
    }

    .dynamic-exists-input-wrapper {
        padding: 10px;
        flex-grow: 1;
        .wrapper {
            ul.step-input-list {
                list-style: none;
                padding: 10px;
                border: 1px dashed #aaa;
                margin-bottom: 5px;

                li {
                    display: flex;
                    flex-direction: row;
                    margin: 0 0 5px 0;
                    cursor: pointer;

                    .remove-btn {
                        align-self: center;
                        margin-left: auto;
                    }

                    .handle {
                        align-self: center;
                        opacity: 0;
                        color: $silver-grey;
                        cursor: move;
                    }

                    &:hover {
                        .handle {
                            opacity: 1;
                        }
                    }
                }
            }
            .button-bar {
                display: flex;
                button {
                    border: none;
                    padding: 0;
                    &.add-form-component {
                        margin-left: auto;
                    }
                }
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    ul.list-available-inputs-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin: 0 0 5px 0;
            button {
                width: 100px;
            }
        }
    }

    .form-dynamic-exits-settings {
        .ui-modal__container {
            display: flex;
            flex-direction: column;
            max-height: 90vh;

            .ui-modal__header {
                flex-shrink: 0;
            }
            .ui-modal__body {
                flex-grow: 1;
                overflow-y: auto;
            }
            .ui-modal__footer {
                flex-shrink: 0;
                margin-top: 0;
            }
        }
    }
</style>
