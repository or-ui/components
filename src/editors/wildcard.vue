<template>
    <div>Wildcard?</div>
    <!-- <component :is="wildcardWrapper" v-bind="schema" :schema="schema" :readonly="readonly" :step="step" :steps="step"></component> -->
</template>

<script>
    import * as _ from 'lodash';
    import Promise from 'bluebird';
    import timestring from 'timestring';
    import uuid from 'uuid';
    import Vue from 'vue';
    import * as vueTemplateCompiler from 'vue-template-compiler';

    export default {
        computed : {
            componentName () {
                // extract component name as name of root element
                const match = /^\s*<\s*([^>\s]+)/.exec(this.template.formTemplate);
                return match && match[1] || 'wildcard';
            },

            schema () {
                return this.step.data;
            },

            wildcardWrapper () {
                console.log('wrapperTemplate', this.wrapperTemplate);
                if (!this.wrapperTemplate) return {template : '<div></div>'};

                const owner = this;
                return {
                    components : {
                        wildcard : owner.wildacard
                    },
                    computed   : {
                        schema () {
                            return this.step.data;
                        }
                    },
                    data () {
                        return owner.getComponentData(owner.template)
                    },
                    template   : this.wrapperTemplate,
                    props      : ['readonly', 'step', 'steps', 'stepId']
                };
            },

            wrapperTemplate () {
                const match = /^\s*<\s*([^>\s]+)/.exec(this.template.formTemplate || '');
                const name = match && match[1];
                if (!match) return '';
                const formTemplate = this.template.formTemplate
                    .replace(new RegExp(`^\\s*<\s*${name}`), '<component :is="wildcard"')
                    .replace(new RegExp(`</\s*${name}`), '</component');
                return formTemplate;
            }
        },

        render (createElement) {
            return this.wrapper.render.bind(this)();
        },

        data () {
            return {
                wrapper  : {
                    render () {
                    }
                },
                wildcard : {}
            };
        },

        methods : {
            compile (template) {
                const component = this.getComponent(template);
                const style = template.componentOriginalStyles
                    ? `.${this.componentName} {\n${template.componentOriginalStyles}\n}`
                    : '';
                const validators = _.trim(template.validators).replace(/\n/ig, '').replace(/^\{(.*)\}$/ig, '$1');
                return _.assign({
                    validators,
                    // data,
                    style
                }, component);
            },

            getComponent (template) {
                const componentLogic = this.generateComponentLogic(template.componentLogic, template.wildcardTemplates);
                const componentTemplate = {
                    template : this.mergeTemplate(template)
                };
                // console.log('logic & templ', componentLogic, componentTemplate);
                return _.assign(this.eval(componentLogic), componentTemplate);
            },

            getComponentData (template) {
                let data;

                if (_.isString(template.data)) {
                    try {
                        data = JSON.parse(template.data);
                    } catch (e) {
                        data = {};
                    }
                } else if (_.isObject(template.data)) {
                    data = template.data;
                } else {
                    data = {};
                }

                return data;
            },

            generateComponentLogic (template, data) {
                let result = '';
                try {
                    // create flat object with templates for direct mapping {[key]: <template>}
                    const variables = _.chain(data)
                        .keyBy('variable')
                        .mapValues('template')
                        .value();
                    // compile only ejs templates
                    const compile = _.template(template, {interpolate : /<%[=\-]([\s\S]+?)%>/g});
                    result = compile(variables);
                } catch (error) {
                    console.error('Template compilation error: ', error);
                }

                return result;
            },

            eval (expr) {
                const args = {_, Vue, Promise, uuid};
                return new Function(..._.keys(args), `return ${expr}`)(..._.values(args));
            },

            /**
             * Method returns html with applied styles
             * @param {Object} template - compiled template data
             * @returns {string} html fragment with styles
             */
            mergeTemplate (template) {
                return `<div class='${_.kebabCase(this.componentName)}'>
                        ${template.componentTemplate}
                    </div>`;
            }
        },

        props : ['template', 'step', 'steps', 'readonly'],

        watch : {
            template : {
                // deep : true,
                handler () {
                    if (!this.wrapperTemplate) return;
                    this.wrapper = vueTemplateCompiler.compileToFunctions(this.wrapperTemplate);
                    this.wildcard = this.compile(this.template);
                }
            }
        }
    };

    export const meta = {
        name    : 'formWildcard',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
