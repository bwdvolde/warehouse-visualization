<template>
    <Modal ref="modal"
           title="Create configuration"
           @ok="onModalOk"
           :ok-disabled="!isValid()"
    >
        <div class="form-row">
            <div class="form-group col">
                <label for="name">Name</label>
                <Input :state="isValidName()" id="name" v-model="model.name"/>
                <InvalidFeedback>Name is required and must be unique</InvalidFeedback>
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
                <Input :state="isValidDuration()" id="duration" v-model="model.duration"/>
                <InvalidFeedback>Duration is required and must be larger than 0</InvalidFeedback>
            </div>

            <div class="form-group col">
                <label for="strategy">Strategy</label>
                <StrategySelect id="strategy" v-model="model.strategy"/>
            </div>
        </div>

    </Modal>
</template>

<script>
    import {
        BFormInput as Input,
        BFormSelect as Select,
        BModal as Modal,
        BFormInvalidFeedback as InvalidFeedback
    } from "bootstrap-vue";
    import { Configuration } from "@/generate/Configuration";
    import StrategySelect from "@/components/StrategySelect";
    import { mapState } from "vuex";
    import { NAMESPACE_MODEL } from "@/store/modules/modelModule";

    export default {
        components: { StrategySelect, Modal, Input, Select, InvalidFeedback },
        data() {
            return {
                model: Configuration.createEmpty()
            };
        },
        computed: {
            ...mapState(NAMESPACE_MODEL, ["configurations"])
        },
        methods: {
            show() {
                this.$refs["modal"].show();
            },
            onModalOk() {
                this.$emit("configurationCreated", this.model);
                this.model = Configuration.createEmpty();
            },
            isValid() {
                return this.isValidName() && this.isValidDuration();
            },
            isValidName() {
                const takenNames = this.configurations.map(configuration => configuration.name);
                return this.model.name.length > 0 && !(takenNames.includes(this.model.name));
            },
            isValidDuration() {
                return this.model.duration > 0;
            }
        }
    };
</script>
