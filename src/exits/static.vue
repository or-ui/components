<template>
    <div></div>
</template>

<script>
    export default {}

    export const data = (template) => {
        return {
            exits : [{
                id    : template.id,
                label : template.label
            }]
        };
    };

    export const meta = {
        name    : 'exitStatic',
        type    : 'onereach-studio-form-exit',
        version : '1.0'
    };
</script>
