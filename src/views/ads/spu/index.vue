<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px;margin-top: 14px;">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.spuId"
                        :placeholder="$t('commodity.Shop_ID')"
                        class="searchbox"
                />
                <el-select
                        size="mini"
                        v-model="searchForm.adsStatus"
                        :placeholder="$t('commodity.state')"
                        class="searchbox"
                >
                    <el-option
                            size="mini"
                            v-for="item in STATUS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>

                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 14px;"
                        @click="search"
                >
                    <i class="el-icon-search"/>
                    {{$t('commodity.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset_"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('commodity.Reset')}}
                </el-button
                >
                <div id="expressage">
                    <div class="headbox">
                        <el-button
                                size="mini"
                                type="primary" plain
                                style="height: 30px;margin-Left: 11px;margin-top: 14px;"
                                @click="()=>{isAddShow=true}"
                        >
                            <i class="el-icon-plus"/>
                            {{$t('commodity.Add_recommended_store')}}
                        </el-button
                        >

                    </div>
                </div>

            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  highlight-current-row
                  height="75%"
                  :stripe="true"
                  v-loading="listLoading"
                  :default-sort = "{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    label="ID"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column :label="$t('commodity.type')" sortable prop="adsTypeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{scope.row.adsTypeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('commodity.Shop_ID')" sortable prop="spuId" width="252">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.spuId }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('commodity.shop_name')" sortable prop="shopNameStr" width="252">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.shopNameStr }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('commodity.product_name')" sortable prop="spuNameStr" width="252">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.spuNameStr }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('commodity.state')" sortable prop="adsStatus" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ adsStatusMap(scope.row.adsStatus) }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('commodity.Sort')" sortable prop="adsSeq" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.adsSeq }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('commodity.Language')" sortable prop="languageCodeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.languageCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('commodity.Area')" sortable prop="areaCodeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('commodity.operation')" width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary" plain
                            style="margin-right: 10px"
                            @click="edit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                        {{$t('commodity.edit')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('commodity.OK')"
                            :cancelButtonText="$t('commodity.cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('commodity.Whether_Delete')"
                            @onConfirm="doDelete(scope.row.adsId)"
                    >
                        <el-button
                                slot="reference"
                                size="mini"
                                type="danger"
                                v-if="$platformRole==1"
                        ><i class="el-icon-delete"/>
                            {{$t('commodity.delete')}}
                        </el-button
                        >
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <!--upOrOut component-->
        <upOrOut ref="upOrOut"/>
        <!-- Edit -->
        <el-dialog :visible.sync="isAddShow" width="500px"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   :show-close="false"
                   center
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="120px" :rules="rules" center>
                <el-form-item  size="mini" :label="$t('commodity.shop_ID')" required >
                    <el-col :span="16">
                        <el-input size="mini" style="width: 200px" :disabled="true" v-model="form.spuId"/>
                    </el-col>
                    <el-col :span="8">
                        <el-button size="mini" type="primary" @click="openSpu">
                            {{$t('commodity.Select')}}
                        </el-button>
                    </el-col>
                </el-form-item>
                <el-form-item  size="mini" :label="$t('shop.Type')" required prop="adsTypeCode" label-width="120px">
                    <el-select size="mini" v-model="form.adsTypeCode" :placeholder="$t('shop.Select')">
                        <el-option
                                v-for="item in adsType"
                                :key="item.adsTypeCode"
                                :label="item.adsType"
                                :value="item.adsTypeCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item  size="mini" :label="$t('commodity.sort')" required prop="adsSeq" label-width="120px">
                    <el-input maxlength="4" min="1" size="mini" v-model="form.adsSeq"></el-input>
                </el-form-item>
                <el-form-item  size="mini" :label="$t('commodity.State')" required prop="adsStatus">
                    <el-radio-group v-model="form.adsStatus">
                        <el-radio :label="1">{{$t('commodity.Exhibition')}}</el-radio>
                        <el-radio :label="2">{{$t('commodity.Not_show')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  size="mini" :label="$t('commodity.language')" required prop="languageCode" label-width="120px">
                    <el-select v-model="form.languageCode" filterable :placeholder="$t('Class.Select_lang')"
                               size="mini">
                        <el-option
                                v-for="item in myLanguage"
                                :key="item.language"
                                :label="item.language"
                                :value="item.languageCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item  size="mini" :label="$t('commodity.area')" required prop="areaCode" label-width="120px">
                    <el-select v-model="form.areaCode" filterable :placeholder="$t('Payment.select_area')" size="mini">
                        <el-option
                                v-for="item in myArea"
                                :key="item.areaCode"
                                :label="item.area"
                                :value="item.areaCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item  size="mini">
                    <el-button type="primary" @click="confirmAdd"><i class="el-icon-check"></i> {{$t('commodity.Submit')}}</el-button>
                    <el-button @click="isDialogShow"><i class="el-icon-close"></i> {{$t('commodity.cancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- Edit -->
        <el-dialog :visible.sync="spuShow" width="1000px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
        >
            <div style="height: 100%;margin-top: -50px">
                <div id="expressage" style="height: 10%">
                    <div class="headbox">
                        <el-input
                                size="mini"
                                style="width: 200px"
                                v-model="spu.searchForm.spuCode"
                                :placeholder="$t('Commodity.Commodity_number')"
                                class="searchbox"
                        />
                        <el-input
                                size="mini"
                                style="width: 200px"
                                v-model="spu.searchForm.spuName"
                                :placeholder="$t('Commodity.Commodity_name')"
                                class="searchbox"
                        />
                        <el-button
                                size="mini"
                                type="primary" style="height: 30px;margin-top: 14px;"
                                @click="spuQuery"
                        >
                            <i class="el-icon-search"/>
                            {{$t('Commodity.search')}}
                        </el-button
                        >
                        <el-button style="height: 30px;margin-top: 14px;"
                                   size="mini"
                                   type="primary" plain
                                   @click="spuReset"
                        >
                            <i class="el-icon-refresh"/>
                            {{$t('Commodity.Reset')}}
                        </el-button
                        >
                    </div>
                </div>
                <!-- table -->
                <el-table style="margin-left: 15px"
                          ref="listPowerSupplyTab"
                          :data="spu.tableData"
                          border
                          size="mini"
                          :stripe="true"
                          highlight-current-row
                          v-loading="spu.listLoading"
                          :default-sort = "{prop: 'data', order: 'descending'}">
                    <el-table-column
                            fixed="left"
                            label="ID"
                            type="index"
                            width="55"/>
                    <el-table-column :label="$t('Commodity.Commodity_number')" sortable prop="spuCode">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <div>{{ scope.row.spuCode}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('Commodity.Commodity_name')" sortable prop="shopName">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.shopName }}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('Commodity.shopName')" sortable prop="spuName">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.spuName }}</span>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('Commodity.Commodity_area')" width="150" sortable prop="areaCodeStr">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.areaCodeStr}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('Commodity.operation')" width="120">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary" plain
                                    @click="spuDetails(scope.row.spuId)"
                            >
                                {{$t('commodity.Choose')}}
                            </el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <!--img component-->
                <pagination  ref="paginationSpu"/>
            </div>
        </el-dialog>
        <!--img component-->
        <my-img ref="myImg"></my-img>
        <!--img operation-->
        <operation ref="operation"/>
        <!--img pagination-->
        <pagination  ref="pagination"/>
    </div>
</template>
<script>
    import Vue from "vue";
    import url from "api";
    import {eventBus} from "scripts/utils/BUS";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";
    import upOrOut from "@/component/upOrOut.vue";
    import myImg from "@/component/myImg.vue";
    import urls from "@/scripts/api";
    import qs from "qs";

    export default {
        components: {
            pagination,
            operation,
            upOrOut,
            myImg
        },
        data() {
            return {
                spu:{
                    listUrl: urls.goodsList_list,
                    eventBus: 'goodsList_eventBus',
                    searchForm: {approveStatus: 2},
                    detailData: {},
                    approveForm: {},
                    form: {},
                    tableData: [],
                },
                adsType:[],
                getLanguageUrl: urls.lang_list,
                getAreaUrl: urls.area_list,
                getLanguageBus: 'getLang_eventBus',
                getAreaBus: 'getArea_eventBus',
                myLanguage: [],
                myArea: [],
                title: this.$t('commodity.New'),
                form: {},
                dataBusName: 'goodsBus',
                eventBusName: 'goodsEventBus',
                sellerId: null,
                status: null,
                reason: null,
                STATUS: [
                    {
                        value: undefined,
                        label: this.$t('commodity.All')
                    },
                    {
                        value: 1,
                        label: this.$t('commodity.Exhibition')
                    },
                    {
                        value: 2,
                        label: this.$t('commodity.Not_show')
                    },
                ],
                detailData: {},
                tableData: [],
                searchForm: {},
                pickerOptions: {
                    shortcuts: [
                        {
                            text: "最近一周",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近一个月",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近三个月",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                isAddShow: false,
                spuShow: false,
                listLoading: false,
                // Add
                rules: {
                    spuId: [
                        {required: true, message: this.$t('commodity.input_ID')},
                    ],
                    adsTypeCode: [
                        {required: true, message: this.$t('commodity.input_Type')},
                    ],
                    adsStatus: [
                        {required: true, message: this.$t('commodity.Select_Status')},
                    ],
                    adsSeq: [
                        {required: true, message: this.$t('commodity.input_Sort')},
                        // {type: 'number', message: this.$t('commodity.input_number')},
                    ],
                    languageCode: [
                        {required: true, message: this.$t('commodity.Select_Language')}
                    ],
                    areaCode: [
                        {required: true, message: this.$t('commodity.Select_Area')}
                    ]
                }
                // Add
            };
        },
        watch: {
            form:{
                handler(val, oldVal) {
                    try {
                        this.form.adsSeq = val.adsSeq.replace(/\D/g, '');
                    } catch (e) {
                    }
                },
                deep: true //true 深度监听
            }
        },

        mounted() {
            eventBus.$on(this.dataBusName, (tableData) => {
                this.tableData = tableData;
            });
            eventBus.$on(this.eventBusName, () => {
                this.search();
            });
            eventBus.$on(this.spu.eventBus, (tableData) => {
                if (tableData) {
                    this.spu.listLoading = false;
                    this.spu.tableData = tableData;
                }
            });
            this.search();
            this.load();
        },

        methods: {
            spuDetails(id){
                this.spuShow = false;
                this.form.spuId = id;
            },

            openSpu(){
                this.spuShow = true;
                this.spuQuery();
            },

            spuQuery() {
                this.spu.listLoading = true;
                this.$nextTick(()=>{
                    this.$refs.paginationSpu.$query(this.spu.listUrl, this.spu.searchForm, this.spu.eventBus);
                })
            },

            spuReset() {
                this.spu.searchForm = {approveStatus:2};
                this.spuQuery();
            },

            // 类型(1 热销/2 最新)
            adsTypeMap(x) {
                return {
                    1: this.$t('shop.Sell_well'),
                    2: this.$t('shop.Newest')
                }[x]
            },
            //状态(1 展示/2 不展示)
            adsStatusMap(x) {
                return {
                    1: this.$t('shop.Exhibition'),
                    2: this.$t('shop.Not_show')
                }[x]
            },

            doDelete(id) {
                let delete_success = this.$t('commodity.delete_success');
                let Delete_failed = this.$t('commodity.Delete_failed');
                let s = qs.stringify({adsId: id});
                this.$axios.post(urls.platformAdsSpu_delete, s).then(res => {
                    this.$alert(delete_success, '', {
                        confirmButtonText: this.$t('commodity.OK'),
                        callback: () => {
                            this.search();
                        }
                    });
                }).catch((e) => {
                    this.$alert(Delete_failed, '', {
                        confirmButtonText:this.$t('commodity.OK'),
                    });
                    return false;
                });
            },


            startupOrOut(row, type) {
                let ids = [];
                ids[0] = row.id;
                let status;
                if (type === 'start_use') {
                    status = this.$START_USE
                } else {
                    status = this.$DISABLE
                }
                this.$refs.upOrOut.changeStatus(urls.shopStarOrStop, ids, status, this.eventBusName);
            },

            reset_() {
                this.searchForm = {};
                this.search();
            },


            search() {
                this.isEdit = false;
                this.$refs.pagination.$query(urls.platformAdsSpu_list, this.searchForm, this.dataBusName);
            },

            businessUrl(businessUrl) {
                if (businessUrl === 'sellerIdentityFrontUrl') {
                    businessUrl = this.detailData.sellerIdentityFrontUrl;
                } else if (businessUrl === 'sellerIdentityBackUrl') {
                    businessUrl = this.detailData.sellerIdentityBackUrl;
                } else {
                    businessUrl = this.detailData.sellerCompanyLicenseUrl;
                }
                this.$refs.myImg.isDialogShow( businessUrl);
            },
            //wrap dialog
            // Add
            isDialogShow() {
                this.title = this.$t('commodity.New');
                this.status = null;
                this.reason = null;
                this.isAddShow = this.isAddShow !== true;
                this.form = {}

            },
            edit(row) {
                this.title = this.$t('commodity.Edit');
                this.isEdit = true;
                this.isAddShow = this.isAddShow !== true;
                this.form = JSON.parse(JSON.stringify(row));
            },
            confirmAdd() {
                let text = this.$t('commodity.New_Successful');
                if (this.isEdit) {
                    text = this.$t('commodity.Edit_Successful')
                }
                let currentUrl = this.isEdit ? urls.platformAdsSpu_update : urls.platformAdsSpu_create;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let text1 = this.$t('commodity.input_ID');
                        if (this.form.spuId == undefined){
                            this.$alert(text1, '', {
                                confirmButtonText: this.$t('shop.OK'),
                            });
                            return
                        }
                        Vue.delete(this.form, 'createTime' );
                        Vue.delete(this.form, 'createTIme' );
                        Vue.delete(this.form, 'updateTime' );
                        Vue.delete(this.form, 'updateTIme' );
                        Vue.delete(this.form, 'createBy' );
                        Vue.delete(this.form, 'updateBy' );
                        let data = qs.stringify(this.form, {indices: false});
                        this.$axios.post(currentUrl, data).then(res => {
                            this.$alert(text, '', {
                                confirmButtonText: this.$t('commodity.OK'),
                                callback: () => {
                                    this.form = {}
                                    this.isDialogShow();
                                    this.search();
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            load() {
                eventBus.$on(this.getLanguageBus, (language) => {
                    let languageArray = [];
                    let arry = [];
                    for (let lang of language) {
                        if (arry.indexOf(lang.language) == -1) {
                            arry.push(lang.language);
                            languageArray.push(lang);
                        }
                    }

                    this.myLanguage = languageArray;
                });
                eventBus.$on(this.getAreaBus, (area) => {
                    let areaArray = [];
                    let arry = [];
                    for (let arrayValue of area) {
                        if (arry.indexOf(arrayValue.area) == -1) {
                            arry.push(arrayValue.area);
                            areaArray.push(arrayValue);
                        }
                    }
                    this.myArea = areaArray;
                });
                eventBus.$on('ads_list_bus', (adsType) => {
                    this.adsType = adsType;
                });
                this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus');
                this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus');
                this.$refs.operation.$noPageQuery(this.$url.ads_list, 'ads_list_bus');
            }
            // Add
        }
    };
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
            width: 10.6%;
        }
    }
</style>
