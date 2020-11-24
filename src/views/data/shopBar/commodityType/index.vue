<template>
    <div style="height: 100%;">
        <!-- search -->
        <div id="expressage" style="height: 80px;">
            <div class="headbox">
                <el-select
                        style="width: 140px"
                        size="mini"
                        v-model="searchForm.level"
                        :placeholder="$t('Class.level')"
                        class="searchbox"
                >
                    <el-option
                            size="mini"
                            v-for="item in [
                            {label:$t('Class.first_'),value:1},
                            {label:$t('Class.second'),value:2},
                            {label:$t('Class.third'),value:3}]"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
                <el-select
                        style="width: 140px"
                        size="mini"
                        v-model="searchForm.categoryType"
                        :placeholder="$t('Class.type')"
                        class="searchbox"
                >
                    <el-option
                            size="mini"
                            v-for="item in categoryTypes"
                            :key="item.label"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
                <el-input
                        style="width: 150px"
                        size="mini"
                        maxlength="20"
                        v-model="searchForm.categoryCode"
                        :placeholder="$t('Class.First')"
                        class="searchbox"
                />
                <el-input
                        style="width: 150px"
                        size="mini"
                        maxlength="50"
                        v-model="searchForm.category"
                        :placeholder="$t('Class.Two')"
                        class="searchbox"
                />
                <el-input
                        size="mini"
                        maxlength="20"
                        v-model="searchForm.parentCategory"
                        :placeholder="$t('Class.Three')"
                        class="searchbox"
                />
                <el-select
                        style="width: 105px"
                        size="mini"
                        v-model="searchForm.categoryStatus"
                        :placeholder="$t('Class.state')"
                        class="searchbox"
                >
                    <el-option
                            size="mini"
                            v-for="item in platform_categoryStatus"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />
                </el-select>
                <el-button
                        size="mini"
                        type="primary" style="height: 30px;margin-top: 8px;"
                        @click="query"
                >
                    <i class="el-icon-search"/>
                    {{$t('Class.search')}}
                </el-button
                >
                <el-button style="height: 30px;margin-top: 8px;"
                           size="mini"
                           type="primary" plain
                           @click="reset"
                >
                    <i class="el-icon-refresh"/>
                    {{$t('Class.Reset')}}
                </el-button
                >
            </div>
            <div style="text-align: left">
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 8px;margin-left: 15px"
                        @click="toAdd('1')">
                    <i class="el-icon-plus"/>
                    {{$t('Class.class')}}
                </el-button>
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 8px;margin-left: 15px"
                        @click="toAdd('2')">
                    <i class="el-icon-plus"/>
                    {{$t('Class.classTow')}}
                </el-button>
                <el-button
                        size="mini"
                        type="primary" plain
                        style="height: 30px;margin-top: 8px;margin-left: 15px"
                        @click="toAdd('3')">
                    <i class="el-icon-plus"/>
                    {{$t('Class.classThree')}}
                </el-button>
            </div>
        </div>
        <!-- table -->
        <el-table style="margin-left: 15px;margin-top: 15px;"
                  ref="listPowerSupplyTab"
                  :data="tableData"
                  border
                  height="500"
                  highlight-current-row
                  :stripe="true"
                  v-loading="listLoading"
                  :default-sort="{prop: 'data', order: 'descending'}">
            <el-table-column
                    fixed
                    label="ID"
                    type="index"
                    width="55"/>
            <el-table-column :label="$t('Class.level')" sortable prop="level" width="194">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ categoryList[scope.row.level-1].lable }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Class.type')" sortable prop="categoryType" width="194">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ categoryTypes[scope.row.categoryType==null?0:scope.row.categoryType].label }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Class.First')" sortable prop="categoryLevelOne" width="194">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.categoryCode }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Class.Two')" sortable prop="category" width="194">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.category }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Class.Three')" sortable prop="parentCategory" width="194">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.parentCategory }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Class.state')" sortable prop="categoryStatus" width="180">
                <template slot-scope="scope">
                    <div>{{platform_categoryStatus[scope.row.categoryStatus-1].label }}</div>
                </template>
            </el-table-column>
            <!--图标-->
            <el-table-column :label="$t('Class.icon')" sortable prop="categoryLogo" width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper" v-if="scope.row.categoryLogo">
                        <el-link type="primary" @click="openPic(scope.row.categoryLogo)">{{$t('Class.View')}}</el-link>
                    </div>
                </template>
            </el-table-column>
            <!--排序-->
            <el-table-column :label="$t('Class.sort')" sortable prop="categorySeq" width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.categorySeq }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Class.region')" sortable prop="areaCodeStr" width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.areaCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Class.lang')" sortable prop="languageCodeStr" width="180">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <span size="medium">{{ scope.row.languageCodeStr }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="$t('Class.operation')" width="300">
                <template slot-scope="scope">
                    <el-button
                            style="margin-left: 10px"
                            size="mini"
                            type="primary" plain
                            @click="toEdit(scope.row)"
                    >
                        <i class="el-icon-edit"/>
                        {{$t('Class.edit')}}
                    </el-button
                    >
                    <el-button
                            v-if="scope.row.categoryStatus===2"
                            style="margin-left: 10px"
                            size="mini"
                            type="primary"
                            @click="doHide(scope.row,'show')"
                    >
                        <li class="el-icon-success"></li>
                        {{$t('Class.display')}}
                    </el-button
                    >
                    <el-button
                            v-else
                            style="margin-left: 10px"
                            size="mini"
                            type="info"
                            @click="doHide(scope.row,'hide')"
                    >
                        <li class="el-icon-error"></li>
                        {{$t('Class.No_display')}}
                    </el-button
                    >
                    <el-popconfirm
                            :confirmButtonText="$t('mployee.Determine')"
                            :cancelButtonText="$t('mployee.Cancel')"
                            icon="el-icon-info"
                            iconColor="red"
                            :title="$t('mployee.ss')"
                            @onConfirm="doDelete(scope.row.categoryId)"
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
        <!--add-->
        <el-dialog :visible.sync="isShow" width="600px"
                   :close-on-click-modal="false"
                   :destroy-on-close="true"
                   center
                   :show-close="false"
                   :title="title"
        >
            <el-form ref="form" :model="form" label-width="160px" :rules="rules" center>
                <el-form-item size="mini" :label="$t('Class.Lang')" required prop="languageCode">
                    <el-select @change="listSellerCategoryLevelOne" v-model="form.languageCode" filterable
                               :placeholder="$t('Class.Select_lang')"
                               size="mini">
                        <el-option
                                v-for="item in myLanguage"
                                :key="item.languageCode"
                                :label="item.language"
                                :value="item.languageCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" :label="$t('Class.Region')" required prop="areaCode">
                    <el-select @change="listSellerCategoryLevelOne" v-model="form.areaCode" filterable
                               :placeholder="$t('Class.Select_area')" size="mini">
                        <el-option
                                v-for="item in myArea"
                                :key="item.areaCode"
                                :label="item.area"
                                :value="item.areaCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" :label="$t('Class.type')" required prop="categoryType">
                    <el-select
                            @change="changeCategoryType"
                            v-model="form.categoryType"
                            filterable
                            size="mini">
                        <el-option
                                v-for="item in categoryTypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" v-if="form.level == '1'" :label="$t('Class.first')" required prop="category">
                    <el-input size="mini" maxlength="10" v-model="form.category"></el-input>
                </el-form-item>
                <el-form-item size="mini" v-if="form.level=='2' || form.level=='3'" :label="$t('Class.parent')" required
                              prop="parentCategoryCode">
                    <el-select
                            @change="listSellerCategoryLevelTwo(true)"
                            v-model="form.parentCategoryCode" filterable :placeholder="$t('Class.One')" size="mini">
                        <el-option
                                filterable
                                v-for="item in firsrCategoryList"
                                :key="item.categoryId"
                                :label="item.category"
                                :value="item.categoryCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" v-if="form.level == '2'" :label="$t('Class.two')" required prop="category">
                    <el-input size="mini" maxlength="10" v-model="form.category"></el-input>
                </el-form-item>
                <el-form-item size="mini" v-if="form.level =='3'" required prop="parentCategoryCodeTwo">
                    <el-select v-model="form.parentCategoryCodeTwo" filterable :placeholder="$t('Class.classification')"
                               size="mini">
                        <el-option
                                v-for="item in secondCategoryList"
                                :key="item.categoryId"
                                :label="item.category"
                                :value="item.categoryCode"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" v-if="form.level == '3'" :label="$t('Class.three')" required prop="category">
                    <el-input size="mini" maxlength="10" v-model="form.category"></el-input>
                </el-form-item>
                <el-form-item size="mini" v-if="form.level =='3'" :label="$t('Class.Three_level')"
                              style="text-align: left">
                    <el-upload
                            class="upload-demo"
                            action="#"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :before-upload="beforeAvatarUpload"
                            list-type="picture">
                        <el-button size="mini" type="success">{{$t('Class.upload')}}</el-button>
                        <div slot="tip" class="el-upload__tip">{{$t('Class.Only')}}</div>
                    </el-upload>
                </el-form-item>
                <el-form-item size="mini" :label="$t('Class.queue')" required prop="categorySeq">
                    <el-input size="mini" maxlength="4" min="1" v-model="form.categorySeq"></el-input>
                </el-form-item>
                <el-form-item size="mini" :label="$t('Class.state')" required prop="categoryStatus">
                    <el-radio-group v-model="form.categoryStatus">
                        <el-radio label="1">{{$t('Class.Display')}}</el-radio>
                        <el-radio label="2">{{$t('Class.play')}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item size="mini" :label="$t('Class.CategoryCode')+':'" required prop="categoryCode">
                    <el-input size="mini" maxlength="13"
                              :disabled="isEdit"
                              :placeholder="$t('Class.Empty')"
                              v-model="form.categoryCode"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="toAdd('1')" size="mini"><i
                        class="el-icon-close"></i>{{$t('Class.cancel')}}</el-button>
                <el-button type="primary" size="mini" @click="confirmData"><i
                        class="el-icon-check"></i>{{$t('Class.Submit')}}</el-button>
      </span>
        </el-dialog>
        <!--pagination component-->
        <pagination v-if="usePagination" ref="pagination"/>
        <!--operation component-->
        <operation ref="operation"/>
        <!--mainUpload component-->
        <mainUpload ref="mainUpload"/>
        <!--myImg component-->
        <myImg ref="myImg"/>
    </div>
</template>
<script>
    import {eventBus} from "scripts/utils/BUS";
    import myImg from "@/component/myImg.vue";
    import urls from "@/scripts/api";
    import pagination from "@/component/pagination.vue";
    import mainUpload from "@/component/mainUpload.vue";
    import operation from "@/component/operation.vue";
    import qs from "qs";

    export default {
        components: {
            pagination,
            mainUpload,
            myImg,
            operation
        },

        data() {
            return {
                categoryTypes:[
                    {value:0,label:this.$t('Class.General')},
                    {value: 1,label: this.$t('Class.Brand')}
                ],
                categoryList:[
                    {lable:this.$t('Class.first_')},
                    {lable:this.$t('Class.second')},
                    {lable:this.$t('Class.third')},
                ],
                fileList: [],
                fileName:'',
                getLanguageUrl: urls.lang_list,
                getAreaUrl: urls.area_list,
                myLanguage: [],
                myArea: [],
                getLanguageBus: 'getLang_eventBus_commodityType',
                getAreaBus: 'getArea_eventBus_commodityType',
                eventBusUpload: 'eventBusUpload',
                //--------------need to edit
                listUrl: urls.commodityType_list,
                createUrl: urls.commodityType_create,
                updateUrl: urls.commodityType_create,
                deleteUrl: urls.commodityType_delete,
                eventBus: 'commodityType_eventBus',
                editTitle: this.$t('Class.Edit'),
                addTitle: this.$t('Class.New'),
                idType: 'categoryId',
                usePagination: true,
                rules: {
                    categoryType: [
                        {required: true, message: '请选择分类类型'}
                    ],
                    areaCode: [
                        {required: true, message: this.$t('Class.Select_area')}
                    ],
                    languageCode: [
                        {required: true, message: this.$t('Class.Select_lang')}
                    ],
                    category: [
                        {required: true, message: this.$t('Class.input_First')}
                    ],
                    parentCategoryCode_: [
                        {required: true, message: this.$t('Class.input_First_s'), trigger: 'change'}
                    ],
                    parentCategoryCode: [
                        {required: true, message: this.$t('Class.input_First_s'), trigger: 'change'}
                    ],

                    parentCategoryCodeTwo: [
                        {required: true, message: this.$t('Class.input_Two_s'), trigger: 'change'}
                    ],

                    categoryStatus: [
                        {required: true, message: this.$t('Class.Select_Status'), trigger: 'change'}
                    ],
                    categoryCode: [
                        {required: true, message: this.$t('Class.Category')},
                    ],
                    categorySeq: [
                        {required: true, message: this.$t('Class.categorySeq')},
                    ],

                },
                //------------- no edit-------
                title: null,
                firsrCategoryList: [],
                secondCategoryList: [],
                searchForm: {},
                form: {
                    languageCode: null,
                    areaCode: null,
                    categoryType: '',
                    categorySeq: '',
                    categoryCode: '',
                    level: '1',
                    parentCategoryCode: 0
                },
                tableData: [],
                isEdit: false,
                isShow: false,
                listLoading: false,
                platform_categoryStatus: [
                    {
                        value: 1,
                        label: this.$t('Class.display')
                    },
                    {
                        value: 2,
                        label: this.$t('Class.no_display')
                    }
                ],
            };
        },

        watch: {
            form: {
                handler(val, oldVal) {
                    try {
                        this.form.categorySeq = val.categorySeq.replace(/\D/g, '');
                        this.form.categoryCode = val.categoryCode.replace(/\D/g, '');
                    } catch (e) {

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
                let split = businessUrl.split("/");
                let name = split[split.length - 1];
                let url = this.$url.oss_url + businessUrl;
                let myImg = {
                    name: this.fileName,
                    url: url
                };
                files.push(myImg)
                this.fileList = files;
                this.form.categoryLogo = businessUrl;
            });
            //Whether or not to use paging queries
            this.usePagination ? this.query() : this.noPageQuery();
            // add
            this.load();
        },

        beforeDestroy() {
            // add
            eventBus.$off(this.eventBus);
            eventBus.$off(this.getLanguageBus);
            eventBus.$off(this.getAreaBus);
            eventBus.$off(this.eventBusUpload);
        },

        methods: {

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
                this.form.categoryLogo = null;
            },

            handlePreview(file) {
                console.log("file");
            },
            // add
            load() {
                eventBus.$on(this.getLanguageBus, (language) => {
                    this.myLanguage = language;
                });
                eventBus.$on(this.getAreaBus, (area) => {
                    this.myArea = area;
                });
                this.$refs.operation.$noPageQuery(this.getLanguageUrl, 'getLang_eventBus_commodityType');
                this.$refs.operation.$noPageQuery(this.getAreaUrl, 'getArea_eventBus_commodityType');
            },
            // add
            doHide(row, type) {
                let text = this.$t('Class.Display_successful');
                let status = 1;
                if (type === 'hide') {
                    status = 2;
                    text = this.$t('Class.Hidden_successfully')
                }

                let form = {
                    "categoryId": row.categoryId,
                    'categoryStatus': status,
                }
                let data = qs.stringify(form, {indices: false});
                this.$axios.post(this.updateUrl, data).then(res => {
                    this.$alert(text, '', {
                        confirmButtonText: this.$t('Class.confirm'),
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

            changeCategoryType() {
                if (this.form.parentCategoryCode !== undefined) {
                    this.$set(this.form, 'parentCategoryCode', null);
                }
                if (this.form.parentCategoryCodeTwo !== undefined) {
                    this.$set(this.form, 'parentCategoryCodeTwo', null);
                }
                let data = {
                    params: {
                        'categoryType': this.form.categoryType,
                        'parentCategoryCode': 0,
                        'languageCode': this.form.languageCode,
                        'areaCode': this.form.areaCode
                    }
                }
                this.$axios.get(this.$url.commodityType_selectList, data).then(res => {
                    this.firsrCategoryList = res.data.data;
                    //this.$set(this.form, 'parentCategoryCodeTwo', null);
                })
            },

            listSellerCategoryLevelTwo(flag) {
                let selt = this;
                let data = {
                    params: {
                        'categoryCode': this.form.parentCategoryCode,
                        'languageCode': this.form.languageCode,
                        'areaCode': this.form.areaCode
                    }
                }
                this.$axios.get(this.$url.platformCategory_list, data).then(res => {
                    this.secondCategoryList = res.data.data;
                    if (this.form.parentCategoryCodeTwo !== undefined && flag) {
                        this.$set(this.form, 'parentCategoryCodeTwo', null);
                    }
                })
            },

            listSellerCategoryLevelOne() {
                if (this.form.categoryType !== undefined) {
                    this.form.categoryType = null;
                }
                if (this.form.languageCode == null || this.form.areaCode == null) {
                    return;
                }
                let selt = this;
                let data = {
                    params: {
                        'categoryCode': 0,
                        'languageCode': this.form.languageCode,
                        'areaCode': this.form.areaCode
                    }
                }
                this.$axios.get(this.$url.platformCategory_list, data).then(res => {
                    this.firsrCategoryList = res.data.data;
                    if (this.form.parentCategoryCode !== undefined) {
                        this.$set(this.form, 'parentCategoryCode', null);
                    }
                    if (this.form.parentCategoryCodeTwo !== undefined) {
                        this.$set(this.form, 'parentCategoryCodeTwo', null);
                    }
                })

            },

            toAdd(type) {
                this.isEdit = false;
                this.form = {};
                this.fileList = [];
                this.form.categoryLogo = null;
                this.$nextTick(() => {
                    if (this.$refs.form) {
                        this.$refs.form.clearValidate()
                    }
                })
                let selt = this;
                if (type == '1') {
                    this.$set(this.form, 'parentCategoryCode', 0);
                }
                this.$set(this.form, 'level', type);
                this.firsrCategoryList = [],
                this.secondCategoryList = [],
                this.title = this.addTitle;
                this.isShowDialog();
            },

            isShowDialog() {
                this.isShow = this.isShow !== true;
            },

            toEdit(row) {
                this.title = this.editTitle;
                this.isEdit = true;
                this.form = JSON.parse(JSON.stringify(row));

                if (row.level == 2) {
                    let data = {
                        params: {
                            'categoryCode': 0,
                            'languageCode': this.form.languageCode,
                            'areaCode': this.form.areaCode
                        }
                    }
                    this.$axios.get(this.$url.platformCategory_list, data).then(res => {
                        this.firsrCategoryList = res.data.data;
                        this.$set(this.form, 'parentCategoryCode', row.parentCategoryCode)
                    })
                }
                if (row.level == 3) {
                    let data = {params: {'categoryId': row.categoryId}}
                    this.$axios.get(this.$url.platformCategory_queryLevelThree, data).then(res => {
                        this.changeCategoryType();
                        this.$set(this.form, 'parentCategoryCode', res.data.data.groundParentCategoryCode);
                        this.$set(this.form, 'parentCategoryCodeTwo', res.data.data.parentCategoryCode)
                        this.listSellerCategoryLevelTwo(false);

                    })
                    let files = [];
                    let logos = this.form.categoryLogo.split('/');
                    let name = logos[logos.length - 1];
                    let url = this.$url.oss_url + this.form.categoryLogo;
                    let myImg = {
                        name: name,
                        url: url
                    };
                    files.push(myImg)
                    this.fileList = files;
                }

                this.form.categoryStatus = this.form.categoryStatus.toString();

                this.isShowDialog();
            },

            openPic(url) {
                let title = this.$t('Class.iconThird');
                this.$refs.myImg.isDialogShow(url, title);
            },

            //Add with the editor go this method
            confirmData() {
                let url;
                let text = this.$t('Class.Add_successfully');
                if (this.isEdit) {
                    text = this.$t('Class.Edit_successful');
                    url = this.updateUrl;
                } else {
                    url = this.createUrl;
                }
                // this.isEdit = false;
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.form.categoryLogo == null && this.form.level == 3) {
                            let empty = this.$t('Class.empty')
                            let Tips = this.$t('Class.Tips')
                            this.$alert(empty, Tips, {
                                confirmButtonText: this.$t('Class.confirm'),
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
            margin-left: 10px;
            flex-wrap: nowrap;
            width: 100%;
        }

        .searchbox {
            margin: 8px;
            width: 10.6%;
        }
    }
</style>
