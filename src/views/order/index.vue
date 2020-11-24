<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 60px">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.orderNum"
                :placeholder="$t('Order.Order_number')"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.orderStatus"
                :placeholder="$t('Order.state')"
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
        <el-select
                size="mini"
                v-model="searchForm.orderType"
                :placeholder="$t('Order.Order_type')"
                class="searchbox"
        >
          <el-option
                  size="mini"
                  v-for="item in Type"
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
                        :range-separator="$t('Order.To')"
                        :start-placeholder="$t('Order.start_time')"
                        :end-placeholder="$t('Order.End_time')"
                        align="right"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('Order.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('Order.Reset')}}</el-button
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
              width="50"/>
      <el-table-column :label="$t('Order.Shop_name')" sortable prop="shopName" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.shopName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.Name_of_buyer')" sortable prop="orderReceiverName" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderReceiverName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.Order_number')" sortable prop="orderNum" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderNum }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.Order_type')" sortable prop="orderType" width="140" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ Type[scope.row.orderType-1].label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.money')" sortable prop="orderPayAmount" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderPayAmount }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.currency')" sortable prop="currencyCodeStr" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.currencyCodeStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.Payment_method')" sortable prop="platformPaymentMethodCodeStr" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.platformPaymentMethodCodeStr}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.Order_status')" sortable prop="orderStatus" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ STATUS[scope.row.orderStatus-1].label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.Whether_settlement')" sortable prop="orderCheckOut" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ $platform_finace_orderDetailStatus[scope.row.orderCheckOut==null?0:scope.row.orderCheckOut-1].label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Order.Order_time')" sortable prop="orderCreateTime" width="155">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderCreateTime }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" :label="$t('Order.operation')" width="140" >
        <template slot-scope="scope">

          <el-button
                  size="mini"
                  type="primary" plain
                  @click="details(scope.row.orderId)"
          >
            {{$t('Order.View')}}</el-button
          >

        </template>
      </el-table-column>
    </el-table>
    <!--add-->
    <el-dialog  :visible.sync="isShow"  width="500px"
                :close-on-click-modal="false"
                :destroy-on-close="true"

                center
                :title="$t('details.detail')"
                v-if="this.isCheck"
    >

      <table style="border-collapse:separate; border-spacing:10px;margin-top: -20px;width: 500px" border="0">
        <tr  style="width: 100%;margin-top: 15px">
          <td style="text-align: right;width: 30%">{{$t('Order.Shop_name')}}:</td>
          <td style="text-align: left;width: 70%">{{ this.detailData.shopName}}</td>
        </tr>
        <tr  style="width: 100%;margin-top: 15px">
          <td style="text-align: right">{{$t('Order.Name_of_buyer')}}:</td>
          <td style="text-align: left;">{{ this.detailData.orderReceiverName}}</td>
        </tr>
        <tr  style="width: 100%;margin-top: 15px">
          <td style="text-align: right">{{$t('Order.Order_number')}}:</td>
          <td style="text-align: left;">{{ this.detailData.orderNum}}</td>
        </tr>
        <tr  style="width: 100%;margin-top: 15px">
          <td style="text-align: right">{{$t('Order.type')}}:</td>
          <td style="text-align: left;">{{ Type[this.detailData.orderType-1].label }}</td>
        </tr>
        <tr v-if="detailData.areaCodeStr"  style="width: 100%;margin-top: 15px">
          <td style="text-align: right">{{$t('Order.region')}}:</td>
          <td style="text-align: left;">{{ this.detailData.areaCodeStr}}</td>
        </tr>

        <tr>
          <td style="text-align: right">{{$t('Order.money')}}:</td>
          <td style="text-align: left">{{ this.detailData.goodsAmount}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.Freight')}}:</td>
          <td style="text-align: left">{{ this.detailData.orderFreightCharges}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.total')}}:</td>
          <td style="text-align: left">{{ this.detailData.orderPayAmount}}</td>
        </tr>

        <tr  style="width: 100%;margin-top: 15px">
          <td style="text-align: right">{{$t('Order.currency')}}:</td>
          <td style="text-align: left;">{{ this.detailData.currencyCodeStr}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.Payment_method')}}:</td>
          <td style="text-align: left">{{ this.detailData.platformPaymentMethodCodeStr}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.Payment_transaction_No')}}:</td>
          <td style="text-align: left">{{ this.detailData.orderPayNum}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.Payment_time')}}:</td>
          <td style="text-align: left">{{ this.detailData.createTime}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.Order_status')}}:</td>
          <td style="text-align: left">{{ STATUS[this.detailData.orderStatus-1].label}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.Whether_settlement')}}:</td>
          <td style="text-align: left">{{ $platform_finace_orderDetailStatus[this.detailData.orderCheckOut==null?0:this.detailData.orderCheckOut-1].label }}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.Buyer_receiving_address')}}:</td>
          <td style="text-align: left">{{ this.detailData.orderReceiverAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Order.Order_time')}}:</td>
          <td style="text-align: left">{{ this.detailData.orderCreateTime}}</td>
        </tr>

      </table>
<!--      <span slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="cancel"><i class="el-icon-close"></i>{{$t('Order.close')}}</el-button>-->
<!--      </span>-->
    </el-dialog>
    <!--pagination component-->
    <pagination  ref="pagination"/>
    <!--operation component-->
    <operation  ref="operation"/>
  </div>
</template>
<script>
  import {eventBus} from "scripts/utils/BUS";
  import urls from "@/scripts/api";
  import pagination from "@/component/pagination.vue";
  import operation from "@/component/operation.vue";
  import qs from "qs";

  export default {
    components: {
      pagination,
      operation
    },
    data() {
      return {
        //--------------need to edit
        listUrl:urls.order_list,
        detailsUrl:urls.order_queryById,
        approveUrl:urls.platformCashOut_review,
        eventBus:'platformCashOut_eventBus',
        idType:'',
        //------------- no edit-------
        searchForm: {},
        detailData:{},
        approveForm:{},
        form: {},
        tableData: [],
        isEdit: false,
        isShow: false,
        isCheck:false,
        orderPayMethod: false,
        listLoading: false,
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
        STATUS:[
          {
            value: 1,
            label: this.$t('Order.Pending_payment')
          },
          {
            value: 2,
            label: this.$t('Order.Paid')
          },
          {
            value: 3,
            label: this.$t('Order.Cancelled')
          },
        ],
        // STATUS_:[
        //   {
        //     value: -1,
        //     label: this.$t('Order.Cancelled')
        //   },
        //   {
        //     value: 0,
        //     label: this.$t('Order.Pending_payment')
        //   },
        //   {
        //     value: 1,
        //     label: this.$t('Order.Paid')
        //   },
        // ],
        Type: [
          {
            value: 1,
            label: this.$t('Order.Merchandise_order')
          },
          {
            value: 2,
            label: this.$t('Order.Platform_order')
          },
        ],
      };
    },

    mounted() {
      eventBus.$on(this.eventBus, (tableData) => {
        console.log(tableData);
        if (tableData) {
          this.listLoading = false;
          this.tableData = tableData;
        } else {
          //this.query();
        }
      });
      this.query();
    },

    beforeDestroy() {
      eventBus.$off(this.eventBus)
    },
    methods: {
      cancel() {
        this.form = {};
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        })
        this.isShowDialog();
      },
      details(id){
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        });
        this.isCheck = true;
        this.isShow = true;
        this.approveForm = {orderId:id};
        let data = qs.stringify(this.approveForm, {indices: false});
        this.$axios.post(this.detailsUrl, data).then(res => {
          this.detailData = res.data.data;
        });
      },
      reset(){
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

      confirmApprove(){
        if(!this.approveForm.status){
          this.$alert('请选择审核状态', '', {
            confirmButtonText: '确定'
          });
          return false
        }if(this.approveForm.status && !this.approveForm.reason){
          this.$alert('审核原因不能为空', '', {
            confirmButtonText: '确定',
          });
          return
        }
        this.$axios.post(url.approveUrl, this.approveForm).then(res => {
          this.$alert('审核成功', '', {
            confirmButtonText: '确定',
            callback: () => {
              this.isShowDialog();
              this.query();
            }
          });
        });
      }
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
