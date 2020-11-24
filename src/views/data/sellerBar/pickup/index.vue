<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 50px;">
      <div class="headbox">
        <el-button
          size="mini"
          type="primary"
          plain
          style="height: 30px;margin-top: 14px;margin-left: 15px"
          @click="toAdd"
        >
          <i class="el-icon-plus" />
          {{$t('pickup.Type')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table
      style="margin-left: 15px;margin-top: 15px;"
      ref="listPowerSupplyTab"
      :data="tableData"
      border
      height="500"
      highlight-current-row
      :stripe="true"
      v-loading="listLoading"
      :default-sort = "{prop: 'data', order: 'descending'}">
      <el-table-column fixed label="ID" type="index" width="50" />
      <el-table-column :label="$t('pickup.name')" sortable prop="deliverMethod" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.deliverMethod }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Review.code_')" sortable prop="platformDeliverMethodCode" width="170">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.platformDeliverMethodCode }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('pickup.describe')" sortable prop="deliverDescription" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.deliverDescription }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('pickup.area')" sortable prop="areaCodeStr" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.areaCodeStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('pickup.Language')" sortable prop="languageCodeStr" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.languageCodeStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('pickup.operation')" width="220">
        <template slot-scope="scope">
          <el-button
            style="margin-left: 10px"
            size="mini"
            type="primary"
            plain
            @click="toEdit(scope.row)"
            ><i class="el-icon-edit" /> {{$t('pickup.Edit')}}</el-button
          >
          <el-popconfirm
            :confirmButtonText="$t('mployee.Determine')"
            :cancelButtonText="$t('mployee.Cancel')"
            icon="el-icon-info"
            iconColor="red"
            :title="$t('mployee.ss')"
            @onConfirm="doDelete(scope.row.platformDeliverMethodId)"
          >
            <el-button
              style="margin-left: 10px"
              slot="reference"
              size="mini"
              type="danger"
              plain
              v-if="$platformRole==1"
            >
              <i class="el-icon-delete" /> {{$t('mployee.delete')}}</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--add-->
    <el-dialog
      :visible.sync="isShow"
      width="500px"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      center
      :show-close="false"
      :title="title"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="140px"
        :rules="rules"
        center
      >

        <el-form-item :label="$t('pickup.Area')" required prop="areaCode">
          <el-select v-model="form.areaCode" filterable :placeholder="$t('pickup.select')" size="mini">
            <el-option
                    v-for="item in myArea"
                    :key="item.areaCode"
                    :label="item.area"
                    :value="item.areaCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('pickup.language')" required prop="languageCode">
          <el-select v-model="form.languageCode" filterable :placeholder="$t('pickup.select_language')" size="mini">
            <el-option
                    v-for="item in myLanguage"
                    :key="item.languageCode"
                    :label="item.language"
                    :value="item.languageCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('pickup.Name')" required prop="deliverMethod">
          <el-input size="mini" maxlength="10" v-model="form.deliverMethod"></el-input>
        </el-form-item>
        <el-form-item :label="$t('pickup.Describe')">
          <el-input
            size="mini"
            resize="none"
            type="textarea"
            :rows="2"
            maxlength="25"
            v-model="form.deliverDescription"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('pickup.pickup_code')" required prop="platformDeliverMethodCode">
            <el-input size="mini" maxlength="13" :disabled="isEdit" :placeholder="$t('region.empty')" v-model="form.platformDeliverMethodCode" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('pickup.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('pickup.Cancel')}}</el-button>
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
  import operation from "@/component/operation.vue";
  import urls from "@/scripts/api";

  export default {
    components: {
      operation
    },
    data() {
      return {
        getLanguageUrl:urls.lang_list,
        getAreaUrl:urls.area_list,
        myLanguage:[],
        myArea:[],
        getLanguageBus:'getLang_eventBus_pickup',
        getAreaBus:'getArea_eventBus_pickup',
        //---------------need to edit
        listUrl:urls.pickup_list,
        createUrl:urls.pickup_create,
        updateUrl:urls.pickup_update,
        deleteUrl:urls.pickup_delete,
        eventBus:'pickup_eventBus',
        idType:'platformDeliverMethodId',
        editTitle:this.$t('pickup.Edit_Type'),
        addTitle:this.$t('pickup.Add_Type'),

        usePagination:false,
        rules: {
          platformDeliverMethodCode:[{ required: true, message: this.$t('pickup.input_code') }],
          deliverMethod: [{ required: true, message: this.$t('pickup.Store_Type') }],
          areaCode: [{ required: true, message: this.$t('pickup.select') }],
          languageCode: [{ required: true, message: this.$t('pickup.select_language') }]
        },
        //---------------------they no edit-------
        title:null,
        form:{},
        tableData: [],
        isEdit : false,
        isShow:false,
        listLoading:false,
      };
    },
    watch: {
      form:{
        handler(val,oldVal) {
          try{
            this.form.platformDeliverMethodCode = val.platformDeliverMethodCode.replace(/\D/g,'');
          }catch (e) {

          }
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
      this.load();
    },

    beforeDestroy() {
      eventBus.$off(this.eventBus);
      eventBus.$off(this.getLanguageBus);
      eventBus.$off(this.getAreaBus);
    },
    methods: {
      load(){
        eventBus.$on(this.getLanguageBus, (language) => {
          let languageArray = [];
          let arry = [];
          for (let lang of language){
            if (arry.indexOf(lang.language)==-1){
              arry.push(lang.language);
              languageArray.push(lang);
            }
          }
          this.myLanguage = languageArray;
        });
        eventBus.$on(this.getAreaBus, (area) => {
          let areaArray = [];
          let arry = [];
          for (let arrayValue of area){
            if (arry.indexOf(arrayValue.area)==-1){
              arry.push(arrayValue.area);
              areaArray.push(arrayValue);
            }
          }
          this.myArea = areaArray;
        });
        this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus_pickup');
        this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus_pickup');
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
        this.isEdit = false;
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
        let text = this.$t('pickup.Add_success');
        if (this.isEdit) {
          text = this.$t('pickup.Edit_success');
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
