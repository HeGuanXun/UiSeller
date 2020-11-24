<template>
    <div  style="height: 100%">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="height: 100%">
            <el-tab-pane :label="$t('home.audit')" name="0" style="height: 100%" >
                <div style="height: 100%">
                    <storereview v-if="isstorereview" ref="storereview"/>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('home.Review')" name="1">
                <skureview v-if="isskureview" ref="skureview"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import storereview from "@/views/storreview/storereview/index.vue";
    import skureview from "@/views/storreview/skureview/index.vue";
    export default {
        components: {
            storereview,
            skureview,
        },
        data() {
            return {
                activeName: '0',
                isstorereview:true,
                isskureview:false,
            };
        },
        methods: {
            handleClick(tab) {
                this.activeName = tab.index;
                if(tab.index==='0'){
                    this.isstorereview = true;
                    this.isskureview = false
                }
                if(tab.index==='1'){
                    this.isstorereview = false;
                    this.isskureview = true;
                }
            }
        }
    };
</script>
