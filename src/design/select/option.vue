<template>
    <div class="several-fields">
        <or-textbox name="optionValue" type="text" placeholder="value" v-model="value.value"
                    help="option value">
        </or-textbox>
        <or-textbox name="optionText" type="text" placeholder="text" v-model="value.label"
                    help="option text">
        </or-textbox>
    </div>
</template>

<script>
    export default {
        props : ['value']
    };
</script>
