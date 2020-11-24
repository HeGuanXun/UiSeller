<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.shopName"
                        :placeholder="$t('Shop.Shop_name')"
                        class="searchbox"
                />

                <el-select
                        size="mini"
                        v-model="searchForm.approveStatus"
                        :placeholder="$t('Shop.state')"
                        class="searchbox"
                >
                    <el-option
                            size="mini"
                            v-for="item in Status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
                <el-date-picker style="width: 240px"
                                size="mini"
                                class="searchbox"
                                v-model="searchForm.times"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                :range-separator="$t('Shop.To')"
                                :start-placeholder="$t('Shop.start_time')"
                                :end-placeholder="$t('Shop.End_time')"
                                align="right"
                />
                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 14px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{$t('Shop.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('Shop.Reset')}}
                </el-button
                >

            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px;"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  height="680"
                  :stripe="true"
                  highlight-current-row
                  v-loading="listLoading"
                  :default-sort = "{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    label="ID"
                    type="index"
                    width="50"/>
            <el-table-column :label="$t('Shop.Shop_name')" sortable prop="shopName" width="230">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.shopName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Shop.brandName_')" sortable prop="brandName" width="230">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.brandNameStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Shop.brandName')" sortable prop="brandName" width="230">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.brandName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Shop.Shop_address')" sortable prop="shopAddressCountry" width="230">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.shopAddressCountry+scope.row.shopAddressProvince+scope.row.shopAddressCity+scope.row.shopAddressDetail}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Shop.region')" sortable prop="areaCodeStr" width="230">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Shop.state')" sortable prop="approveStatus" width="230">
                <template slot-scope="scope">
                    <div>{{ $platform_status_vo[scope.row.approveStatus + 1].label }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Shop.Audit_reason')" sortable prop="approveCause" width="230">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium" v-if="scope.row.approveStatus===-1">{{ scope.row.approveCause }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Shop.Application_time')" sortable prop="createTime" width="230">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.createTime }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Shop.operation')" width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary" plain
                            @click="details(scope.row.shopId)"
                    >
                        {{$t('Shop.Audit')}}
                    </el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!--check component-->
        <el-dialog :visible.sync="isShow" width="500px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   :close-on-press-escape="false"
                   center
                   :title="$t('Shop.Audit')"
        >
            <table style="border-collapse:separate; border-spacing:10px;margin-top: -20px;width: 400px" border="0">
                <tr style="width: 100%;margin-top: 15px" v-if="detailData.brandNameStr">
                    <td style="text-align: right;width: 40%">{{$t('Shop.brandName_')}}:</td>
                    <td style="text-align: left;width: 60%">{{ this.detailData.brandNameStr}}</td>
                </tr>
                <tr style="width: 100%;margin-top: 15px" v-if="detailData.brandName">
                    <td style="text-align: right;width: 40%">{{$t('Shop.brandName')}}:</td>
                    <td style="text-align: left;width: 60%">{{ this.detailData.brandName}}</td>
                </tr>
                <tr  v-if="detailData.brandName">
                    <td style="text-align: right">{{$t('Shop.Icon')}}:</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="businessUrl('brandIcon')">
                            {{$t('Shop.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Shop.Shop_name')}}:</td>
                    <td style="text-align: left">{{ this.detailData.shopName }}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Shop.Logo')}}:</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="businessUrl('shopLogo')">
                            {{$t('Shop.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Shop.cover')}}:</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="businessUrl('shopCover')">
                            {{$t('Shop.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Shop.describe')}}:</td>
                    <td style="text-align: left">{{ this.detailData.shopDescription}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Shop.Keyword')}}:</td>
                    <td style="text-align: left">{{ this.detailData.shopKeywords}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Shop.Notice')}}:</td>
                    <td style="text-align: left">{{ this.detailData.shopNotice}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Shop.Shop_address')}}:</td>
                    <td style="text-align: left">{{ this.detailData.shopAddressDetail}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Shop.License')}}:</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="businessUrl('shopBusinessLicense')">
                            {{$t('Shop.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr v-if="detailData.areaCodeStr">
                    <td style="text-align: right">{{$t('Shop.region')}}:</td>
                    <td style="text-align: left">{{ this.detailData.areaCodeStr}}</td>
                </tr>
                <tr v-if="this.isShow">
                    <td style="text-align: right">{{$t('Shop.state')}}:</td>
                    <td v-if="this.detailData.approveStatus !== 1" style="text-align: left;color: red">
                        {{$platform_status_vo[this.detailData.approveStatus+1].label}}
                    </td>
                    <td v-else style="text-align: left;color: chartreuse">
                        {{$platform_status_vo[this.detailData.approveStatus+1].label}}
                    </td>

                </tr>
            </table>
            <div style="text-align: center;margin-top: 15px">
                <el-select v-model="approveForm.approveStatus" :placeholder="$t('Shop.Choice')" size="mini"
                           style="width: 75%;">
                    <el-option
                            v-for="item in status"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input
                        maxlength="20"
                        style="margin-top:15px;width: 75%"
                        resize="none"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('Shop.failed')"
                        v-model="approveForm.approveCause"
                        v-if="approveForm.approveStatus === -1"
                />
            </div>
            <span slot="footer" class="dialog-footer">

        <el-button type="primary" @click="confirmApprove"><i
                class="el-icon-check"></i>{{$t('currency.Determine')}}</el-button>
        <el-button @click="isDialogShow"><i class="el-icon-close"></i>{{$t('currency.cancel')}}</el-button>
      </span>
            <my-img ref="myImg"></my-img>
        </el-dialog>
        <!--img component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation ref="operation"/>
        <!--img component-->
        <my-img ref="myImg"/>
    </div>
</template>
<script>
    import Moment from "moment";
    import url from "api";
    import {eventBus} from "scripts/utils/BUS";
    import pagination from "@/component/pagination.vue";
    import useOrStop from "@/component/useOrStop.vue";
    import myImg from "@/component/myImg.vue";
    import urls from "@/scripts/api";
    import operation from "@/component/operation.vue";
    import qs from "qs";

    export default {
        components: {
            pagination,
            useOrStop,
            myImg,
            operation
        },
        data() {
            return {
                listUrl: urls.storeList_list,
                findByIdUrl: urls.storeList_findById,
                reviewUrl: urls.storeList_review,
                listAllUrl: urls.storeList_listAll,
                eventBus: 'storeList_eventBus',
                idType: 'shopId',
                dataBusName: 'storeBusList',
                eventBusName: 'storeListEventBus',
                usePagination: true,
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
                searchForm: {},
                isShow: false,
                listLoading: false,
            };
        },

        mounted() {
            eventBus.$on(this.eventBus, (tableData) => {
                if (tableData) {
                    this.listLoading = false;
                    this.tableData = tableData;
                } else {
                    this.usePagination ? this.query() : this.noPageQuery();
                }
                this.isShow = false;
            });
            //Whether or not to use paging queries
            this.usePagination ? this.query() : this.noPageQuery();
            // add
        },

        methods: {
            details(id) {
                this.isShow = true;
                this.approveForm = {shopId: id};
                let data = qs.stringify(this.approveForm, {indices: false});
                this.$axios.post(this.findByIdUrl, data).then(res => {
                    this.detailData = res.data.data;
                });
            },

            reset() {
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            sellerDetail(id) {
                this.$refs.operation.$deleteById(this.reviewUrl, id, this.eventBus, this.idType);
            },

            noPageQuery() {
                this.listLoading = true;
                this.$refs.operation.$noPageQuery(this.listUrl, this.eventBus);
            },

            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(this.listUrl, this.searchForm, this.eventBus);
            },

            sellerDetail(id) {
                this.isShow = true;
                this.$axios.get(url.sellerDetail, id).then(res => {
                    let data = res.data;
                    this.detailData = res.data;
                    this.detailData.id = id;
                    this.detailData.sellerType = this.sellerType[data.sellerType - 1].label;
                });
            },

            businessUrl(businessUrl) {
                if (businessUrl === 'brandIcon') {
                    businessUrl = this.detailData.brandIcon;
                } else if (businessUrl === 'shopLogo') {
                    businessUrl = this.detailData.shopLogo;
                } else if (businessUrl === 'shopCover') {
                    businessUrl = this.detailData.shopCover;
                } else {
                    businessUrl = this.detailData.shopBusinessLicense;
                }
                this.$refs.myImg.isDialogShow(businessUrl);
            },
            //wrap dialog
            isDialogShow() {
                this.isShow = this.isShow !== true;
            },
            confirmApprove() {
                if (!this.approveForm.approveStatus) {
                    this.$alert(this.STATUS, '', {
                        confirmButtonText: this.$t('Shop.Determine')
                    });
                    return false
                }
                if (this.approveForm.approveStatus == -1 && !this.approveForm.approveCause) {
                    this.$alert(this.Null, '', {
                        confirmButtonText: this.$t('Shop.Determine')
                    });
                    return
                }
                let data = qs.stringify(this.approveForm, {indices: false});
                this.$axios.post(this.reviewUrl, data).then(res => {
                    this.$alert(this.success_text, '', {
                        confirmButtonText: this.$t('Shop.Determine'),
                        callback: () => {
                            this.isDialogShow();
                            this.query();
                        }
                    });
                });
            },
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
