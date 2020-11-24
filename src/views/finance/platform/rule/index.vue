<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 50px;">
      <div class="headbox">
        <el-button
                size="mini"
                type="primary" plain
                style="height: 30px;margin-top: 14px;margin-left: 15px"
                @click="toAdd"
        >
          <i class="el-icon-plus"/>
          {{$t('Settlement.Add_settlement_rule')}}
        </el-button
        >
      </div>
    </div>
    <!-- search -->

    <!-- table -->
    <el-table style="margin-left: 15px;margin-top: 15px"
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
      <el-table-column :label="$t('Settlement.percentage')" sortable prop="checkOutPercentage" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.checkOutPercentage }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Settlement.Settlement_type')" sortable prop="checkOutType" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.checkOutType }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Settlement.Creation_time')" sortable prop="createTime" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('Settlement.operation')" width="220">
        <template slot-scope="scope">
          <el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="toEdit(scope.row)"
          ><i class="el-icon-edit"/>
            {{$t('Settlement.edit')}}</el-button
          >
          <el-popconfirm
                  :confirmButtonText="$t('currency.Determine')"
                  :cancelButtonText="$t('currency.cancel')"
                  icon="el-icon-info"
                  iconColor="red"
                  :title="$t('Settlement.sure')"
                  @onConfirm="doDelete(scope.row.ruleId)"
          >
            <el-button style="margin-left: 10px"
                       slot="reference"
                       size="mini"
                       type="danger"
                       v-if="$platformRole==1"
            >  <i class="el-icon-delete"/>
              {{$t('Settlement.Delete')}}</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- table -->

    <!--add-->
    <el-dialog :visible.sync="isShow" width="450px"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               center
               :show-close="false"
               :title="title"
    >
      <el-form ref="form" :model="form" label-width="180px" :rules="rules" center>
        <el-form-item :label="$t('Settlement.Percent')" required prop="checkOutPercentage">
          <el-input size="mini" maxlength="6" v-model="form.checkOutPercentage"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Settlement.settlement')" required prop="checkOutType" >
          <el-input size="mini" maxlength="11" v-model="form.checkOutType"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('Settlement.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('Settlement.cancel')}}</el-button>
      </span>
    </el-dialog>
    <!--pagination component-->
    <pagination v-if="usePagination" ref="pagination"/>
    <!--operation component-->
    <operation  ref="operation"/>
  </div>
</template>
<script>
  import {eventBus} from "scripts/utils/BUS";
  import urls from "@/scripts/api";
  import pagination from "@/component/pagination.vue";
  import operation from "@/component/operation.vue";
  import {doubleNum} from "scripts/utils/rule"

  export default {
    components: {
      pagination,
      operation
    },
    data() {
      let aa =this.$t('Settlement.number')
      const doubleNum_ = (rule, value, callback) => {
        if (!doubleNum(value)) {
          callback(new Error(aa,''))
        } else {
          callback()
        }
      };
      const isNaN_ = (rule, value, callback) => {
        if(value > 100){
          callback(new Error(''))
        } else {
          callback()
        }
      };

      return {
        //--------------need to edit
        listUrl:urls.checkOutRule_list,
        createUrl:urls.checkOutRule_create,
        updateUrl:urls.checkOutRule_create,
        deleteUrl:urls.checkOutRule_delete,
        eventBus:'ruleId_eventBus',
        editTitle:this.$t('Settlement.Edit'),
        addTitle:this.$t('Settlement.add'),
        idType:'ruleId',
        usePagination:false,
        rules: {
          checkOutPercentage: [
            {required: true, message: this.$t('Settlement.enter'),trigger: "blur",max: 6},
            {required: true, message: this.$t('Settlement.correct'),validator:doubleNum_},
            {required: true, message: this.$t('Settlement.cannot'),validator:isNaN_},
          ],
          checkOutType: [
            {required: true, message: this.$t('Settlement.input'),max:11}
          ]
        },
        //------------- no edit-------
        title: null,
        searchForm: {},
        form: {},
        tableData: [],
        isEdit: false,
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
    },

    beforeDestroy() {
      eventBus.$off(this.eventBus)
    },
    methods: {
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
        this.form.checkOutPercentage=this.form.checkOutPercentage.toString();
        this.isShowDialog();
      },

      //Add with the editor go this method
      confirmData() {
        let url;
        let text = this.$t('mployee.New_success');
        if (this.isEdit) {
          text = this.$t('mployee.Editorial_success');
          url = this.updateUrl;
        } else {
          url = this.createUrl;
        }
        console.log(this.form);
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.operation.$confirmData(url, this.form, text, this.eventBus);
            this.isEdit = false;
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
