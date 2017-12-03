<template>
    <div style="border-bottom:2px solid #eee; margin:20px 0;"></div>
</template>

<script>
    export default {
        name  : 'edit-divider',
        props : ['template']
    };

    export const data = (template) => ({});

    export const validator = (template) => ({});

    export const meta = {
        name    : 'formDivider',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>


<style scoped lang="scss" rel="stylesheet/scss"></style>
