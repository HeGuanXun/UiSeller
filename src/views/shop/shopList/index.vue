<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 60px">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.sellerCompanyName"
                :placeholder="$t('seller.Business_name')"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.sellerContactPerson"
                :placeholder="$t('seller.Name')"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.sellerContactPhone"
                :placeholder="$t('seller.Mobile')"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.approveStatus"
              :placeholder="$t('seller.state')"
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
        <el-date-picker style="width: 240px"
                        size="mini"
                        class="searchbox"
                        v-model="searchForm.times"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        :range-separator="$t('seller.To')"
                        :start-placeholder="$t('seller.start_time')"
                        :end-placeholder="$t('seller.End_time')"
                        align="right"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('seller.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('seller.Reset')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table style="margin-left: 15px"
              height="75%"
              ref="listPowerSupplyTab"
              :data="tableData"
              border
              :stripe="true"
              highlight-current-row
              v-loading="listLoading"
              :default-sort = "{prop: 'data', order: 'descending'}">
      <el-table-column
              fixed
              label="ID"
              type="index"
              width="50"/>
      <el-table-column :label="$t('seller.Merchant_type')" sortable prop="sellerType" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{ $platform_sellerType[scope.row.sellerType-1].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Name')" sortable prop="sellerContactPerson" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerContactPerson }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Mobile')" sortable prop="sellerContactPhone"  width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper" >
            <span size="medium">{{ scope.row.sellerContactPhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.address')" sortable prop="sellerContactAddress" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerContactAddress}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Enterprise_name')" sortable prop="sellerCompanyName" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerCompanyName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Enterprise_account_number')" sortable prop="sellerCompanyIdentity" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerCompanyIdentity }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Enterprise_address')" sortable prop="sellerCompanyAddress" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerCompanyAddress }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.state')" sortable prop="approveStatus" width="140">
        <template slot-scope="scope">
          <div>{{ $platform_status_vo[scope.row.approveStatus + 1].label }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Audit_reason')" sortable prop="approveCause" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium" v-if="scope.row.approveStatus===-1">{{ scope.row.approveCause }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Reviewer')" sortable prop="approveBy" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.approveBy }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Audit_time')" width="155" sortable prop="approveTime">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.approveTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('seller.Application_time')" width="180" sortable prop="createTime">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('seller.operation')" width="120">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="primary" plain
                  @click="details(scope.row)"
          >
            <i class="el-icon-postcard"></i>
            {{$t('seller.Review')}}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--add-->
    <el-dialog  :visible.sync="isShow" width="500px"
                :close-on-click-modal="false"
                :destroy-on-close="true"
                :close-on-press-escape="false"
                :show-close="false"
                center
                :title="$t('seller.Review')"
                v-if="isShow"
    >
      <table id="myTable" style="border-collapse:separate; border-spacing:10px;margin-top: -20px;width: 100%" border="0">
        <tr  style="width: 100%;margin-top: 15px" >
          <td style="text-align: right;width: 40%">{{$t('seller.Merchant_type')}}:</td>
          <td style="text-align: left;width: 60%">{{ $platform_sellerType[this.detailData.sellerType-1].label }}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('seller.Contact_name')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactPerson}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('seller.Contact_mobile_phone')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactPhone }}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('seller.Contact_address')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('seller.Positive')}}:</td>
          <td style="text-align: left">
            <el-link type="primary" @click="businessUrl('sellerIdentityFrontUrl')">
              <i class="el-icon-view"></i>{{$t('seller.View')}}
            </el-link>
          </td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('seller.side')}}:</td>
          <td style="text-align: left"><el-link type="primary" @click="businessUrl('sellerIdentityBackUrl')">
            <i class="el-icon-view"></i>{{$t('seller.View')}}
          </el-link>
          </td>
        </tr>
        <tr v-if="detailData.sellerType==2">
          <td style="text-align: right">{{$t('seller.Business_name')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerCompanyName}}</td>
        </tr>
        <tr v-if="detailData.sellerType==2">
          <td style="text-align: right">{{$t('seller.Enterprise_account_number')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerCompanyIdentity}}</td>
        </tr>
        <tr v-if="detailData.sellerType==2">
          <td style="text-align: right">{{$t('seller.Enterprise_address')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerCompanyAddress}}</td>
        </tr>
        <tr v-if="detailData.sellerType==2">
          <td style="text-align: right">{{$t('seller.Enterprise_business_license')}}:</td>
          <td style="text-align: left"><el-link type="primary" @click="businessUrl('sellerCompanyLicenseUrl')">
            <i class="el-icon-view"></i>
            {{$t('seller.View')}}
          </el-link>
          </td>
        </tr>
        <tr v-if="detailData.areaCodeStr">
          <td style="text-align: right">{{$t('seller.region')}}:</td>
          <td style="text-align: left">{{ this.detailData.areaCodeStr}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('seller.state')}}:</td>
          <td  v-if="this.detailData.approveStatus == 1" style="text-align: left;color: chartreuse">{{$platform_status_vo[this.detailData.approveStatus+1].label}}</td>
          <td  v-else style="text-align: left;color: red">{{$platform_status_vo[this.detailData.approveStatus+1].label}}</td>
        </tr>
      </table>
      <div style="text-align: center;margin-top: 15px">
        <el-select v-model="approveForm.approveStatus" :placeholder="$t('seller.Selection_audit')" size = "mini" style="width: 70%;">
          <el-option
                  v-for="item in STATUS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <br/>
        <el-input
                maxlength="20"
                style="margin-top:15px;width: 70%"
                resize="none"
                type="textarea"
                :rows="2"
                :placeholder="$t('seller.Refuse')"
                v-model="approveForm.approveCause"
                v-if="approveForm.approveStatus ==-1"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmApprove">
          <i class="el-icon-check"></i>
          {{$t('currency.Determine')}}</el-button>
         <el-button @click="cancel">
          <i class="el-icon-close"></i>
          {{$t('currency.cancel')}}</el-button>
      </span>
    </el-dialog>
    <!--pagination component-->
    <pagination  ref="pagination"/>
    <!--img component-->
    <my-img ref="myImg"/>
  </div>
</template>
<script>
  import {eventBus} from "scripts/utils/BUS";
  import urls from "@/scripts/api";
  import pagination from "@/component/pagination.vue";
  import qs from 'qs';
  import myImg from "@/component/myImg.vue";

  export default {
    components: {
      pagination,
      myImg
    },
    data() {
      return {
        //--------------need to edit
        listUrl:urls.seller_list,
        detailsUrl:urls.seller_findById,
        approveUrl:urls.seller_review,
        eventBus:'seller_shop_eventBus',
        idName:'sellerId',
        //------------- no edit-------
        searchForm: {},
        detailData:{},
        approveForm:{},
        form: {},
        tableData: [

        ],
        isEdit: false,
        isShow: false,
        listLoading: false,
        pickerOptions: {
          shortcuts: [
            {
              text: this.$t('seller.Last_week'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: this.$t('seller.Last_month'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: this.$t('seller.Last_three_months'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        Status : [
  {
    label:this.$t('seller.Pending'),
    value:0
    },
  {
    label:this.$t('seller.Pass'),
    value:1
    },
  {
    label:this.$t('seller.refuse'),
    value:-1
    },

],
STATUS : [
  {
    value: 1,
    label: this.$t('seller.pass')
  },
  {
    value: -1,
    label: this.$t('seller.Failed'),
  }
],
      };
    },

    mounted() {
      eventBus.$on(this.eventBus, (tableData) => {
        if (tableData) {
          this.listLoading = false;
          this.tableData = tableData;
        } else {
          this.query();
        }
      });
      this.query();
    },

    beforeDestroy() {
      eventBus.$off(this.eventBus)
    },
    methods: {
      businessUrl(businessUrl) {
        if (businessUrl==='sellerIdentityFrontUrl'){
          businessUrl = this.detailData.sellerIdentityFrontUrl;
        }else if (businessUrl==='sellerIdentityBackUrl'){
          businessUrl = this.detailData.sellerIdentityBackUrl;
        }else {
          businessUrl = this.detailData.sellerCompanyLicenseUrl;
        }
        this.$refs.myImg.isDialogShow( businessUrl);
      },
      //this method need to editing id,made table id overwrite this id
      details(row){
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        });
        this.isShow = true
        this.approveForm = {};
        this.detailData = row;
        this.approveForm.sellerId = row.sellerId;
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
        this.query()
      },

      query() {
        this.listLoading = true;
        this.$refs.pagination.$query(this.listUrl, this.searchForm, this.eventBus);
      },

      isShowDialog() {
        this.isShow = this.isShow !== true;
      },

      confirmApprove(){
        if(!this.approveForm.approveStatus){
          let review = this.$t('seller.review');
          this.$alert(review, '', {
            confirmButtonText: this.$t('seller.OK')
          });
          return false
        }
        if(this.approveForm.approveStatus == -1 && !this.approveForm.approveCause){
          let reason = this.$t('seller.reason');
          this.$alert(reason, '', {
            confirmButtonText: this.$t('seller.OK'),
          });
          return
        }
        let data = qs.stringify(this.approveForm, {indices: false});
        this.$axios.post(this.approveUrl,data).then(res => {
          let successful = this.$t('seller.successful');
          this.$alert(successful, '', {
            confirmButtonText: this.$t('seller.OK'),
            callback: () => {
              this.isShowDialog();
              this.query();
            }
          });
        });
      }
    }
  };
</script>
<style lang="scss" scoped>
  #myTable{
    td{width: 50%}
  }
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
