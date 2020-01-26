<template>
    <div class="card" style="height: 100%">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
                <li class="nav-item">
                    <a
                            class="nav-link"
                            :class="{'active': activeTab === TAB_GENERAL}"
                            href="#"
                            @click="activeTab = TAB_GENERAL">General
                    </a>
                </li>
                <li class="nav-item">
                    <a
                            class="nav-link"
                            :class="{'active': activeTab === TAB_DETAIL}"
                            href="#"
                            @click="activeTab = TAB_DETAIL">Selection
                    </a>
                </li>
            </ul>
        </div>
        <div class="card-body">
            <template v-if="activeTab === TAB_GENERAL">
                <GeneralDetails :model="model"/>
            </template>

            <template v-if="activeTab === TAB_DETAIL">
                <h5 class="text-center">Storage cell</h5>
            </template>
        </div>
    </div>
</template>

<script>
    import { Model } from "@/model/domain/Model";
    import GeneralDetails from "@/component/GeneralDetails";

    const TAB_GENERAL = "TAB_GENERAL";
    const TAB_DETAIL = "TAB_DETAIL";

    export default {
        components: { GeneralDetails },
        props: {
            model: {
                type: Model,
                required: true,
            }
        },
        data() {
            return {
                activeTab: TAB_GENERAL,
                TAB_GENERAL, TAB_DETAIL
            };
        },
        computed: {
            selectionMode() {
                return this.model.selection.mode;
            }
        }
    };
</script>

<style scoped>

</style>
