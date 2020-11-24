<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 50px">
      <div class="headbox">
        <el-button
                size="mini"
                type="primary" plain
                style="margin-left: 15px;margin-top: 15px"
                @click="toAdd"
        >
          <i class="el-icon-plus"/>
          {{$t('Area_code.Area_Code')}}</el-button
        >
      </div>
    </div>
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
      <el-table-column :label="$t('Area_code.telephone')" sortable prop="regionCode" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.regionCode }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Area_code.Whether')" sortable prop="defaultFlag" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{defaultPhoneRegion[scope.row.defaultFlag].label }}</div>
<!--            <span size="medium">{{ scope.row.defaultFlag }}</span>-->
          </div>

        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('Area_code.operation')" width="200">
        <template slot-scope="scope">
          <el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="toEdit(scope.row)"
          ><i class="el-icon-edit"/>
            {{$t('Area_code.Edit')}}</el-button
          >

          <el-popconfirm
                  :confirmButtonText="$t('Area_code.OK')"
                  :cancelButtonText="$t('Area_code.cancel')"
                  icon="el-icon-info"
                  iconColor="red"
                  :title="$t('Area_code.Delete')"
                  @onConfirm="doDelete(scope.row.phoneRegionId)"
          >
            <el-button style="margin-left: 10px"
                       slot="reference"
                       size="mini"
                       type="danger"
                       v-if="$platformRole==1"
            >  <i class="el-icon-delete"/>
              {{$t('Area_code.delete')}}</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--add-->
    <el-dialog  :visible.sync="isShow" width="400px"
                :close-on-click-modal="false"
                :destroy-on-close="true"
                center
                :show-close="false"
                :title="title">
      <el-form ref="form" :model="form" label-width="130px" :rules="rules" center>
        <el-form-item :label="$t('Area_code.Telephone')" required prop="regionCode" >
          <el-input size="mini" maxlength="13" v-model="form.regionCode" onKeyUp="this.value=this.value.replace(/\D/g,'')"></el-input>
        </el-form-item>
          <el-form-item :label="$t('Area_code.whether')" required prop="defaultFlag">
          <el-radio v-model="form.defaultFlag" label="1">{{$t('Area_code.Yes')}}</el-radio>
          <el-radio v-model="form.defaultFlag" label="0">{{$t('Area_code.No')}}</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('Area_code.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('Area_code.cancel')}}</el-button>
      </span>
    </el-dialog>
    <operation ref="operation"/>
  </div>
</template>
<script>
  import {eventBus} from "scripts/utils/BUS";
  import operation from "@/component/operation.vue";
  import urls from "@/scripts/api";
  import qs from "qs";

  export default {
    components: {
      operation
    },
    data() {
      return {
        //--------------language and area -------------
        getLanguageUrl:urls.lang_list,
        getAreaUrl:urls.area_list,
        myLanguage:[],
        myArea:[],
        getLanguageBus:'getLang_eventBus_Lang',
        getAreaBus:'getLang_eventBus_area',
        //---------------------------
        listUrl:urls.AreaCode_list,
        createUrl:urls.AreaCode_create,
        updateUrl:urls.AreaCode_update,
        deleteUrl:urls.AreaCode_delete,
        eventBus:'AreaCode_eventBus',
        editTitle:this.$t('Area_code.Code'),
        addTitle:this.$t('Area_code.International'),
        idType:'phoneRegionId',
        rules: {
          regionCode: [
            {required: true, message: this.$t('Area_code.enter')},
          ],
          defaultFlag: [
            {required: true, message: this.$t('Area_code.select')}
          ],
          // areaCode:[
          //   {required: true, message: this.$t('Area_code.AreaCode')}
          // ]
        },
        //---------------------they no edit-------
        title:null,
        form:{},
        tableData: [],
        isEdit : false,
        isShow:false,
        listLoading:false,
        defaultPhoneRegion : [

          {
            value: 0,
            label: this.$t('Area_code.No')
          },
          {
            value: 1,
            label: this.$t('Area_code.Yes')
          }
        ],
      };
    },
    watch: {
      form:{
        handler(val, oldVal) {
          this.form.regionCode = val.regionCode.replace(/\D/g,'');
        },
        deep: true //true 深度监听
      }
    },

    mounted() {
      eventBus.$on(this.getLanguageBus, (language) => {
        // let languageArray = [];
        // let arry = [];
        // for (let lang of language){
        //   if (arry.indexOf(lang.language)==-1){
        //     arry.push(lang.language);
        //     languageArray.push(lang);
        //   }
        // }
        this.myLanguage = language;
      });
      eventBus.$on(this.eventBus, (tableData) => {
        if (tableData){
          this.listLoading = false;
          this.tableData = tableData;
        }else {
          this.search();
        }
        this.isShow = false;
      });

      this.load();

      this.search();
    },
    beforeDestroy () {
      eventBus.$off(this.eventBus);
      eventBus.$off(this.getLanguageBus);
      eventBus.$off(this.getAreaBus);
    },
    methods: {



      load(){

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
        this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus_Lang');
        this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getLang_eventBus_area');
      },

      doDelete(id){
        this.$refs.operation.$deleteById(this.deleteUrl,id,this.eventBus,this.idType);
      },
      search() {
        this.isEdit = false;
        this.listLoading = true;
        this.$refs.operation.$noPageQuery(this.listUrl, this.eventBus);
      },
      toAdd(){
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
      toEdit(row){
        this.title = this.editTitle;
        this.isEdit = true;
        this.form = JSON.parse(JSON.stringify(row));
        this.form.defaultFlag = this.form.defaultFlag.toString();
        console.log(this.form);
        this.isShowDialog();
      },

      // toEdit(row) {
      //   this.title = this.editTitle;
      //   this.isEdit = true;
      //   this.form = JSON.parse(JSON.stringify(row));
      //   this.form.categoryStatus = this.form.categoryStatus.toString();
      //   console.log(this.form);
      //   this.isShowDialog();
      // },

      confirmData(){
        let url;
        let text = this.$t('Area_code.Added_successfully');
        if (this.isEdit){
          text = this.$t('Area_code.Editorial_success');
          url = this.updateUrl;
        }else{
          url = this.createUrl;
        }
        this.$refs.form.validate((valid) => {
          if (valid){
            this.$refs.operation.$confirmData(url, this.form, text,this.eventBus);
          }else {
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
