<!--order_detail_reviews-->
<template>
  <div>
    <!-- search -->
    <div id="expressage" style="height: 50px">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.sellerCompanyName"
                placeholder="商品编码"
                class="searchbox"
        />
        <el-input
                size="mini"
                v-model="searchForm.sellerCompanyName"
                placeholder="商品名称"
                class="searchbox"
        />
        <el-select
                size="mini"
                v-model="searchForm.sellerApproveStatus"
                placeholder="状态"
                class="searchbox"
        >
          <el-option
                  size="mini"
                  v-for="item in $CONSTANTS.STATUS"
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
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
        />
        <el-button
                size="mini"
                type="primary" style="height: 30px;margin-top: 14px;"
                @click="search"
        >
          <i class="el-icon-search"/>
          搜索</el-button
        >
        <el-button style="height: 30px;margin-top: 14px;"
                   size="mini"
                   type="primary" plain
                   @click="reset_"
        >
          <i class="el-icon-refresh"/>
          重置</el-button
        >
      </div>
    </div>
    <!-- button -->
    <div style="text-align: left;margin-left: 15px">
      <el-popconfirm
              confirmButtonText='确定'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="#f90"
              title="确定要上架吗？"
              @onConfirm="startupOrOutUp('start_use')"
      >
        <el-button slot="reference"
                type="primary" plain
                size="mini"
        >
          上架</el-button
        >
      </el-popconfirm>
      <el-popconfirm style="margin-left: 10px"
              confirmButtonText='确定'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="确定要下架吗？"
              @onConfirm="startupOrOutUp('disable')"
      >
        <el-button
                slot="reference"
                size="mini"
                type="danger" plain
        >
          下架</el-button
        >
      </el-popconfirm>

    </div>
    <!-- table -->
    <el-table style="margin-top: 10px;margin-left: 15px"
              height="680"
              ref="listPowerSupplyTab"
              :data="tableData"
              border
              :stripe="true"
              highlight-current-row
              v-loading="listLoading">
      <el-table-column
              type="selection"
              width="55"/>
      <el-table-column label="商品编码" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerContactPerson }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerContactPhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品区域" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{ $CONSTANTS.AREA[scope.row.sellerType].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标识" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{ $CONSTANTS.TAG[scope.row.sellerType].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="120%">
        <template slot-scope="scope">
          <div>{{ $CONSTANTS.PAY_WAY[scope.row.sellerType].label }}</div>
        </template>
      </el-table-column>
      <el-table-column label="物流" width="120%">
        <template slot-scope="scope">
          <div>{{ $CONSTANTS.EXPRESS[scope.row.sellerType].label }}</div>
        </template>
      </el-table-column>
      <el-table-column label="运费" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerContactPhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="SPU状态" width="120%">
        <template slot-scope="scope">
          <div>{{ $CONSTANTS.SPU[scope.row.sellerType].label }}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120%">
        <template slot-scope="scope">
          <div>{{ $CONSTANTS.STATUS[scope.row.sellerApproveStatus+1].label }}</div>
        </template>
      </el-table-column>
      <el-table-column label="审核原因" width="120%">
        <template slot-scope="scope">
          <span size="medium"v-if="scope.row.approveStatus===-1">{{ scope.row.sellerContactPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" width="120%">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.sellerContactPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-popconfirm
                  v-if="scope.row.sellerApproveStatus === 3"
                  confirmButtonText='确定'
                  cancelButtonText='取消'
                  icon="el-icon-info"
                  iconColor="#f90"
                  title="确定要上架吗？"
                  @onConfirm="startupOrOut(scope.row,'start_use')"
          >
            <el-button slot="reference"
                       type="primary" plain
                       size="mini"
            >
              上架</el-button
            >
          </el-popconfirm>
          <el-popconfirm
                  v-else
                         confirmButtonText='确定'
                         cancelButtonText='取消'
                         icon="el-icon-info"
                         iconColor="red"
                         title="确定要下架吗？"
                         @onConfirm="startupOrOut(scope.row.id,'disable')"
          >
            <el-button
                    slot="reference"
                    size="mini"
                    type="danger" plain
            >
              下架</el-button
            >
          </el-popconfirm>
          <el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="sellerDetail(scope.row.id)"
          >
            审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--pagination component-->
    <pagination ref="pagination"/>
    <!--upOrOut component-->
    <upOrOut ref="upOrOut"/>
    <!--check component-->
    <el-dialog  :visible.sync="isShow" width="30%"
                :close-on-click-modal="false"
                :destroy-on-close="true"
                center
                title="审核"
    >
      <table width="100%" style="border-collapse:separate; border-spacing:10px;margin-top: -20px">
        <tr  style="width: 100%;margin-top: 15px">
          <td style="text-align: center">价格:</td>
          <td style="text-align: left;">{{ this.detailData.sellerContactPerson}}</td>
        </tr>
        <tr>
          <td style="text-align: center">折扣价:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactPerson}}</td>
        </tr>
        <tr>
          <td style="text-align: center">库存:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactPhone }}</td>
        </tr>
        <tr>
          <td style="text-align: center">市场价:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">SPU图片:</td>
          <td style="text-align: left">
            <el-link type="primary" @click="businessUrl('sellerIdentityFrontUrl')">
              查看
            </el-link>
          </td>
        </tr>
        <tr>
          <td style="text-align: center">SPU视频:</td>
          <td style="text-align: left"><el-link type="primary" @click="businessUrl('sellerIdentityBackUrl')">
            查看
          </el-link>
          </td>
        </tr>
        <tr>
          <td style="text-align: center">商品编码:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">商品名称:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">商品区域:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">标识:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">支付方式:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">物流:</td>
          <td style="text-align: left">{{ this.detailData.sellerCompanyName}}</td>
        </tr>
        <tr>
          <td style="text-align: center">运费:</td>
          <td style="text-align: left">{{ this.detailData.sellerCompanyIdentity}}</td>
        </tr>
        <tr>
          <td style="text-align: center">SPU状态:</td>
          <td style="text-align: left">{{ this.detailData.sellerCompanyAddress}}</td>
        </tr>
      </table>
      <div style="text-align: center;margin-top: 15px">
        <el-select v-model="status" placeholder="请选择审核" size = "mini" style="width: 75%">
          <el-option
                  v-for="item in $CONSTANTS.APPROVE_STATUS"
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
                placeholder="请输入已拒绝的原因"
                v-model="reason"
                v-if="status === 2"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogShow"><i class="el-icon-close"></i>取 消</el-button>
        <el-button type="primary" @click="confirmApprove"><i class="el-icon-check"></i>确 定</el-button>
      </span>
    </el-dialog>
    <!--img component-->
    <my-img ref="myImg"></my-img>
  </div>
</template>
<script>
  import Moment from "moment";
  import url from "api";
  import {eventBus} from "scripts/utils/BUS";
  import pagination from "@/component/pagination.vue";
  import upOrOut from "@/component/upOrOut.vue";
  import myImg from "@/component/myImg.vue";
  import urls from "@/scripts/api";
  import qs from "qs";

  export default {
    components: {
      pagination,
      upOrOut,
      url,
      myImg
    },
    data() {
      return {
        dataBusName:'goodsBus',
        eventBusName:'goodsEventBus',
        sellerId:null,
        status:null,
        reason:null,
        detailData:{},
        tableData: [],
        searchForm :{},
        pickerOptions: {
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        isShow:false,
        listLoading:false,
      };
    },

    mounted() {
      eventBus.$on(this.dataBusName, (tableData) => {
        this.tableData = tableData;
      });
      eventBus.$on(this.eventBusName, () => {
        this.search();
      });
      this.search();
    },

    methods: {

      startupOrOutUp(type){
        let selection = this.$refs.listPowerSupplyTab.selection;
        if (selection.length>0){
          let ids = [];
          selection.forEach((data,index)=>{
            ids[index] = data.id
          });
          let status;
          if (type==='start_use'){
            status = this.$START_USE
          }else {
            status = this.$DISABLE
          }
          this.$refs.upOrOut.changeStatus(urls.shopStarOrStop,ids,status,this.eventBusName);
        }else {
          this.$alert('未勾选行', '', {
            confirmButtonText: '确定',
          });
        }
      },

      startupOrOut(row,type){
        let ids = [];
        ids[0] = row.id;
        let status;
        if (type==='start_use'){
          status = this.$START_USE
        }else {
          status = this.$DISABLE
        }
        this.$refs.upOrOut.changeStatus(urls.shopStarOrStop,ids,status,this.eventBusName);
      },

      reset_(){
        this.searchForm.sellerCompanyName = null,
                this.searchForm.sellerContactPerson = null,
                this.searchForm.sellerContactPhone = null,
                this.searchForm.sellerApproveStatus = -1,
                this.searchForm.times = null
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
        this.status = null;
        this.reason = null;
        this.isShow = this.isShow !== true;
      },
      confirmApprove(){
        if(!this.status){
          this.$alert('请选择审核状态', '', {
            confirmButtonText: '确定'
          });
          return false
        }
        let formParam = {};
        formParam.sellerId = this.searchForm.id;
        formParam.sellerApproveStatus = this.status;
        formParam.sellerApproveCause = this.reason;
        this.$axios.post(url.sellerDetail, formParam).then(res => {
          this.$alert('审核成功', '', {
            confirmButtonText: '确定',
            callback: () => {
              this.isDialogShow();
              this.search();
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
