<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height:50px">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.orderReceiverPhone"
                        :placeholder="$t('service.phone')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.orderDetailNum"
                        :placeholder="$t('service.Order_number')"
                        class="searchbox"
                />
                <el-select
                        size="mini"
                        v-model="searchForm.afterSalesStatus"
                        :placeholder="$t('service.state')"
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
                <el-date-picker style="width: 240px"
                                size="mini"
                                class="searchbox"
                                v-model="searchForm.times"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                :range-separator="$t('service.To')"
                                :start-placeholder="$t('service.start_time')"
                                :end-placeholder="$t('service.End_time')"
                                align="right"
                />
                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 14px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{$t('service.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('service.Reset')}}
                </el-button
                >
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px;margin-top: 15px"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  highlight-current-row
                  :stripe="true"
                  v-loading="listLoading"
                  :default-sort = "{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    label="ID"
                    type="index"
                    width="50"/>
            <el-table-column :label="$t('service.Order_receiver_phone')" sortable prop="orderReceiverPhone" width="182">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.orderReceiverPhone }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('service.Order_number')" sortable prop="orderDetailNum" width="220">
                <template slot-scope="scope">
                    <el-link
                            type="primary"
                            size="mini"
                            @click="sellerDetail(scope.row.orderDetailNum)"
                            style="margin-right:20px;"
                    >{{ scope.row.orderDetailNum }}
                    </el-link
                    >
                </template>
            </el-table-column>
            <el-table-column :label="$t('service.Customer')" sortable prop="afterSalesNum" width="190">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.afterSalesNum }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('service.Type')" sortable prop="afterSalesType" width="182">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{platform_order_afterSalesType[scope.row.afterSalesType-1].label }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('service.Status')" sortable prop="afterSalesStatus" width="182">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <div>{{ STATUS[scope.row.afterSalesStatus-1].label }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('service.reason')" sortable prop="afterSalesReason" width="182">
                <template slot-scope="scope">
                    <span size="medium">{{ scope.row.afterSalesReason }}</span>
                </template>
            </el-table-column>

            <el-table-column :label="$t('service.voucher')" sortable prop="afterSalesEvidenceImageUrl" width="182">
                <template slot-scope="scope">
                    <el-link v-if="scope.row.afterSalesEvidenceImageUrl" type="primary" @click="openPic(scope.row.afterSalesEvidenceImageUrl)">查看</el-link>
                </template>
            </el-table-column >

            <el-table-column :label="$t('service.time')" sortable prop="afterSalesRequestTime" width="182">
                <template slot-scope="scope">
                    <span size="medium">{{ scope.row.afterSalesRequestTime }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('service.operation')" width="220">
                <template slot-scope="scope">
                    <el-popconfirm
                            :cancelButtonText="$t('currency.cancel')"
                            :confirmButtonText="$t('currency.Determine')"
                            icon="el-icon-info"
                            iconColor="#f90"
                            :title="$t('service.Confirm')"
                            @onConfirm="startupOrOut(scope.row.orderDetailAfterSalesId,'out',scope.row)"
                    >
                        <el-button
                                slot="reference"
                                size="mini"
                                :disabled="scope.row.afterSalesStatus != 4"
                                type="primary"
                        >
                            <li class="el-icon-s-management"/>
                            {{$t('service.refund')}}
                        </el-button
                        >
                    </el-popconfirm>

                    <el-popconfirm
                            :confirmButtonText="$t('currency.Determine')"
                            :cancelButtonText="$t('currency.cancel')"
                            icon="el-icon-info"
                            iconColor="#f90"
                            :title="$t('service.Close')"
                            @onConfirm="startupOrOut(scope.row.orderDetailAfterSalesId,'close',scope.row)"
                    >
                        <el-button style="margin-left:10px"
                                   slot="reference"
                                   size="mini"
                                   type="info" plain
                        >
                            <li class="el-icon-circle-close"/>
                            {{$t('service.Closes')}}
                        </el-button
                        >
                    </el-popconfirm>


                </template>
            </el-table-column>
        </el-table>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation ref="operation"/>
        <myImg ref="myImg"/>

        <orderDetail ref="orderDetail" v-if="reFresh"></orderDetail>
    </div>
</template>
<script>
    import {eventBus} from "scripts/utils/BUS";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";
    import myImg from "@/component/myImg.vue";
    import orderDetail from "@/component/orderDetail.vue";
    import operation from "@/component/operation.vue";
    import qs from "qs";

    export default {
        components: {
            pagination,
            operation,
            orderDetail,
            myImg
        },

        data() {
            return {
                sellerDetailUrl: urls.orderDetail_queryByOrderDetailNum,
                listUrl: urls.orderDetailAfterSales_list,
                refundUrl: urls.orderDetailAfterSales_refund,
                closeUrl: urls.orderDetailAfterSales_close,
                eventBus: 'refund_eventBus',
                idType: 'orderDetailAfterSalesId',
                usePagination: true,
                reFresh:true,
                rules: {
                    checkOutPercentage: [
                        {required: true, message: this.$t('service.percentage')}
                    ],
                    checkOutType: [
                        {required: true, message: this.$t('service.Class')}
                    ]
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {},
                detailData: {},
                tableData: [],
                isEdit: false,
                listLoading: false,
                pickerOptions: {
                    shortcuts: [
                        {
                            text: this.$t('service.Last_week'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('service.Last_month'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('service.Last_three_months'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                platform_order_afterSalesType : [
                    {
                        value: 1,
                        label: this.$t('service.refund')
                    },
                    {
                        value: 2,
                        label: this.$t('service.Exchange')
                    },
                    {
                        value: 3,
                        label: this.$t('service.Warranty')
                    },
                    {
                        value: 4,
                        label: this.$t('service.Returns')
                    }
                ],
                STATUS: [
                    {label: this.$t('service.Pending'), value: 1},
                    {label: this.$t('service.Agree'), value: 2},
                    {label: this.$t('service.refuse'), value: 3},
                    {label: this.$t('service.Appeal'), value: 4},
                    {label: this.$t('service.complete'), value: 5}
                ],
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
                this.isShow_ = false;
            });
            //Whether or not to use paging queries
            this.usePagination ? this.query() : this.noPageQuery();
        },

        beforeDestroy() {
            eventBus.$off(this.eventBus)
        },

        methods: {
            openPic(url) {
                if (url == '' || url == null){
                    this.$alert('暂无图片', '', {
                        confirmButtonText: '确定'
                    });
                    return false
                }
                this.$refs.myImg.isDialogShow(url, '申请凭证',2);
            },
            sellerDetail(id) {
                this.$axios.get(this.sellerDetailUrl + "?orderDetailNum=" + id).then(res => {
                    this.detailData = res.data.data;
                    this.$refs.orderDetail.openHandleConfirm(this.detailData);
                    //
                });
            },

            isRealNum(val) {
                if (val === "" || val == null) {
                    return false;
                }
                if (!isNaN(val)) {
                    return true;
                } else {
                    return false;
                }
            },

            startupOrOut(id, type, row) {
                let a = this.$t('service.refunded')
                let url, text, status;
                if (type === 'close') {
                    url = this.closeUrl;
                    text = this.$t('service.success');
                } else {
                    // if (row.afterSalesStatus == 5) {
                    //     this.$alert(a, '', {
                    //         confirmButtonText: this.$t('service.Determine'),
                    //     });
                    //     return false;
                    // }
                    url = this.refundUrl;
                    text = this.$t('service.successful');
                }
                let form = {
                    orderDetailAfterSalesId: id,
                };
                let selft = this;
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(url, data).then(res => {
                    this.$alert(text, '', {
                        confirmButtonText: this.$t('service.Determine'),
                        callback() {
                            selft.query();
                        }
                    });
                });
            },

            reset() {
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            doDelete(id) {
                this.$refs.operation.$deleteById(this.deleteUrl, id, this.eventBus);
            },

            noPageQuery() {
                this.listLoading = true;
                this.$refs.operation.$noPageQuery(this.listUrl, this.eventBus);
            },

            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(this.listUrl, this.searchForm, this.eventBus);
            },

            toAdd() {
                this.title = this.addTitle;
                this.form = {};
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                });
                this.isShowDialog();
            },

            isShowDialog() {
                this.isShow_ = this.isShow_ !== true;
            },

            toEdit(row) {
                this.title = this.editTitle;
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = this.$successAddText;
                if (this.isEdit) {
                    text = this.$successEditText;
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                this.isEdit = false;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        let Number = this.$t('service.Number')
                        let str = this.form.checkOutPercentage
                        if (!this.isRealNum(str)) {
                            this.$alert(Number, '', {
                                confirmButtonText: this.$t('service.Determine'),
                            });
                            return false;
                        }
                        this.$refs.operation.$confirmData(url, this.form, text, this.eventBus);
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    #myTable{

    }
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
