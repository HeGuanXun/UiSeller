<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 50px;">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.spuType"
                        :placeholder="$t('SpuType.name')"
                        class="searchbox"
                />

                <el-button
                        size="mini"
                        type="primary"
                        style="height: 30px;margin-top: 14px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{ $t("Class.search") }}
                </el-button
                >
                <el-button
                        style="height: 30px;margin-top: 14px;"
                        size="mini"
                        type="primary"
                        plain
                        @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{ $t("Class.Reset") }}
                </el-button
                >
                <el-button
                        size="mini"
                        type="primary"
                        plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    {{ $t("SpuType.add") }}
                </el-button>
            </div>
        </div>
        <!-- search -->

        <!-- table -->
        <el-table
                style="margin-left: 15px;margin-top: 15px;"
                ref="listPowerSupplyTab"
                :data="tableData"
                border
                height="500"
                highlight-current-row
                :stripe="true"
                v-loading="listLoading"
                :default-sort = "{prop: 'data', order: 'descending'}"
        >
            <el-table-column fixed label="ID" type="index" width="50"/>
            <el-table-column :label="$t('SpuType.name')" sortable prop="spuType" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.spuType }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Review.code_')" sortable prop="spuTypeCode" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.spuTypeCode }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('SpuType.description')" sortable prop="spuTypeDescription" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.spuTypeDescription }}</span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="$t('Class.lang')" sortable prop="languageCodeStr" width="" >
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.languageCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('SpuType.area')" sortable prop="areaCodeStr" width="">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Class.operation')" width="220">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary"
                            plain
                            @click="toEdit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                        {{ $t("Class.edit") }}
                    </el-button
                    >

                    <el-popconfirm
                            :confirmButtonText="$t('mployee.Determine')"
                            :cancelButtonText="$t('mployee.Cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('mployee.ss')"
                            @onConfirm="doDelete(scope.row.spuTypeId)"
                    >
                        <el-button
                                style="margin-left: 10px"
                                slot="reference"
                                size="mini"
                                type="danger"
                                v-if="$platformRole == 1"
                        >
                            <i class="el-icon-delete"/> {{ $t("mployee.delete") }}
                        </el-button
                        >
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- table -->

        <!--add-->
        <el-dialog
                :visible.sync="isShow"
                width="500px"
                :close-on-click-modal="false"
                :destroy-on-close="true"
                center
                :show-close="false"
                :title="title"
        >
            <el-form
                    ref="form"
                    :model="form"
                    label-width="170px"
                    :rules="rules"
                    center
            >
                <el-form-item
                        :label="$t('SpuType.spuTypeCode') + ':'"
                        required
                        prop="spuTypeCode"
                >
                    <el-input
                            :disabled="isEdit"
                            size="mini"
                            maxlength="13"
                            onKeyUp="this.value=this.value.replace(/\D/g,'')"
                            :placeholder="$t('Class.Empty')"
                            v-model="form.spuTypeCode"
                    />
                </el-form-item>

                <el-form-item :label="$t('Class.Lang')" required prop="languageCode">
                    <el-select
                            v-model="form.languageCode"
                            filterable
                            :placeholder="$t('Class.Select_lang')"
                            size="mini"
                    >
                        <el-option
                                v-for="item in myLanguage"
                                :key="item.language"
                                :label="item.language"
                                :value="item.languageCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Class.Region')" required prop="areaCode">
                    <el-select
                            v-model="form.areaCode"
                            filterable
                            :placeholder="$t('Class.Select_area')"
                            size="mini"
                    >
                        <el-option
                                v-for="item in myArea"
                                :key="item.area"
                                :label="item.area"
                                :value="item.areaCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                        :label="$t('SpuType.Name')"
                        prop="spuType"
                        required
                >
                    <el-input
                            size="mini"
                            maxlength="10"
                            v-model="form.spuType"
                    />
                </el-form-item>
                <el-form-item
                        :label="$t('SpuType.Description')"
                        prop="spuTypeDescription"
                >
                    <el-input
                            resize="none"
                            type="textarea"
                            size="mini"
                            :rows="2"
                            maxlength="10"
                            v-model="form.spuTypeDescription"
                    />
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"
        ><i class="el-icon-check"/>{{ $t("Class.Submit") }}</el-button
        >
        <el-button @click="toAdd"
        ><i class="el-icon-close"/>{{ $t("Class.cancel") }}</el-button
        >
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
    import urls from "../../../../scripts/api";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";
    import qs from "qs";

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
                getLanguageBus: "getLang_eventBus_spuType",
                getAreaBus: "getArea_eventBus_spuType",
                //--------------need to edit
                listUrl: urls.spuType_list,
                createUrl: urls.spuType_create,
                updateUrl: urls.spuType_create,
                deleteUrl: urls.spuType_delete,
                eventBus: "spuType_eventBus",
                editTitle: this.$t("SpuType.Edit"),
                addTitle: this.$t("SpuType.New"),
                idType: "spuId",
                usePagination: true,
                rules: {
                    areaCode: [{required: true, message: this.$t("Class.Select_area")}],
                    languageCode: [
                        {required: true, message: this.$t("Class.Select_lang")}
                    ],
                    spuTypeCode: [
                        {required: true, message: this.$t("SpuType.spuTypeCodeRequire")},
                        {type: 'number', message: this.$t("SpuType.spuTypeCodeNumber")}
                    ],
                    spuType: [{required: true, message: this.$t("SpuType.spuTypeRequire")}],


                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
                platform_categoryStatus: [
                    {
                        value: 1,
                        label: this.$t("Class.display")
                    },
                    {
                        value: 2,
                        label: this.$t("Class.no_display")
                    }
                ]
            };
        },
        watch: {
            form:{
                handler(val,oldVal) {
                    try{
                        this.form.spuTypeCode = val.spuTypeCode.replace(/\D/g,'');
                    }catch (e) {

                    }
                },
                deep: true //true 深度监听
            }
        },
        mounted() {
            eventBus.$on(this.eventBus, tableData => {
                if (tableData) {
                    this.listLoading = false;
                    this.tableData = tableData;
                } else {
                    this.usePagination ? this.query() : this.noPageQuery();
                }
                this.isShow = false;
                this.isEdit = false;
            });
            //Whether or not to use paging queries
            this.usePagination ? this.query() : this.noPageQuery();
            // add
            this.load();
            // add
        },

        beforeDestroy() {
            // add
            eventBus.$off(this.eventBus);
            eventBus.$off(this.getLanguageBus);
            eventBus.$off(this.getAreaBus);
            // add
        },
        methods: {
            // add
            load() {
                eventBus.$on(this.getLanguageBus, language => {
                    let languageArray = [];
                    let arry = [];
                    for (let lang of language) {
                        if (arry.indexOf(lang.language) == -1) {
                            arry.push(lang.language);
                            languageArray.push(lang);
                        }
                    }
                    this.myLanguage = languageArray;
                });
                eventBus.$on(this.getAreaBus, area => {
                    let areaArray = [];
                    let arry = [];
                    for (let arrayValue of area) {
                        if (arry.indexOf(arrayValue.area) == -1) {
                            arry.push(arrayValue.area);
                            areaArray.push(arrayValue);
                        }
                    }
                    this.myArea = areaArray;
                });
                this.$refs.operation.$noPageQuery(
                    this.getLanguageUrl,
                    "getLang_eventBus_spuType"
                );
                this.$refs.operation.$noPageQuery(this.getAreaUrl, "getArea_eventBus_spuType");
            },
            // add
            doHide(row, type) {
                let text = this.$t("Class.Display_successful");
                let status = 1;
                if (type === "hide") {
                    status = 2;
                    text = this.$t("Class.Hidden_successfully");
                }

                let form = {
                    categoryId: row.categoryId,
                    categoryStatus: status,
                    language: row.language,
                    categoryCode: row.categoryCode,
                    areaCode: row.areaCode,
                    languageCode: row.languageCode,
                    area: row.area,
                    categoryLevelOne: row.categoryLevelOne,
                    categoryLevelTwo: row.categoryLevelTwo,
                    categoryLevelThree: row.categoryLevelThree
                };
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(this.updateUrl, data).then(res => {
                    this.$alert(text, "", {
                        confirmButtonText: this.$t("Class.confirm"),
                        callback: () => {
                            this.query();
                        }
                    });
                });
            },
            reset() {
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            doDelete(id) {
                this.$refs.operation.$deleteById(
                    this.deleteUrl,
                    id,
                    this.eventBus,
                    this.idType
                );
            },

            noPageQuery() {
                this.listLoading = true;
                this.$refs.operation.$noPageQuery(this.listUrl, this.eventBus);
            },

            query() {
                this.listLoading = true;
                this.$refs.pagination.$query(
                    this.listUrl,
                    this.searchForm,
                    this.eventBus
                );
            },

            toAdd() {
                this.isEdit = false;
                this.title = this.addTitle;
                this.form = {};
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate();
                    }
                });
                this.isShowDialog();
            },

            isShowDialog() {
                this.isShow = !this.isShow;
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
                let text = this.$t("SpuType.addSuccess");
                if (this.isEdit) {
                    text = this.$t("SpuType.editSuccess");
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                // this.isEdit = false;
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$refs.operation.$confirmData(
                            url,
                            this.form,
                            text,
                            this.eventBus
                        );
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
