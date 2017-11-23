<script>
    export default {
        beforeMount () {
            if (typeof this.value === "undefined") {
                this.value = this.defaultValue;
            }
        },
        computed : {
            defaultValue () {
                return this.template.defaultValue;
            },
            evalRenderCondition () {
                return this.template.renderCondition
                    // eslint-disable-next-line
                    ? new Function('schema', `return ${this.template.renderCondition};`)
                    : () => true;
            },
            fieldName () {
                return this.template.label || this.template.variable;
            },
            renderCondition () {
                try {
                    return this.evalRenderCondition(this.schema);
                } catch (error) {
                    console.warn('renderCondition', error, this.template.renderCondition);
                    return true;
                }
            },
            value : {
                get () {
                    return this.schema[this.template.variable];
                },
                set (value) {
                    this.$set(this.schema, this.template.variable, value);
                }
            },

            stepId () {
                return this.step.id;
            }
        },
        data () {
            return {};
        },
        props    : ['template', 'schema', 'step', 'steps', 'readonly'],
        watch    : {
            'template.variable' (newVar, oldVar) {
                this.$set(this.schema, newVar, this.schema[oldVar]);
                this.$delete(this.schema, oldVar);
            }
        }
    };

    export const evalRenderCondition = (renderCondition) => {
        return renderCondition
            // eslint-disable-next-line
            ? new Function('schema', `return ${renderCondition};`)
            : () => true;
    };

    // TODO: check if needed
    export const isVisible = (schema, renderCondition) => {
        try {
            return evalRenderCondition(renderCondition)(schema);
        } catch (error) {
            console.warn('renderCondition', error, renderCondition);
            return true;
        }
    }
</script>
