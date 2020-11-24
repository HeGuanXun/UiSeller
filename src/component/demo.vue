<template>
    <div id="expressage" style="height: 60px">

    </div>
</template>

<script>
    import {eventBus} from "scripts/utils/BUS";

    export default {
        components: {

        },
        data() {
            return {
                eventBus:'bus'
            }
        },

        mounted() {
            eventBus.$on(this.eventBus,(data) =>{
                console.log(data);
            })
        },

        beforeDestroy() {
            eventBus.$off(this.eventBus);
        },

        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    #expressage {
        .infobox {
            margin: 12px 0;
        }
        .headbox {
            display: flex;
            flex-wrap: nowrap;
            width: 100%;
        }
        .searchbox {
            margin: 15px;
            width: 15.6%;
        }
    }
</style>
