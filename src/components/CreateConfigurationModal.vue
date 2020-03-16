<template>
    <Modal ref="modal"
           title="Create configuration"
           @ok="onModalOk"
    >
        <div class="form-row">
            <div class="form-group col">
                <label for="name">Name</label>
                <Input id="name" v-model="model.name"/>
            </div>
        </div>

        <h6>Dimensions</h6>

        <div class="form-row">
            <div class="form-group col">
                <label for="aisles">Aisles</label>
                <Select id="aisles" v-model="model.aisles" :options="[1, 2, 3, 4, 5]"/>
            </div>

            <div class="form-group col">
                <label for="blocks">Blocks</label>
                <Select id="blocks" v-model="model.blocks" :options="[1, 2, 3, 4, 5]"/>
            </div>

            <div class="form-group col">
                <label for="cells-per-block">Cells per block</label>
                <Select id="cells-per-block" v-model="model.cellsPerBlock" :options="[1, 2, 3, 4, 5]"/>
            </div>
        </div>

        <h6>Other</h6>

        <div class="form-row">
            <div class="form-group col">
                <label for="duration">Duration</label>
                <Input id="duration" v-model="model.duration"/>
            </div>

            <div class="form-group col">
                <label for="strategy">Strategy</label>
                <StrategySelect id="strategy" v-model="model.strategy"/>
            </div>
        </div>

    </Modal>
</template>

<script>
    import { BFormInput as Input, BFormSelect as Select, BModal as Modal } from "bootstrap-vue";
    import { Configuration } from "@/generate/Configuration";
    import StrategySelect from "@/components/StrategySelect";

    export default {
        components: { StrategySelect, Modal, Input, Select },
        data() {
            return {
                model: Configuration.createEmpty()
            };
        },
        methods: {
            show() {
                this.$refs["modal"].show();
            },
            onModalOk() {
                this.$emit("configurationCreated", this.model);
                this.model = Configuration.createEmpty();
            }
        }
    };
</script>
