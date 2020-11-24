<template>
  <div style="height: 95.5%;">
    <!-- search -->
    <div id="expressage" style="height: 60px">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.shopName"
                :placeholder="$t('Type.Shop_name')"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.approveStatus"
                :placeholder="$t('Type.state')"
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
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('Type.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('Type.Reset')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table style="margin-left: 15px"
              ref="listPowerSupplyTab"
              :data="tableData"
              border
              height="500"
              :stripe="true"
              highlight-current-row
              v-loading="listLoading"
              :default-sort = "{prop: 'data', order: 'descending'}">
      <el-table-column
              fixed="left"
              label="ID"
              type="index"
              width="50"/>
      <el-table-column :label="$t('Type.Shop_name')" sortable prop="shopName" width="320">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.shopName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Type.one')" sortable prop="sellerCategoryLevelOne" width="320">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerCategoryLevelOne}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Type.Two')" sortable prop="sellerCategoryLevelTwo" width="320">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerCategoryLevelTwo }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Type.state')" sortable prop="approveStatus" width="320">
        <template slot-scope="scope">
          <div>{{ $platform_status_vo[scope.row.approveStatus + 1].label }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Type.Audit_reason')" sortable prop="approveCause" width="320">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium" v-if="scope.row.approveStatus===-1">{{ scope.row.approveCause }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('Type.operation')" width="150">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="primary" plain
                  @click="details(scope.row.sellerCategoryId)"
          >
            {{$t('Type.Audit')}}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--pagination component-->
    <!--check component-->
    <el-dialog  :visible.sync="isShow" width="500px"
                :close-on-click-modal="false"
                :destroy-on-close="true"
                :close-on-press-escape="false"
                :show-close="false"
                center
                :title="$t('Type.Audit')"
    >
      <table style="border-collapse:separate; border-spacing:10px;margin-top: -20px;width: 400px" border="0">
        <tr>
          <td style="text-align: right;width: 40%">{{$t('Type.Shop_name')}}:</td>
          <td style="text-align: left;width: 60%">{{ this.detailData.shopName }}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Type.one')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerCategoryLevelOne }}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Type.Two')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerCategoryLevelTwo }}</td>
        </tr>
        <tr v-if="isShow">
          <td style="text-align: right" >{{$t('Type.state')}}:</td>
          <td  v-if="this.detailData.approveStatus == 1" style="text-align: left;color: chartreuse">
            {{$platform_status_vo[this.detailData.approveStatus+1].label}}
          </td>
          <td   v-else style="text-align: left;color: red">
            {{$platform_status_vo[this.detailData.approveStatus+1].label}}
          </td>
        </tr>
      </table>
      <div style="text-align: center;margin-top: 15px">
        <el-select v-model="approveForm.approveStatus" :placeholder="$t('Type.status')" size = "mini" style="width: 75%;">
          <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-input
                maxlength="20"
                style="margin-top:15px;width: 75%"
                resize="none"
                type="textarea"
                :rows="2"
                :placeholder="$t('Type.failure')"
                v-model="approveForm.approveCause"
                v-if="approveForm.approveStatus === -1"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmApprove"><i class="el-icon-check"></i>{{$t('currency.Determine')}}</el-button>
        <el-button @click="isDialogShow"><i class="el-icon-close"></i>{{$t('currency.cancel')}}</el-button>
      </span>
    </el-dialog>
    <!--img component-->
    <pagination v-if="usePagination" ref="pagination"/>
    <operation  ref="operation"/>
    <my-img ref="myImg"></my-img>
  </div>
</template>
<script>
  import Moment from "moment";
  import url from "api";
  import {eventBus} from "scripts/utils/BUS";
  import pagination from "@/component/pagination.vue";
  import useOrStop from "@/component/useOrStop.vue";
  import myImg from "@/component/myImg.vue";
  import urls from "@/scripts/api";
  import operation from "@/component/operation.vue";
  import qs from "qs";

  export default {
    components: {
      pagination,
      useOrStop,
      myImg,
      operation
    },
    data() {
      return {
        listUrl:urls.storeType_shop_list,
        queryByIdUrl:urls.storeType_queryById,
        reviewUrl:urls.storeType_review,
        eventBus:'storeType_eventBus',
        idType:'sellerCategoryId',
        dataBusName:'storeBusType',
        eventBusName:'storeTypeEventBus',
        usePagination:true,
        reason:null,
        detailData:{},
        approveForm:{},
        tableData: [],
        searchForm :{
        },
        isShow:false,
        listLoading:false,
        Status : [
  {
    label:this.$t('Type.Pending'),
    value:0
    },
  {
    label:this.$t('Type.Pass'),
    value:1
    },
  {
    label:this.$t('Type.refuse'),
    value:-1
    },

],
 status : [
  {
    label:this.$t('Type.pass'),
    value:1
    },
  {
    label:this.$t('Type.No'),
    value:-1
    },

],
// Add
STATUS: this.$t('Type.status'),
success_text:this.$t('Type.Success'),
Null:this.$t('Type.Null'),
OK:this.$t('Type.Determine'),
// Add
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
            // add
    },

    methods: {
      details(id){
        this.isShow = true;
        this.approveForm = {sellerCategoryId:id};
        let data = qs.stringify(this.approveForm, {indices: false});
        this.$axios.post(this.queryByIdUrl, data).then(res => {
          this.detailData = res.data.data;
        });
      },

      startUseOrStopUp(type){
        let selection = this.$refs.listPowerSupplyTab.selection;
        if (selection.length>0){
          let ids = [];
          selection.forEach((data,index)=>{
            ids[index] = data.id
          });
          let status;
          if (type==='start_use'){
            status = this.shopStatus.start_use
          }else {
            status = this.shopStatus.disable
          }
          this.$refs.useOrStop.changeStatus(urls.shopStarOrStop,ids,status,this.eventBusName);
        }else {
          let Unchecked = this.$t('Type.Unchecked')
          this.$alert(Unchecked, '', {
            confirmButtonText: this.$t('Type.Determine'),
          });
        }
      },
      cancel(){
        this.detailData = {};
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        });
        this.isShowDialog();
      },

      startUseOrStop(row,status){
        let ids = [];
        ids[0] = row.id;
        this.$refs.useOrStop.changeStatus(urls.shopStarOrStop,ids,status,this.eventBusName);
      },

      reset(){
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },
            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(this.listUrl, this.searchForm, this.eventBus);
            },



      buildParam(){
        let formParam = {};
        if (this.searchForm.sellerCompanyName){
          formParam.sellerCompanyName = this.searchForm.sellerCompanyName;
        }
        if (this.searchForm.sellerContactPerson){
          formParam.sellerContactPerson = this.searchForm.sellerContactPerson;
        }
        if (this.searchForm.sellerContactPhone){
          formParam.phone = this.searchForm.sellerContactPhone;
        }
        if (this.searchForm.sellerApproveStatus){
          formParam.status = this.searchForm.sellerApproveStatus;
        }
        if (this.searchForm.times != undefined) {
          let time1 = this.searchForm.times[0];
          let time2 = this.searchForm.times[1];
          formParam.startTime = Moment(time1).format("YYYY-MM-DD");
          formParam.endTime = Moment(time2).format("YYYY-MM-DD");
        }
        return formParam;
      },

      search() {
        this.$refs.pagination.searchData(urls.shopSearches, this.buildParam(),this.dataBusName);
      },

      sellerDetail(id){
        this.isShow = true;
        this.$axios.get(url.sellerDetail, id).then(res => {
          let data = res.data;
          this.detailData = res.data;
          this.detailData.id = id;
          this.detailData.sellerType = this.sellerType[data.sellerType-1].label;
        });
      },

      businessUrl(businessUrl) {
        if (businessUrl==='sellerIdentityFrontUrl'){
          businessUrl = this.detailData.sellerIdentityFrontUrl;
        }else if (businessUrl==='sellerIdentityBackUrl'){
          businessUrl = this.detailData.sellerIdentityBackUrl;
        }else {
          businessUrl = this.detailData.sellerCompanyLicenseUrl;
        }
        this.$refs.myImg.isDialogShow(businessUrl);
      },
      //wrap dialog
      isDialogShow() {
        this.isShow = this.isShow !== true;
      },
      // Review
      confirmApprove(){
        if(!this.approveForm.approveStatus){
          this.$alert(this.STATUS, '', {
            confirmButtonText: this.$t('Type.Determine')
          });
          return false
        }
        if(this.approveForm.approveStatus == -1 && !this.approveForm.approveCause){
          this.$alert(this.Null, '', {
            confirmButtonText: this.$t('Type.Determine')
          });
          return
        }
        let data = qs.stringify(this.approveForm, {indices: false});
        this.$axios.post(this.reviewUrl,data).then(res => {
          this.$alert(this.success_text, '', {
            // confirmButtonText:"$t('Type.Pending')",
            confirmButtonText: this.$t('Type.Determine'),
            callback: () => {
              this.isDialogShow();
              this.query();
            }
          });
        });
      },
    // Review
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
