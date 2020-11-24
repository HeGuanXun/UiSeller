<!--order_detail_reviews-->
<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 50px">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.orderDetailNum"
                :placeholder="$t('Record.Order_number')"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.refundMethod"
                :placeholder="$t('Record.Refund_method')"
                class="searchbox"
        >
          <el-option
                  size="mini"
                  v-for="item in Refund_method"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
          />
        </el-select>
        <el-select
                size="mini"
                v-model="searchForm.refundStatus"
                :placeholder="$t('Record.state')"
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
                        :range-separator="$t('Record.To')"
                        :start-placeholder="$t('Record.start_time')"
                        :end-placeholder="$t('Record.End_time')"
                        align="right"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('Record.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('Record.Reset')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table style="margin-top: 10px;margin-left: 15px"
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
              label="ID"
              type="index"
              width="50"/>
      <el-table-column :label="$t('Record.Arae')" sortable prop="areaCodeStr" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.areaCodeStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.Order_number')" sortable prop="orderDetailNum" width="220">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-link
                    type="primary"
                    size="mini"
                    @click="sellerDetail(scope.row.orderDetailNum)"
                    style="margin-right:20px;"
            >{{ scope.row.orderDetailNum }}</el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.refund_amount')" sortable prop="refundAmount" width="160">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.refundAmount }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.currency')" sortable prop="currencyCodeStr" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.currencyCodeStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.Refund_method')" sortable prop="refundMethod" width="160">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{ $platform_refundMethod[scope.row.refundMethod-1].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.No')" sortable prop="refundTransactionNum" width="160">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{ scope.row.refundTransactionNum }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.state')" sortable prop="refundStatus" width="140">
        <template slot-scope="scope">
          <div>{{ Status[scope.row.refundStatus].label }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.Refund_note')" sortable prop="refundRemarks" width="140">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.refundRemarks }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.Refund_time')" sortable prop="refundRequestTime" width="160">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.refundRequestTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.Refund_arrival_time')" sortable prop="refundFinishTime" width="180">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.refundFinishTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.Reviewer')" sortable prop="approveBy" width="140">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.approveBy }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Record.Audit_time')" sortable prop="approveTime" width="160">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.approveTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-if="usePagination" ref="pagination"/>
    <!--operation component-->
    <operation  ref="operation"/>
    <orderDetail ref="orderDetail" v-if="reFresh"></orderDetail>
  </div>
</template>
<script>
  import {eventBus} from "scripts/utils/BUS";
  import urls from "@/scripts/api";
  import pagination from "@/component/pagination.vue";
  import operation from "@/component/operation.vue";
  import orderDetail from "@/component/orderDetail.vue";
  import qs from "qs";

  export default {
    components: {
      pagination,
      operation,
      orderDetail
    },
    data() {
      return {
        sellerDetailUrl:urls.orderDetail_queryByOrderDetailNum,
        listUrl:urls.orderDetailRefundRecords_list,
        refundUrl :urls.orderDetailAfterSales_refund,
        closeUrl :urls.orderDetailAfterSales_close,
        eventBus:'orderDetailRefundRecords_eventBus',
        idType:'orderDetailAfterSalesId',
        usePagination:true,
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
        detailData:{},
        form: {},
        tableData: [],
        isEdit: false,
        isShow: false,
        reFresh:true,
        listLoading: false,
        pickerOptions: {
          shortcuts: [
            {
              text: this.$t('Record.Last_week'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: this.$t('Record.Last_month'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: this.$t('Record.Last_three_months'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
                Refund_method :[
  {label:this.$t('Record.road'),value:1},
],
Status : [
  {label:this.$t('Record.During_Recording'),value:0},
  {label:this.$t('Record.Success'),value:1},
  {label:this.$t('Record.Fail'),value:2}
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
        this.isShow = false;
      });
      //Whether or not to use paging queries
      this.usePagination ? this.query() : this.noPageQuery();
    },

    beforeDestroy() {
      eventBus.$off(this.eventBus)
    },
    methods: {
      sellerDetail(id){
        this.$axios.get(this.sellerDetailUrl+"?orderDetailNum="+id).then(res => {
          this.detailData = res.data.data;
          this.$refs.orderDetail.openHandleConfirm(this.detailData);
        });
      },
      isRealNum(val){
        if(val === "" || val ==null){
          return false;
        }
        if(!isNaN(val)){
          return true;
        }
        else{
          return false;
        }
      },
      startupOrOut(id,type){
        let url,text,status;
        if (type==='close'){
          url = this.closeUrl;
          text = this.$t('Record.Application');
        }else {
          url = this.refundUrl;
          text = this.$t('Record.refuse');
        }
        let form={
          orderDetailAfterSalesId:id,
        };
        let selft = this;
        let data = qs.stringify(form, {indices: false});
        this.$axios.post(url, data).then(res => {
          this.$alert(text, '', {
            confirmButtonText: this.$t('Record.Determine'),
            callback(){
              selft.query();
            }
          });
        });
      },
      reset(){
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
        this.isShow = this.isShow !== true;
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
            let complete = this.$t('Record.complete')
            let str = this.form.checkOutPercentage
            if (!this.isRealNum(str)){
              this.$alert(complete, '', {
                confirmButtonText: this.$t('Record.Determine'),
              });
              return false;
            }
            this.$refs.operation.$confirmData(url, this.form, text, this.eventBus);
          } else {
            return false;
          }
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
