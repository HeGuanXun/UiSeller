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
                    {{$t('Currency.Add_currency')}}
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
      <el-table-column :label="$t('Currency.Currency')" sortable prop="currency" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.currency }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Currency.Currency_Code')" sortable prop="currencyCode" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.currencyCode }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Currency.area')"  sortable prop="areaCodeStr" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.areaCodeStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Currency.Language')" sortable prop="languageCodeStr" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.languageCodeStr }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('currency.defaultCurrency_')" sortable prop="defaultCurrency" width="">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{defaultC[scope.row.defaultCurrency].label}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="$t('Currency.operation')"  width="220">
        <template slot-scope="scope">
          <el-button
                  style="margin-left: 10px"
                  size="mini"
                  type="primary" plain
                  @click="toEdit(scope.row)"
          >
            <i class="el-icon-edit"/>
            {{$t('Currency.Edit')}}</el-button
          >
          <el-popconfirm
                  :confirmButtonText="$t('mployee.Determine')"
                  :cancelButtonText="$t('mployee.Cancel')"
                  icon="el-icon-info"
                  iconColor="red"
                  :title="$t('mployee.ss')"
                  @onConfirm="doDelete(scope.row.currencyId)"
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
        <el-form ref="form" :model="form" label-width="130px" :rules="rules" center>
        <el-form-item :label="$t('Currency.Area')" required prop="areaCode">
          <el-select v-model="form.areaCode" filterable :placeholder="$t('Currency.select')" size="mini">
            <el-option
                    v-for="item in myArea"
                    :key="item.areaCode"
                    :label="item.area"
                    :value="item.areaCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Currency.language')" required prop="languageCode" >
          <el-select v-model="form.languageCode" filterable :placeholder="$t('Currency.select_language')" size="mini" >
            <el-option
                    v-for="item in myLanguage"
                    :key="item.languageCode"
                    :label="item.language"
                    :value="item.languageCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Currency.currency')" required prop="currency">
          <el-input size="mini" maxlength="10" v-model="form.currency"></el-input>
        </el-form-item>
          <!--add-->
          <el-form-item :label="$t('Currency.currency_Code')" required prop="currencyCode" >
            <el-input size="mini" :disabled="isEdit"  maxlength="13" :placeholder="$t('region.empty')" v-model="form.currencyCode"/>
          </el-form-item>
          <!--add-->
          <el-form-item :label="$t('currency.defaultCurrency')" required prop="defaultCurrency">
            <el-radio-group v-model="form.defaultCurrency">
              <el-radio :label="1">{{$t('currency.true')}}</el-radio>
              <el-radio :label="0">{{$t('currency.false')}}</el-radio>
            </el-radio-group>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('Currency.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('Currency.cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--add-->

        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation ref="operation"/>
    </div>
</template>
<script>
    import {eventBus} from "scripts/utils/BUS";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";

    export default {
        components: {
            pagination,
            operation
        },
        data() {
            return {
                getLanguageUrl: urls.lang_list,
                getAreaUrl: urls.area_list,
                myLanguage: [],
                myArea: [],
                getLanguageBus: 'getLang_eventBus_maintain',
                getAreaBus: 'getArea_eventBus_maintain',
                //--------------need to edit
                listUrl: urls.maintain_list,
                createUrl: urls.maintain_create,
                updateUrl: urls.maintain_update,
                deleteUrl: urls.maintain_delete,
                eventBus: 'maintain_eventBus',
                editTitle: this.$t('Currency.Edit_currency'),
                addTitle: this.$t('Currency.New_currency'),
                idType: 'currencyId',
                usePagination: true,
                rules: {
                    areaCode: [
                        {required: true, message: this.$t('Currency.select')}
                    ],
                    languageCode: [
                        {required: true, message: this.$t('Currency.select_language')}
                    ],
                    currency: [
                        {required: true, message: this.$t('Currency.input')}
                    ],
                    currencyCode: [
                        {required: true, message: this.$t('currency.input_currency')},

                    ],
                    defaultCurrency: [
                        {required: true, message: this.$t('currency.input_currency_code')},

                    ],
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
                defaultC:[{label:this.$t('currency.false')},{label:this.$t('currency.true')}]
            };
        },
      watch: {
        form:{
          handler(val,oldVal) {
            try{
              this.form.currencyCode = val.currencyCode.replace(/\D/g,'');
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
            //Whether or not to use paging queries
            this.usePagination ? this.query() : this.noPageQuery();
            this.load();
        },

        beforeDestroy() {
            eventBus.$off(this.eventBus);
            eventBus.$off(this.getLanguageBus);
            eventBus.$off(this.getAreaBus);
        },
        methods: {
            load() {
                eventBus.$on(this.getLanguageBus, (language) => {
                    let languageArray = [];
                    let arry = [];
                    for (let lang of language) {
                        if (arry.indexOf(lang.languageCode) == -1) {
                            arry.push(lang.languageCode);
                            languageArray.push(lang);
                        }
                    }
                    this.myLanguage = languageArray;
                });
                eventBus.$on(this.getAreaBus, (area) => {
                    let areaArray = [];
                    let arry = [];
                    for (let arrayValue of area) {
                        if (arry.indexOf(arrayValue.areaCode) == -1) {
                            arry.push(arrayValue.areaCode);
                            areaArray.push(arrayValue);
                        }
                    }

                    this.myArea = areaArray;
                });
                this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus_maintain');
                this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus_maintain');
            },

            reset() {
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            doDelete(id) {
                this.$refs.operation.$deleteById(this.deleteUrl, id, this.eventBus, this.idType);
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
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));
                this.isShowDialog();
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = this.$t('Currency.Add_success');
                if (this.isEdit) {
                    text = this.$t('Currency.Edit_success');
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
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
