<template>
    <input
        type="text"
        v-model="userInput"
        @keydown="keyDown"
        :disabled="testState == 'end'"
    >
</template>

<script>
export default {
    name: 'TextInput',
    props: {
        testState: String,
    },
    data() {
        return {
            userInput: '',
        };
    },
    methods: {
        keyDown() {
            if (this.testState === 'ready') {
                this.$emit('update:testState', 'active');
            }
        },
    },
    watch: {
        userInput(current) {
            this.$emit('input', current);
        },
        testState(current) {
            switch (current) {
            case 'ready':

                break;

            case 'active':

                break;

            case 'end':

                break;
            default:
                break;
            }
        },
    },
};
</script>

<style>
</style>
