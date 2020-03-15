<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Configurations</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"/>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li v-for="configuration in configurations"
                    :key="configuration.name"
                    class="nav-item"
                    :class="{'active': configuration === selectedConfiguration}"
                    @click="generateModel(configuration)"
                >
                    <a class="nav-link" href="#">{{configuration.name}}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>


<script>
    import { Configuration, Strategy } from "@/generate/Configuration";
    import { mapMutations, mapState } from "vuex";
    import { NAMESPACE_MODEL } from "@/store/modules/modelModule";

    export default {
        data() {
            return {
                configurations: [
                    new Configuration("Serial", 5, 5, 5, Strategy.SERIAL, 1000),
                    new Configuration("Random", 4, 4, 5, Strategy.RANDOM, 1000),
                    new Configuration("Custom", 3, 3, 5, Strategy.SERIAL, 100),
                ]
            };
        },
        computed: {
            ...mapState(NAMESPACE_MODEL, ["selectedConfiguration"])
        },
        mounted() {
            this.generateModel(this.configurations[0]);
        },
        methods: {
            ...mapMutations(NAMESPACE_MODEL, ["generateModel"]),
        }
    };
</script>
