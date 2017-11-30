<template>
    <h4>{{template.header}}</h4>
</template>

<script>
    export default {
        name  : 'edit-header',
        props : ['template']
    };

    export const meta = {
        name    : 'formHeader',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>


<style scoped lang="scss" rel="stylesheet/scss">
    h4 {
        line-height: 40px;
        margin-bottom: 0;
    }
</style>
