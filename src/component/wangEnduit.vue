<template lang="html">
    <div class="editor">
        <div  ref="toolbar" class="toolbar">
        </div>
        <div :disabled="veiw" ref="editor" class="text">
        </div>
        <wangEidtUpload ref="wangEidtUpload"/>
    </div>
</template>

<script>
    import E from 'wangeditor';
    import wangEidtUpload from './wangEidtUpload.vue';
    import {eventBus} from "scripts/utils/BUS";

    export default {
        name: 'editoritem',
        components: {
            wangEidtUpload
        },
        data() {
            return {
                bus: 'editorBus',
                callbackBus: 'callbackBus',
                editor: null,
                info_: null
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            veiw:{
                type:Boolean,
                default:false,
            },
            type:{
                type:Number,
                default:1,
            },
            value: {
                type: String,
                default: ''
            },
            isClear: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            isClear(val) {
                // 触发清除文本域内容
                if (val) {
                    this.editor.txt.clear()
                    this.info_ = null
                }
            },
            value: function (value) {
                if (value !== this.editor.txt.html()) {
                    this.editor.txt.html(this.value)
                }
            }
            //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
        },
        mounted() {
            this.seteditor()
            this.editor.txt.html(this.value)
        },

        beforeDestroy() {
            eventBus.$off(this.callbackBus);
        },
        methods: {
            seteditor() {
                this.editor = new E(this.$refs.toolbar, this.$refs.editor)
                this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
                this.editor.customConfig.uploadImgHeaders = {}// 自定义 header
                this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
                this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 // 将图片大小限制为 2M
                this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
                this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
                if (this.veiw){
                    // 配置菜单
                    this.editor.customConfig.menus = [
                    ]
                }else {
                    if (this.type==1){
                        // 配置菜单
                        this.editor.customConfig.menus = [
                            'head', // 标题
                            'bold', // 粗体
                            'fontSize', // 字号
                            'fontName', // 字体
                            'italic', // 斜体
                            'underline', // 下划线
                            'strikeThrough', // 删除线
                            'foreColor', // 文字颜色
                            'backColor', // 背景颜色
                            'link', // 插入链接
                            'list', // 列表
                            'justify', // 对齐方式
                            'quote', // 引用
                            'emoticon', // 表情
                            'image', // 插入图片
                            'table', // 表格
                            'undo', // 撤销
                            'redo', // 重复
                        ]
                    };
                    if (this.type==2){
                        // 配置菜单
                        this.editor.customConfig.menus = [
                            'head', // 标题
                            'bold', // 粗体
                            'fontSize', // 字号
                            'fontName', // 字体
                            'italic', // 斜体
                            'underline', // 下划线
                            'strikeThrough', // 删除线
                            'foreColor', // 文字颜色
                            'backColor', // 背景颜色
                            'list', // 列表
                            'justify', // 对齐方式
                            'quote', // 引用
                            'emoticon', // 表情
                            'table', // 表格
                            'undo', // 撤销
                            'redo', // 重复
                        ]
                    }

                }

                let self = this;
                this.editor.customConfig.customUploadImg = function (files, insert) {
                    self.$refs.wangEidtUpload.uploadChange(files[0],'editor',self.callbackBus);
                    eventBus.$on('callbackBus', (editorImg_url) => {
                        console.log(editorImg_url);
                        let url = self.$url.oss_url + editorImg_url
                        insert(url);
                        eventBus.$off(self.callbackBus);
                    });
                }


                this.editor.customConfig.onchange = (html) => {
                    this.info_ = html // 绑定当前逐渐地值
                    this.$emit('change', this.info_) // 将内容同步到父组件中
                }
                // 创建富文本编辑器
                this.editor.create()
            }
        }
    }
</script>

<style lang="css">

    /* blockquote 样式 */
    blockquote {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 5px 10px;
        margin: 10px 0;
        line-height: 1.4;
        font-size: 100%;
        background-color: #f1f1f1;
    }

    /* code 样式 */
    code {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        background-color: #f1f1f1;
        border-radius: 3px;
        padding: 3px 5px;
        margin: 0 3px;
    }
    pre code {
        display: block;
    }

    /* ul ol 样式 */
    ul, ol {
        margin: 10px 0 10px 20px;
    }

    .editor {
        width: 100%;
        margin: 0 auto;
        position: relative;
        z-index: 0;
    }

    .toolbar {
        border: 1px solid #ccc;
    }

    .text {
        text-align: left;
        border: 1px solid #ccc;
        min-height: 200px;
    }
</style>
