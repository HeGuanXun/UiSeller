<template>
    <div  style="height: 100%">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height: 100%">
            <el-tab-pane :label="$t('ads.name')" name="0" style="height: 100%" >
                <div style="height: 100%">
                    <ads v-if="isStoreList" ref="storeList"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import ads from "@/views/data/platform/ads/index.vue";
    export default {
        components: {
            ads,
        },
        data() {
            return {
                activeName: '0',
                isStoreList:true
            };
        },
        methods: {
            handleClick(tab) {
                this.activeName = tab.index;
            }
        }
    };
</script>
