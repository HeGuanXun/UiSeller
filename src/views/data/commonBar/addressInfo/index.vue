<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 60px;">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.country"
                        :placeholder="$t('Address.Country')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.province"
                        :placeholder="$t('Address.Province')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        v-model="searchForm.city"
                        :placeholder="$t('Address.City')"
                        class="searchbox"
                />
                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 14px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{$t('Address.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('Address.Reset')}}
                </el-button
                >
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    {{$t('Address.Add')}}
                </el-button
                >
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px"
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
            <el-table-column :label="$t('Address.Country')" sortable prop="country" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.country }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Address.Province')" sortable prop="province" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.province }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Address.City')" sortable prop="city" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.city }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Address.Region')" sortable prop="areaStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Address.language')" sortable prop="languageStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.languageStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Address.operation')" width="200">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                       {{$t('Address.Edit')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('mployee.Determine')"
                            :cancelButtonText="$t('mployee.Cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('mployee.ss')"
                            @onConfirm="doDelete(scope.row.locationId)"
                    >
                        <el-button style="margin-left: 10px"
                                   slot="reference"
                                   size="mini"
                                   type="danger" plain
                                   v-if="$platformRole==1"
                        ><i class="el-icon-delete"/>
                            {{$t('mployee.delete')}}
                        </el-button
                        >
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--add-->
        <el-dialog :visible.sync="isShow" width="500px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="90px" :rules="rules" center>
                <el-form-item :label="$t('Address.region')" required prop="areaCode">
                    <el-select v-model="form.areaCode" :placeholder="$t('Address.Area')" size="mini">
                        <el-option
                                v-for="item in myArea"
                                :key="item.areaCode"
                                :label="item.area"
                                :value="item.areaCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Address.language')" required prop="languageCode">
                    <el-select v-model="form.languageCode" :placeholder="$t('Address.lang')" size="mini">
                        <el-option
                                v-for="item in myLanguage"
                                :key="item.languageCode"
                                :label="item.language"
                                :value="item.languageCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Address.country')" required prop="country">
                    <el-input size="mini" maxlength="10" v-model="form.country"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Address.province')" required prop="province">
                    <el-input size="mini" maxlength="10" v-model="form.province"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Address.city')" required prop="city">
                    <el-input size="mini" maxlength="10" v-model="form.city"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"> <i class="el-icon-check"></i> {{$t('Address.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('Address.cancel')}}</el-button>
      </span>
        </el-dialog>
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
                getLanguageUrl:urls.lang_list,
                getAreaUrl:urls.area_list,
                myLanguage:[],
                myArea:[],
                getLanguageBus:'getLang_eventBus_addressInfo',
                getAreaBus:'getArea_eventBus_addressInfo',
                //--------------need to edit
                listUrl: urls.address_list,
                createUrl: urls.address_create,
                updateUrl: urls.address_update,
                deleteUrl: urls.address_delete,
                eventBus: 'address_eventBus',
                editTitle: this.$t('Address.Edit_Address'),
                addTitle: this.$t('Address.New_Address'),
                idType: 'locationId',
                usePagination: true,
                rules: {
                    country: [
                        {required: true, message: this.$t('Address.enter_country')},
                    ],
                    province: [
                        {required: true, message: this.$t('Address.enter_Province')},
                    ],
                    city: [
                        {required: true, message: this.$t('Address.enter_city')},
                    ],
                    areaCode: [
                        {required: true, message: this.$t('Address.select_area')},
                    ],
                    languageCode: [
                        {required: true, message: this.$t('Address.select')}
                    ]
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
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

            this.load();
        },

        beforeDestroy() {
            eventBus.$off(this.eventBus);
            eventBus.$off(this.getLanguageBus);
            eventBus.$off(this.getAreaBus);
        },
        methods: {
            load(){
                eventBus.$on(this.getLanguageBus, (language) => {
                    this.myLanguage = language;
                });
                eventBus.$on(this.getAreaBus, (area) => {
                    this.myArea = area;
                });
                this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus_addressInfo');
                this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus_addressInfo');
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
                let text = this.$t('Address.Added_successfully');
                if (this.isEdit) {
                    text = this.$t('Address.Edit_successfully');
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                this.isEdit = false;
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
