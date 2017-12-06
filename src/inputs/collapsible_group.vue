<template>
    <div class="collapsible-group-wrapper">
        <div class="wrapper">
            <or-collapsible :disable-ripple="true" :open="true" :title="header" class="collapsible-group">
                <ul class="step-input-list" v-dragula="inputs" bag="inputs">
                    <li :class="'component-' + input.component" v-for="(input, index) in inputs" :key="input.id">
                        <or-icon class="handle" icon="drag_handle"></or-icon>
                        <component
                            :is="getInputDesign(input.component)"
                            :input="input">
                        </component>
                        <or-icon-button type="flat" icon="close" class="remove-btn"
                                        @click="removeInput(index)"></or-icon-button>
                    </li>
                </ul>
                <div class="button-bar">
                    <or-button :disable-ripple="true" color="primary" type="secondary"
                               class="collapsible-settings"
                               @click.stop.prevent="showSettings">Settings
                    </or-button>
                    <or-button :disable-ripple="true" color="primary"
                               type="secondary" icon="add" class="add-form-component"
                               ref="triggerInputsList">
                        Add Component
                    </or-button>
                </div>
            </or-collapsible>
        </div>

        <or-popover ref="componentsListPopover" trigger="triggerInputsList" dropdown-position="right middle"
                    close-on-blur>
            <ul class="collapsible-group-available-inputs-list">
                <li v-for="input in publicInputs" class="available-input">
                    <or-button color="primary"
                               type="secondary"
                               class="input-component"
                               @click.prevent.stop="addInput(input)">{{ input.label }}
                    </or-button>
                </li>
            </ul>
        </or-popover>

        <or-modal ref="collapsibleGroupModal"
                  :remove-close-button="true"
                  :title="popupHeader"
                  class="from-collapsible-group-settings"
                  :contain-focus="false">
            <or-textbox name="header" label="Text" placeholder="header text" v-model="input.data.header"
                        help="collapsible group header">
            </or-textbox>

            <or-switch name="open" :label="defaultStateLabel" v-model="input.data.open"></or-switch>

            <or-textbox name="renderCondition" label="Conditional rendering"
                        placeholder="rule"
                        v-model="input.data.renderCondition"
                        help="conditional rendering rule">
            </or-textbox>

            <div slot="footer">
                <or-button color="primary"
                           type="secondary"
                           @click.prevent="$refs.collapsibleGroupModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script>
    import * as _ from 'lodash';
    import editor from '../editors/collapsible_group.vue';

    import {mapGetters} from 'vuex';
    import {messageBus} from 'or-ui';
    import uuid from 'uuid';

    export default {
        components : {
            editor
        },

        computed : {
            ...mapGetters('plugins', [
                'getInputDesign',
                'availableInputs'
            ]),

            popupHeader () {
                return `${this.input.data.header} Collapsible Group Settings`;
            },

            publicInputs () {
                return _.reject(this.availableInputs, 'meta.private');
            },

            defaultStateLabel () {
                return `Default state (${this.input.data.open ? 'Opened' : 'Closed'})`;
            },

            header () {
                return this.input.data.header || 'Collapsible Group';
            },

            inputs () {
                return this.input.data.inputs;
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
                this.$refs.collapsibleGroupModal.open();
            }
        },

        props : ['input']
    };

    export const label = 'Collapsible Group';
    export const data = {
        header          : '',
        open            : true,
        renderCondition : '',
        inputs          : []
    };

    export const meta = {
        name    : 'formCollapsible',
        type    : 'onereach-studio-form-input',
        version : '1.0'
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../scss/colors.scss';

    .gu-mirror {
        display: none;
    }

    .collapsible-group-wrapper {
        padding: 0 10px;
        display: flex;
        flex-grow: 1;
        .wrapper {
            .collapsible-group {
                ul {
                    list-style: none;
                    padding: 0 0 20px 0;

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
                    }

                    button.add-form-component {
                        margin-left: auto;
                    }
                }
            }
        }
    }
</style>

<style lang="scss" rel="stylesheet/scss">
    ul.collapsible-group-available-inputs-list {
        list-style: none;
        padding: 10px;
        margin: 0;

        li.available-input {
            margin: 0 0 5px 0;
            button.input-component {
                width: 100px;
                height: auto;
            }
        }
    }

    .form-collapsible-group-settings {
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
