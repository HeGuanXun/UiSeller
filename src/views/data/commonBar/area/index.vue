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
          {{$t('region.Add')}}</el-button
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
      <el-table-column :label="$t('region.Area_name')"  sortable prop="area" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.area }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('region.Area_code')"  sortable prop="areaCode" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.areaCode }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('region.language')" sortable prop="languageStr" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.languageStr }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('region.default')" sortable prop="defaultFlag" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{defaultC[scope.row.defaultFlag].label}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" :label="$t('region.operation')" width="220">
        <template slot-scope="scope">
          <el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="toEdit(scope.row)"
          ><i class="el-icon-edit"/>
            {{$t('region.Edit')}}</el-button
          >
          <el-popconfirm
                  :confirmButtonText="$t('mployee.Determine')"
                  :cancelButtonText="$t('mployee.Cancel')"
                  icon="el-icon-info"
                  iconColor="red"
                  :title="$t('mployee.ss')"
                  @onConfirm="doDelete(scope.row.areaId)"
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
    <el-dialog  :visible.sync="isShow" width="500px"
                :close-on-click-modal="false"
                :destroy-on-close="true"
                center
                :show-close="false"
                :title="title">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules" center>
        <el-form-item :label="$t('region.name')" required prop="area">
        <el-input size="mini" maxlength="10" v-model="form.area"></el-input>
      </el-form-item>
        <el-form-item :label="$t('region.Area_code')"  required prop="areaCode">
          <el-input size="mini" :disabled="isEdit" maxlength="13" v-model="form.areaCode" :placeholder="$t('region.empty')"
                    onKeyUp="this.value=this.value.replace(/\D/g,'')"/>
        </el-form-item>
        <el-form-item :label="$t('region.Language')" required prop="languageCode" >
          <el-select v-model="form.languageCode" filterable :placeholder="$t('region.selete')" size="mini" style="width: 100%">
            <el-option
                    v-for="(item,index) in myLanguage"
                    :key="index"
                    :label="item.language"
                    :value="item.languageCode"
            />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('currency.defaultCurrency')" required prop="defaultFlag">
          <el-radio-group v-model="form.defaultFlag">
            <el-radio :label="1">{{$t('currency.true')}}</el-radio>
            <el-radio :label="0">{{$t('currency.false')}}</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('region.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('region.cancel')}}</el-button>
      </span>
    </el-dialog>
    <operation ref="operation"/>
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
        //--------------language and area -------------
        getLanguageUrl:urls.lang_list,
        getAreaUrl:urls.area_list,
        myLanguage:[],
        myArea:[],
        getLanguageBus:'getLang_eventBus_Lang',
        getAreaBus:'getLang_eventBus_area',
        //---------------------------
        listUrl:urls.area_list,
        createUrl:urls.area_create,
        updateUrl:urls.area_update,
        deleteUrl:urls.area_delete,
        eventBus:'area_eventBus',
        editTitle:this.$t('region.Edit_Area'),
        addTitle:this.$t('region.New_Area'),
        idType:'areaId',
        rules: {
          area: [
            {required: true, message: this.$t('region.Input')},
          ],
          languageCode: [
            {required: true, message: this.$t('region.Area')}
          ],
          areaCode:[
            {required: true, message: this.$t('region.AreaCode')}
          ],
          defaultFlag: [
            {required: true, message: this.$t('region.Default')},

          ],
        },
        //---------------------they no edit-------
        title:null,
        form:{},
        tableData: [],
        isEdit : false,
        isShow:false,
        listLoading:false,
        defaultC:[{label:this.$t('region.No')},{label:this.$t('region.Yes')}]
      };
    },
    watch: {
      form:{
        handler(val, oldVal) {
          this.form.areaCode = val.areaCode.replace(/\D/g,'');
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
        this.isShowDialog();
        this.isEdit = true;
        this.form = JSON.parse(JSON.stringify(row));
      },
      confirmData(){
        let url;
        let text = this.$t('region.Added_successfully');
        if (this.isEdit){
            text = this.$t('region.Editorial_success');
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
