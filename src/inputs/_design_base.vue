<script>
    export default {
        created () {
            this._defaultStep = {
                data : {
                    [this.input.data.variable] : this.input.data.defaultValue
                }
            };
        },
        computed : {
            defaultValue () {
                return this.input.data.defaultValue;
            },
            defaultStep () {
                return this.step || this._defaultStep;
            },
            readonly () {
                return !this.step;
            }
        },
        props    : ['input', 'step']
    };
</script>
