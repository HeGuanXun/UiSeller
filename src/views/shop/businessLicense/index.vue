<template>
  <div style="height: 95.5%;">
    <!-- search -->
    <div id="expressage" style="height: 60px">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.shopName"
                :placeholder="$t('license.Shop_name')"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.approveStatus"
                :placeholder="$t('license.state')"
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
          {{$t('license.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('license.Reset')}}</el-button
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
              fixed
              label="ID"
              type="index"
              width="50"/>
      <el-table-column :label="$t('license.Shop_name')" sortable prop="shopName" width="270">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.shopName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('license.Management_type')" sortable prop="licenseType" width="270">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.licenseType }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('license.Company_license')" sortable prop="licenseUrl" width="270">
        <template slot-scope="scope">
          <el-link type="primary" @click="businessUrl('licenseUrl',scope.row)">
            {{$t('license.View')}}
          </el-link>
        </template>
      </el-table-column>

      <el-table-column :label="$t('license.state')" sortable prop="approveStatus" width="270">
        <template slot-scope="scope">
          <div>{{ $platform_status_vo[scope.row.approveStatus + 1].label }}</div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('license.Audit_reason')" sortable prop="approveCause" width="270">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium" v-if="scope.row.approveStatus===-1">{{ scope.row.approveCause }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('license.Application_time')" sortable prop="createTime" width="270">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
<!-- operation -->
    <el-table-column fixed="right" :label="$t('license.operation')" width="150">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="primary" plain
                  @click="details(scope.row)"
          >
            {{$t('license.Audit')}}</el-button
          >
        </template>
    </el-table-column>
<!-- operation -->

    </el-table>
    <!--pagination component-->
    <!--check component-->
    <pagination v-if="usePagination" ref="pagination"/>
    <operation  ref="operation"/>
<!-- operation -->
    <el-dialog  :visible.sync="isShow" width="500px"
                :close-on-click-modal="false"
                :destroy-on-close="true"
                :close-on-press-escape="false"
                center
                :title="$t('license.Audit')"
    >
      <table style="border-collapse:separate; border-spacing:10px;margin-top: -20px;width: 400px" border="0">
        <tr  style="width: 100%;margin-top: 15px">
          <td style="text-align: right;width: 40%">{{$t('license.Shop_name')}}:</td>
          <td style="text-align: left;width: 60%">{{ this.detailData.shopName}}</td>
        </tr>
        <tr>
          <td style="text-align: right;width: 40%">{{$t('license.Management_type')}}:</td>
          <td style="text-align: left;">{{ this.detailData.licenseType}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('license.Company_license')}}:</td>
          <td style="text-align: left">
            <el-link type="primary" @click="businessUrl('licenseUrl_')">
              {{$t('license.View')}}
            </el-link>
          </td>
        </tr>

        <tr v-if="isShow">
          <td style="text-align: right" >{{$t('license.state')}}:</td>
          <td  v-if="this.detailData.approveStatus == 1" style="text-align: left;color: chartreuse">
            {{$platform_status_vo[this.detailData.approveStatus+1].label}}
          </td>
          <td   v-else style="text-align: left;color: red">
            {{$platform_status_vo[this.detailData.approveStatus+1].label}}
          </td>
        </tr>
      </table>
      <div style="text-align: center;margin-top: 15px">
        <el-select v-model="approveForm.approveStatus" :placeholder="$t('license.status')" size = "mini" style="width: 75%">
          <el-option
                  v-for="item in STATUSS"
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
                :placeholder="$t('license.failure')"
                v-model="approveForm.approveCause"
                v-if="approveForm.approveStatus === -1"
        />
      </div>
      <span slot="footer" class="dialog-footer">

        <el-button  type="primary" @click="confirmApprove"><i class="el-icon-check"></i>{{$t('currency.Determine')}}</el-button>
        <el-button @click="isDialogShow"><i class="el-icon-close"></i>{{$t('currency.cancel')}}</el-button>
      </span>
      <my-img ref="myImg"></my-img>
    </el-dialog>
<!-- operation -->
    <!--img component-->
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
        listUrl:urls.sellerShopLicense_list,
        queryByIdUrl:urls.sellerShopLicense_queryById,
        reviewUrl:urls.sellerShopLicense_review,
        eventBus:'sellerShopLicense_eventBus',
        usePagination:true,
        detailData:{},
        approveForm:{},
        tableData: [],
        searchForm :{
        },
        isShow:false,
        listLoading:false,
        Status: [
  {
    value: 0,
    label: this.$t('license.Pending')
  },
  {
    value: 1,
    label: this.$t('license.Pass')
  },
  {
    value:-1,
    label: this.$t('license.Rejected')
  }
],
 STATUSS :[
  {
    value: 1,
    label: this.$t('license.pass')
  },
  {
    value: -1,
    label: this.$t('license.No')
  }
],
STATUS: this.$t('license.status'),
success_text:this.$t('license.Success'),
Null:this.$t('license.Null'),
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
      details(row){
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        });
        this.isShow = true;
        this.detailData = row;
        this.approveForm = {};
        this.approveForm.sellerShopLicenseId = row.sellerShopLicenseId;
        // let data = qs.stringify(this.approveForm, {indices: false});
        // this.$axios.post(this.queryByIdUrl, data).then(res => {
        //   this.detailData = res.data.data;
        // });
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


      reset(){
        this.searchForm = {};
        this.usePagination ? this.query() : this.noPageQuery();
      },
      query() {
        this.listLoading = true;
        this.$refs.pagination.$query(this.listUrl, this.searchForm, this.eventBus);
      },

      search() {
        this.$refs.pagination.searchData(urls.shopSearches, this.buildParam(),this.dataBusName);
      },

      businessUrl(businessUrl,row) {
        if ("licenseUrl_"===businessUrl){
          businessUrl = this.detailData.licenseUrl;
        }else {
          businessUrl = row.licenseUrl;
        }
        this.$refs.myImg.isDialogShow( businessUrl);
      },
      //wrap dialog
      isDialogShow() {
        this.isShow = this.isShow !== true;
      },
      confirmApprove(){
        if(!this.approveForm.approveStatus){
          this.$alert(this.STATUS, '', {
            confirmButtonText: this.$t('license.Determine')
          });
          return false
        }
        if(this.approveForm.approveStatus == -1 && !this.approveForm.approveCause){
          this.$alert(this.Null, '', {
            confirmButtonText: this.$t('license.Determine')
          });
          return
        }
        let data = qs.stringify(this.approveForm, {indices: false});
        this.$axios.post(this.reviewUrl,data).then(res => {
          this.$alert(this.success_text, '', {
            confirmButtonText: this.$t('license.Determine'),
            callback: () => {
              this.isDialogShow();
              this.query();
            }
          });
        });
      },
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
