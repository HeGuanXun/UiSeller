<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px;margin-top: 14px;">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.shopId"
                        :placeholder="$t('shop.Shop_ID')"
                        class="searchbox"
                />
                <el-select
                        size="mini"
                        v-model="searchForm.adsStatus"
                        :placeholder="$t('shop.state')"
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
                    {{$t('shop.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset_()"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('shop.Reset')}}
                </el-button>

                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-Left: 12px;margin-top: 14px;"
                        @click="isAddShow=true"
                >
                    <i class="el-icon-plus"/>
                    {{$t('shop.Add_recommended_store')}}
                </el-button
                >
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
                    width="55">
            </el-table-column>
            <el-table-column :label="$t('shop.type')" sortable prop="adsTypeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.adsTypeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('shop.Shop_ID')" sortable prop="shopId" width="240">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.shopId }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('shop.Shop_name')" sortable prop="shopNameStr" width="240">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.shopNameStr }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('shop.state')" sortable prop="adsStatus" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ adsStatusMap(scope.row.adsStatus) }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('shop.Sort')" sortable prop="adsSeq" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.adsSeq }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('shop.Language')" sortable prop="languageCodeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.languageCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('shop.Area')" sortable prop="areaCodeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('shop.operation')" width="240">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary" plain
                            style="margin-right: 10px"
                            @click="edit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                        {{$t('shop.edit')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('shop.OK')"
                            :cancelButtonText="$t('shop.cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('shop.Whether_Delete')"
                            @onConfirm="doDelete(scope.row.adsId)"
                    >
                        <el-button
                                slot="reference"
                                size="mini"
                                type="danger"
                                v-if="$platformRole==1"
                        ><i class="el-icon-delete"/>
                            {{$t('shop.delete')}}
                        </el-button
                        >
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <!--pagination component-->
        <pagination ref="pagination"/>
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
            <el-form-item :label="$t('shop.shop_ID')" required >
                <el-col :span="16">
                    <el-input size="mini" style="width: 200px" :disabled="true" v-model="form.shopId"/>
                </el-col>
                <el-col :span="8">
                    <el-button size="mini" type="primary" @click="openStore">
                        {{$t('shop.select')}}
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

            <el-form-item  size="mini" :label="$t('shop.sort')" required prop="adsSeq" label-width="120px">
                <el-input maxlength="4" min="1" size="mini" v-model="form.adsSeq"></el-input>
            </el-form-item>

            <el-form-item  size="mini" :label="$t('shop.State')" required prop="adsStatus">
                <el-radio-group v-model="form.adsStatus">
                    <el-radio :label="1">{{$t('shop.Exhibition')}}</el-radio>
                    <el-radio :label="2">{{$t('shop.Not_show')}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item  size="mini" :label="$t('shop.language')" required prop="languageCode" label-width="120px">
                <el-select  v-model="form.languageCode" filterable :placeholder="$t('Class.Select_lang')"
                           size="mini">
                    <el-option
                            v-for="item in myLanguage"
                            :key="item.language"
                            :label="item.language"
                            :value="item.languageCode"
                    />
                </el-select>
            </el-form-item>
            <el-form-item   :label="$t('shop.area')" required prop="areaCode" label-width="120px">
                <el-select v-model="form.areaCode" filterable :placeholder="$t('Payment.select_area')" size="mini">
                    <el-option
                            v-for="item in myArea"
                            :key="item.areaCode"
                            :label="item.area"
                            :value="item.areaCode"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="confirmAdd"><i class="el-icon-check"></i> {{$t('shop.Submit')}}
                </el-button>
                <el-button  @click="isDialogShow"><i class="el-icon-close"></i>{{$t('shop.cancel')}}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

        <el-dialog :visible.sync="shopShow" width="1000px"
                   :close-on-click-modal="false"
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
                                :placeholder="$t('Shop.Shop_name')"
                                class="searchbox"
                        />
                        <el-date-picker style="width: 240px"
                                        size="mini"
                                        class="searchbox"
                                        v-model="store.searchForm.times"
                                        type="datetimerange"
                                        :picker-options="store.pickerOptions"
                                        :range-separator="$t('Shop.To')"
                                        :start-placeholder="$t('Shop.start_time')"
                                        :end-placeholder="$t('Shop.End_time')"
                                        align="right"
                        />
                        <el-button
                                size="mini" plain
                                type="primary" style="height: 30px;margin-top: 14px;"
                                @click="storeQuery"
                        >
                            <i class="el-icon-search"/>
                            {{$t('Shop.search')}}</el-button
                        >
                        <el-button style="height: 30px;margin-top: 14px;"
                                   size="mini"
                                   type="primary" plain
                                   @click="storeReset"
                        >
                            <i class="el-icon-refresh"/>
                            {{$t('Shop.Reset')}}</el-button
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
                    <el-table-column :label="$t('Shop.Shop_name')" sortable prop="shopName">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.shopName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('Shop.Brand_name')" sortable prop="brandName">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.brandName }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('Shop.Shop_address')" sortable prop="shopAddressProvince">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.shopAddressCountry+scope.row.shopAddressProvince+scope.row.shopAddressCity+scope.row.shopAddressDetail}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('Shop.Application_time')" width="160" sortable prop="createTime">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.createTime }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('Shop.operation')" width="120">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary" plain
                                    @click="storeDetails(scope.row.shopId)"
                            >
                                {{$t('shop.choose')}}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <!--img component-->
                <pagination ref="paginationShop"/>
            </div>
        </el-dialog>

        <!--img component-->
        <my-img ref="myImg"></my-img>
        <operation ref="operation"/>
    </div>
</template>
<script>
    import Moment from "moment";
    import url from "api";
    import {eventBus} from "scripts/utils/BUS";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";

    import upOrOut from "@/component/upOrOut.vue";
    import myImg from "@/component/myImg.vue";
    import urls from "@/scripts/api";
    import qs from "qs";
    import Vue from "vue";

    export default {
        components: {
            pagination,
            operation,
            upOrOut,
            myImg
        },
        data() {
            return {
                store:{
                    usePagination: true,
                    searchForm: {approveStatus:1},
                    listUrl: urls.storeList_list,
                    findByIdUrl: urls.storeList_findById,
                    reviewUrl: urls.storeList_review,
                    eventBus: 'storeList_eventBus',
                    idType: 'shopId',
                    dataBusName: 'storeBusList',
                    eventBusName: 'storeListEventBus',
                    detailData: {},
                    tableData: [],
                    approveForm: {},
                    pickerOptions: {
                        shortcuts: [
                            {
                                text: this.$t('Shop.Last_week'),
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                    picker.$emit("pick", [start, end]);
                                }
                            },
                            {
                                text: this.$t('Shop.Last_month'),
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                    picker.$emit("pick", [start, end]);
                                }
                            },
                            {
                                text: this.$t('Shop.Last_three_months'),
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                    picker.$emit("pick", [start, end]);
                                }
                            }
                        ]
                    },
                    Status: [
                        {
                            label: this.$t('Shop.Pending'),
                            value: 0
                        },
                        {
                            label: this.$t('Shop.Pass'),
                            value: 1
                        },
                        {
                            label: this.$t('Shop.refuse'),
                            value: -1
                        },

                    ],
                    status: [
                        {
                            label: this.$t('Shop.pass'),
                            value: 1
                        },
                        {
                            label: this.$t('Shop.No'),
                            value: -1
                        },

                    ],
                    STATUS: this.$t('Shop.Choice'),
                    success_text: this.$t('Shop.Success'),
                    Null: this.$t('Shop.Null'),
                    listLoading: false,
                },
                usePagination: true,
                getLanguageUrl: urls.lang_list,
                getAreaUrl: urls.area_list,
                getLanguageBus: 'getLang_eventBus',
                getAreaBus: 'getArea_eventBus',
                myLanguage: [],
                myArea: [],
                title: this.$t('shop.New'),
                form: {},
                dataBusName: 'goodsBus',
                eventBusName: 'goodsEventBus',
                sellerId: null,
                status: null,
                reason: null,
                STATUS: [
                    {
                        value: undefined,
                        label: this.$t('shop.All')
                    },
                    {
                        value: 1,
                        label: this.$t('shop.Exhibition')
                    },
                    {
                        value: 2,
                        label: this.$t('shop.Not_show')
                    },

                ],
                adsType: [],
                detailData: {},
                tableData: [],
                searchForm: {},
                pickerOptions: {
                    shortcuts: [
                        {
                            text: this.$t('shop.Last_week'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('shop.Last_month'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('shop.Last_three_months'),
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
                shopShow: false,
                listLoading: false,
                // Add
                rules: {
                    shopId: [
                        {required: true, message: this.$t('shop.input_ID'), trigger: "change"},
                    ],
                    adsTypeCode: [
                        {required: true, message: this.$t('shop.input_Type')},
                    ],
                    adsStatus: [
                        {required: true, message: this.$t('shop.Select_Status')},
                    ],
                    adsSeq: [
                        {required: true, message: this.$t('shop.input_Sort')},
                        // {type: 'number', message: this.$t('shop.input_number')},
                    ],
                    languageCode: [
                        {required: true, message: this.$t('shop.Select_Language')}
                    ],
                    areaCode: [
                        {required: true, message: this.$t('shop.Select_Area')}
                    ]
                }
                // Add
            };
        }
        ,
        watch: {
            form:{
                handler(val, oldVal) {
                    try {
                        this.form.adsSeq = val.replace(/\D/g, '');
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
            eventBus.$on(this.store.eventBus, (tableData) => {
                if (tableData) {
                    this.store.listLoading = false;
                    this.store.tableData = tableData;
                }
            });
            this.search();

            this.load();
        },

        methods: {
            storeDetails(id){
                this.shopShow = false;
                this.form.shopId = id;
            },

            openStore(){
              this.storeQuery();
              this.shopShow = true;
            },

            storeQuery() {
                this.store.listLoading = true;
                this.$nextTick(()=>{
                    this.$refs.paginationShop.$query(this.store.listUrl, this.store.searchForm, this.store.eventBus);
                })
            },

            storeReset() {
                this.store.searchForm = {approveStatus:1};
                this.storeQuery();
            },

            adsTypeCodeMap(x) {
                // 类型(1 热销/2 最新)
                return {
                    1: this.$t('shop.Sell_well'),
                    2: this.$t('shop.Newest')
                }[x]
            }
            ,
            adsStatusMap(x) {
                // 状态(1 展示/2 不展示)
                return {
                    1: this.$t('shop.Exhibition'),
                    2: this.$t('shop.Not_show')
                }[x]
            }
            ,
            doDelete(id) {
                let delete_Success = this.$t('shop.delete_success');
                let Delete_failed = this.$t('shop.Delete_failed');
                let s = qs.stringify({adsId: id});
                this.$axios.post(urls.platformAdsShop_delete, s).then(res => {
                    this.$alert(delete_Success, '', {
                        confirmButtonText: this.$t('shop.OK'),
                        callback: () => {
                            this.search();
                        }
                    });
                }).catch((e) => {
                    this.$alert(Delete_failed, '', {
                        confirmButtonText: this.$t('shop.OK'),
                    });
                    return false;
                });
            }
            ,

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
            }
            ,

            reset_() {
                this.searchForm = {};
                this.search();
            }
            ,

            buildParam() {
                if (this.searchForm.times) {
                    let time1 = this.searchForm.times[0];
                    let time2 = this.searchForm.times[1];
                    this.searchForm.startTime = Moment(time1).format("YYYY-MM-DD");
                    this.searchForm.endTime = Moment(time2).format("YYYY-MM-DD");
                }
                return this.searchForm;
            }
            ,

            search() {
                this.isEdit = false;
                this.$refs.pagination.$query(urls.platformAdsShop_list, this.buildParam(), this.dataBusName);
            }
            ,

            businessUrl(businessUrl) {
                if (businessUrl === 'sellerIdentityFrontUrl') {
                    businessUrl = this.detailData.sellerIdentityFrontUrl;
                } else if (businessUrl === 'sellerIdentityBackUrl') {
                    businessUrl = this.detailData.sellerIdentityBackUrl;
                } else {
                    businessUrl = this.detailData.sellerCompanyLicenseUrl;
                }
                this.$refs.myImg.isDialogShow(businessUrl);
            }
            ,
            //wrap dialog

            // Add
            isDialogShow() {
                this.title = this.$t('shop.New');
                this.status = null;
                this.reason = null;
                this.isAddShow = this.isAddShow !== true;
                this.form = {}
            }
            ,
            edit(row) {
                this.title = this.$t('shop.Edit');
                this.isEdit = true;
                this.isAddShow = true;
                this.form = JSON.parse(JSON.stringify(row));
            }
            ,
            confirmAdd() {
                let text = this.$t('shop.New_Successful');
                if (this.isEdit) {
                    text = this.$t('shop.Edit_Successful')
                }
                let currentUrl = this.isEdit ? urls.platformAdsShop_update : urls.platformAdsShop_create;

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let text1 = this.$t('shop.input_ID');
                        if (this.form.shopId == undefined){
                            this.$alert(text1, '', {
                                confirmButtonText: this.$t('shop.OK'),
                            });
                            return
                        }
                        Vue.delete(this.form, 'createTime');
                        Vue.delete(this.form, 'createTIme');
                        Vue.delete(this.form, 'updateTime');
                        Vue.delete(this.form, 'updateTIme');
                        Vue.delete(this.form, 'createBy');
                        Vue.delete(this.form, 'updateBy');
                        let data = qs.stringify(this.form, {indices: false});
                        this.$axios.post(currentUrl, data).then(res => {
                            this.$alert(text, '', {
                                confirmButtonText: this.$t('shop.OK'),
                                callback: () => {
                                    this.isDialogShow();
                                    this.search();
                                    this.form = {}
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
            }
            ,
            // Add
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
            ,
        }
    }
    ;
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
