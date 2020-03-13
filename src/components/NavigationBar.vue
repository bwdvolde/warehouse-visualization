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
                    class="nav-item active"
                >
                    <a class="nav-link" href="#">{{configuration.name}}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { Configuration } from "@/generate/Configuration";

    export default {
        data() {
            return {
                configurations: [
                    new Configuration("Random", 5, 4, 5),
                    new Configuration("Serial", 5, 4, 5),
                    new Configuration("Custom", 5, 4, 5),
                ]
            };
        }
    };
</script>
