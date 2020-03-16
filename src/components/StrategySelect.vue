<template>
    <Select v-model="localState" :options="options"/>
</template>

<script>
    import { BFormSelect as Select } from "bootstrap-vue";
    import { Strategy } from "@/generate/Configuration";

    export default {
        components: { Select },
        props: {
            value: {
                type: Strategy,
                required: true
            }
        },
        computed: {
            localState: {
                get() {
                    return this.value;
                },
                set(localState) {
                    this.$emit("input", localState);
                }
            },
            options() {
                return Strategy.values.map(strategy => ({ value: strategy, text: strategy.name }));
            }
        },
    };
</script>
