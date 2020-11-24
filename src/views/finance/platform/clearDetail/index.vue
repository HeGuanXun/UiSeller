<template>
  <div style="height: 100%;">
    <!-- table -->
    <el-table style="margin-left: 15px"
              ref="listPowerSupplyTab"
              :data="tableData"
              border
              height="500"
              highlight-current-row
              :stripe="true"
              v-loading="listLoading"
              :default-sort = "{prop: 'data', order: 'descending'}">
      <el-table-column
              fixed
              label="ID"
              type="index"
              width="50"/>
      <el-table-column :label="$t('cleardetail.Order_details')" sortable prop="orderDetailNum" width="220">
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
      <el-table-column :label="$t('cleardetail.object')" sortable prop="checkOutTo" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ $platform_orderDetailStatus_object[scope.row.checkOutTo-1].label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cleardetail.percentage')" sortable prop="checkOutPercentage" width="220">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.checkOutPercentage }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cleardetail.money')" sortable prop="totalAmount" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.totalAmount }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cleardetail.income')" sortable prop="checkOutAmount" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.checkOutAmount }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cleardetail.currency')" sortable prop="checkOutCurrencyStr" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.checkOutCurrencyStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cleardetail.Type')" sortable prop="checkOutType" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.checkOutType }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cleardetail.time')" sortable prop="checkOutTime" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.checkOutTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('cleardetail.person')" sortable prop="checkOutBy" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.checkOutBy }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--pagination component-->
    <pagination ref="pagination"/>
    <orderDetail ref="orderDetail" v-if="reFresh"></orderDetail>
  </div>
</template>
<script>
  import {eventBus} from "scripts/utils/BUS";
  import urls from "@/scripts/api";
  import pagination from "@/component/pagination.vue";
  import operation from "@/component/operation.vue";
  import orderDetail from "@/component/orderDetail.vue";

  export default {
    components: {
      pagination,
      operation,
      orderDetail
    },
    data() {
      return {
        //--------------need to edit
        sellerDetailUrl:urls.orderDetail_queryByOrderDetailNum,
        listUrl:urls.checkOut_list,
        createUrl:urls.checkOutRule_create,
        updateUrl:urls.checkOutRule_create,
        deleteUrl:urls.checkOutRule_delete,
        eventBus:'ruleId_clear_eventBus',
        editTitle:'编辑结算规则',
        addTitle:'新增结算规则',
        idType:'ruleId',
        usePagination:true,
        rules: {
          checkOutPercentage: [
            {required: true, message: '请输入佣金百分比'}
          ],
          checkOutType: [
            {required: true, message: '请选择结算种类'}
          ]
        },
        //------------- no edit-------
        title: null,
        searchForm: {},
        form: {},
        detailData:{},
        tableData: [],
        isEdit: false,
        isShow: false,
        reFresh:true,
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
