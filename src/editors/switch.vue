<template>
    <or-switch
        v-if="renderCondition"
        v-model="value"
        :readonly="readonly"
        :label="template.label"
        :switch-position="template.labelLeft ? 'right' : 'left'"
        :name="template.variable">
    </or-switch>
</template>

<script>
    import base from './_editor_base';

    export default {
        name    : 'edit-switch',
        extends : base
    };

    export const data = (template) => ({});

    export const validator = (template) => ({});

    export const meta = {
        name    : 'formSwitch',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };

</script>


<style scoped lang="scss" rel="stylesheet/scss"></style>
