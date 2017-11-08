<template>
    <div class="exit-label-input-component-wrapper">
        <span class="wrapper" @click="$refs.exitLabelModal.open()">
            <or-textbox name="dynamicExitLabel" :label="label"
                        :help="input.data.helpText"
                        :placeholder="input.data.placeholder"
                        v-model="input.data.defaultValue" :disabled="true">
            </or-textbox>
        </span>

        <or-modal ref="exitLabelModal" :remove-close-button="true" :title="popupHeader" :contain-focus="false">
            <or-textbox name="label" label="Label" placeholder="label text"
                        v-model="input.data.label"
                        help="input label text">
            </or-textbox>

            <or-textbox name="placeholder" label="Placeholder" placeholder="enter placeholder"
                        v-model="input.data.placeholder" help="input placeholder text">
            </or-textbox>

            <or-textbox name="helpText" label="Help Text" placeholder="enter help text"
                        v-model="input.data.helpText"
                        help="input help text">
            </or-textbox>

            <or-textbox name="defaultValue" label="Default Value" placeholder="enter default value"
                        v-model="input.data.defaultValue"
                        help="variable default value">
            </or-textbox>

            <div slot="footer">
                <or-button color="primary"
                           type="secondary"
                           @click.prevent="$refs.exitLabelModal.close()">Close
                </or-button>
            </div>
        </or-modal>
    </div>
</template>

<script type="text/babel">
    export default {
        props : ['input'],

        computed : {
            popupHeader () {
                return `${this.input.data.label || this.input.data.placeholder} Exit Label Settings`;
            },

            label () {
                return this.input.data.label || 'Exit Label';
            }
        }
    };
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .exit-label-input-component-wrapper {
        padding: 0 10px;
        display: inline-block;
        flex-grow: 1;
        .wrapper {
            &:hover {
                border-color: black;
            }
        }
    }
</style>
