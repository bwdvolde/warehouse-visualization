<template>
    <div class="card h-100">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
                <li class="nav-item">
                    <a
                            class="nav-link"
                            :class="{'active': activeTab === TAB_GENERAL}"
                            href="#"
                            @click="activeTab = TAB_GENERAL"
                    >
                        Configuration
                    </a>
                </li>
                <li class="nav-item">
                    <a
                            class="nav-link"
                            :class="{'active': activeTab === TAB_DETAIL}"
                            href="#"
                            @click="activeTab = TAB_DETAIL"
                    >
                        Selection
                    </a>
                </li>
            </ul>
        </div>
        <div class="card-body">
            <template v-if="activeTab === TAB_GENERAL">
                <GeneralDetails :model="model"/>
            </template>

            <template v-if="activeTab === TAB_DETAIL">
                <template v-if="selectionMode === SelectionMode.NONE">
                    <p>Click on a storage cell or drone to see more information about that cell.</p>
                </template>
                <template v-else-if="selectionMode === SelectionMode.CELL">
                    <CellDetails :cell="selection.selectedCell"/>
                </template>
                <template v-else-if="selectionMode === SelectionMode.DRONE">
                    <DroneDetails :drone="selection.selectedDrone"/>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
    import { Model } from "@/model/domain/Model";
    import GeneralDetails from "@/components/GeneralDetails";
    import CellDetails from "./CellDetails";
    import { SelectionMode } from "@/model/domain/ModelSelection";
    import DroneDetails from "@/components/details/DroneDetails";

    const TAB_GENERAL = "TAB_GENERAL";
    const TAB_DETAIL = "TAB_DETAIL";

    export default {
        components: { DroneDetails, CellDetails, GeneralDetails },
        props: {
            model: {
                type: Model,
                required: true,
            }
        },
        data() {
            return {
                activeTab: TAB_GENERAL,
                TAB_GENERAL, TAB_DETAIL,
                SelectionMode
            };
        },
        computed: {
            selection() {
                return this.model.selection;
            },
            selectionMode() {
                return this.selection.mode;
            }
        },
        watch: {
            selectionMode(newMode) {
                if (newMode !== SelectionMode.NONE) {
                    this.activeTab = TAB_DETAIL;
                }
            }
        }
    };
</script>

<style scoped>

</style>
