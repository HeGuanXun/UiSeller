<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 50px;">
            <div class="headbox">
                <el-input
                        size="mini"
                        v-model="searchForm.brandName"
                        :placeholder="$t('Brand.Brand_name')"
                        class="searchbox"
                />
                <el-select
                        size="mini"
                        v-model="searchForm.brandStatus"
                        :placeholder="$t('Brand.state')"
                        class="searchbox"
                >
                    <el-option
                            size="mini"
                            v-for="item in platform_brandStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
                <!-- <el-date-picker style="width: 240px"
                                size="mini"
                                class="searchbox"
                                v-model="searchForm.times"
                                type="datetimerange"
                                :picker-options="$platform_pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                /> -->
                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 14px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{$t('Brand.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 14px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('Brand.Reset')}}
                </el-button
                >
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 14px;margin-left: 15px"
                        @click="toAdd"
                >
                    <i class="el-icon-plus"/>
                    {{$t('Brand.Add_brand')}}
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
            <el-table-column :label="$t('Brand.Brand_name')" sortable prop="brandName" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.brandName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Review.code_')" sortable prop="brandName" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.brandCode }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Brand.BrandLogo')" sortable prop="brandLogo" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-link type="primary" @click="businessUrl(scope.row.brandLogo)">
                            {{$t('Brand.View')}}
                        </el-link>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Brand.Brand_status')" sortable prop="brandStatus" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <div>{{platform_brandStatus[scope.row.brandStatus-1].label }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Brand.Brand_English_name')" sortable prop="brandEnglishName" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.brandEnglishName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Brand.description')" sortable prop="brandDescription" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.brandDescription }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Brand.Creation_time')" sortable prop="createTime" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.createTime }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Brand.sort')" sortable prop="brandSeq" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.brandSeq }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Brand.region')" sortable prop="areaStr" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Brand.Language')" sortable prop="languageStr" width="170">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.languageStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Brand.operation')" width="230">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                        {{$t('Brand.edit')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('mployee.Determine')"
                            :cancelButtonText="$t('mployee.Cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('mployee.ss')"
                            @onConfirm="doDelete(scope.row.brandId)"
                    >
                        <el-button style="margin-left: 10px"
                                   slot="reference"
                                   size="mini"
                                   type="danger"
                                   v-if="$platformRole==1"
                        ><i class="el-icon-delete"/>
                            {{$t('mployee.delete')}}
                        </el-button
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
            <el-form ref="form" :model="form" label-width="145px" :rules="rules" center>
                <el-form-item :label="$t('Brand.Region')" required prop="areaCode">
                    <el-select v-model="form.areaCode" filterable :placeholder="$t('Brand.select_area')" size="mini">
                        <el-option
                                v-for="(item,index) in myArea"
                                :key="index"
                                :label="item.area"
                                :value="item.areaCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Brand.language')" required prop="languageCode">
                    <el-select v-model="form.languageCode" filterable :placeholder="$t('Brand.select_lang')"
                               size="mini">
                        <el-option
                                v-for="item in myLanguage"
                                :key="item.languageCode"
                                :label="item.language"
                                :value="item.languageCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item :label=" $t('Brand.brand_name')" required prop="brandName">
                    <el-input size="mini" maxlength="10" v-model="form.brandName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Brand.brandLogo')" required>
                    <upload v-if="isEdit" ref="upload" type="brand" :callbackUrl="form.brandLogo"
                            style="margin-top: -10%"/>
                    <upload v-else ref="upload" type="brand" :callbackUrl="form.brandLogo" style="margin-top: -10%"/>
                </el-form-item>
                <el-form-item :label="$t('Brand.brand_status')" required prop="brandStatus">
                    <el-radio v-model="form.brandStatus" label="1">{{$t('Brand.Show')}}</el-radio>
                    <el-radio v-model="form.brandStatus" label="2">{{$t('Brand.Not_Show')}}</el-radio>
                </el-form-item>
                <el-form-item :label="$t('Brand.brand_English_name')">
                    <el-input size="mini" maxlength="100" v-model="form.brandEnglishName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Brand.Description')">
                    <el-input size="mini" maxlength="100" resize="none" type="textarea" :rows="2"
                              v-model="form.brandDescription"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Brand.Sort')" required prop="brandSeq">
                    <el-input min="1" size="mini" maxlength="4"
                              :placeholder="$t('Brand.Sorts')" v-model="form.brandSeq"></el-input>
                </el-form-item>
                <!--add-->
                <el-form-item :label="$t('Brand.Brand_code')" required prop="brandCode" >
                    <el-input size="mini" maxlength="13" :disabled="isEdit" :placeholder="$t('region.empty')"
                              v-model.number="form.brandCode" />
                </el-form-item>
                <!--add-->
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmData"><i class="el-icon-check"></i>{{$t('Brand.Submit')}}</el-button>
        <el-button @click="toAdd"><i class="el-icon-close"></i>{{$t('Brand.cancel')}}</el-button>
      </span>
        </el-dialog>
        <!--add-->
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation ref="operation"/>
        <my-img ref="myImg"/>
    </div>
</template>
<script>
    import {eventBus} from "scripts/utils/BUS";
    import urls from "@/scripts/api";
    import upload from "@/component/upload.vue";
    import pagination from "@/component/pagination.vue";
    import operation from "@/component/operation.vue";
    import myImg from "@/component/myImg.vue";

    export default {
        components: {
            pagination,
            operation,
            upload,
            myImg
        },
        data() {
            return {
                getLanguageUrl: urls.lang_list,
                getAreaUrl: urls.area_list,
                myLanguage: [],
                myArea: [],
                getLanguageBus: 'getLang_eventBus_brand',
                getAreaBus: 'getArea_eventBus_brand',
                //--------------need to edit
                listUrl: urls.brand_list,
                createUrl: urls.brand_create,
                updateUrl: urls.brand_create,
                deleteUrl: urls.brand_delete,
                eventBus: 'brand_eventBus',
                editTitle: this.$t('Brand.Edit_brand'),
                addTitle: this.$t('Brand.Add_Brand'),
                idType: 'brandId',
                usePagination: true,
                rules: {
                    areaCode: [
                        {required: true, message: this.$t('Brand.select_area')}
                    ],
                    languageCode: [
                        {required: true, message: this.$t('Brand.select_lang')}
                    ],
                    brandName: [
                        {required: true, message: this.$t('Brand.input_name')}
                    ],
                    brandStatus: [
                        {required: true, message: this.$t('Brand.select_Status')}
                    ],
                    brandSeq: [
                        {required: true, message: this.$t('Brand.Sorts')}
                    ],
                    brandCode: [
                        {required: true, message: this.$t('Brand.input_code')}
                    ]
                },
                //------------- no edit-------
                title: null,
                searchForm: {},
                form: {brandLogo: '',},
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
                platform_brandStatus: [
                    {
                        value: 1,
                        label: this.$t('Brand.display')
                    },
                    {
                        value: 2,
                        label: this.$t('Brand.No_display')
                    }
                ],
            };
        },
        watch: {
            form:{
                handler(val,oldVal) {
                    try{
                        this.form.brandSeq = val.brandSeq.replace(/\D/g,'');
                        this.form.brandCode = val.brandCode.replace(/\D/g,'');
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
            eventBus.$on('getBusinessUrl', (brandLogo) => {
                this.form.brandLogo = brandLogo;
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
                    // let languageArray = [];
                    // let arry = [];
                    // for (let lang of language){
                    //   if (arry.indexOf(lang.language)==-1){
                    //     arry.push(lang.language);
                    //     languageArray.push(lang);
                    //   }
                    // }
                    this.myLanguage = language;
                });
                eventBus.$on(this.getAreaBus, (area) => {
                    // let areaArray = [];
                    // let arry = [];
                    // for (let arrayValue of area){
                    //   if (arry.indexOf(arrayValue.areaCode)==-1){
                    //     arry.push(arrayValue.areaCode);
                    //     areaArray.push(arrayValue);
                    //   }
                    // }
                    this.myArea = area;
                });
                this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus_brand');
                this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus_brand');
            },

            businessUrl(brandLogo) {
                this.$refs.myImg.isDialogShow(brandLogo, this.$t('Brand.brandLogo'));
            },

            reset() {
                this.searchForm = {};
                this.usePagination ? this.query() : this.noPageQuery();
            },

            // add
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
                console.log("row", row);
                this.title = this.editTitle;
                this.isEdit = true;
                // //to bus
                // eventBus.$emit('showImgEventBus',this.form.brandLogo);
                this.isShowDialog();
                setTimeout(() => {
                    this.form = JSON.parse(JSON.stringify(row));
                    this.form.brandStatus = this.form.brandStatus.toString();
                    this.$refs.upload.registerSrc(this.form.brandLogo);
                }, 500)
            },

            isRealNum(val) {
                if (val === "" || val == null) {
                    return false;
                }
                if (!isNaN(val)) {
                    return true;
                } else {
                    return false;
                }
            },
            //Add with the editor go this method
            confirmData() {
                let aa = this.$t('Brand.upload');
                let bb = this.$t('Brand.shuzi');
                let url;
                let text = this.$t('Brand.Add_successfully');
                if (this.isEdit) {
                    text = this.$t('Brand.Edit_successful');
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (!this.form.brandLogo) {
                            this.$alert(aa, '', {
                                confirmButtonText: this.$t('Brand.OK')
                            });
                            return false;
                        }
                        if (this.form.brandSeq && !this.isRealNum(this.form.brandSeq)) {
                            this.$alert(bb, '', {
                                confirmButtonText: this.$t('Brand.OK')
                            });
                            return false;
                        }
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
