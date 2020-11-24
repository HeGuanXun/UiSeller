<template>
    <div/>
</template>
<script>
    //import store from "scripts/store";
    import * as types from "scripts/store/mutation-types";
    var global_options={

    };
    export default {
        data() {
            return {
                type_options:[
                    {value: 1, label: this.$t('common.actionType1')},
                    {value: 2, label: this.$t('common.multi')},
                    {value: 3, label: this.$t('common.shop')},
                    {value: 4, label: this.$t('common.article')},
                    {value: 5, label: this.$t('common.url')},
                    {value: 6, label: this.$t('common.App')}
                ],
                ifShow : [
                    {value: 0, label: this.$t('common.hide')},
                    {value: 1, label: this.$t('common.show')}
                ],
            }
        },
        mounted() {
            this.$vue.prototype.$type_options = this.type_options;
            this.$vue.prototype.$ifShow = this.ifShow;
        }
    }
</script>
