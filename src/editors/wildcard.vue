<template>
    <component :is="wildcardWrapper"
               :schema="schema"
               :step="step"
               :steps="steps"
               :stepId="step.id"
               :$v="$v"
               :readonly="readonly">
    </component>
</template>

<script>
    import * as _ from 'lodash';
    import Promise from 'bluebird';
    import later from 'later';
    import timestring from 'timestring';
    import moment from 'moment-timezone';
    import uuid from 'uuid';
    import Vue from 'vue';
    import applyStyles from '_applyStyles';
    import {validators} from '_validators';
    import stepMessageBus from '_stepMessageBus';

    const componentRandomNamePartLength = 16;

    export default {
        name     : 'edit-wildcard',
        computed : {
            componentName () {
//                // extract component name as name of root element
//                const match = /^\s*<\s*([^>\s]+)/.exec(this.template.formTemplate);
//                return match && match[1] || 'wildcard';
                // TODO: get name that generated in input and do not generate here
                const letters = 'abcdefghijklmnopqrstuvwxyz';
                const id = _.sampleSize(letters, componentRandomNamePartLength).join('');
                return `or-wildcard-${id}`;
            },

            wildcardWrapper () {
                if (!this.wrapperTemplate) return {template : '<div></div>'};

                const wildcard = this.compile(this.template) || {};
                const template = this.wrapperTemplate;

                return {
                    name     : 'wildcard-wrapper',
                    computed : {
                        wildcard () {
                            return wildcard;
                        }
                    },
                    data () {
                        return {};
                    },
                    template : template,
                    props    : ['readonly', 'schema', 'step', 'steps', 'stepId', '$v']
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

        methods : {
            compile (template) {
                const component = this.getComponent(template);
                const style = template.componentOriginalStyles
                    ? `.${this.componentName} {\n${template.componentOriginalStyles}\n}`
                    : '';
                applyStyles('.', this.componentName, [{content : style, scoped : false}]);
                //const validators = _.trim(template.validators).replace(/\n/ig, '').replace(/^\{(.*)\}$/ig, '$1');
                return _.assign({
                    name : this.componentName,
                    //  validators
                }, component);
            },

            getComponent (template) {
                const componentLogic = this.generateComponentLogic(template.componentLogic, template.wildcardTemplates);
                const componentTemplate = {
                    template : this.mergeTemplate(template)
                };
                // console.log('logic & templ', componentLogic, componentTemplate);
                return _.assign(wildcardEvil(componentLogic), componentTemplate);
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

        props : ['template', 'schema', 'step', 'steps', 'readonly'],

        validations () {
            return {
                schema : validator(this.template)
            };
        }
    };

    const wildcardEvil = (expr) => {
        const libs = {
            uuid,
            later,
            moment,
            timestring
        };

        const args = {_, Vue, Promise, components : [], uuid, libs, eventHub : stepMessageBus, validators};
        return new Function(..._.keys(args), `return ${expr}`)(..._.values(args));
    };

    export const data = (template) => {
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
    };

    export const validator = (template) => {
        try {
            return wildcardEvil(`${template.validators}`);
        } catch (error) {
            console.error('Could not convert validators to object', error);
        }
        return {};
    };

    export const meta = {
        name    : 'formWildcard',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>
