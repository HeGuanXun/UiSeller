<template>
    <div>
        <el-form ref="form" :model="dataForm" width="750px" :rules="rules">
            <el-form-item label="ActionType:" required prop="actionType" size="mini" label-width="140px">
                <el-col :span="14">
                    <el-select size="mini"
                               @change="change"
                               v-model="dataForm.actionType" placeholder="Please select an event area">
                        <el-option
                                v-for="item in Type_options"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </el-col>
                <el-col :span="6" style="margin-left: 15px"/>
            </el-form-item>
            <el-form-item label="Resource Locator:" required prop="actionUrl" label-width="140px" size="mini" v-if="type!=0">
                <el-col :span="14">
                    <el-input size="mini" v-if="type==1" placeholder="Please select product ID" :disabled="true"
                              v-model="dataForm.actionUrl"/>
                    <el-tooltip :content="dataForm.actionUrl" v-if="type==2" placement="bottom" effect="light">
                        <el-input size="mini" placeholder="Select multiple IDs" :disabled="true"
                                  v-model="dataForm.actionUrl"/>
                    </el-tooltip>
                    <el-input size="mini" v-if="type==3" placeholder="Please select store ID" :disabled="true"
                              v-model="dataForm.actionUrl"/>
                    <el-input size="mini" v-if="type==4" placeholder="Please enter the URL" maxlength="200"
                              v-model="dataForm.actionUrl"/>
                    <el-input size="mini" v-if="type==5" placeholder="Please enter the URL" maxlength="200"
                              v-model="dataForm.actionUrl"/>
                    <el-input size="mini" v-if="type==6" placeholder="Please enter the wake-up link" maxlength="200"
                              v-model="dataForm.actionUrl"/>
                </el-col>
                <el-col :span="2" style="margin-left: 10px;margin-right: 10px">
                    <el-button size="mini" type="primary" plain @click="goodsClear" v-if="type==2">Clear
                    </el-button>
                </el-col>
                <el-col :span="6" style="margin-left: 18px">
                    <el-button size="mini" type="primary" @click="openGoodsListShow" v-if="type==1">Select product ID
                    </el-button>
                    <el-button size="mini" type="primary" @click="openGoodsListShow" v-if="type==2">Multiple IDs
                    </el-button>
                    <el-button size="mini" type="primary" @click="storeOpen" v-if="type==3">Select store ID</el-button>
                </el-col>
                <el-col :span="14" >
                    <h5 style="color: red" v-if="type==2">
                        Note：A maximum of 10 items are selected for multiple items, currently in total：{{count}} item
                    </h5>
                </el-col>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="goodsListShow" width="75%"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   :show-close="true"
                   :append-to-body="true"
                   center
        >
            <div style="height: 100%;margin-top: -50px">
                <!-- search -->
                <div id="expressage" style="height: 60px">
                    <div class="headbox">
                        <el-input
                                size="mini"
                                v-model="goods.searchForm.spuCode"
                                placeholder="Commodity Number"
                                class="searchbox"
                        />
                        <el-input
                                size="mini"
                                v-model="goods.searchForm.shopName"
                                placeholder="Shop Name"
                                class="searchbox"
                        />
                        <el-input
                                size="mini"
                                v-model="goods.searchForm.spuName"
                                placeholder="Spu Name"
                                class="searchbox"
                        />
                        <el-button
                                size="mini"
                                type="primary" style="height: 30px;margin-top: 14px;"
                                @click="goodsQuery"
                        >
                            <i class="el-icon-search"/>
                            Search
                        </el-button
                        >
                        <el-button style="height: 30px;margin-top: 14px;"
                                   size="mini"
                                   type="primary" plain
                                   @click="goodsReset"
                        >
                            <i class="el-icon-refresh"/>
                            Reset
                        </el-button
                        >
                        <el-button v-if="type==2"
                                   style="margin-left: 10px;height:30px;margin-top: 14px;"
                                   slot="reference"
                                   size="mini"
                                   @click="selectMoreSpuId"
                                   type="primary" plain
                        >
                            <li class="el-icon-plus"/>
                            OK
                        </el-button
                        >
                    </div>
                </div>
                <!-- table -->
                <el-table style="margin-left: 15px" v-if="flash"
                          size="mini"
                          ref="listPowerSupplyTab"
                          :data="goods.tableData"
                          border
                          :stripe="true"
                          highlight-current-row
                          v-loading="goods.listLoading"
                          :default-sort = "{prop: 'data', order: 'descending'}">
                    <el-table-column v-if="type == 1"
                                     type="index"
                                     label="ID"
                                     width="50"/>
                    <el-table-column v-if="type == 2"
                                     fixed
                                     type="selection"
                                     width="50"/>
                    <el-table-column label="Spu Number" sortable prop="spuCode" width="150">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <div>{{ scope.row.spuCode}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Shop Name" sortable prop="shopName" width="">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <div>{{ scope.row.shopName}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Spu Name" sortable prop="spuName" width="">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.spuName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Spu Area" sortable prop="areaCodeStr" width="">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.areaCodeStr}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="type==1" label="SPU Status" sortable prop="spuStatus" width="">
                        <template slot-scope="scope">
                            <div>{{ $SPU[scope.row.spuStatus - 1].label }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="type==2" label="SPU Status" sortable prop="spuStatus">
                        <template slot-scope="scope">
                            <div>{{ $SPU[scope.row.spuStatus - 1].label }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="type==1" fixed="right" label="Operation" width="130">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary" plain
                                    @click="selectSpuId(scope.row.spuId)"
                            >
                                <li class="el-icon-plus"/>
                                Choose
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <!--pagination component-->
                <pagination ref="pagination"/>
            </div>

        </el-dialog>
        <el-dialog :visible.sync="shopShow" width="62%"
                   :close-on-click-modal="false"
                   :append-to-body="true"
                   :destroy-on-close="true"
                   center
        >
            <div style="height: 100%;margin-top: -50px">
                <!-- search -->
                <div id="expressage" style="height: 10%">
                    <div class="headbox">
                        <el-input
                                size="mini"
                                v-model="store.searchForm.shopName"
                                placeholder="Shop Name"
                                class="searchbox"
                        />
                        <el-date-picker style="width: 300px"
                                        size="mini"
                                        class="searchbox"
                                        v-model="store.searchForm.times"
                                        type="datetimerange"
                                        :picker-options="store.pickerOptions"
                                        range-separator="to"
                                        start-placeholder="start Time"
                                        end-placeholder="End Time"
                                        align="right"
                        />
                        <el-button
                                size="mini"
                                type="primary" style="height: 30px;margin-top: 14px;"
                                @click="storeQuery"
                        >
                            <i class="el-icon-search"/>
                            Search</el-button
                        >
                        <el-button style="height: 30px;margin-top: 14px;"
                                   size="mini"
                                   type="primary" plain
                                   @click="storeReset"
                        >
                            <i class="el-icon-refresh"/>
                            Reset</el-button
                        >
                    </div>
                </div>
                <!-- table -->
                <el-table style="margin-left: 15px;" size="mini"
                          ref="listPowerSupplyTab_"
                          :data="store.tableData"
                          border
                          :stripe="true"
                          highlight-current-row
                          v-loading="store.listLoading"
                          :default-sort = "{prop: 'data', order: 'descending'}">
                    <el-table-column
                            fixed="left"
                            label="ID"
                            type="index"
                            width="55"/>
                    <el-table-column label="Shop Name" sortable prop="shopName" width="">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.shopName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Brand Name" sortable prop="brandName" width="">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.brandName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Shop Address" sortable prop="shopAddressProvince" width="" >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.shopAddressCountry+scope.row.shopAddressProvince+scope.row.shopAddressCity+scope.row.shopAddressDetail}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Apply Time" sortable prop="createTime" width="160">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.createTime }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="Operation">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary" plain
                                    @click="selectShopId(scope.row.shopId)"
                            >  <li class="el-icon-plus"/>
                                Choose</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <!--img component-->
                <pagination  ref="pagination"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {eventBus} from "scripts/utils/BUS";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";

    export default {
        components: {
            pagination,
        },

        props:{
            isEdit:Boolean,
            actionType:Number,
            actionUrl:String
        },

        data() {
            return {
                Type_options:[
                    {value: 1, label: 'Single product，jump to product details'},
                    {value: 2, label: 'Multiple products，enter product list'},
                    {value: 3, label: 'Single shop '},
                    {value: 4, label: 'Internal url，as article，poster'},
                    {value: 5, label: 'URL，external browser '},
                    {value: 6, label: 'Wake up APP'}
                ],
                rules:{

                    actionType:[
                        {required: true, message: 'Please select a jump type'},
                    ],
                    actionUrl:[
                        {required: true, message: 'Please select or enter the jump resource locator'},
                    ]
                },
                store:{
                    eventBus: 'storeList_eventBus',
                    tableData: [],
                    searchForm: {approveStatus:1},
                    listLoading: false,
                },
                goods: {
                    type: 1,
                    searchForm: {
                        approveStatus: 2
                    },
                    tableData: [],
                    approveUrl: this.$url.goodsList_review,
                    eventBus: 'new_goodsList_eventBus',
                },
                dataForm: {actionType: '', actionUrl: null},
                dialogFormVisible: false,
                goodsListShow: false,
                shopShow: false,
                flash: true,
                count:0,
                type: 0
            }
        },

        mounted() {
            eventBus.$on(this.goods.eventBus, (tableData) => {
                this.goods.listLoading = false;
                this.goods.tableData = tableData;
            });
            eventBus.$on(this.store.eventBus, (tableData) => {
                this.store.listLoading = false;
                this.store.tableData = tableData;
            });
        },

        beforeDestroy() {
            eventBus.$off(this.goods.eventBus);
            eventBus.$off(this.store.eventBus);
        },

        watch: {
            type(newType) {
                this.type = newType;
            }
        },

        methods: {
            update(form){
                if (form){
                    this.dataForm.actionType = form.actionType
                    this.type=form.actionType;
                    this.dataForm.actionUrl = form.actionUrl;
                    let actionUrls = this.dataForm.actionUrl.split(',');
                    this.count = actionUrls.length;
                }else {
                    this.dataForm.actionType = ''
                    this.type=0;
                    this.dataForm.actionUrl = null;
                }
            },

            getTypeUrlOptions(){
              return this.Type_options;
            },

           async check(form){
               let flag = false;
               this.$refs.form.validate((valid) => {
                   if (valid) {
                       form.actionType = this.dataForm.actionType;
                       form.actionUrl = this.dataForm.actionUrl;
                       flag = Promise.resolve(true);
                   } else {
                       flag = Promise.resolve(false);
                   }
               });
               return flag;
            },

            storeReset() {
                this.store.searchForm = {approveStatus:1};
                this.storeQuery();
            },

            selectShopId(shopId) {
                this.store.searchForm = {approveStatus: 1};
                this.dataForm.actionUrl = shopId;
                this.shopShow = false;
            },

            storeOpen(){
                this.shopShow = true;
                this.$nextTick(() => {
                    this.storeQuery();
                })
            },

            storeQuery() {
                this.store.listLoading = true;
                this.$refs.pagination.$query(this.$url.storeList_list, this.store.searchForm, this.store.eventBus);
            },

            goodsClear() {
                this.$confirm('This operation will be cleared, Continue?', 'Prompt', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    this.dataForm.actionUrl = '';
                    this.count = 0;
                    this.$message({
                        type: 'info',
                        message: 'Cleared successfully!'
                    });
                })
            },

            selectMoreSpuId() {
                let la = 'Please select product id';
                let Less = 'Product ID cannot be greater than 10';
                let Less_ = 'The product ID has reached 10';
                let prompt = 'Prompt';
                let selection = this.$refs.listPowerSupplyTab.selection;
                if (selection.length > 0) {
                    try {
                        if (selection.length > 10) {
                            this.$alert(Less, prompt, {
                                confirmButtonText: this.$t('Commodity.Determine'),
                                callback: () => {
                                    this.goodsListShow = false;
                                    console.log(this.goodsListShow);
                                }
                            });
                            return false;
                        }
                        let count = this.count;
                        if (this.dataForm.actionUrl){
                            console.log(count);
                            if (count>=10){
                                this.$alert(Less_, prompt, {
                                    confirmButtonText: this.$t('Commodity.Determine'),
                                    callback: () => {
                                        this.goodsListShow = false;
                                    }
                                });
                                console.log("fdf1122");
                                return false;
                            }

                            let actionUrl = JSON.parse(JSON.stringify(this.dataForm.actionUrl));
                            let actionUrls = this.dataForm.actionUrl.split(',');
                            this.dataForm.actionUrl = this.dataForm.actionUrl + ",";
                            try {
                                selection.forEach((data, index) => {
                                    if (this.dataForm.actionUrl.indexOf(data.spuId) == -1) {
                                        count++;
                                        if (count > 10) {
                                            throw new Error('');
                                        }
                                        this.dataForm.actionUrl += data.spuId + ",";
                                    }
                                });
                            } catch (e) {
                                this.$alert(Less, prompt, {
                                    confirmButtonText: this.$t('Commodity.Determine'),
                                    callback: () => {
                                        this.goodsListShow = false;
                                        this.dataForm.actionUrl = actionUrl;
                                    }
                                });

                                return false;
                            }
                        }else {
                            selection.forEach((data, index) => {
                                if (this.dataForm.actionUrl.indexOf(data.spuId) == -1) {
                                    count++;
                                    this.dataForm.actionUrl += data.spuId + ",";
                                }
                            });
                        }
                        this.count = count;
                        this.dataForm.actionUrl = this.dataForm.actionUrl.substring(0, this.dataForm.actionUrl.length - 1);
                        this.goodsListShow = false;
                    } catch (e) {
                        return false;
                    }
                } else if (selection.length == 0) {
                    this.$alert(la, '', {
                        confirmButtonText: this.$t('Commodity.Determine'),
                    });
                    return false;
                }
            },

            goodsReset() {
                this.goods.searchForm = {approveStatus: 2};
                this.goodsQuery()
            },

            selectSpuId(spuId) {
                this.goodsListShow = false;
                this.goods.searchForm = {approveStatus: 2};
                this.dataForm.actionUrl = spuId;
            },

            openGoodsListShow() {
                this.goodsListShow = true;
                this.flash = false;
                this.$nextTick(() => {
                    this.flash = true;
                    this.goodsQuery();
                })
            },

            goodsQuery() {
                this.goods.listLoading = true;
                this.$refs.pagination.$query(this.$url.goodsList_list, this.goods.searchForm, this.goods.eventBus);
            },

            change() {
                this.type = this.dataForm.actionType;
                this.dataForm.actionUrl = '';
                this.count = 0;
            },
            showDialog() {
                this.dialogFormVisible = true;
            }
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
