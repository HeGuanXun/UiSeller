<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 50px;">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.orderNum"
                :placeholder="$t('details.Order_number')"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.orderDetailNum"
                :placeholder="$t('details.Order_details')"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.orderReceiverName"
                :placeholder="$t('details.Buyer')"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.shopName"
                :placeholder="$t('details.shop')"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.orderDetailStatus"
                :placeholder="$t('details.state')"
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
        <el-date-picker
                        size="mini"
                        class="searchbox"
                        v-model="searchForm.times"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        :range-separator="$t('details.To')"
                        :start-placeholder="$t('details.start_time')"
                        :end-placeholder="$t('details.End_time')"
                        align="right"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('details.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('details.Reset')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table style="margin-left: 15px;margin-top: 15px"
              ref="listPowerSupplyTab"
              :data="tableData"
              border
              height="75%"
              highlight-current-row
              :stripe="true"
              v-loading="listLoading"
              :default-sort = "{prop: 'data', order: 'descending'}">
      <el-table-column
              fixed
              label="ID"
              type="index"
              width="50"/>
      <el-table-column :label="$t('details.shop_name')" sortable prop="shopName"  width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.shopName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Name_of_buyer')" sortable prop="orderReceiverName"  width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderReceiverName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Order_num')" sortable prop="orderNum" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderNum }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Order_details')" sortable prop="orderDetailNum" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderDetailNum }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Commodity_name')" sortable prop="spuName" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.spuName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Total_sum')" sortable prop="orderDetailTotalAmount"  width="140">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.orderDetailTotalAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.currency')"  sortable prop="currencyCodeStr" width="140">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.currencyCodeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Whether_settlement')" sortable prop="checkOutStatus"  width="140">
        <template slot-scope="scope">
          <div>{{$platform_finace_orderDetailStatus[scope.row.checkOutStatus-1].label }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.state')" sortable prop="orderDetailStatus"  width="140">
        <template slot-scope="scope">
          <div>{{Status[scope.row.orderDetailStatus-1].label }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Logistics_mode')" sortable prop="platformDeliverMethodCodeStr"  width="160">
        <template slot-scope="scope">
          <div>{{scope.row.platformDeliverMethodCodeStr }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Logistics_number')" sortable prop="deliverNum"   width="180">
        <template slot-scope="scope">
          <el-link
                  type="primary"
                  size="mini"
                  style="margin-right:20px;">
            {{ scope.row.deliverNum }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column :label="$t('details.Order_time')" sortable prop="createTime"  width="155">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('details.operation')" width="140">
        <template slot-scope="scope">
          <el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="sellerDetail(scope.row.orderDeatilId)"
          >
            {{$t('details.View')}}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--check component-->
    <!--pagination component-->
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
        //--------------need to edit
        clearUrl:urls.orderDetail_checkOutBatch,
        listUrl:urls.orderDetail_list,
        sellerDetailUrl:urls.orderDetail_queryById,
        createUrl:urls.checkOutRule_create,
        updateUrl:urls.checkOutRule_create,
        deleteUrl:urls.checkOutRule_delete,
        getRoleUrl:urls.checkOutRule_list,
        getRoleBus:'getRole_eventBus',
        eventBus:'ruleIdOrder_eventBus',
        editTitle:'编辑结算规则',
        addTitle:'新增结算规则',
        idType:'orderDeatilId',
        usePagination:true,
        myRoles:[],
        //------------- no edit-------
        title: null,
        searchForm: {},
        form: {},
        tableData: [],
        detailData:{},
        isEdit: false,
        isShow: false,
        flag: false,
        reFresh:true,
        listLoading: false,
        pickerOptions: {
          shortcuts: [
            {
              text: this.$t('details.Last_week'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: this.$t('details.Last_month'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: this.$t('details.Last_three_months'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        Status : [
  {label:this.$t('details.Cancel'),value:1},
  {label:this.$t('details.Pending_payment'),value:2},
  {label:this.$t('details.shipped'),value:3},
  {label:this.$t('details.received'),value:4},
  {label:this.$t('details.evaluated'),value:5},
  {label:this.$t('details.Customer'),value:6}
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
      //this.load();
    },

    beforeDestroy() {
      eventBus.$off(this.eventBus);
      eventBus.$off(this.getRoleBus)
    },
    methods: {
      sellerDetail(id){
        this.isShow = true;
        this.$axios.get(this.sellerDetailUrl+"?orderDeatilId="+id).then(res => {
          this.detailData = res.data.data;
          this.$refs.orderDetail.openHandleConfirm(this.detailData);
          console.log(this.detailData);
        });

      },
      load(){
        eventBus.$on(this.getRoleBus, (roles) => {
          this.myRoles = roles;
        });
        this.$refs.operation.$noPageQuery(this.getRoleUrl, this.getRoleBus);
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
      reset(){
        this.searchForm = {};
        this.usePagination ? this.query() : this.noPageQuery();
      },

      doDelete(id) {
        this.$refs.operation.$deleteById(this.deleteUrl, id, this.eventBus,this.idType);
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

      async getData(selection,str,flag){
        selection.forEach((data,index)=>{
          if (data.checkOutStatus==2){
            this.$alert('存在【已结算】的订单勾选，请去掉', '', {
              confirmButtonText: '确定'
            });
            flag = false;
            return false;
          }
          str+="orderDetailIds="+ data.orderDeatilId+"&"
        });
        return flag;
      },

      async clearConfirmData() {
        if (!this.searchForm.ruleId){
          this.$alert('请先选择结算规则!', '', {
            confirmButtonText: '确定'
          });
          return false;
        }
        let selection = this.$refs.listPowerSupplyTab.selection;
        if (selection.length>0){
          let form={ruleId:this.searchForm.ruleId};
          this.clearUrl+="?ruleId="+this.searchForm.ruleId+"&";
          let str='';
          let flag = true;
          // await this.getData(selection,str,flag);
          selection.forEach((data,index)=>{
            if (data.checkOutStatus==2){
              flag = false;
              this.$alert('存在【已结算】的订单勾选，请去掉', '', {
                confirmButtonText: '确定'
              });
              throw new Error("存在【已结算】的订单勾选");
            }
            str+="orderDetailIds="+ data.orderDeatilId+"&"
          });
          console.log("flag:",flag);
          this.clearUrl+=str
          let data = qs.stringify(form, {indices: false});
          if (flag){
            this.$axios.get(this.clearUrl).then(res => {
              this.$alert('结算成功', '', {
                confirmButtonText: '确定',
                callback: () => {
                  this.query();
                }
              });
            })
          }
        }else {
          this.$alert('请勾选后再操作', '', {
            confirmButtonText: '确定',
          });
        }
        this.clearUrl = urls.orderDetail_checkOutBatch
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
            let str = this.form.checkOutPercentage
            if (!this.isRealNum(str)){
              this.$alert('佣金百分比只能是数字', '', {
                confirmButtonText: '确定',
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
