<template>
    <div></div>
</template>

<script>
    export default {}
    export const data = (template) => {
        return {
            dynamicExitsArrayStart : template.index
        };
    };

    export const meta = {
        name    : 'exitDynamic',
        type    : 'onereach-studio-form-exit',
        version : '1.0'
    };
</script>
