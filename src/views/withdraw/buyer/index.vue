<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 60px;margin-left: 10px;">
      <div class="headbox">
        <el-input
                size="mini"
                v-model="searchForm.sellerCompanyName"
                placeholder="会员名称"
                class="searchbox"
        /> <el-input
              size="mini"
              v-model="searchForm.sellerCompanyName"
              placeholder="申请号"
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
                  v-for="item in STATUS"
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
        <!--        <el-popconfirm style="margin-left: 10px"-->
        <!--                       confirmButtonText='确定'-->
        <!--                       cancelButtonText='取消'-->
        <!--                       icon="el-icon-info"-->
        <!--                       iconColor="red"-->
        <!--                       title="确定要批量删除吗？"-->
        <!--                       @onConfirm="doDelete"-->
        <!--        >-->
        <!--          <el-button style="height: 30px;margin-top: 14px;"-->
        <!--                     slot="reference"-->
        <!--                     size="mini"-->
        <!--                     type="danger" plain-->
        <!--          >-->
        <!--            批量删除</el-button-->
        <!--          >-->
        <!--        </el-popconfirm>-->
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
              v-loading="listLoading">
      <el-table-column
              label="ID"
              type="index"
              width="50"/>
      <el-table-column label="会员名称" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerContactPerson }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="申请号" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerContactPhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="申请状态" >
        <template slot-scope="scope">
          <div>{{STATUS[scope.row.sellerApproveStatus+1].label }}</div>
        </template>
      </el-table-column>
      <el-table-column label="申请金额" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{ $CONSTANTS.AREA[scope.row.sellerType].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.sellerContactPhone }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="审核原因" >
        <template slot-scope="scope">
          <span size="medium"v-if="scope.row.approveStatus===-1">{{ scope.row.sellerContactPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" >
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.sellerContactPhone }}</span>
        </template>
      </el-table-column><el-table-column label="审核人" >
      <template slot-scope="scope">
        <span size="medium">{{ scope.row.sellerContactPhone }}</span>
      </template>
    </el-table-column><el-table-column label="审核时间" >
      <template slot-scope="scope">
        <span size="medium">{{ scope.row.sellerContactPhone }}</span>
      </template>
    </el-table-column>
      <el-table-column label="操作" width="200" >
        <template slot-scope="scope">
          <el-button

                  size="mini"
                  type="primary" plain
                  @click="showCheck(scope.row.id)"
          >
            审核</el-button
          >
          <el-button

                  size="mini"
                  type="primary" plain
                  @click="sellerDetail(scope.row.id)"
          >
            查看</el-button
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
                :show-close="false"
                center
                :title="title"
    >
      <table width="100%" style="border-collapse:separate; border-spacing:10px;margin-top: -20px">
        <tr>
          <td style="text-align: center">提现金额:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactPerson}}</td>
        </tr>
        <tr>
          <td style="text-align: center">真实姓名:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactPerson}}</td>
        </tr>
        <tr>
          <td style="text-align: center">身份证号:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">银行:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">银行卡号:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">银行:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">手机号码:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>
        <tr>
          <td style="text-align: center">提现描述:</td>
          <td style="text-align: left">{{ this.detailData.sellerContactAddress}}</td>
        </tr>

        <tr v-if="this.isCheck==true">
          <td style="text-align: center">上传转账凭证:</td>
          <td style="text-align: left">
            <upload ref="upload"/>
          </td>
        </tr>
        <tr v-else>
          <td style="text-align: center">转账凭证:</td>
          <td style="text-align: left">
            <el-link type="primary" @click="businessUrl('sellerIdentityFrontUrl')">
              查看转账凭证
            </el-link></td>
        </tr>
      </table>
      <div style="text-align: center;margin-top: 15px" v-if="this.isCheck==true">
        <el-select v-model="status" placeholder="请选择审核" size = "mini" style="width: 75%">
          <el-option
                  v-for="item in $CONSTANTS.APPROVE_STATUS"
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
                :rows="5"
                placeholder="请输入已拒绝的原因"
                v-model="reason"
                v-if="status === 2"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="this.isCheck==true" type="primary" @click="confirmApprove"><i class="el-icon-check"></i>提交</el-button>
        <el-button type="primary" @click="isDialogShow"><i class="el-icon-close"></i>取消</el-button>
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
  import upload from "@/component/upload.vue";
  import urls from "@/scripts/api";
  import qs from "qs";

  export default {
    components: {
      pagination,
      upOrOut,
      url,
      myImg,
      upload
    },
    data() {
      return {
        fileList: [
          {name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }],
        dataBusName:'goodsBus',
        eventBusName:'goodsEventBus',
        sellerId:null,
        status:null,
        reason:null,
        title:"提现",
        STATUS : [
          {
            value: -1,
            label: "全部"
          },
          {
            value: 0,
            label: "待审核"
          },
          {
            value: 1,
            label: "通过"
          },
          {
            value: 2,
            label: "不通过"
          },
        ],
        isCheck:true,
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
      doDelete(id){
        let ids = [];
        if (id){
          ids[0] = id;
        }else {
          let selection = this.$refs.listPowerSupplyTab.selection;
          if (selection.length>0){
            selection.forEach((data,index)=>{
              ids[index] = data.id
            });
          }else {
            this.$alert('请勾选后再操作', '', {
              confirmButtonText: '确定',
            });
            return false;
          }
        }
        this.$axios.post(urls.shopStarOrStop,ids).then(res => {
          this.$alert('删除成功', '', {
            confirmButtonText: '确定',
            callback: () => {
              this.search();
            }
          });
        }).catch((e) => {
          this.$alert('删除失败，请联系管理员', '', {
            confirmButtonText: '确定',
          });
          return false;
        });
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

      showCheck(id){
        this.title = '审核';
        this.isShow = true;
        this.isCheck = true;
        this.$axios.get(url.sellerDetail, id).then(res => {
          let data = res.data;
          this.detailData = res.data;
          this.detailData.id = id;
          this.detailData.sellerType = this.sellerType[data.sellerType-1].label;
        });
      },
      sellerDetail(id){
        this.title = '提现';
        this.isCheck = false;
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
        }if(this.status && !this.reason){
          this.$alert('审核原因不能为空', '', {
            confirmButtonText: '确定',
          });
          return
        }
        if(this.status && !this.reason){
          this.$alert('审核原因不能为空', '', {
            confirmButtonText: '确定',
          });
          return
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
