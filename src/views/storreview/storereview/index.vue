<template>
    <div style="height: 95.5%;">
        <!-- search -->
        <div id="expressage" style="height: 60px">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.brandName"
                        :placeholder="$t('Review.brandName')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.shopName"
                        :placeholder="$t('Review.storeName')"
                        class="searchbox"
                />
                    <el-select

                            filterable
                            size="mini"
                            v-model="searchForm.brandCode"
                            :placeholder="$t('Review.famous')"
                            class="searchbox"
                    >
                        <el-option
                                size="mini"
                                v-for="(item,index) in brandNames"
                                :key="index"
                                :label="item.brandName"
                                :value="item.brandCode"
                        />

                    </el-select>
                <el-select
                        size="mini"
                        v-model="searchForm.approveStatus"
                        :placeholder="$t('Review.status')"
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
                    {{$t('license.search')}}</el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('license.Reset')}}</el-button
                >
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  height="500"
                  :stripe="true"
                  highlight-current-row
                  v-loading="listLoading"
                  :default-sort = "{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    label="ID"
                    type="index"
                    width="50"/>
            <el-table-column :label="$t('Review.brand')" sortable prop="brandName" width="270">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.brandName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Review.storeName')" sortable prop="shopName" width="270">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.shopName }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column  :label="$t('Review.Qualification')" sortable prop="qalificationsUrl" width="320">
                <template slot-scope="scope" v-if="scope.row.qalificationsUrl">
                    <el-link size="mini" type="primary" @click="businessUrl(scope.row)">{{$t('Review.view')}}</el-link>
                </template>
            </el-table-column>

            <el-table-column :label="$t('Review.time')" sortable prop="approveTime" width="270">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.createTime }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Review.status')" sortable prop="approveStatus" width="270">
                <template slot-scope="scope">
                    <div>{{ Status[scope.row.approveStatus].label }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Review.cause')" sortable prop="approveCause" width="270">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium" v-if="scope.row.approveStatus===2">{{ scope.row.approveCause }}</span>
                    </div>
                </template>
            </el-table-column>
            <!-- operation -->
            <el-table-column fixed="right" :label="$t('license.operation')" width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary" plain
                            @click="details(scope.row)"
                    >
                        {{$t('license.Audit')}}</el-button
                    >
                </template>
            </el-table-column>
            <!-- operation -->

        </el-table>
        <!--pagination component-->
        <!--check component-->
        <pagination  ref="pagination"/>
        <operation  ref="operation"/>
        <!-- operation -->
        <el-dialog  :visible.sync="isShow" width="500px"
                    :close-on-click-modal="false"
                    :destroy-on-close="true"
                    center
                    :title="$t('license.Audit')"
        >
            <table style="border-collapse:separate; border-spacing:10px;margin-top: -20px;width: 400px" border="0">
                <tr  style="width: 100%;margin-top: 15px">
                    <td style="text-align: right;width: 40%">{{$t('Review.Brand')}}</td>
                    <td style="text-align: left;width: 60%">{{ this.detailData.brandName}}</td>
                </tr>
                <tr v-if="detailData.qalificationsUrl">
                    <td style="text-align: right">{{$t('Review.qualification')}}</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="businessUrl()">
                            {{$t('license.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr  style="width: 100%;margin-top: 15px">
                    <td style="text-align: right;width: 40%">{{$t('Review.name')}}</td>
                    <td style="text-align: left;width: 60%">{{ this.detailData.shopName}}</td>
                </tr>
                <tr>
                    <td style="text-align: right;width: 40%">{{$t('Review.Phone')}}</td>
                    <td style="text-align: left;">{{ this.detailData.sellerContactPhoneStr}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Review.address')}}</td>
                    <td style="text-align: left">{{ this.detailData.shopAddressDetail}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Review.longitude')}}</td>
                    <td style="text-align: left">{{ this.detailData.shopAddressX}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Review.latitude')}}</td>
                    <td style="text-align: left">{{ this.detailData.shopAddressY}}</td>
                </tr>

                <tr v-if="isShow">
                    <td style="text-align: right" >{{$t('Review.keyStatuses')}}</td>
                    <td v-if="this.detailData.approveStatus == 1" style="text-align: left;color: chartreuse">
                        {{Status[this.detailData.approveStatus].label}}
                    </td>
                    <td   v-else style="text-align: left;color: red">
                        {{Status[this.detailData.approveStatus].label}}
                    </td>
                </tr>
            </table>
            <div style="text-align: center;margin-top: 15px">
                <el-select v-model="approveForm.approveStatus" :placeholder="$t('Review.Approval')" size = "mini" style="width: 75%">
                    <el-option
                            v-for="item in STATUSS"
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
                        :placeholder="$t('license.failure')"
                        v-model="approveForm.approveCause"
                        v-if="approveForm.approveStatus === 2"
                />
            </div>
            <span slot="footer" class="dialog-footer">

        <el-button  type="primary" @click="confirmApprove"><i class="el-icon-check"></i>{{$t('Review.OK')}}</el-button>
        <el-button @click="isDialogShow"><i class="el-icon-close"></i>{{$t('Review.cancel')}}</el-button>
      </span>
            <!--img component-->
            <my-img ref="myImg"></my-img>
        </el-dialog>
        <!--img component-->
        <my-img ref="myImg_"></my-img>
        <!-- operation -->
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
                eventBus:'salesroom_eventBus',
                idType: 'sellerBrandStoresId',
                usePagination:true,
                detailData:{},
                approveForm:{},
                tableData: [],
                searchForm :{
                },
                isShow:false,
                listLoading:false,
                Status: [
                    {
                        value: 0,
                        label: this.$t('Review.Pending')
                    },
                    {
                        value: 1,
                        label: this.$t('Review.pass')
                    },
                    {
                        value:2,
                        label: this.$t('Review.rejected')
                    }
                ],
                STATUSS :[
                    {
                        value: 1,
                        label: this.$t('Review.Pass')
                    },
                    {
                        value: 2,
                        label: this.$t('Review.not')
                    }
                ],
                STATUS: this.$t('license.status'),
                success_text:this.$t('license.Success'),
                Null:this.$t('license.Null'),
                brandNames: [],
            };
        },

        mounted() {
            //brandName();
            this.brandName();
            eventBus.$on(this.eventBus, (tableData) => {
                if (tableData) {
                    this.listLoading = false;
                    this.tableData = tableData;
                } else {
                    // this.isEdit = false;
                    this.query()
                }
                this.isShow = false;
            });
            this.query();
        },

        methods: {

            brandName() {
                // let form = {brandName: this.brandName};
                this.$axios.get(this.$url.platformBrandslistAll).then(res => {
                    let data = res.data.data;
                    this.brandNames = data;
                });
            },

            details(row){
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                });
                this.isShow = true;
                this.detailData = row;
                this.approveForm = {};
                this.approveForm.sellerBrandStoresId = row.sellerBrandStoresId;
                let data = qs.stringify(this.approveForm, {indices: false});
                this.$axios.post(this.$url.sellerBrandStoresqueryById, data).then(res => {
                  this.detailData = res.data.data;
                });
            },

            cancel(){
                this.detailData = {};
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                });
                this.isShowDialog();
            },


            reset(){
                this.searchForm = {};
                this.query();
            },
            query() {
                console.log('abc');
                // this.listLoading = true;
                this.$refs.pagination.$query(this.$url.sellerBrandStoreslist, this.searchForm, this.eventBus);
            },


            businessUrl(row) {
                if (row){
                    this.$refs.myImg_.isDialogShow( row.qalificationsUrl);
                }else {
                    this.$refs.myImg.isDialogShow( this.detailData.qalificationsUrl);
                }
            },
            //wrap dialog
            isDialogShow() {
                this.isShow = this.isShow !== true;
            },
            confirmApprove(){
                if(!this.approveForm.approveStatus){
                    this.$alert(this.STATUS, '', {
                        confirmButtonText: this.$t('license.OK')
                    });
                    return false
                }
                if(this.approveForm.approveStatus == 2 && !this.approveForm.approveCause){
                    this.$alert(this.Null, '', {
                        confirmButtonText: this.$t('license.OK')
                    });
                    return
                }
                let form = JSON.parse(JSON.stringify(this.approveForm));
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(this.$url.sellerBrandStoresreview,data).then(res => {
                    this.$alert(this.success_text, '', {
                        confirmButtonText: this.$t('license.Determine'),
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
