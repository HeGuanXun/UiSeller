<template>
    <div  style="height: 100%">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height: 100%">
            <el-tab-pane :label="$t('jingying.me')" name="0" style="height: 100%" >
                <div style="height: 100%">
                    <certificate v-if="isCertificate" ref="storeList"/>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('jingying.na')" name="1">
                <storeType v-if="isStoreType" ref="storeType"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('jingying.Name')" name="2">
                <commodityServe v-if="isCommodityServe" ref="storeType"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('jingying.nam')" name="3">
                <pickup v-if="isPickup" ref="storeType"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import certificate from "@/views/data/sellerBar/certificate/index.vue";
    import commodityServe from "@/views/data/sellerBar/commodityServe/index.vue";
    import storeType from "@/views/data/sellerBar/storeType/index.vue";
    import pickup from "@/views/data/sellerBar/pickup/index.vue";
    export default {
        components: {
            certificate,
            storeType,
            commodityServe,
            pickup
        },
        data() {
            return {
                activeName: '0',
                isCertificate:true,
                isStoreType:false,
                isCommodityServe:false,
                isPickup:false,
            };
        },
        methods: {
            handleClick(tab) {
                this.activeName = tab.index;
                if(tab.index==='0'){
                    this.isCertificate = true;
                    this.isStoreType = false;
                    this.isCommodityServe = false;
                    this.isPickup = false;
                }
                if(tab.index==='1'){
                    this.isCertificate = false;
                    this.isStoreType = true;
                    this.isCommodityServe = false;
                    this.isPickup = false;
                }
                if(tab.index==='2'){
                    this.isCertificate = false;
                    this.isStoreType = false;
                    this.isCommodityServe = true;
                    this.isPickup = false;
                }
                if(tab.index==='3'){
                    this.isCertificate = false;
                    this.isStoreType = false;
                    this.isCommodityServe = false;
                    this.isPickup = true;
                }
            }
        }
    };
</script>
