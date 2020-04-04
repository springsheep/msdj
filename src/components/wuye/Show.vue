<template>
    <div>
        <h4 class="welcome title">请选择访客登记信息</h4>
        <!-- 列表 -->
        <div class="lists">

            <draggable @update="datadragEnd" :options="{
            animation:500,
            handle:'.handle',
            chosenClass: 'sortable-chosen',
            ghostClass: 'sortable-ghost',
            fallbackOnBody:false,
            scroll: false}" ，
            >
                <transition-group ref="table">
                    <div v-for="element in msg.visitorRegisterTemplate" :key="element.code" class="list">
                        <div>
                            <span style="width: .425rem;height: .4rem;display: inline-block"></span>
                            <input name="checkbox1" @click="select($event,element.code)" type="checkbox" class="ck"
                                   :checked="element.is_required==1?true:false"
                                   :disabled="arr1.indexOf(element.code) == -1?false:true"/>
                            <input type="text" :data-code="element.code"
                                   :data-is-required="element.is_required" :value="element.name" class="inputdate"
                                   readOnly="true"
                                   :checked="element.is_required==1?true:false"/>
                        </div>
                        <span style="width: 1.5rem;height: 1.5rem;display: inline-block" class="handle">
                            <img src="../../assets/images/xu.png" alt="">
                        </span>

                    </div>
                </transition-group>
            </draggable>

        </div>
        <button class="bao" @click="baocun">保存</button>

    </div>
</template>

<script type="text/javascript">
    import draggable from 'vuedraggable';
    import {Indicator} from 'mint-ui'
    import {Toast} from 'mint-ui';
    import qs from 'qs';
    import {MessageBox} from 'mint-ui';

    export default {
        name: 'Show',
        data() {
            return {
                msg1: this.$store.state.message,
                buildingId: localStorage.getItem('WbuildingId'),
                mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
                msg: {},
                buildingWelcome: '',
                src: this.$store.state.message.buildingLogo,
                visitorRegisterTemplate: '',
                buildingLogo: '',
                startArr: [],
                endArr: [],
                count: 0,
                is_required: 0,
                arr: ['1001', '1002', '1003', '1004'],
                arr1: ['1002', '1008', '1009']//设置禁止勾选项
            }
        },
        components: {draggable},
        created() {
            this.getNewsInfo();
        },
        methods: {
            select(e, m) {
                var c = e.target.checked;
                var next = e.currentTarget.nextElementSibling;
                if (c) {
                    next.setAttribute("data-is-required", 1)
                } else {
                    next.setAttribute("data-is-required", 0)
                }
            },
            //点击更改选中状态
            sect(e) {
                console.log(123);
                var es = e.currentTarget;
                var cc = es.previousElementSibling;
                if (cc.checked) {
                    cc.checked = !cc.checked;
                    es.setAttribute("data-is-required", 0)
                } else {
                    cc.checked = !cc.checked;
                    es.setAttribute("data-is-required", 1)
                }
            },

            //保存
            baocun() {
                var array = [];
                var list1 = document.querySelectorAll("input[data-is-required='1']");
                for (var i = 0; i < list1.length; i++) {
                    var a = list1[i];
                    var code = '' + a.getAttribute("data-code");
                    var name = a.value;
                    //console.log('获取到的字段名为1====='+name);
                    // console.log(name)
                    var is_required = '' + a.getAttribute("data-is-required");
                    var object = {};
                    object.code = code;
                    object.name = name;
                    object.is_required = is_required;
                    array.push(object);
                }
                var list2 = document.querySelectorAll("input[data-is-required='0']");
                if (list1.length > 0) {
                    for (var i = 0; i < list2.length; i++) {
                        var a = list2[i];
                        var code = '' + a.getAttribute("data-code");
                        var name = a.value;

                        var is_required = '' + a.getAttribute("data-is-required");
                        var object = {};
                        object.code = code;
                        object.name = name;
                        //  console.log('获取到的字段名为2====='+name);
                        object.is_required = is_required;
                        array.push(object);

                    }
                }
                let visitorRegisterTemplate = JSON.stringify(array);
                //发生请求
                var formData = new FormData();
                formData.append("buildingId", this.buildingId);
                formData.append("mobilePhoneNo", this.mobilePhoneNo);
                formData.append("visitorRegisterTemplate", visitorRegisterTemplate);
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                    data: formData,
                    url: 'visit/building/saveVisitorSetting'
                };
                this.axios(options).then((response) => {
                    if (response.data.state == '1') {
                        this.$toast('保存成功');
                        this.$router.go(-1);
                    } else {
                        this.$toast(response.data.retMsg);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            datadragEnd(evt) {
                evt.preventDefault();
            },
            //初始化页面
            getNewsInfo() {
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                    data: qs.parse(data),
                    url: 'visit/building/getVisitorSetting'
                };
                this.axios(options).then((response) => {
                    this.msg = response.data.data;
                }).catch(function (error) {
                    console.log(error);
                });
            }


        },
        mounted() { //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .welcome input {
        border: none;
    }

    input[type='file'] {
        display: none;
        z-index: 10;
        width: 5.106rem;
        font-size: 0;
        height: 1.277rem;
    }

    .list {
        .handle {
            position: relative;
            right: -14.262rem;
            bottom: 1.7rem;
        }

        img {
            width: .851rem;
            height: .34rem;
            margin-bottom: .4rem;
        }

        border-bottom: #ddd solid .5px;
        height: 2.128rem;
        width: 16.026rem;
        line-height: 2.128rem;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
        .ck {
            top: .596rem;
            width: .638rem;
            height: .638rem;
        }

        .inputdate {
            // padding-top: 18px;
            padding-left: .213rem;
            font-size: .638rem;
            color: #333;
            border: none;
            background: none;
        }
    }

    .welcome {
        height: 2.128rem;
        line-height: 2.128rem;
        padding-left: .638rem;
        border-bottom: #ddd solid .5px;
        color: #333333;
        font-size: .638rem;

        span {
            color: #333333;
            font-size: .638rem;
            margin-right: .6rem;
        }

        input {
            font-size: .638rem;
            line-height: 1rem;
        }
    }

    .title {
        text-align: center;
        color: #333333;
    }

    .mint-header-title {
        color: #333333;
        font-size: .681rem;
    }

    .logoup {
        padding-left: .638rem;
        padding-top: .426rem;
        overflow: hidden;
        border-bottom: #ddd solid .5px;
        padding-bottom: .426rem;

        span {
            display: inline-block;
            vertical-align: top;
            line-height: 100%;
        }

        .logoname {
            margin-top: 0.5rem;
            font-size: .638rem;
            color: #333333;
            margin-right: .6rem;
            vertical-align: center;
        }

        .preview {
            width: 1.787rem;
            height: 1.787rem;

        }

        .upload {
            width: 2.553rem;
            height: 1.777rem;
            float: right;
            margin-right: .638rem;
        }
    }

    .bao {
        margin-left: .638rem;
        margin-right: .638rem;
        margin-top: .894rem;
        background-color: #1a96d4;
        border: #1a96d4 solid .5px;
        border-radius: 5px;
        line-height: 1.615rem;
        color: #fff;
        width: 92%;
        font-size: .7rem;
        margin-bottom: .638rem;
    }

    input {
        height: 1.872rem;
        width: 80%;
        color: #333333 !important;
    }
</style>
