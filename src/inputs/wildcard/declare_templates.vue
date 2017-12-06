<template>
    <div class="wildcard-templates-wrapper">
        <div class="template-tabs-wrapper">
            <div class="templates-tabs-add-new">
                <or-icon-button color="primary"
                                icon="add"
                                size="normal"
                                type="secondary"
                                @click="addNewTemplate">
                </or-icon-button>
            </div>
            <div class="template-tab-buttons">
                <div :title="tab.variable" v-for="tab in tabs">
                    <div :class="['template-tab-button', {'tab-selected': tab.id === selectedTab.id}]">
                        <or-button color="secondary" type="flat" class="template-tab-button__text" disable-ripple
                                   @click="templateTabSelected(tab)">
                            {{tab.variable}}
                        </or-button>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="selectedTab.id" class="template-tab-content">
            <div class="template-tab-content__text">
                You can refer to this snippet by:
                <span class="template-tab-content__variable">{{`<%= ${selectedTab.variable} %>`}}</span>
            </div>

            <div class="template-update-section">
                <or-textbox placeholder="Enter tab variable"
                            class="template-update-fields"
                            v-model="getVariableName">
                </or-textbox>
                <or-textbox placeholder="Enter tab title"
                            class="template-update-fields"
                            v-model="selectedTab.title">
                </or-textbox>
                <or-select label="" placeholder="Template mode"
                           :options="getTabModeOptions"
                           v-model="selectedTab.mode">
                </or-select>
                <or-button color="primary" type="secondary"
                           class="template-delete-btn"
                           @click="deleteTab(selectedTab)">Delete tab
                </or-button>
            </div>

            <!-- component template-->
            <or-code :label="selectedTab.title"
                     :mode='selectedTab.mode'
                     v-model="selectedTab.template">
            </or-code>
        </div>
    </div>
</template>

<script>
    import * as _ from 'lodash';
    import uuid from 'uuid';

    export default {
        props : ['templates'],

        data () {
            return {
                selectedTab : {
                    title    : '',
                    variable : '',
                    mode     : ''
                },
                tabs        : []
            };
        },

        created () {
            // this stores link to original templates and allows direct mutation
            this.tabs = this.templates;
        },

        computed : {
            getVariableName : {
                get () {
                    return this.selectedTab.variable;
                },
                set (newValue) {
                    this.selectedTab.variable = _.camelCase(newValue);
                }
            },

            getEmptyTemplateConfigs () {
                return {
                    id       : '',
                    title    : 'No title',
                    variable : 'NoVariable',
                    mode     : '',
                    template : ''
                };
            },

            getTabModeOptions () {
                return [
                    {
                        label : 'HTML',
                        value : 'html'
                    },
                    {
                        label : 'JavaScript',
                        value : 'js'
                    }
                ];
            }

        },

        methods : {
            /**
             * Method creates new tab and saves it automatically
             */
            addNewTemplate () {
                const newTab = _.assign({}, this.getEmptyTemplateConfigs, {id : uuid.v4()});
                this.tabs.push(newTab);
                // select new created values
                this.selectedTab = newTab;
                // save data
                this.saveTemplates(this.tabs);
            },

            /**
             * Method mutates/saves data
             * @param {Array} templates list of templates
             */
            saveTemplates (templates) {
                this.$emit('update:templates', templates);
            },

            deleteTab (tab) {
                // delete tab from object
                this.tabs = _.reject(this.tabs, ['id', tab.id]);
                // reset values on ui
                this.selectedTab = _.cloneDeep(this.getEmptyTemplateConfigs);
                // save data
                this.saveTemplates(this.tabs);
            },

            templateTabSelected (selectedTab) {
                // set tab that selected
                this.selectedTab = selectedTab;
            }

        }
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../../scss/colors.scss';

    .wildcard-templates-wrapper {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .template-tabs-wrapper {
            display: flex;
            .template-tab-buttons {
                display: flex;
                .template-tab-button {
                    display: flex;
                    align-items: center;

                    &.tab-selected {
                        .template-tab-button__text {
                            color: white;
                            background-color: $silver-grey;
                            &:hover {
                                color: white;
                            }
                        }
                    }
                    .template-tab-button__text {
                        border: none;
                        border-radius: 5px;
                        min-width: 30px;
                        color: $silver-grey;
                        height: 2.25rem;
                        &:hover {
                            color: $slate-grey;
                        }
                    }
                }
            }
        }

        .template-tab-content {
            margin: 10px 0;
            padding: 10px;
            .template-tab-content__variable {
                cursor: text;
                color: $default-ripple-ink;
            }
            .template-update-section {
                display: flex;
                .template-update-fields {
                    margin-right: 15px;
                }
                .template-delete-btn {
                    border: none;
                }

            }
        }
    }

</style>
