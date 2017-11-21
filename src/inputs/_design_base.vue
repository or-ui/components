<script>
    export default {
        computed : {
            defaultValue () {
                return this.input.data.defaultValue;
            },
            defaultStep () {
                return this.step || {
                    data : {
                        [this.input.data.variable] : this.input.data.defaultValue
                    }
                };
            },
            readonly () {
                return !this.step;
            }
        },
        props    : ['input', 'step']
    };
</script>
