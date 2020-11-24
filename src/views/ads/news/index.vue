<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px;margin-left: 10px;">
            <div class="headbox">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="width:150px;height: 30px;margin-top: 18px;margin-left: 8px"
                        @click="open"
                >
                    <i class="el-icon-plus"/>
                    {{$t('Notice.Add')}}
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
                    :label="$t('Notice.Notice_ID')"
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column :label="$t('Notice.Notice_title')" sortable prop="newsTitle" width="200">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.newsTitle }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.Announcement_content')" sortable prop="newsContent" width="210">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.newsContent }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.Placement')" sortable prop="isHot" width="140">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{isHotMap( scope.row.isHot )}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.state')" sortable prop="newsStatus" width="140">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{newsStatusMap( scope.row.newsStatus )}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.Announcement_type')" sortable prop="newsContentType" width="200">
                <template slot-scope="scope">
                    <span size="medium">{{ newsContentTypeMap(scope.row.newsContentType) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.Corresponding_user_type')" sortable prop="newsTarget" width="220">
                <template slot-scope="scope">
                    <span size="medium">{{ newsTargetMap(scope.row.newsTarget) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.Bulletin_category')" sortable prop="newsType" width="200">
                <template slot-scope="scope">
                    <span size="medium">{{ newsTypeMap(scope.row.newsType) }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.Bulletin_link')" sortable prop="newsContentUrl" width="140">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.newsContentUrl }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.Language')" sortable prop="languageCodeStr" width="140">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.languageCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Notice.region')" sortable prop="areaCodeStr" width="140">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('Notice.Creation_time')" sortable prop="createTime" width="160">
                <template slot-scope="scope">
                    <span size="medium">{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>

            <!-- operation -->
            <el-table-column fixed="right" :label="$t('Notice.operation')" width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary" plain
                            style="margin-right: 10px"
                            @click="edit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                        {{$t('Notice.edit')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('Notice.OK')"
                            :cancelButtonText="$t('Notice.cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('Notice.Whether')"
                            @onConfirm="doDelete(scope.row.newsId)"
                    >
                        <el-button
                                slot="reference"
                                size="mini"
                                type="danger"
                                v-if="$platformRole==1"
                        >
                            <i class="el-icon-delete"/>
                            {{$t('Notice.delete')}}
                        </el-button
                        >
                    </el-popconfirm>

                </template>
            </el-table-column>
            <!-- operation -->

        </el-table>

        <!--pagination component-->
        <pagination ref="pagination"/>
        <!--upOrOut component-->
        <upOrOut ref="upOrOut"/>
        <!--check component-->

        <!-- Edit -->
        <el-dialog :visible.sync="isAddShow" width="600px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :close-on-press-escape="false"
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="200px" :rules="rules" center>
                <el-form-item :label="$t('Notice.notice_title')" required prop="newsTitle">
                    <el-input size="mini" v-model="form.newsTitle" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Notice.corresponding_user_type')" required prop="newsTarget" label-width="">
                    <el-select size="mini" v-model="form.newsTarget" :placeholder="$t('Notice.Choice_User')">
                        <el-option :label="$t('Notice.seller')" :value="1"></el-option>
                        <el-option :label="$t('Notice.Buyer')" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Notice.bulletin_category')" required prop="newsType" label-width="">
                    <el-select size="mini" v-model="form.newsType" :placeholder="$t('Notice.Choice_Category')">
                        <el-option :label="$t('Notice.home_page')" :value="1"/>
                        <el-option :label="$t('Notice.Category')" :value="2"/>
                        <el-option :label="$t('Notice.Area')" :value="3"/>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Notice.announcement_type')" required prop="newsContentType" label-width="">
                    <el-select size="mini" v-model="form.newsContentType" :placeholder="$t('Notice.Choice_Type')">
                        <el-option :label="$t('Notice.Text_announcement')" :value="1"></el-option>
                        <el-option :label="$t('Notice.Link_announcement')" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Notice.announcement_content')" required prop="newsContent">
                    <el-input size="mini" maxlength="50" v-model="form.newsContent" resize="none" type="textarea"></el-input>
                </el-form-item>

                <el-form-item v-if="form.newsContentType === 2" :label="$t('Notice.bulletin_link')" required >
                    <el-col :span="16">
                        <el-input size="mini" style="width: 200px" :disabled="true" v-model="form.newsContentUrl"/>
                    </el-col>
                    <el-col :span="8">
                        <el-button size="mini" type="primary" @click="openStore">
                            {{$t('Notice.article')}}
                        </el-button>
                    </el-col>
                </el-form-item>

                <el-form-item :label="$t('Notice.placement')"  required prop="isHot">
                    <el-radio-group size="mini" v-model="form.isHot">
                        <el-radio :label="1">{{$t('Notice.Yes')}}</el-radio>
                        <el-radio :label="2">{{$t('Notice.No')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('Notice.State')" required prop="newsStatus">
                    <el-radio-group size="mini" v-model="form.newsStatus">
                        <el-radio :label="1">{{$t('Notice.Release')}}</el-radio>
                        <el-radio :label="2">{{$t('Notice.Unpublished')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('Notice.language')" required prop="languageCode" label-width="">
                    <el-select size="mini" v-model="form.languageCode" filterable :placeholder="$t('Class.Select_lang')"
                               >
                        <el-option
                                v-for="item in myLanguage"
                                :key="item.language"
                                :label="item.language"
                                :value="item.languageCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Notice.Region')" required prop="areaCode" label-width="">
                    <el-select size="mini" v-model="form.areaCode" filterable :placeholder="$t('Payment.select_area')" >
                        <el-option
                                v-for="item in myArea"
                                :key="item.areaCode"
                                :label="item.area"
                                :value="item.areaCode"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="confirmAdd"><i class="el-icon-check"></i> {{$t('Notice.Submit')}}</el-button>
          <el-button @click="isDialogShow"><i class="el-icon-close"></i> {{$t('Notice.cancel')}}</el-button>
      </span>
        </el-dialog>

        <el-dialog :visible.sync="shopShow" width="1000px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
        >
            <div style="height: 100%;margin-top: -50px">
                <!-- search -->
                <div id="expressage" style="height: 60px">
                    <div class="headbox">
                        <el-input
                                style="width: 150px"
                                size="mini"
                                v-model="article.searchForm.title"
                                placeholder="标题"
                                class="searchbox"
                        />
                        <el-input
                                style="width: 150px"
                                size="mini"
                                v-model="article.searchForm.author"
                                placeholder="作者"
                                class="searchbox"
                        />

                        <el-date-picker style="width: 240px"
                                        size="mini"
                                        class="searchbox"
                                        v-model="searchForm.times"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        :range-separator="$t('seller.To')"
                                        :start-placeholder="$t('seller.start_time')"
                                        :end-placeholder="$t('seller.End_time')"
                                        align="right"
                        />
                        <el-button
                                size="mini"
                                type="primary" style="height: 30px;margin-top: 14px;"
                                @click="storeQuery"
                        >
                            <i class="el-icon-search"/>
                            {{$t('seller.search')}}</el-button
                        >
                        <el-button style="height: 30px;margin-top: 14px;"
                                   size="mini"
                                   type="primary" plain
                                   @click="storeReset"
                        >
                            <i class="el-icon-refresh"/>
                            {{$t('seller.Reset')}}</el-button
                        >
                    </div>
                </div>
                <!-- table -->
                <el-table style="margin-left: 15px;" size="mini"
                          ref="listPowerSupplyTab_"
                          :data="article.tableData"
                          border
                          :stripe="true"
                          highlight-current-row
                          v-loading="article.listLoading"
                          :default-sort = "{prop: 'data', order: 'descending'}">
                    <el-table-column
                            fixed="left"
                            label="ID"
                            type="index"
                            width="55"/>
                    <el-table-column label="标题" sortable prop="title" width="">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.title}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="作者" sortable prop="author" width="">
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{ scope.row.author }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="发表时间" sortable prop="publishTime" width="" >
                        <template slot-scope="scope">
                            <div slot="reference" class="name-wrapper">
                                <span size="medium">{{scope.row.publishTime}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" :label="$t('Shop.operation')" width="">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary" plain
                                    @click="storeDetails(scope.row.articleId)"
                            >
                                {{$t('shop.choose')}}</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <!--img component-->
                <pagination  ref="pagination"/>
            </div>
        </el-dialog>
        <!-- Edit -->
        <my-img ref="myImg"></my-img>
        <!--operation component-->
        <operation ref="operation"/>
    </div>
</template>
<script>
    import Moment from "moment";
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
                article: {
                    Status : [
                        {
                            label:"未发布",
                            value:0
                        },
                        {
                            label:"发布",
                            value:1
                        },

                    ],
                    eventBusUpload_bus:'article_eventBusUpload_bus',
                    fileList:[],
                    tableData: [],
                    //--------------need to edit
                    list_url:urls.article_list,
                    create_url:urls.article_create,
                    update_url:urls.article_update,
                    delete_url:urls.article_delete,
                    eventBus:'article_eventBus',
                    editTitle:"编辑文章",
                    addTitle:"新增文章",
                    shopShow: false,
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
                    isShow: false,
                    listLoading: false,
                    searchForm: {articleStatus:1},
                    idType:'articleId',
                    usePagination:true,
                    },


                    searchForm: {},
                    PickerOptions: {
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
                    shopShow: false,
                    listUrl: urls.platformAdsNews_list,
                    createUrl: urls.platformAdsNews_create,
                    deleteUrl: urls.platformAdsNews_delete,
                    updateUrl: urls.platformAdsNews_update,
                    queryById: urls.platformAdsNews_queryById,
                    eventBus: 'platformAdsNews_eventBus',
                    idType: 'newsId',
                    getLanguageUrl: urls.lang_list,
                    getAreaUrl: urls.area_list,

                getLanguageBus: 'getLang_eventBus',
                getAreaBus: 'getArea_eventBus',
                myLanguage: [],
                myArea: [],
                title: this.$t('Notice.Newly_added'),
                form: {},
                dataBusName: 'goodsBus',
                eventBusName: 'goodsEventBus',
                sellerId: null,
                status: null,
                reason: null,
                STATUS: [
                    {
                        value: -1,
                        label: this.$t('Notice.All')
                    },
                    {
                        value: 0,
                        label: this.$t('Notice.Pending')
                    },
                    {
                        value: 1,
                        label: this.$t('Notice.Pass')
                    },
                    {
                        value: 2,
                        label: this.$t('Notice.Failed')
                    },
                ],
                detailData: {},
                tableData: [],
                searchForm: {},
                pickerOptions: {
                    shortcuts: [
                        {
                            text: this.$t('Notice.Last_week'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('Notice.Last_month'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('Notice.Last_three_months'),
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
                listLoading: false,
                rules: {
                    newsTitle: [
                        {required: true, message: this.$t('Notice.Choice_content')},
                    ],
                    newsTarget: [
                        {required: true, message: this.$t('Notice.corresponding_user_type')},
                    ],
                    newsType: [
                        {required: true, message: this.$t('Notice.Choice_Category')}
                    ],
                    newsContentType: [
                        {required: true, message: this.$t('Notice.Choice_Type')}
                    ],
                    newsContent: [
                        {required: true, message: this.$t('Notice.input_top')}
                    ],
                    newsContentUrl: [
                        {required: true, message: this.$t('Notice.input_link')}
                    ],
                    isHot: [
                        {required: true, message: this.$t('Notice.placement')}
                    ],
                    newsStatus: [
                        {required: true, message: this.$t('Notice.Select_status')}
                    ],
                    languageCode: [
                        {required: true, message: this.$t('shop.Select_Language')}
                    ],
                    areaCode: [
                        {required: true, message: this.$t('shop.Select_Area')}
                    ]
                }
            };
        },

        mounted() {
            eventBus.$on(this.dataBusName, (tableData) => {
                this.tableData = tableData;
            });
            eventBus.$on(this.eventBusName, () => {
                this.search();
            });
            eventBus.$on(this.article.eventBus, (tableData) => {
                if (tableData) {
                    this.article.listLoading = false;
                    this.article.tableData = tableData;
                }
            });
            this.search();
            this.load();
        },

        methods: {
            open(){
                this.isAddShow = true;
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                })
            },
            state(x) {
                // 文章状态
                return {1: "发布", 0: "未发布"}[x]
            },
            storeDetails(id){
                this.shopShow = false;
                this.form.newsContentUrl = id;
            },
            storeReset() {
                this.article.searchForm = {};
                this.storeQuery();
            },
            storeQuery() {
                this.article.listLoading = true;
                this.$refs.pagination.$query(this.article.list_url, this.article.searchForm, this.article.eventBus);
            },
            openStore(){
                this.shopShow = true;
                this.storeQuery();
            },
            newsTargetMap(x) {
                // 对应用户类型（1 商家/2 买家）
                return {1: this.$t('Notice.seller'), 2: this.$t('Notice.Buyer')}[x]
            },
            newsTypeMap(x) {
                // 公告类目(1 首页/2 类目/3 地区)
                return {1: this.$t('Notice.home_page'), 2: this.$t('Notice.Category'), 3: this.$t('Notice.Area')}[x]
            },
            newsContentTypeMap(x) {
                // 公告类型（1 文字公告/2 链接公告）
                return {1: this.$t('Notice.Text_announcement'), 2: this.$t('Notice.Link_announcement')}[x]
            },
            isHotMap(x) {
                // 是否置顶
                return {1: this.$t('Notice.Yes'), 2: this.$t('Notice.No')}[x]
            },
            newsStatusMap(x) {
                //状态(发布/未发布)
                return {1: this.$t('Notice.Release'), 2: this.$t('Notice.Unpublished')}[x]
            },
            doDelete(id) {
                let Delete_Successful = this.$t('Notice.Delete_Successful');
                let Delete_failed = this.$t('Notice.Delete_failed');
                let s = qs.stringify({newsId:id});
                this.$axios.post(urls.platformAdsNews_delete,s ).then(res => {
                    this.$alert(Delete_Successful, '', {
                        confirmButtonText: this.$t('Notice.OK'),
                        callback: () => {
                            this.search();
                        }
                    });
                }).catch((e) => {
                    this.$alert(Delete_failed, '', {
                        confirmButtonText: this.$t('Notice.OK'),
                    });
                    return false;
                });
            },
            clearValidate() {
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                })
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
                this.searchForm.sellerCompanyName = null,
                    this.searchForm.sellerContactPerson = null,
                    this.searchForm.sellerContactPhone = null,
                    this.searchForm.sellerApproveStatus = -1,
                    this.searchForm.times = null
            },

            buildParam() {
                let formParam = {};
                if (this.searchForm.sellerCompanyName) {
                    formParam.sellerCompanyName = this.searchForm.sellerCompanyName;
                }
                if (this.searchForm.sellerContactPerson) {
                    formParam.sellerContactPerson = this.searchForm.sellerContactPerson;
                }
                if (this.searchForm.sellerContactPhone) {
                    formParam.phone = this.searchForm.sellerContactPhone;
                }
                if (this.searchForm.sellerApproveStatus) {
                    formParam.status = this.searchForm.sellerApproveStatus;
                }
                if (this.searchForm.times != undefined) {
                    let time1 = this.searchForm.times[0];
                    let time2 = this.searchForm.times[1];
                    formParam.startTime = Moment(time1).format("YYYY-MM-DD");
                    formParam.endTime = Moment(time2).format("YYYY-MM-DD");
                }
                return formParam;
            },

            search() {
                this.isEdit = false;
                this.$refs.pagination.$query(urls.platformAdsNews_list, this.buildParam(), this.dataBusName);
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
            isDialogShow() {
                this.title = this.$t('Notice.Newly_added');
                this.form = {};
                this.clearValidate();
                this.isAddShow = this.isAddShow !== true;
            },
            edit(row) {
                this.title = this.$t('Notice.Edit_Notice');
                this.isEdit = true;
                this.isAddShow = this.isAddShow !== true;
                this.form = JSON.parse(JSON.stringify(row));
                // this.form.newsType = this.form.newsType.toString();
            },
            confirmAdd() {

                let text = this.$t('Notice.New');
                if (this.isEdit) {
                    text = this.$t('Notice.Edit')
                }
                let currentUrl = this.isEdit?urls.platformAdsNews_update:urls.platformAdsNews_create;
                this.isEdit = false;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        Vue.delete(this.form, 'createTime' );
                        Vue.delete(this.form, 'createTIme' );
                        Vue.delete(this.form, 'updateTime' );
                        Vue.delete(this.form, 'updateTIme' );
                        Vue.delete(this.form, 'createBy' );
                        Vue.delete(this.form, 'updateBy' );
                        let data = qs.stringify(this.form, {indices: false});
                        this.$axios.post(currentUrl, data).then(res => {
                            this.$alert(text, '', {
                                confirmButtonText: this.$t('Notice.OK'),
                                callback: () => {
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
                this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus');
                this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus');
            },
        }
    };
</script>
<style lang="scss" scoped>
    #expressage {
        .spacing {
            margin-bottom: 2px;
        }
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
