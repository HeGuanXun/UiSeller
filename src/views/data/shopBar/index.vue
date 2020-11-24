<template>
    <div  style="height: 100%">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height: 100%">
            <el-tab-pane :label="$t('Store.Class')" name="0" style="height: 100%" >
                <div style="height: 100%" v-if="activeName==='0'">
                    <commodityType ref="storeList"/>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('Store.management')" name="1">
                <brand v-if="activeName==='1'" ref="storeType"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('Store.spu_Type')" name="2">
                <spuType v-if="activeName==='2'" ref="spuType"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import brand from "@/views/data/shopBar/brand/index.vue";
    import commodityType from "@/views/data/shopBar/commodityType/index.vue";
    import spuType from "./spuType/index"
    export default {
        components: {
            brand,
            commodityType,
            spuType
        },
        data() {
            return {
                activeName: '0',
            };
        },
        methods: {
            handleClick(tab) {
                this.activeName = tab.index;

            }
        }
    };
</script>
