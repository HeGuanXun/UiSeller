<template>
  <div style="height: 100%;">
    <div id="expressage" style="height: 50px;margin-left: 10px;">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.username"
                :placeholder="$t('Merchant.VIP_name')"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.sellerPhone"
                :placeholder="$t('Merchant.phone')"
                class="searchbox"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('Merchant.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('Merchant.Reset')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table style="margin-left: 15px;margin-top: 15px;"
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
      <el-table-column :label="$t('Merchant.VIP_name')" sortable prop="username" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.username }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Merchant.phone')" sortable prop="sellerPhone" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerPhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Merchant.mailbox')" sortable prop="sellerEmail" width="">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.sellerEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Merchant.state')" sortable prop="status" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{$platform_user_status[scope.row.status-1].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Merchant.Creation_time')" sortable prop="createTime" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('Merchant.operation')" width="220" >
        <template slot-scope="scope">
          <el-button
                  v-if="scope.row.status===2"
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="doHide(scope.row.sellerId,'show')"
          >
            <i class="el-icon-success"/>
            {{$t('Merchant.Enable')}}</el-button
          >
          <el-button
                  v-else
                  style="margin-left: 10px"
                  size="mini"
                  type="danger" plain
                  @click="doHide(scope.row.sellerId,'hide')"
          >
            <i class="el-icon-error"/>
            {{$t('Merchant.Disable')}}</el-button
          >
          <el-popconfirm
                  :confirmButtonText="$t('mployee.Determine')"
                  :cancelButtonText="$t('mployee.Cancel')"
                  icon="el-icon-info"
                  iconColor="red"
                  :title="$t('mployee.ss')"
                  @onConfirm="doDelete(scope.row.sellerId)"
          >
            <el-button style="margin-left: 10px"
                       slot="reference"
                       size="mini"
                       v-if="$platformRole==1"
                       type="danger"
            >  <i class="el-icon-delete"/>
              {{$t('mployee.delete')}}</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
  import {validateMobile, validateEmail} from "scripts/utils/rule"
  import qs from "qs";

  export default {
    components: {
      pagination,
      operation
    },
    data() {
      let aa = this.$t('Merchant.Phon')
      const checkMobile = (rule, value, callback) => {
        if (!validateMobile(value)) {
          callback(new Error(aa,''))
        } else {
          callback()
        }
      };
      return {
        //--------------need to edit
        listUrl:urls.user_seller_list,
        reviewUrl:urls.user_seller_review,
        deleteUrl:urls.user_seller_delete,
        eventBus:'user_seller_eventBus',
        idType:'sellerId',
        usePagination:true,
        rules: {
          platformPassword: [
            {required: true, message: '请设置至少6位数密码 ', trigger: "blur",min: 6}
          ],
          platformPhone: [
            {required: true, message: '请填写正确的手机号码',trigger: "blur",min: 6,validator: checkMobile,}
          ],
          platformRole: [
            {required: true, message: '请选择角色'}
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
        this.isEdit = false;
      });
      //Whether or not to use paging queries
      this.usePagination ? this.query() : this.noPageQuery();
    },

    beforeDestroy() {
      eventBus.$off(this.eventBus)
    },
    methods: {
      doHide(id,type){
        let text = this.$t('Merchant.Enabled_success');
        let status = 1;
        if (type==='hide'){
          status = 2;
          text = this.$t('Merchant.Disabled_success');
        }
        let form = {"sellerId":id,'status':status};
        let data = qs.stringify(form, {indices: false});
        this.$axios.post(this.reviewUrl, data).then(res => {
          this.$alert(text, '', {
            confirmButtonText: this.$t('Merchant.Determine'),
            callback: () => {
              this.query();
            }
          });
        });
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
        this.isEdit = false;
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
        this.form.platformPassword = '';
        this.isShowDialog();
      },

      //Add with the editor go this method
      confirmData() {
        if (this.isEdit && this.form.platformPassword.trim()!=''){
          if (!this.form.platformPasswordN){
            this.$alert('确认密码不能为空', '', {
              confirmButtonText: '确定'
            });
            return;
          }
          if (this.form.platformPasswordN !== this.form.platformPassword){
            this.$alert('请输入相同的密码', '', {
              confirmButtonText: '确定'
            });
            return;
          }
        }
        let url;
        let text = this.$successAddText;
        if (this.isEdit) {
          text = this.$successEditText;
          url = this.updateUrl;
        } else {
          url = this.createUrl;
        }
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
