<template>
    <div ref="visitsTableWrapper" class="visits-table__wrapper">
        <table class="table">
            <thead>
            <tr>
                <th v-if="showDroneColumn">Drone</th>
                <th v-if="showCellColumn">Cell</th>
                <th>On</th>
            </tr>
            </thead>
            <tbody>
            <tr
                    v-for="visit in visits"
                    :key="visit.on"
                    class="drone-details__tr"
            >
                <td v-if="showDroneColumn">{{visit.by.id}}</td>
                <td v-if="showCellColumn">{{visit.at.toString()}}</td>
                <td>{{visit.on / 1000}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Vue from "vue";

    export default {
        props: {
            visits: {
                type: Array, // Visits[];
                required: true
            },
            showDroneColumn: {
                type: Boolean,
                default: false,
                required: false
            },
            showCellColumn: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        watch: {
            visits() {
                Vue.nextTick(() => {
                    this.scrollVisitsTableWrapperToBottom();
                });
            }
        },
        methods: {
            scrollVisitsTableWrapperToBottom() {
                const visitsTableWrapper = this.$refs.visitsTableWrapper;
                visitsTableWrapper.scrollTop = visitsTableWrapper.scrollHeight;
            }
        }
    };
</script>

<style scoped>
    .visits-table__wrapper {
        overflow: auto;
        max-height: 400px;
    }
</style>
