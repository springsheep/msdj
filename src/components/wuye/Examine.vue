<template>
    <div class="">

        <h4 class="title"><i></i><span>审核人员</span></h4>
        <div class=" list">
            <input name="checkbox1" value="Item 1" type="radio" :checked="msg.reviewType==0?true:false" class="ck"
                   @click="select($event)" id="wuye">
            <label data-choose='0' for="wuye" class="label">物业管理人员</label>

        </div>
        <div class="list">
            <input name="checkbox1" value="Item 1" type="radio" class="ck" @click="select($event)" id="wuye1"
                   :checked="msg.reviewType==1?true:false">
            <label data-choose='1' for="wuye1" class="label">入驻公司前台</label>
        </div>
        <div class="list">
            <input name="checkbox1" value="Item 1" type="radio" class="ck" @click="select($event)" id="wuye2"
                   :checked="msg.reviewType==2?true:false">
            <label data-choose='2' for="wuye2" class="label">不设置审核人员</label>
        </div>
        <div id="hide" v-show="msg.reviewType<2?true:false">
            <h4 class="title"><i></i><span>审核结果返回</span></h4>
            <div class="list">
                <input name="checkbox2" value="Item 1" type="radio" class="ck" @click="sect($event)" id="shenhe"
                       :checked="msg.reviewResult==0?true:false">
                <label data-choose="0" for="shenhe" class="label">发送“同意”文本</label>

            </div>
            <div class="listbg">
                <div class="list">
                    <input name="checkbox2" value="Item 1" type="radio" class="ck" @click="sect($event)" id="shenhe1"
                           :checked="msg.reviewResult==1?true:false">
                    <label data-choose="1" for="shenhe1" class="label">发送闸机二维码</label>
                </div>
            </div>
            <div id="hidetime" v-show="msg.reviewResult==1?true:false">
                <div class="listTime">
                    <h4>二维码：</h4>
                    <div style="width: 68% ;margin-left: .7rem">
                        <div
                                style="height: 1.8rem;width: 1.8rem;border: .1px solid rgba(0,0,0,0.1);font-size: .8rem;line-height: 1.8rem;text-align: center;color: #999999;margin-top: .1rem">
                            <img :src="src1" alt="" style="height: 100%;width: auto;max-width: 1.8rem;" class="img3"
                                 @click="seema">
                        </div>

                        <!--<img src="../../assets/images/right.png" alt="" style="width: .3rem;position: relative;left: 9rem">-->
                        <div class="img" style="position: fixed" v-show="showimg">
                            <img src="../../assets/images/delete.png" alt="" style="width: 1rem;height: 1rem"
                                 @click="backimg">
                        </div>
                        <input type="file" id="choose" accept="image/*" capture="camera"
                               style="margin-left: 6.5rem;width: 1px;position: fixed;opacity: 0;top: 10rem;"
                               @change="getFile"
                               ref="file">
                    </div>
                    <label for="choose" style="width: 1rem;line-height: 1.4rem;display: flex;align-items: center">
                        <img src="../../assets/images/phopto.jpg" alt="" style="width: 1rem;height: .8rem;">
                    </label>
                </div>
                <div class="listTime">
                    <h4>有效时间：</h4>
                    <div>
            <span :class="timeClass==index?'active':'' " v-for="(item,index) in timeList" :key="index"
                  @click="getTime(index)" :checked="msg.reviewTime==(index+1)*60?true:false"> {{item.text}}</span>
                    </div>
                </div>
                <div class="listTime">
                    <h4>有效次数：</h4>
                    <div>
            <span :class="activeClass==index?'active':'' " v-for="(item,index) in itemList" :key="index"
                  @click="getItem(index)" :checked="msg.validCount==(index+1)?true:false"> {{item.text}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bao" @click="submit">保存</div>
        <div style="width: 10rem;height: 10rem;position: fixed;top: 30%;left: 18%;z-index: 1" v-show="showma"
             @click="closema" class="bounceInUp">
            <img :src="src1" alt="" style="width: 100%;height: 100%" class="bounceInUp">
        </div>
        <div class="mask" @click="closema"
             style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0,0,0,0.2)"
             v-show="showma"></div>
    </div>
</template>

<script type="text/javascript">
    import qs from 'qs';
    import {Indicator} from 'mint-ui'
    import {Toast} from 'mint-ui';

    export default {
        name: 'Examine',
        data() {
            return {
                showma: false,
                msg: '',
                timeClass: '',
                activeClass: '',
                itemList: [
                    {"text": '1次'},
                    {"text": '2次'},
                    {"text": '3次'}
                ],
                timeList: [

                    {"text": '1分钟'},
                    {"text": '2分钟'},
                    {"text": '3分钟'}
                ],
                buildingId: localStorage.getItem('WbuildingId'),
                mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
                reviewType: this.$store.state.cc,
                reviewResult: '',
                validTime: '',
                validCount: '',
                code: '',//判断点击审核人员权限
                code1: '',
                msg: {},
                src: '',//二维码上传的图片存储位置
                showimg: false,//控制二维码的显示隐藏
                src1: '',
                state: 0,//判断二维码是否上传成功
            }
        },
        created() {
            this.getFirst();
            this.activeClass = this.msg.validCount - 1;
        },
        methods: {
//    点击关闭码
            closema() {
                this.showma = false
            },
            //点击按钮吓死二维
            seema() {
                console.log('ppp');
                if (this.src1 != '') {
                    this.showma = true
                }
            },
            //点击退出显示
            backimg() {
                this.showimg = false;
            },
            //二维码上传预览
            getFile(e) {
                Indicator.open('头像上传中...');
                let _this = this;
                var files = e.target.files[0];
                if (!e || !window.FileReader) return;  // 看支持不支持FileReader
                let reader = new FileReader();
                reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function () {
                    _this.src = this.result;
                    if (_this.src != '') {
                        _this.setma()
                    }
                    Indicator.close();
                }
            },
            //生成二维码
            setma() {
                var formData = new FormData();
                formData.append("buildingId", this.buildingId);
                formData.append("mobilePhoneNo", this.mobilePhoneNo);
                if (document.getElementById('choose').files[0] != null && document.getElementById('choose').files[0] != undefined) {
                    formData.append("qrCode", document.getElementById('choose').files[0])
                }
                const options = {
                    method: 'POST',
                    headers: {'token': localStorage.getItem('WToken')},
                    data: formData,
                    url: 'visit/building/uploadQrCode'
                };
                this.axios(options).then((response) => {
                    if (response.data.state == '1') {
                        this.$toast('上传成功');
                        this.state = 1;
                        this.src1 = response.data.data
                    } else {
                        this.$toast(response.data.retMsg);
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
            ,
            //设置审核人员状态
            select(e) {
                var next = e.currentTarget.nextElementSibling;
                var cc = next.getAttribute("data-choose");
                // console.log(cc)
                this.$store.state.id1 = cc;
                if (next.innerHTML == "不设置审核人员") {
                    var hide = document.getElementById("hide");
                    this.code = 2;
                    hide.style.display = 'none'
                } else if (next.innerHTML == "物业管理人员") {
                    var hide = document.getElementById("hide");
                    hide.style.display = 'block';
                    this.code = 0;
                } else {
                    var hide = document.getElementById("hide");
                    hide.style.display = 'block';
                    this.code = 1;
                }

            },
            //选择文本还是闸机二维码
            sect(e) {
                // console.log(e.target.id)
                var cur = e.target.checked;
                var next = e.currentTarget.nextElementSibling;
                var cc = next.getAttribute("data-choose");
                this.reviewResult = cc;
                if (next.innerHTML == "发送“同意”文本") {
                    var hide = document.getElementById("hidetime");
                    hide.style.display = 'none';
                    this.code1 = 0;
                } else {
                    var hide = document.getElementById("hidetime");
                    hide.style.display = 'block';
                    this.code1 = 1;
                }
            },
            //获取二维码时间
            getTime: function (index) {
                this.timeClass = index;
                this.validTime = (this.timeClass + 1) * 60;
            },
            //获取认为吗次数
            getItem: function (index) {
                this.activeClass = index;
                var c = event.currentTarget;
                var con = c.innerHTML;
                this.validCount = index + 1;
            },
            //初始化
            getFirst() {
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                    data: qs.parse(data),
                    url: 'visit/building/reviewSettingInit'
                };
                this.axios(options).then((res) => {
                    this.msg = res.data.data;
                    this.code = this.msg.reviewType;
                    this.code1 = this.msg.reviewResult;
                    this.src1 = res.data.data.qrCodeUrl;
                    if (this.src1 != null) {
                        this.state = 1
                    }
                    this.activeClass = this.msg.validCount - 1;
                    this.timeClass = Number(this.msg.validTime) / 60 - 1
                })
            }
            ,
            submit() {
                if (this.state == 0 && this.code != 2 && this.code1 == 1) {
                    this.$toast('请您先上传二维码');
                } else{
                    var formData = new FormData();
                    formData.append("buildingId", this.buildingId);
                    formData.append("mobilePhoneNo", this.mobilePhoneNo);
                    formData.append("reviewType", this.code);
                    formData.append("reviewResult", this.code1);
                    formData.append("validTime", this.validTime);
                    formData.append("validCount", this.validCount);
                    if (document.getElementById('choose').files[0] != null && document.getElementById('choose').files[0] != undefined) {
                        formData.append("qrCode", document.getElementById('choose').files[0])
                    }
                    // console.log(formData, this.code, this.code1, this.validTime, this.validCount);
                    const options = {
                        method: 'POST',
                        headers: {'token': localStorage.getItem('WToken')},
                        data: formData,
                        url: '/visit/building/reviewSetting'
                    };
                    this.axios(options).then((response) => {
                        // console.log(this.msg, '页面初始化')
                        if (response.data.state == '1') {
                            this.$toast('保存成功');
                            this.$router.go(-1);
                        } else {
                            this.$toast(response.data.retMsg);
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .list {
        height: 2.128rem;
        line-height: 2.128rem;
        border-bottom: #ddd solid 1px;
        display: flex;
        align-items: center;

        .ck {
            width: .638rem;
            height: .638rem;
            margin-left: .638rem;
        }

        .label {
            padding-left: .213rem;
            font-size: .638rem;
            color: #333;
            vertical-align: middle;
            width: 14rem;
        }

    }

    .listbg {
        // .list{
        //   background-color: #f8f8f8;
        //   }
    }

    .title {
        height: 1.702rem;
        line-height: 1.702rem;
        padding-left: .538rem;
        color: #999;
        font-size: .638rem;
        border-bottom: #ddd solid .5px;
        position: relative;

        i {
            width: .213rem;
            height: 1.278rem;
            display: inline-block;
            background: #1a96d4;
            position: absolute;
            left: 0;
            top: .213rem;
        }

    }

    .myHeader {
        background: #f8f8f8;

        h2 {
            text-align: center;
            font-size: .723rem;
            font-weight: normal
        }

        .mint-button {
            color: #2c2c2c;
        }

        .mint-header-title {
            color: #030303;
            font-size: .681rem;
        }
    }

    .listTime {
        display: flex;
        height: 2.128rem;
        line-height: 2.128rem;
        border-bottom: #ddd solid .5px;
        padding-left: .638rem;

        h4 {
            display: inline-block;
            font-size: .638rem;
            color: #999;
        }

        div {
            span {
                width: 2.553rem;
                height: 1.277rem;
                display: inline-block;
                border: #ddd solid .5px;
                text-align: center;
                line-height: 1.277rem;
                margin-top: .213rem;
                margin-right: .213rem;
                border-radius: .085rem;
                font-size: .638rem;
            }

            .active {
                background-color: #1a96d4;
                color: #fff;
                border: #1a96d4 solid .5px;

            }
        }
    }

    .bao {
        margin-left: .638rem;
        margin-right: .638rem;
        margin-top: 1.277rem;
        background-color: #1a96d4;
        border: #1a96d4 solid .5px;
        border-radius: .213rem;
        height: 1.915rem;
        line-height: 1.915rem;
        color: #fff;
        width: 92%;
        font-size: .766rem;
        text-align: center;
    }
</style>
