<template>
    <div class="card" style="height: 100%">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="pill" href="#general">General</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="pill" href="#details">Selection</a>
                </li>
            </ul>
        </div>
        <div class="tab-content card-body">
            <div class="tab-pane container active" id="general">
                <GeneralDetails :model="model"/>
            </div>

            <div class="tab-pane container" id="details">
                <h5 class="text-center">Storage cell</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import { Model } from "@/model/domain/Model";
    import GeneralDetails from "@/component/GeneralDetails";

    export default {
        components: { GeneralDetails },
        props: {
            model: {
                type: Model,
                required: true
            }
        }
    };
</script>

<style scoped>

</style>
