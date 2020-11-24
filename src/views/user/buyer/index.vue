<template>
  <div style="height: 100%;">
    <div id="expressage" style="height: 60px;">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.username"
                :placeholder="$t('Userbuyer.buyer_name')"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.buyerPhone"
                :placeholder="$t('Userbuyer.phone')"
                class="searchbox"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('Userbuyer.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('Userbuyer.Reset')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table style="margin-left: 15px;"
              ref="listPowerSupplyTab"
              :data="tableData"
              border
              height="67%"
              highlight-current-row
              :stripe="true"
              v-loading="listLoading"
              :default-sort = "{prop: 'data', order: 'descending'}">
      <el-table-column
              fixed
              label="ID"
              type="index"
              width="50"/>
      <el-table-column :label="$t('Userbuyer.buyer_name')" sortable prop="username" width="250">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.username }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Userbuyer.phone')" sortable prop="buyerPhone" width="250">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.buyerPhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Userbuyer.mailbox')" sortable prop="buyerEmail" width="250" >
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.buyerEmail }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Userbuyer.state')" sortable prop="status" width="250">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{$platform_user_status[scope.row.status-1].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Userbuyer.Recommender')" sortable prop="inviteUsername" width="250">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.inviteUsername }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Userbuyer.Registration_time')" sortable prop="createTime" width="250" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('Userbuyer.operation')" width="220" >
        <template slot-scope="scope">
          <el-button
                  v-if="scope.row.status===2"
                  size="mini"
                  type="primary" plain
                  @click="doHide(scope.row.buyerId,'show')"
          >
            <i class="el-icon-success"/>
            {{$t('Userbuyer.Enable')}}</el-button
          >
          <el-button
                  v-else
                  size="mini"
                  type="danger" plain
                  @click="doHide(scope.row.buyerId,'hide')"
          >
            <i class="el-icon-error"/>
            {{$t('Userbuyer.Disable')}}</el-button
          >
          <el-popconfirm
                  :confirmButtonText="$t('mployee.Determine')"
                  :cancelButtonText="$t('mployee.Cancel')"
                  icon="el-icon-info"
                  iconColor="red"
                  :title="$t('mployee.ss')"
                  @onConfirm="doDelete(scope.row.buyerId)"
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
  import {validateMobile} from "scripts/utils/rule"
  import qs from "qs";

  export default {
    components: {
      pagination,
      operation
    },
    data() {
      let Phon = this.$t('Userbuyer.Phon')
      const checkMobile = (rule, value, callback) => {
        if (!validateMobile(value)) {
          callback(new Error(Phon,''))
        } else {
          callback()
        }
      };
      return {
        //--------------need to edit
        listUrl:urls.user_Buyer_list,
        changeStatusUrl:urls.user_Buyer_changeStatus,
        deleteUrl:urls.user_Buyer_delete,
        eventBus:'user_Buyer_eventBus',
        idType:'buyerId',
        usePagination:true,
        rules: {
          platformPassword: [
            {required: true, message: this.$t('Userbuyer.set'), trigger: "blur",min: 6}
          ],
          platformPhone: [
            {required: true, message: this.$t('Userbuyer.Phon'),trigger: "blur",min: 6,validator: checkMobile,}
          ],
          platformRole: [
            {required: true, message: this.$t('Userbuyer.Please')}
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
        let text = this.$t('Userbuyer.Enabled_success');
        let status = 1;
        if (type==='hide'){
          status = 2;
          text = this.$t('Userbuyer.Disabled_success');
        }
        let form = {"buyerId":id,'status':status};
        let data = qs.stringify(form, {indices: false});
        this.$axios.post(this.changeStatusUrl, data).then(res => {
          this.$alert(text, '', {
            confirmButtonText: this.$t('Userbuyer.Determine'),
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
            let confirm = this.$t('Userbuyer.confirm')
            this.$alert(confirm, '', {
              confirmButtonText: this.$t('Userbuyer.Determine')
            });
            return;
          }
          if (this.form.platformPasswordN !== this.form.platformPassword){
            let same = this.$t('Userbuyer.same')
            this.$alert(same, '', {
              confirmButtonText: this.$t('Userbuyer.Determine')
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
