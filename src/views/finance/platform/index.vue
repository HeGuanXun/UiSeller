<template>
    <div  style="height: 100%">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height: 100%">
            <el-tab-pane :label="$t('Settlement.Settlement_rules')" name="0" style="height: 100%" >
                <div style="height: 100%">
                    <storeList v-if="isStoreList" ref="storeList"/>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('Settlement.order_details')" name="1">
                <storeType v-if="isStoreType" ref="storeType"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('Settlement.Settlement_details')" name="2">
                <businessLicense v-if="isBusinessLicense" ref="businessLicense"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import storeList from "@/views/finance/platform/rule/index.vue";
    import storeType from "@/views/finance/platform/orderDetail/index.vue";
    import businessLicense from "@/views/finance/platform/clearDetail/index.vue";
    export default {
        components: {
            storeList,
            storeType,
            businessLicense
        },
        data() {
            return {
                activeName: '0',
                isStoreList:true,
                isStoreType:false,
                isBusinessLicense:false,
            };
        },
        methods: {
            handleClick(tab) {
                this.activeName = tab.index;
                if(tab.index==='0'){
                    this.isStoreList = true;
                    this.isStoreType = false
                    this.isBusinessLicense = false;
                }
                if(tab.index==='1'){
                    this.isStoreList = false;
                    this.isStoreType = true;
                    this.isBusinessLicense = false;
                }
                if(tab.index==='2'){
                    this.isStoreList = false;
                    this.isStoreType = false;
                    this.isBusinessLicense = true;
                }
            }
        }
    };
</script>
