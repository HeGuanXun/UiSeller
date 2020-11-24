<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 60px">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.shopName"
                :placeholder="$t('Cash.Shop_name')"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.cashOutId"
                :placeholder="$t('Cash.Application_number')"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.cashOutStatus"
                :placeholder="$t('Cash.state')"
                class="searchbox"
        >
          <el-option
                  size="mini"
                  v-for="item in platform_status"
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
                        :range-separator="$t('Cash.To')"
                        :start-placeholder="$t('Cash.start_time')"
                        :end-placeholder="$t('Cash.End_time')"
                        align="right"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="query"
        >
          <i class="el-icon-search"/>
          {{$t('Cash.search')}}</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset"
        >
          <i class="el-icon-refresh"/>
          {{$t('Cash.Reset')}}</el-button
        >
      </div>
    </div>
    <!-- table -->
    <el-table style="margin-left: 15px"
              ref="listPowerSupplyTab"
              :data="tableData"
              border
              highlight-current-row
              height="75%"
              :stripe="true"
              v-loading="listLoading"
              :default-sort = "{prop: 'data', order: 'descending'}">
      <el-table-column
              fixed
              label="ID"
              type="index"
              width="50"/>
      <el-table-column :label="$t('Cash.Shop_name')" sortable prop="shopName" width="155">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.shopName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Cash.Application_number')" sortable prop="cashOutId" width="200" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.cashOutId }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Cash.Application_amount')" sortable prop="cashOutAmount" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.cashOutAmount }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Cash.Currency')" sortable prop="currencyStr" width="155">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.currencyStr }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Cash.Application_time')" sortable prop="cashOutTime" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.cashOutTime }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Cash.Remarks')" sortable prop="cashOutRemarks" width="155">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.cashOutRemarks }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Cash.Application_status')" sortable prop="cashOutStatus" width="180">
        <template slot-scope="scope">
          <div>{{$platform_status_vo[scope.row.cashOutStatus+1].label }}</div>
        </template>
      </el-table-column>



      <el-table-column :label="$t('Cash.Audit_reason')" sortable prop="approveCause" width="155">
        <template slot-scope="scope">
          <span size="medium" v-if="scope.row.cashOutStatus==-1">{{ scope.row.approveCause }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Cash.Auditor')" sortable prop="approveBy" width="155">
      <template slot-scope="scope">
        <span size="medium">{{ scope.row.approveBy }}</span>
      </template>
    </el-table-column>
      <el-table-column :label="$t('Cash.Audit_time')" sortable prop="approveTime" width="155">
      <template slot-scope="scope">
        <span size="medium">{{ scope.row.approveTime }}</span>
      </template>
    </el-table-column>
      <el-table-column fixed="right" :label="$t('Cash.operation')" width="180" >
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  type="primary" plain
                  @click="details(scope.row.cashOutId)"
          >
            {{$t('Cash.Audit')}}</el-button
          >
          <el-button
                  size="mini"
                  type="primary" plain
                  @click="details(scope.row.cashOutId,'find')"
          >
            {{$t('Cash.View')}}</el-button
          >

        </template>
      </el-table-column>
    </el-table>
    <!--add-->
    <el-dialog  :visible.sync="isShow" width="500px"
                :close-on-click-modal="false"
                :destroy-on-close="true"
                :show-close="false"
                center
                :title="$t(isCheck==false? 'Cash.View':'Cash.Audit')"
    >
      <table width="100%" style="border-collapse:separate; border-spacing:10px;margin-top: -20px">
        <tr  style="width: 100%;margin-top: 15px">
          <td style="text-align: right">{{$t('Cash.Shop_name')}}:</td>
          <td style="text-align: left;">{{ this.detailData.shopName}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.Cash_withdrawal_amount')}}:</td>
          <td style="text-align: left;color: red">{{ this.detailData.cashOutAmount}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.Currency')}}:</td>
          <td style="text-align: left">{{ this.detailData.currencyStr}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.Real_name')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactPerson}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.ID_number')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerIdentityNum}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.Bank')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerBank}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.Bank_card_number')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerBankAccountNum}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.Phone_number')}}:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactPhone}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.describe')}}:</td>
          <td style="text-align: left">{{ this.detailData.cashOutRemarks}}</td>
        </tr>
        <tr>
          <td style="text-align: right">{{$t('Cash.Audit_status')}}:</td>
          <td  v-if="this.detailData.cashOutStatus == 1" style="text-align: left;color: chartreuse">{{$platform_status_vo[this.detailData.cashOutStatus+1].label}}</td>
          <td  v-else style="text-align: left;color: red">{{$platform_status_vo[this.detailData.cashOutStatus+1].label}}</td>
        </tr>
      </table>

      <div style="text-align: right;margin-top: 15px" v-if="isCheck==true">
        <el-select v-model="approveForm.cashOutStatus" :placeholder="$t('Cash.Choice')" size = "mini" style="width: 75%">
          <el-option
                  v-for="item in cashOutStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-input
                maxlength="50"
                style="margin-top:15px;width: 75%"
                resize="none"
                type="textarea"
                :rows="2"
                :placeholder="$t('Cash.enter')"
                v-model="approveForm.approveCause"
                v-if="approveForm.cashOutStatus === -1"
        />

      </div>

<!--      -->

      <span slot="footer" class="dialog-footer">
        <el-button v-if="this.isCheck==true" type="primary" @click="confirmApprove"><i class="el-icon-check"></i>{{$t('Cash.confirm')}}</el-button>
        <el-button @click="cancel"><i class="el-icon-close"></i>{{$t('Cash.cancel')}}</el-button>
      </span>
    </el-dialog>
    <!--pagination component-->
    <pagination  ref="pagination"/>
    <!--operation component-->
    <operation  ref="operation"/>
  </div>
</template>
<script>
  import {eventBus} from "scripts/utils/BUS";
  import urls from "@/scripts/api";
  import pagination from "@/component/pagination.vue";
  import operation from "@/component/operation.vue";
  import upload from "@/component/upload.vue";
  import qs from "qs";

  export default {
    components: {
      pagination,
      operation,
      upload
    },
    data() {
      return {
        //--------------need to edit
        listUrl:urls.platformCashOut_list,
        detailsUrl:urls.platformCashOut_queryById,
        approveUrl:urls.platformCashOut_review,
        eventBus:'platformCashOut_eventBus',
        idType:'',
        //------------- no edit-------
        searchForm: {},
        detailData:{cashOutStatus:0},
        approveForm:{approveCause:""},
        form: {},
        tableData: [],
        isEdit: false,
        isShow: false,
        isCheck: false,
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
        platform_status : [
  {
    value: 0,
    label: this.$t('Cash.Pending')
  },
  {
    value: 1,
    label: this.$t('Cash.Pass')
  },
  {
    value:-1,
    label: this.$t('Cash.Rejected')
  }
],
cashOutStatus : [
  {
    value: 1,
    label: this.$t('Cash.Audit_pass')
  },
  {
    value: -1,
    label: this.$t('Cash.Audit_failed')
  }
],
      };
    },

    mounted() {
      eventBus.$on(this.eventBus, (tableData) => {
        console.log(tableData);
        if (tableData) {
          this.listLoading = false;
          this.tableData = tableData;
        } else {
          //this.query();
        }
      });
      eventBus.$on('getBusinessUrl', (businessUrl) => {
        this.form.brandLogo = brandLogo;
      });
      this.query();
    },

    beforeDestroy() {
      eventBus.$off(this.eventBus)
    },
    methods: {
      businessUrl() {
        let businessUrl = this.detailData.sellerCompanyLicenseUrl;
        this.$refs.myImg.isDialogShow( businessUrl);
      },
      cancel() {
        this.form = {};
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        })
        this.isShowDialog();
      },
      details(id,type){
        this.$nextTick(() => {
          if (this.$refs.form) {
            this.$refs.form.clearValidate()
          }
        });
        this.isShow = true;
        if (type=='find'){
          this.isCheck = false;
        }else {
          this.isCheck = true;
        }
        this.approveForm = {cashOutId:id};
        let data = qs.stringify(this.approveForm, {indices: false});
        this.$axios.post(this.detailsUrl, data).then(res => {
          this.detailData = res.data.data;
        });
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

        if(!this.approveForm.cashOutStatus){
          let Choice =this.$t('Cash.Choice')
          this.$alert(Choice, '', {
            confirmButtonText: this.$t('Cash.confirm')
          });
          return false
        }
        if(this.approveForm.cashOutStatus == -1 && !this.approveForm.approveCause){
          let reason =this.$t('Cash.reason')
          this.$alert(reason, '', {
            confirmButtonText: this.$t('Cash.confirm'),
          });
          return
        }
        let Audit_success =this.$t('Cash.Audit_success');
        let data = qs.stringify(this.approveForm, {indices: false});
        this.$axios.post(this.approveUrl,data).then(res => {
          this.$alert(Audit_success, '', {
            confirmButtonText: this.$t('Cash.confirm'),
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
