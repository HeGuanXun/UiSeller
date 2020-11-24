<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 50px;">
            <div class="headbox">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    {{$t('ads.Type')}}
                </el-button
                >
            </div>
        </div>
        <!-- search -->

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
      <el-table-column :label="$t('ads.name')" sortable prop="adsType" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.adsType }}</span>
          </div>
        </template>
      </el-table-column>
          <el-table-column :label="$t('Review.code_')" sortable prop="adsTypeCode" width="170">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.adsTypeCode }}</span>
              </div>
            </template>
          </el-table-column>
      <el-table-column :label="$t('Class.sort')" sortable prop="adsTypeSeq" width="">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <span size="medium">{{ scope.row.adsTypeSeq }}</span>
              </div>
            </template>
      </el-table-column>

          <el-table-column :label="$t('ads.icon')" sortable prop="adsTypeIcon" width="">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper" v-if="scope.row.adsTypeIcon">
                <el-link type="primary" @click="openPic(scope.row.adsTypeIcon)">{{$t('Class.View')}}</el-link>
              </div>
            </template>
          </el-table-column>

      <el-table-column :label="$t('ads.describe')" sortable prop="adsTypeDescription" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.adsTypeDescription }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ads.area')"  sortable prop="areaStr" width="220">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.areaStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('ads.Language')" sortable prop="languageStr" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.languageStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('ads.operation')"  width="200">
        <template slot-scope="scope">
          <el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="toEdit(scope.row)"
          >
            <i class="el-icon-edit"/>
            {{$t('ads.Edit')}}</el-button
          >
          <el-popconfirm
                  :confirmButtonText="$t('mployee.Determine')"
                  :cancelButtonText="$t('mployee.Cancel')"
                  icon="el-icon-info"
                  iconColor="red"
                  :title="$t('mployee.ss')"
                  @onConfirm="doDelete(scope.row.adsTypeId)"
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
        <!-- table -->

        <!--add-->
        <el-dialog :visible.sync="isShow" width="500px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
        <el-form ref="form" :model="form" label-width="140px" :rules="rules" center>
                <el-form-item :label="$t('ads.Area')" required prop="areaCode">
          <el-select v-model="form.areaCode" filterable :placeholder="$t('ads.select')" size="mini">
            <el-option
                    v-for="item in myArea"
                    :key="item.areaCode"
                    :label="item.area"
                    :value="item.areaCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('ads.language')" required prop="languageCode" >
          <el-select v-model="form.languageCode" filterable :placeholder="$t('ads.select_language')" size="mini" >
            <el-option
                    v-for="item in myLanguage"
                    :key="item.languageCode"
                    :label="item.language"
                    :value="item.languageCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('ads.Name')" required prop="adsType">
          <el-input size="mini" maxlength="10" v-model="form.adsType"></el-input>
        </el-form-item>

          <el-form-item size="mini" :label="$t('ads.icon')" required style="text-align: left">
            <el-upload
                    size="mini"
                    class="upload-demo"
                    action="#"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :before-upload="beforeAvatarUpload"
                    list-type="picture">
              <el-button v-model="form.adsTypeIcon" size="mini" type="success">{{$t('Class.upload')}}</el-button>
              <div slot="tip" class="el-upload__tip">{{$t('Class.Only')}}</div>
            </el-upload>
          </el-form-item>

        <el-form-item :label="$t('ads.Describe')">
          <el-input size="mini" resize="none"  type="textarea" :rows="2" maxlength="25" v-model="form.adsTypeDescription"></el-input>
        </el-form-item>
          <el-form-item :label="$t('ads.Type_code')" required prop="adsTypeCode">
            <el-input size="mini" maxlength="13" :disabled="isEdit" :placeholder="$t('region.empty')" v-model="form.adsTypeCode"/>
          </el-form-item>
          <el-form-item size="mini" :label="$t('Class.queue')" required prop="adsTypeSeq">
            <el-input size="mini" maxlength="4" min="1" v-model="form.adsTypeSeq"></el-input>
          </el-form-item>
        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('ads.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('ads.Cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--add-->

        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation  ref="operation"/>
       <mainUpload ref="mainUpload"/>
       <myImg ref="myImg"/>
    </div>
</template>
<script>
    import {eventBus} from "scripts/utils/BUS";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";
    import mainUpload from "@/component/mainUpload.vue";
    import myImg from "@/component/myImg.vue";

    export default {
        components: {
            pagination,
            operation,
            mainUpload,
          myImg
        },
        data() {
            return {
              fileList: [],
              getLanguageUrl:urls.lang_list,
              getAreaUrl:urls.area_list,
              myLanguage:[],
              myArea:[],
              getLanguageBus:'getLang_eventBus',
              getAreaBus:'getArea_eventBus',
                //--------------need to edit
                listUrl:urls.ads_list,
                createUrl:urls.ads_create,
                updateUrl:urls.ads_create,
                deleteUrl:urls.ads_delete,
                eventBus:'ads_eventBus',
                eventBusUpload: 'BusUpload',
                editTitle:this.$t('ads.Edit_Type'),
                addTitle:this.$t('ads.Add_Type'),
                usePagination:false,
                idType:'adsTypeId',
                rules: {
                  adsTypeSeq: [
                    {required: true, message: this.$t('Class.categorySeq')},
                  ],
                  adsTypeCode: [
                    {required: true, message: this.$t('ads.input_code')}
                  ],
                    areaCode: [
                        {required: true, message: this.$t('ads.select')}
                    ],
                    languageCode: [
                        {required: true, message: this.$t('ads.select_language')}],
                    adsType: [
                        {required: true, message: this.$t('ads.Store_Type')}
                    ]
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {
                  adsTypeSeq:'',
                },
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
            };
        },
      watch: {
        form:{
          handler(val,oldVal) {
            try{
              this.form.adsTypeSeq = val.adsTypeSeq.replace(/\D/g,'');
              this.form.adsTypeCode = val.adsTypeCode.replace(/\D/g,'');
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
          eventBus.$on(this.eventBusUpload, (businessUrl) => {
            let files = [];
            let url = this.$url.oss_url+businessUrl;
            let myImg = {
              name:this.fileName,
              url:url
            };
            files.push(myImg)
            this.fileList = files;
            this.form.adsTypeIcon = businessUrl;
          });
            //Whether or not to use paging queries
            this.usePagination ? this.query() : this.noPageQuery();
          this.load();
        },

        beforeDestroy() {
          eventBus.$off(this.eventBus);
          eventBus.$off(this.getLanguageBus);
          eventBus.$off(this.getAreaBus);
          eventBus.$off(this.eventBusUpload);
        },
        methods: {
          openPic(url) {
            let title = this.$t('Class.iconThird');
            this.$refs.myImg.isDialogShow(url, title);
          },
          beforeAvatarUpload(file) {
            this.fileName = file.name;
            if (!/(jpg$)|(png$)|(bmp$)|(jpeg$)/i.test(file.type)) {
              let context = this.$t("Class.Illegal");
              let title = this.$t("Class.prompt");
              let Determine = this.$t("Class.OK");
              this.$alert(context, title, {
                confirmButtonText: Determine
              });
              return false;
            }
            const isLt3M = file.size / 1024 / 1024 > 0.2;
            if (isLt3M) {
              let image = this.$t("Class.image");
              let Determine = this.$t("Class.OK");
              this.$alert(image, '', {
                confirmButtonText: Determine
              });
              return false
            }
            this.$refs.mainUpload.uploadChange('category', file, this.eventBusUpload);
          },
          handleRemove(file, fileList) {
            this.form.adsTypeIcon = null;
          },

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
            this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus');
            this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus');
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
              this.fileList = [];
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
              this.form.adsTypeIcon = decodeURIComponent(this.form.adsTypeIcon);
              this.form = JSON.parse(JSON.stringify(row));
              let files = [];
              let logos = this.form.adsTypeIcon.split('/');
              let name = logos[logos.length-1];
              let url = this.$url.oss_url+this.form.adsTypeIcon;
              let myImg = {
                name:name,
                url:url
              };
              files.push(myImg)
              this.fileList = files;
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = this.$t('ads.Add_success');
                if (this.isEdit) {
                    text = this.$t('ads.Edit_success');
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                      console.log(this.form);
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
