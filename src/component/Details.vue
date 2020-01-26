<template>
    <div>
        <div class="card" style="height: 100%">
            <div class="card-header">
                <ul class="nav nav-pills card-header-pills">
                    <li class="nav-item">
                        <a class="nav-link active" href="#">General</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Selection</a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <GeneralDetails :model="model"/>
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
