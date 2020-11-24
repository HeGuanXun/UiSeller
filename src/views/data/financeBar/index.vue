<template>
    <div  style="height: 100%">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height: 100%">
            <el-tab-pane :label="$t('Currency.Currency')" name="0">
                <maintain v-if="isMaintain" ref="PayWay"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('Currency.Payment_method')" name="1" style="height: 100%" >
                <div style="height: 100%">
                    <payWay v-if="isPayWay" ref="Maintain"/>
                </div>
            </el-tab-pane>
            
        </el-tabs>
    </div>
</template>

<script>
    import maintain from "@/views/data/financeBar/maintain/index.vue";
    import payWay from "@/views/data/financeBar/payWay/index.vue";
    export default {
        components: {
            maintain,
            payWay,
        },
        data() {
            return {
                activeName: '0',
                isMaintain:true,
                isPayWay:false,
            };
        },
        methods: {
            handleClick(tab) {
                this.activeName = tab.index;
                if(tab.index==='0'){
                    this.isMaintain = true;
                    this.isPayWay = false
                }
                if(tab.index==='1'){
                    this.isMaintain = false;
                    this.isPayWay = true;
                }
            }
        }
    };
</script>
