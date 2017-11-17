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
                    return this.evalRenderCondition(this.step.data);
                } catch (error) {
                    console.warn('renderCondition', error, this.template.renderCondition);
                    return true;
                }
            },
            value : {
                get () {
                    return this.step.data[this.template.variable];
                },
                set (value) {
                    this.$set(this.step.data, this.template.variable, value);
                }
            }
        },
        data () {
            return {};
        },
        props : ['template', 'step', 'steps', 'readonly'],
        watch : {
            'template.variable' (newVar, oldVar) {
                this.$set(this.step.data, newVar, this.step.data[oldVar]);
                this.$delete(this.step.data, oldVar);
            }
        }
    };
</script>
