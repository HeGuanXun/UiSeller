  <template>
  <div style="height: 100%;">
    <div id="expressage" style="height: 60px;">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.targetBankAccountNumber"
                :placeholder="$t('Legal.Transaction_object')"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.txnStatus"
                :placeholder="$t('Legal.state')"
                class="searchbox"
        >
          <el-option
                  size="mini"
                  v-for="item in legalTender_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
          />
        </el-select>
        <el-select
                size="mini"
                v-model="searchForm.txnTargetType"
                :placeholder="$t('Legal.Trading_partner_type')"
                class="searchbox"
        >
          <el-option
                  size="mini"
                  v-for="item in object_status"
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
                        :picker-options="$platform_pickerOptions"
                        :range-separator="$t('Legal.To')"
                        :start-placeholder="$t('Legal.Start_time')"
                        :end-placeholder="$t('Legal.End_time')"
                        align="right"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('Legal.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('Legal.Reset')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table style="margin-left: 15px"
              ref="listPowerSupplyTab"
              :data="tableData"
              border
              width="75%"
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
      <el-table-column :label="$t('Legal.Transaction_object')" sortable prop="targetBankAccountNumber" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.targetBankAccountNumber }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Company_account')" sortable prop="platformBankAccountNumber" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.platformBankAccountNumber }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Trading_partner_type')" sortable prop="txnTargetType" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{ object_status[scope.row.txnTargetType-1].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Transaction_number')" sortable prop="txnNum" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.txnNum }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Transaction_reasons')" sortable prop="txnCause" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ $platform_legalTender_reason[scope.row.txnCause-1].label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Income')" sortable prop="txnIncome" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.txnIncome }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Expenditure')" sortable prop="txnExpense" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.txnExpense }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.currency')" sortable prop="txnCurrencyStr" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.txnCurrencyStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Payment_method')" sortable prop="bankType" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ $PAY_WAY[scope.row.bankType-1].label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.state')" sortable prop="txnStatus" width="150">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ legalTender_status[scope.row.txnStatus-1].label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Trading_direction')" sortable prop="txnInOrOut" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ $platform_legalTender_txnInOrOut[scope.row.txnInOrOut-1].label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Transaction_time')" sortable prop="txnStartTime" width="160">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.txnStartTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Legal.Transaction_success_time')" sortable prop="txnCompletedTime" width="160">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.txnCompletedTime }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--pagination component-->
    <pagination ref="pagination"/>
  </div>
</template>
<script>
  import {eventBus} from "scripts/utils/BUS";
  import urls from "@/scripts/api";
  import pagination from "@/component/pagination.vue";
  import operation from "@/component/operation.vue";

  export default {
    components: {
      pagination,
      operation
    },
    data() {
      return {
        //--------------need to edit
        listUrl:urls.bankTransactions_list,
        eventBus:'bankTransactions_eventBus',
        editTitle:'编辑公司账户',
        addTitle:'新增公司账户',
        idType:'platformTxnId',
        usePagination:true,
        rules: {
          platformBankAccountOwner: [
            {required: true, message: '请输入开户人姓名',max:20}
          ],
          platformBankAccountNum: [
            {required: true, message: '请输入账户号码'}
          ],
          platformBank: [
            {required: true, message: '请输入账户开户行'}
          ],
          platformBankBranch: [
            {required: true, message: '请输入账户开户支行'}
          ],
          platformBankAccountFunction: [
            {required: true, message: '请输入账户功能'}
          ],
          platformBankAccountType: [
            {required: true, message: '请输入账户类型'}
          ],
        },
        //------------- no edit-------
        title: null,
        searchForm: {},
        form: {},
        tableData: [],
        isEdit: false,
        isShow: false,
        listLoading: false,
        legalTender_status :[
  {label:this.$t('Legal.Transaction'),value:1},
  {label:this.$t('Legal.Success'),value:2},
  {label:this.$t('Legal.fail'),value:3}
],
        object_status : [
  {label:this.$t('Legal.business'),value:1},{label:this.$t('Legal.Member'),value:2},{label:this.$t('Legal.Other'),value:3}
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
        })
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
