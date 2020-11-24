<template>
    <div  style="height: 100%">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height: 100%">
            <el-tab-pane :label="$t('region.language')" name="0">
                <storeType v-if="isLang" ref="storeType"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('region.area')" name="1" style="height: 100%" >
                <div style="height: 100%">
                    <storeList v-if="isArea" ref="storeList"/>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('region.Address')" name="2">
                <businessLicense v-if="isAddress" ref="businessLicense"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('region.telephone')" name="3" style="height: 100%" >
                <div style="height: 100%">
                    <StoreList v-if="isInternational" ref="StoreList"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import storeList from "@/views/data/commonBar/area/index.vue";
    import storeType from "@/views/data/commonBar/lang/index.vue";
    import businessLicense from "@/views/data/commonBar/addressInfo/index.vue";
    import StoreList from "@/views/data/commonBar/Areacode/index.vue";
    export default {
        components: {
            storeList,
            storeType,
            businessLicense,
            StoreList
        },
        data() {
            return {
                activeName: '0',
                isLang:true,
                isArea:false,
                isAddress:false,
                isInternational:false,
            };
        },
        methods: {
            handleClick(tab) {
                this.activeName = tab.index;
                if(tab.index==='0'){
                    this.isLang = true;
                    this.isArea = false;
                    this.isAddress = false;
                    this.isInternational=false;
                }
                if(tab.index==='1'){
                    this.isLang = false;
                    this.isArea = true;
                    this.isAddress = false;
                    this.isInternational=false;
                }

                if(tab.index==='2'){
                    this.isLang = false;
                    this.isArea = false;
                    this.isAddress = true;
                    this.isInternational=false;
                }
                if(tab.index==='3'){
                    this.isLang = false;
                    this.isArea = false;
                    this.isAddress = false;
                    this.isInternational=true;
                }
            }
        }
    };
</script>
