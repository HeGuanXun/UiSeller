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
          {{$t('language.Add')}}
        </el-button
        >
      </div>
    </div>
    <!-- table -->
    <!-- table -->
    <el-table style="margin-left: 15px;margin-top: 15px;"
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

      <el-table-column :label="$t('language.language')" sortable prop="language" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.language }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('language.Code')" sortable prop="languageCode" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.languageCode }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('language.Default')" sortable prop="defaultFlag" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{defaultC[scope.row.defaultFlag].label}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" :label="$t('language.operation')" width="220">
        <template slot-scope="scope">
          <el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="toEdit(scope.row)"
          ><i class="el-icon-edit"/>
            {{$t('language.Edit')}}</el-button
          >
          <el-popconfirm
                  :confirmButtonText="$t('mployee.Determine')"
                  :cancelButtonText="$t('mployee.Cancel')"
                  icon="el-icon-info"
                  iconColor="red"
                  :title="$t('mployee.ss')"
                  @onConfirm="doDelete(scope.row.languageId)"
          >
            <el-button style="margin-left: 10px"
                       slot="reference"
                       size="mini"
                       type="danger"
                       v-if="$platformRole==1"
            >  <i class="el-icon-delete"/>
              {{$t('mployee.delete')}}</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--add-->
    <el-dialog :visible.sync="isShow" width="430px"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               center
               :show-close="false"
               :title="title"
    >

      <el-form ref="form" :model="form" label-width="130px" :rules="rules" center>
        <el-form-item :label="$t('language.Language')" required prop="language">
          <el-input size="mini" maxlength="30" v-model="form.language"></el-input>
        </el-form-item>
        <el-form-item :label="$t('language.languageCode')" required prop="languageCode" >
          <el-input size="mini" :disabled="isEdit"  maxlength="13" v-model="form.languageCode" :placeholder="$t('region.empty')"
                    onKeyUp="this.value=this.value.replace(/\D/g,'')"></el-input>
        </el-form-item>

        <el-form-item :label="$t('currency.defaultCurrency')" required prop="defaultFlag">
          <el-radio-group v-model="form.defaultFlag">
            <el-radio :label="1">{{$t('currency.true')}}</el-radio>
            <el-radio :label="0">{{$t('currency.false')}}</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('language.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('language.cancel')}}</el-button>
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

  export default {
    components: {
      pagination,
      operation
    },
    data() {
      return {
        //--------------need to edit
        listUrl:urls.lang_list,
        createUrl:urls.lang_create,
        updateUrl:urls.lang_create,
        deleteUrl:urls.lang_delete,
        eventBus:'lang_eventBus',
        editTitle:this.$t('language.Editing_language'),
        addTitle:this.$t('language.New_language'),
        idType:'languageId',
        usePagination:false,
        rules: {
          language: [
            {required: true, message: this.$t('language.Please_enter_language')}
          ],
          languageCode: [
            {required: true, message: this.$t('language.Please_enter_language_code')}
          ],
          defaultFlag: [
            {required: true, message: this.$t('language.whether')},

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
        defaultC:[
                {label:this.$t('currency.false')},
          {label:this.$t('currency.true')}
          ]
      };
    },
    watch: {
      form:{
        handler(val, oldVal) {
          this.form.languageCode = val.languageCode.replace(/\D/g,'');
        },
        deep: true //true 深度监听
      }
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

      doDelete(id){
        this.$refs.operation.$deleteById(this.deleteUrl,id,this.eventBus,this.idType);
      },

      noPageQuery() {
        this.listLoading = true;
        this.$refs.operation.$noPageQuery(this.listUrl, this.eventBus);
      },

      query() {
        this.isEdit = false;
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
        let text = this.$t('language.Added_successfully');
        if (this.isEdit) {
          text = this.$t('language.Editorial_success');
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
