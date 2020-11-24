<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.spuCode"
                        :placeholder="$t('Commodity.Commodity_number')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.shopName"
                        :placeholder="$t('Commodity.shopName')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.spuName"
                        :placeholder="$t('Commodity.Commodity_name')"
                        class="searchbox"
                />
                <el-select
                        size="mini"
                        v-model="searchForm.approveStatus"
                        :placeholder="$t('Commodity.state')"
                        class="searchbox"
                >
                    <el-option
                            size="mini"
                            v-for="item in status"
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
                                :range-separator="$t('Commodity.To')"
                                :start-placeholder="$t('Commodity.start_time')"
                                :end-placeholder="$t('Commodity.End_time')"
                                align="right"
                />
                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 14px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{$t('Commodity.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('Commodity.Reset')}}
                </el-button
                >
                <el-popconfirm
                        :confirmButtonText="$t('currency.Determine')"
                        :cancelButtonText="$t('currency.cancel')"
                        icon="el-icon-info"
                        iconColor="red"
                        :title="$t('Commodity.Sure')"
                        @onConfirm="clearConfirmData(null,'2')"
                >
                    <el-button
                            style="margin-left: 10px;height:30px;margin-top: 14px;"
                            slot="reference"
                            size="mini"
                            type="primary" plain
                    >
                        {{$t('Commodity.lower')}}
                    </el-button
                    >
                </el-popconfirm>
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px"
                  height="75%"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  :stripe="true"
                  highlight-current-row
                  v-loading="listLoading"
                  :default-sort = "{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    type="selection"
                    width="50"/>
            <el-table-column :label="$t('Commodity.Commodity_number')" sortable prop="spuCode"  width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <div>{{ scope.row.spuCode}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.shopName')" sortable prop="shopName" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <div>{{ scope.row.shopName}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.Commodity_name')" sortable prop="spuName" width="160">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.spuName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.Commodity_area')" sortable prop="areaCodeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaCodeStr}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.Payment_method')" sortable prop="platformPaymentMethod" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformPaymentMethod}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.logistics')" sortable prop="platformDeliverMethod" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.platformDeliverMethod}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.freight')" sortable prop="deliverChargeAmount" width="100">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.deliverChargeAmount}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.SPU_state')" sortable prop="spuStatus" width="">
                <template slot-scope="scope">
                    <div>{{ $SPU[scope.row.spuStatus - 1].label }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.state')" sortable prop="approveStatus" width="90">
                <template slot-scope="scope">
                    <div>{{ $platform_SellerSpu_status[scope.row.approveStatus].label }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.Audit_reason')" sortable prop="approveCause" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium" v-if="scope.row.approveStatus===3">{{ scope.row.approveCause }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Commodity.Application_time')" sortable prop="submitTime" width="160">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.submitTime }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Commodity.operation')" width="260">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="details(scope.row,false)"
                    >
                        <i class="el-icon-postcard"></i>
                        {{$t('Commodity.View')}}
                    </el-button
                    >
                    <el-popconfirm style="height: 30px;margin-top: 14px;margin-left: 15px"
                                   :confirmButtonText="$t('currency.Determine')"
                                   :cancelButtonText="$t('currency.cancel')"
                                   icon="el-icon-info"
                                   iconColor="red"
                                   :title="$t('Commodity.Lower_shelf')"
                                   @onConfirm="clearConfirmData(scope.row,'2')"
                    >
                        <el-button
                                slot="reference"
                                size="mini"
                                type="primary" plain
                        >
                            {{$t('Commodity.Lower')}}
                        </el-button
                        >
                    </el-popconfirm>
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="details(scope.row,true)"
                    >
                        <i class="el-icon-postcard"></i>
                        {{$t('Commodity.Audit')}}
                    </el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :visible.sync="videoShow"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :title="$t('Commodity.Video')"
        >
            <video
                    id="myVideo_"
                    class="video-js vjs-big-play-centered vjs-fluid"
                    controls
                    :poster="detailData.coverImageUrl"
            >
                <source
                        type="video/mp4"
                        :src="detailData.spuVideoUrl"
                >
            </video>
        </el-dialog>

        <el-dialog :visible.sync="sellShow" width="1000px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :title="$t('Commodity.information')"
        >
            <el-form  label-width="140px">
                <el-form-item :label="$t('merchandise.meal')">
                    <table border="1" cellpadding="0" cellspacing="0">
                        <th style="width: 36px;background-color: #cac6c6">ID</th>
                        <th style="width: 145px;background-color: #cac6c6">{{$t('Commodity.Package')}}
                        </th>
                        <th style="width: 89px;background-color: #cac6c6">{{$t('Commodity.price')}}
                        </th>
                        <th style="width: 94px;background-color: #cac6c6">{{$t('Commodity.Currency')}}
                        </th>
                        <th style="width: 137px;background-color: #cac6c6">{{$t('Commodity.inventory')}}
                        </th>
                        <th style="width: 137;background-color: #cac6c6">{{$t('Commodity.Minimum')}}
                        </th>
                        <th style="width: 137px;background-color: #cac6c6">{{$t('Commodity.limit')}}
                        </th>
                        <tr style="text-align: center"
                            v-for="(combo, index) in sell.sellerSkuList"
                            :label="$t('merchandise.meal') +(index+1)+'：'"
                            :key="combo.key"
                        >
                            <td>
                                {{index+1}}
                            </td>
                            <td>
                                {{sell.sellerSkuList[index].skuDescription}}
                            </td>
                            <td>
                                {{sell.sellerSkuList[index].skuPrice}}
                            </td>
                            <td>
                                {{sell.sellerSkuList[index].skuCurrencyStr}}
                            </td>
                            <td>
                                {{sell.sellerSkuList[index].skuStock}}
                            </td>
                            <td>
                                {{sell.sellerSkuList[index].buyMinimum}}
                            </td>
                            <td>
                                {{sell.sellerSkuList[index].buyMaximum}}
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item :label="$t('merchandise.Original_price')" >
                    <el-col :span=6>
                        <el-form-item >
                            <el-input :disabled="true" size="mini" v-model="sell.dataForm.priceOriginal"
                                      style="width: 200px"
                                      class="searchbox"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span=3>
                        <el-form-item >
                           {{sell.dataForm.currencyStr}}
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item :label="$t('merchandise.Discount_price')">
                    <el-col :span=6>
                        <el-input size="mini" v-model="sell.dataForm.priceDiscount"
                                  :disabled="true"
                                  :placeholder="$t('merchandise.discount')"
                                  style="width: 200px"
                                  class="searchbox"/>
                    </el-col>
                </el-form-item>
                <el-form-item :label="$t('merchandise.merchandise')" >
                    <el-col :span=6>
                        <el-input size="mini" v-model="sell.dataForm.spuQty"
                                  :placeholder="$t('merchandise.discount')"
                                  style="width: 200px"
                                  maxlength="12"
                                  :disabled="true"
                                  class="searchbox"/>
                    </el-col>
                    <el-col :span=2>
                        {{$t('merchandise.Pieces')}}
                    </el-col>
                </el-form-item>
                <el-form-item :label="$t('merchandise.Product_barcode')">
                    <el-col :span=20>
                        <el-input size="mini" v-model="sell.dataForm.spuCode"
                                  :disabled="true"
                                  maxlength="60"
                                  show-word-limit
                                  onkeyup="this.value=this.value.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,'');"
                                  class="searchbox"/>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :visible.sync="editShow"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   width="700px"
                   :title="$t('Commodity.Product_details')"
        >
            <div>
                <el-form>
                    <el-form-item  >
                        <table border="1" cellpadding="0" cellspacing="0" style="text-align: left;width: 100%">
                            <th style="width: 6%;background-color: #cac6c6">ID</th>
                            <th style="width: 47%;background-color: #cac6c6">商品参数规格</th>
                            <th style="width:47%;background-color: #cac6c6">属性值</th>
                            <tr
                                v-for="(combo, index) in goods.dataForm.sellerSpuAttributesList"
                                :label="$t('merchandise.meal') +(index+1)+'：'"
                                :key="combo.key"
                            >
                                <td>
                                    {{index+1}}
                                </td>
                                <td >
                                    {{goods.dataForm.sellerSpuAttributesList[index].spuAttributeName}}
                                </td>
                                <td >
                                    {{goods.dataForm.sellerSpuAttributesList[index].spuAttributeValue}}
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                    <el-form-item label="商品描述：" >
                        <div>
                            <br/>
                        </div>
                        <div  id="spuDetail_" :disabled="true">
                              <wangEnduit :veiw="true" v-model="detailData.spuDetail"/>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <!--add-->
        <el-dialog :visible.sync="isShow" width="500px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   :show-close="false"
                   :close-on-press-escape="false"
                   center
                   :title="$t('Commodity.Audit')"
                   v-if="isShow"
        >
            <table width="100%" id="myTable" style="border-collapse:separate; border-spacing:10px;margin-top: -20px">
                <tr v-if="detailData.areaCodeStr">
                    <td style="text-align: right">{{$t('Audit.Commodity_area')}}:</td>
                    <td style="text-align: left">{{ this.detailData.areaCodeStr}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.Commodity_name')}}:</td>
                    <td style="text-align: left">{{ this.detailData.spuName}}</td>
                </tr>
                <tr v-if="detailData.spuCode!=null">
                    <td style="text-align: right">{{$t('Audit.Commodity_number')}}:</td>
                    <td style="text-align: left">{{ this.detailData.spuCode}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.Market_value')}}:</td>
                    <td style="text-align: left">{{ this.detailData.priceOriginal}}</td>
                </tr>
                <tr v-if="detailData.priceDiscount!=null">
                    <td style="text-align: right;min-width: 100px">{{$t('Audit.Discount_price')}}:</td>
                    <td style="text-align: left">{{ this.detailData.priceDiscount}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.Stock')}}:</td>
                    <td style="text-align: left">{{ this.detailData.spuQty }}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Commodity.information')}}:</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="sellShow=true">
                            {{$t('Audit.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Commodity.Product')}}:</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="openEdit">
                            {{$t('Audit.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr v-if="detailData.sellerSpuImagesList">
                    <td style="text-align: right">{{$t('Audit.SPU_pictures')}}:</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="openImg">
                            {{$t('Audit.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr v-if="detailData.spuVideoUrl">
                    <td style="text-align: right">{{$t('Audit.SPU_video')}}:</td>
                    <td style="text-align: left">
                        <el-link type="primary" @click="videoShow=true">
                            {{$t('Audit.View')}}
                        </el-link>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.SPU_state')}}:</td>
                    <td>{{$SPU[this.detailData.spuStatus - 1].label}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.Payment_method')}}:</td>
                    <td style="text-align: left">{{ this.detailData.paymentStr}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.service')}}:</td>
                    <td style="text-align: left">{{ this.detailData.serviceStr}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.logistics')}}:</td>
                    <td style="text-align: left">{{ this.detailData.deliverStr}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.freight')}}:</td>
                    <td style="text-align: left">{{ this.detailData.deliverChargeAmount}}</td>
                </tr>
                <tr>
                    <td style="text-align: right">{{$t('Audit.Status')}}:</td>
                    <td v-if="this.detailData.approveStatus == 2" style="text-align: left;color: chartreuse">
                        {{$platform_SellerSpu_status[this.detailData.approveStatus].label}}
                    </td>
                    <td v-else style="text-align: left;color: red">
                        {{$platform_SellerSpu_status[this.detailData.approveStatus].label}}
                    </td>
                </tr>
            </table>
            <div style="text-align: center;margin-top: 15px" v-if="isViewType">
                <el-select v-model="approveForm.approveStatus" :placeholder="$t('Audit.Please_select_audit_status')"
                           size="mini" style="width: 60%">
                    <el-option
                            v-for="item in STATUSS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input
                        maxlength="20"
                        style="margin-top:15px;width: 60%"
                        resize="none"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('Audit.failed_reason')"
                        v-model="approveForm.approveCause"
                        v-if="approveForm.approveStatus == 3"
                />
            </div>
            <span slot="footer" class="dialog-footer" >
        <el-button size="mini" type="primary" v-if="isViewType" @click="confirmApprove">
          <i class="el-icon-check"></i>
          {{$t('currency.Determine')}}</el-button>
         <el-button size="mini" @click="cancel">
          <i class="el-icon-close"></i>
          {{$t('currency.cancel')}}</el-button>
        </span>
           <div style="width: 0px;height: 0px">
               <el-image  v-if="imgShow"
                          id="imgSrc_"
                          ref="imgSrc_"
                          :src="imgSrc"
                          :preview-src-list="srcList">
               </el-image>
           </div>
        </el-dialog>
        <!--pagination component-->
        <pagination ref="pagination"/>
        <!--img component-->
        <my-img ref="myImg"/>
    </div>
</template>
<script>
    import {eventBus} from "scripts/utils/BUS";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";
    import qs from 'qs';
    import wangEnduit from "@/component/wangEnduit.vue";
    import myImg from "@/component/myImg.vue";

    export default {
        components: {
            pagination,
            myImg,
            wangEnduit
        },
        data() {
            return {
                goods: {
                    dataForm: {
                        sellerSpuAttributesList: [{
                            spuAttributeName: null,
                            spuAttributeValue: null,
                        }],

                        spuVideoUrl: '',
                        coverImageUrl: '',
                        spuDetail: null
                    },

                },

                sell: {
                    dataForm: {
                        spuQty: 0,
                    },
                    eventBus: 'sell',
                    currencyList: [],
                    sellerSkuList: [{
                        spuAttributeName: null,
                        skuPrice: null,
                        skuPriceCurrencyCode: null,
                        skuStock: 0,
                        buyMinimum: 1,
                        buyMaximum: 9999,
                    }],
                },
                videoShow:false,
                imgSrc:'',
                srcList:[],
                imgShow: false,
                editShow: false,
                sellShow: false,
                //--------------need to edit
                listUrl: urls.goodsList_list,
                findByIdUrl: urls.goodsList_queryDetailsById,
                updateBatchByIdUrl: urls.goodsList_updateBatchById,
                approveUrl: urls.goodsList_review,
                eventBus: 'goodsList_eventBus',
                idName: 'spuId',
                //------------- no edit-------
                searchForm: {},
                detailData: {},
                approveForm: {},
                form: {},
                tableData: [],
                isEdit: false,
                isShow: false,
                isViewType:false,
                listLoading: false,
                pickerOptions: {
                    shortcuts: [
                        {
                            text: this.$t('Commodity.Last_week'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('Commodity.Last_month'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: this.$t('Commodity.Last_three_months'),
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit("pick", [start, end]);
                            }
                        }
                    ]
                },
                STATUSS: [
                    {
                        value: 2,
                        label: this.$t('Commodity.pass')
                    },
                    {
                        value: 3,
                        label: this.$t('Commodity.No')
                    }
                ],
                status: [
                    {
                        value: 0,
                        label: this.$t('Commodity.No_application')
                    },
                    {
                        value: 1,
                        label: this.$t('Commodity.Pending_application')
                    },
                    {
                        value: 2,
                        label: this.$t('Commodity.Upper')
                    },
                    {
                        value: 3,
                        label: this.$t('Commodity.Rejected')
                    },
                    {
                        value: 4,
                        label: this.$t('Commodity.Lower')
                    }
                ],
                STATUS: this.$t('Commodity.status'),
                success_text: this.$t('Commodity.Success'),
                Null: this.$t('Commodity.Null'),
            };
        },

        mounted() {
            eventBus.$on(this.eventBus, (tableData) => {
                if (tableData) {
                    this.listLoading = false;
                    this.tableData = tableData;
                } else {
                    this.query();
                }
            });
            this.query();
        },

        beforeDestroy() {
            eventBus.$off(this.eventBus)
        },

        methods: {
        openEdit(){
            this.editShow = true;
            this.$nextTick(()=>{
                console.log(this.detailData.spuDetail);
                document.getElementById('spuDetail').innerHTML = this.detailData.spuDetail;
            })
        },
            openImg(imgList) {
                this.imgShow = true;
                this.srcList = [];
                this.detailData.sellerSpuImagesList.forEach((src, index) => {
                    src = this.$url.oss_url + src.spuImageUrl;
                    if (index==0){
                        this.imgSrc = src;
                    }
                    this.srcList.push(src);
                })
                setTimeout(()=>{
                    document.getElementById('imgSrc_').click();
                },100)
            },

            businessUrl(businessUrl) {
                if (businessUrl === 'spuImageUrl') {
                    businessUrl = this.detailData.spuImageUrl;
                } else if (businessUrl === 'spuVideoUrl') {
                    businessUrl = this.detailData.spuVideoUrl;
                } else {
                    businessUrl = this.detailData.sellerCompanyLicenseUrl;
                }
                this.$refs.myImg.isDialogShow(businessUrl);
            },
            //this method need to editing id,made table id overwrite this id
            details(row,type) {
                if (row.approveStatus!=1 && type){
                    let text = this.$t('Commodity.not');
                    this.$alert(text, '', {
                        confirmButtonText: this.$t('Commodity.Determine'),
                    });
                    return
                }
                this.isShow = true;
                this.isViewType = type;
                this.$nextTick(()=>{
                    this.approveForm = {spuId: row.spuId};
                    let data = qs.stringify(this.approveForm, {indices: false});
                    this.$axios.post(this.$url.SellerSpu_queryDetailsById, data).then(res => {
                        this.detailData = res.data.data;
                        if (res.data.data.spuVideoUrl){
                            this.detailData.spuVideoUrl = this.$url.oss_url+res.data.data.spuVideoUrl;
                            this.detailData.coverImageUrl = this.$url.oss_url+res.data.data.coverImageUrl;
                        }
                        this.$set(this.sell.dataForm, "priceOriginal", res.data.data.priceOriginal);
                        this.$set(this.sell.dataForm, "spuQty", row.spuQty);
                        this.$set(this.sell.dataForm, "priceDiscount", res.data.data.priceDiscount);
                        this.$set(this.sell.dataForm, "spuCode", res.data.data.spuCode);
                        this.$set(this.sell.dataForm, "currencyStr", res.data.data.currencyStr);
                        this.$set(this.sell, "sellerSkuList", res.data.data.sellerSkuList);
                        this.$set(this.goods.dataForm, "sellerSpuAttributesList", res.data.data.sellerSpuAttributes);
                        this.$set(this.detailData, "spuDetail", decodeURIComponent(res.data.data.spuDetail));

                    });
                })
            },

            cancel() {
                this.detailData = {};
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                });
                this.isShowDialog();
            },

            reset() {
                this.searchForm = {};
                this.query()
            },

            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(this.listUrl, this.searchForm, this.eventBus);
            },

            isShowDialog() {
                this.isShow = this.isShow !== true;
            },

            confirmApprove() {
                if (!this.approveForm.approveStatus) {
                    this.$alert(this.STATUS, '', {
                        confirmButtonText: this.$t('Commodity.Determine')
                    });
                    return false
                }
                if (this.approveForm.approveStatus == 3 && !this.approveForm.approveCause) {
                    this.$alert(this.Null, '', {
                        confirmButtonText: this.$t('Commodity.Determine'),
                    });
                    return
                }
                let data = qs.stringify(this.approveForm, {indices: false});
                this.$axios.post(this.approveUrl, data).then(res => {
                    this.$alert(this.success_text, '', {
                        confirmButtonText: this.$t('Commodity.Determine'),
                        callback: () => {
                            this.isShowDialog();
                            this.query();
                        }
                    });
                });
            },

            async clearConfirmData(row, type) {

                let text = this.$t('Commodity.Lower_Success');
                let approveStatus = 2;
                let la = this.$t('Commodity.check');
                if (type === '2') {
                    text = this.$t('Commodity.Lower_Success');
                    approveStatus = 4;
                }
                if (row != null) {
                    if (row.approveStatus == 0) {
                        let text = this.$t('Commodity.been');
                        this.$alert(text, '', {
                            confirmButtonText: this.$t('Commodity.Determine'),
                        });
                        return
                    }
                    if (row.approveStatus == 1) {
                        let text = this.$t('Commodity.pending');
                        this.$alert(text, '', {
                            confirmButtonText: this.$t('Commodity.Determine'),
                        });
                        return
                    }
                    if (row.approveStatus == 3) {
                        let text = this.$t('Commodity.review');
                        this.$alert(text, '', {
                            confirmButtonText: this.$t('Commodity.Determine'),
                        });
                        return
                    }
                    if (row.approveStatus == 4) {
                        let text = this.$t('Commodity.removed');
                        this.$alert(text, '', {
                            confirmButtonText: this.$t('Commodity.Determine'),
                        });
                        return
                    }
                    this.updateBatchByIdUrl += "?spuIds=" + row.spuId
                }
                let selection = this.$refs.listPowerSupplyTab.selection;
                if (row == null && selection.length > 0) {
                    let str = '?';
                    try {
                        selection.forEach((data, index) => {
                            if (data.approveStatus == 0) {
                                let text = this.$t('Commodity.submitted');
                                this.$alert(text, '', {
                                    confirmButtonText: this.$t('Commodity.Determine'),
                                });
                                throw new Error();
                            }
                            if (data.approveStatus == 1) {
                                let text = this.$t('Commodity.Items');
                                this.$alert(text, '', {
                                    confirmButtonText: this.$t('Commodity.Determine'),
                                });
                                throw new Error();
                            }
                            if (data.approveStatus == 3) {
                                let text = this.$t('Commodity.failed');
                                this.$alert(text, '', {
                                    confirmButtonText: this.$t('Commodity.Determine'),
                                });
                                throw new Error();
                            }
                            if (data.approveStatus == 4) {
                                let text = this.$t('Commodity.has');
                                this.$alert(text, '', {
                                    confirmButtonText: this.$t('Commodity.Determine'),
                                });
                                throw new Error();
                            }
                            str += "spuIds=" + data.spuId + "&"
                        });
                    } catch (e) {
                        return false;
                    }
                    this.updateBatchByIdUrl += str;
                    console.log(this.updateBatchByIdUrl);
                } else if (row == null && selection.length == 0) {
                    this.$alert(la, '', {
                        confirmButtonText: this.$t('Commodity.Determine'),
                    });
                    return false;
                }
                this.$axios.get(this.updateBatchByIdUrl).then(res => {
                    this.$alert(text, '', {
                        confirmButtonText: this.$t('Commodity.Determine'),
                        callback: () => {
                            this.query();
                        }
                    });
                })
                this.updateBatchByIdUrl = urls.goodsList_updateBatchById
            },

        }
    };
</script>
<style lang="scss" scoped>
    #myTable{
        td {width: 50%}
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

    .video-js {
        width: 100% !important;;
        height: 100% !important;;
        object-fit: fill;
    }

    .video-js .vjs-big-play-button {
        font-size: 3em;
        line-height: 42px !important;
        height: 50px !important;
        width: 50px !important;
        display: block;
        position: absolute !important;
        left: 50% !important;
        top: 50% !important;
        margin-top: -25px !important;
        margin-left: -25px !important;
        padding: 0;
        cursor: pointer;
        opacity: 1;
        border: 0.06666em solid #fff;
        background-color: #2B333F;
        background-color: rgba(43, 51, 63, 0.7);
        border-radius: 50% !important;
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
    }

    .vjs-paused .vjs-big-play-button,

    .vjs-paused.vjs-has-started .vjs-big-play-button {
        display: block !important;
    }

    .myVideo-dimensions {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
    }

    .vjs-poster {
        background-size: 100% 100% !important;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #409EFF;
        width: 140px;
        height: 130px;
        line-height: 130px;
        text-align: center;
    }

    .avatar {
        width: 130px;
        height: 130px;
        display: block;
    }
</style>
