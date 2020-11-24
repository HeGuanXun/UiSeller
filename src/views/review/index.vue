<template>
  <div style="height: 100%;">
    <!-- search -->
    <div id="expressage" style="height: 60px">
      <div class="headbox">
        <el-input
          size="mini"
          v-model="searchForm.shopName"
          :placeholder="$t('comment.Shop_name')"
          class="searchbox"
        />
        <el-select
          size="mini"
          v-model="searchForm.approveStatus"
          :placeholder="$t('comment.state')"
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
        <el-date-picker
          style="width: 240px"
          size="mini"
          class="searchbox"
          v-model="searchForm.times"
          type="datetimerange"
          :picker-options="platform_pickerOptions"
          :range-separator="$t('comment.To')"
          :start-placeholder="$t('comment.start_time')"
          :end-placeholder="$t('comment.End_time')"
          align="right"
        />
        <el-button
          size="mini"
          type="primary"
          style="height: 30px;margin-top: 14px;"
          @click="query"
        >
          <i class="el-icon-search" />
          {{$t('comment.search')}}</el-button
        >
        <el-button
          style="height: 30px;margin-top: 14px;"
          size="mini"
          type="primary"
          plain
          @click="reset"
        >
          <i class="el-icon-refresh" />
          {{$t('comment.Reset')}}</el-button
        >
        <el-popconfirm
          style="margin-left: 10px;height: 30px;margin-top: 14px;"
          :confirmButtonText="$t('comment.Determine')"
          :cancelButtonText="$t('comment.cancel')"
          icon="el-icon-info"
          iconColor="#f90"
          :title="$t('comment.Delete')"
          @onConfirm="doBatchDelete"
        >
          <el-button slot="reference" type="primary" plain size="mini">
            {{$t('comment.Batch_deletion')}}</el-button
          >
        </el-popconfirm>
      </div>
    </div>
    <!-- table -->
    <el-table
      style="margin-left: 15px"
      height="75%"
      ref="listPowerSupplyTab"
      :data="tableData"
      border
      :stripe="true"
      highlight-current-row
      v-loading="listLoading"
      :default-sort = "{prop: 'data', order: 'descending'}">
      <el-table-column flexd type="selection" width="55" />
      <el-table-column :label="$t('comment.Shop_name')" sortable prop="shopName">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.shopName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('comment.Buyer')" sortable prop="buyerName">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.buyerName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('comment.Evaluation_level')" sortable prop="reviewRanking">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <div>{{ rankingMap(scope.row.reviewRanking) }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('comment.Comment_content')" sortable prop="reviewContent">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.reviewContent }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('comment.state')" sortable prop="approveStatus">
        <template slot-scope="scope">
          <div>{{ approveStatusMap(scope.row.approveStatus) }}</div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('comment.Review')" sortable prop="approveStatus">
        <template slot-scope="scope">
          <span size="medium" v-if="scope.row.approveStatus === -1">{{
            scope.row.approveCause
          }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('comment.Commentary_time')" sortable prop="createTime">
        <template slot-scope="scope">
          <span size="medium">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('comment.operation')">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="details(scope.row)"
          >
            <i class="el-icon-postcard"></i>
            {{$t('comment.Audit')}}</el-button
          >
          <el-popconfirm
            :confirmButtonText="$t('mployee.Determine')"
            :cancelButtonText="$t('mployee.Cancel')"
            icon="el-icon-info"
            iconColor="red"
            :title="$t('mployee.ss')"
            @onConfirm="doDelete(scope.row.reviewId)"
          >
            <el-button
              style="margin-left: 10px"
              slot="reference"
              size="mini"
              type="danger"
              v-if="$platformRole == 1"
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
      width="30%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :show-close="false"
      center
      :title="$t('comment.Audit')"
      v-if="isShow"
    >
      <table
        width="100%"
        style="border-collapse:separate; border-spacing:10px;margin-top: -20px"
      >
        <tr style="width: 100%;margin-top: 15px">
          <td style="text-align: center">{{$t('comment.Evaluation_level')}}:</td>
          <td style="text-align: left;">
            {{ rankingMap(this.detailData.reviewRanking) }}
          </td>
        </tr>

        <tr>
          <td style="text-align: center">{{$t('comment.Comment_content')}}:</td>
          <td style="text-align: left">{{ this.detailData.reviewContent }}</td>
        </tr>
        <tr>
          <td style="text-align: center">{{$t('comment.Commentary_time')}}:</td>
          <td style="text-align: left">{{ this.detailData.createTime }}</td>
        </tr>
        <tr>
          <td style="text-align: center">{{$t('comment.state')}}:</td>
          <td style="text-align: left">
            {{ approveStatusMap(this.detailData.approveStatus) }}
          </td>
        </tr>
      </table>

      <div style="text-align: center;margin-top: 15px">
        <el-select
          v-model="approveForm.approveStatus"
          :placeholder="$t('comment.Review_Status')"
          size="mini"
          style="width: 75%"
        >
          <el-option
            v-for="item in approveStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          maxlength="20"
          style="margin-top:15px;width: 75%"
          resize="none"
          type="textarea"
          :rows="2"
          :placeholder="$t('comment.Input')"
          v-model="approveForm.approveCause"
          v-if="approveForm.approveStatus === -1"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmApprove">
          <i class="el-icon-check"></i>
          {{$t('comment.Determine')}}</el-button
        >
        <el-button @click="cancel">
          <i class="el-icon-close"></i>
          {{$t('comment.cancel')}}</el-button
        >
      </span>
    </el-dialog>
    <!--pagination component-->
    <pagination ref="pagination" />
    <operation ref="operation" />
  </div>
</template>
<script>
import { eventBus } from "scripts/utils/BUS";
import urls from "@/scripts/api";
import pagination from "@/component/pagination.vue";
import qs from "qs";
import operation from "../../component/operation.vue";
import Vue from "vue";

export default {
  components: {
    pagination,
    operation
  },
  data() {
    return {
      approveStatusList: [
        {
          value: 1,
          label: this.$t('comment.adopt')
        },
        {
          value: -1,
          label: this.$t('comment.Not_pass')
        }
      ],
      platform_status: [
        {
          value: 0,
          label: this.$t('comment.To_be_audited')
        },
        {
          value: 1,
          label: this.$t('comment.adopt')
        },
        {
          value:-1,
          label: this.$t('comment.Not_pass')
        }
      ],

      // rankingMap: [
      //   {
      //     value: 1,
      //     label: this.$t('comment.Negative_comment')
      //   },
      //   {
      //     value: 2,
      //     label: this.$t('comment.commonly')
      //   },
      //   {
      //     value:3,
      //     label: this.$t('comment.Praise')
      //   }
      // ],
      platform_pickerOptions : {
        shortcuts: [
          {
            text: this.$t('comment.Last_week'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t('comment.Last_month'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t('comment.Last_three_months'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //--------------need to edit
      listUrl: urls.review_list,
      batchDeleteUrl: urls.review_batchDelete,
      deleteUrl: urls.review_delete,
      updateUrl: urls.review_update,
      eventBus: "review_eventBus",
      idType: "reviewsId",
      //------------- no edit-------
      searchForm: {},
      detailData: {},
      approveForm: {},
      form: {},
      tableData: [],
      isEdit: false,
      isShow: false,
      listLoading: false
    };
  },
  mounted() {
    eventBus.$on(this.eventBus, tableData => {
      if (tableData) {
        this.listLoading = false;
        this.tableData = tableData;
        // console.log(this.tableData)
      } else {
        this.query();
      }
    });
    this.query();
  },

  beforeDestroy() {
    eventBus.$off(this.eventBus);
  },
  methods: {
    rankingMap: x =>
      ({
        1: "差评",
        2: "一般",
        3: "好评"
      }[x]),

    // 状态（0 待审核，1 通过，-1 拒绝）
    approveStatusMap: x =>
      ({
        "0": "待审核",
        "1": "通过",
        "-1": "拒绝"
      }[x]),

    //this method need to editing id,made table id overwrite this id
    details(row) {
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate();
        }
      });
      this.isShow = true;
      this.approveForm = {};
      this.detailData = row;
      this.approveForm.reviewId = row.reviewId;
    },

    cancel() {
      this.approveForm.status = "";
      this.detailData = {};
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate();
        }
      });
      this.isShowDialog();
    },

    reset() {
      this.searchForm = {};
      this.query();
    },

    query() {
      this.listLoading = true;
      this.$refs.pagination.$query(
        this.listUrl,
        this.searchForm,
        this.eventBus
      );
    },

    doBatchDelete() {
      let Checklist = this.$t('comment.Checklist');
      let selection = this.$refs.listPowerSupplyTab.selection;
      if (selection.length === 0) {
        this.$alert(Checklist, "", {
          confirmButtonText: this.$t('comment.Determine')
        });
        return;
      }

      let ids = selection.map(x => x.reviewId);
      let form = { idList: ids };
      let Delete_success = this.$t('comment.Delete_successful');
      let Delete_Failed = this.$t('comment.Failed');
      let param = qs.stringify(form, { indices: false });
      this.$axios
        .post(urls.review_batchDelete, param)
        .then(res => {
          this.$alert(Delete_success, "", {
            confirmButtonText: this.$t('comment.Determine'),
            callback: () => {
              this.query();
            }
          });
        })
        .catch(e => {
          this.$alert(Delete_Failed, "", {
            confirmButtonText: this.$t('comment.Determine')
          });
          return false;
        });
    },

    doDelete(id) {
      this.$refs.operation.$deleteById(
        this.deleteUrl,
        id,
        this.eventBus,
        this.idType
      );
    },

    isShowDialog() {
      this.isShow = this.isShow !== true;
    },

    confirmApprove() {
      if (!this.approveForm.approveStatus) {
        this.$alert(this.$approve_option_text, "", {
          confirmButtonText: this.$confirmButtonText
        });
        return false;
      }
      if (
        this.approveForm.approveStatus === -1 &&
        !this.approveForm.approveCause
      ) {
        this.$alert(this.$approve_reason_text, "", {
          confirmButtonText: this.$confirmButtonText
        });
        return;
      }
      let data = qs.stringify(this.approveForm, { indices: false });

      this.$axios.post(this.updateUrl, data).then(res => {
        this.$alert(this.$approve_success_text, "", {
          confirmButtonText: this.$confirmButtonText,
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
