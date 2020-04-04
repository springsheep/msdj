<template>

    <div>

        <div id="content" class="content" v-show="show2">
            <!--<div class="changestyle" @click="tochange" :style="{'left':left+'px','top':top+'px'}" ref="div">-->
            <div class="changestyle pulse animated " @click="tochange"
                 :style="{'animation-iteration-count':'9999','left':left+'px','top':top+'px'}">
                <img src="../assets/robotlogo.png" alt="" style="width: 100%;height: 100%">
            </div>
            <div class="myTitle">
                <div class="imgBox" style="display: flex;justify-content: center">
                    <img :src="msg.buildingLogo" alt="" srcset="" v-if="msg.buildingLogo!=null&&msg.buildingLogo!=''"
                         style="height: 1.7rem;width: auto;max-width: 2.8rem;">
                    <img src="../assets/images/logo.png" alt="" srcset=""
                         v-if="msg.buildingLogo==null||msg.buildingLogo==''"
                         style="width: auto;height: 1.7rem">
                </div>
                <h2 class="head_title" style="font-size: .766rem"
                    v-show="msg.buildingWelcome==null||msg.buildingWelcome==''">
                    {{msg.buildingName+'欢迎您'}}</h2>
                <h2 class="head_title" style="font-size: .766rem"
                    v-show="msg.buildingWelcome!=null&&msg.buildingWelcome!=''">
                    {{msg.buildingWelcome}}</h2>
            </div>
            <!-- 顶部结束-->
            <div class="geduan" style="height: .426rem"></div>
            <!-- 列表开始 -->
            <div class="list">
                <ul>
                    <!--<div class="down">123</div>-->
                    <li><h4>拜访时间:</h4>
                        <p>{{this.registerTime}}</p></li>
                    <li v-for="elet in msg.visitorRegisterRequiredTemplate" :key="elet.code">
                        <h4>{{elet.name}}<p style="color: #e54747">*</p></h4>
                        <input type="text" :data-code="elet.code" :data-is-required="elet.is_required"
                               @blur="leave"
                               @focus="getItem1(elet.code,$event)"
                               :readOnly="elet.code==1010?true:false"
                               :id="elet.code"
                               v-model="elet.code==1004?'':elet.value"
                               style="width: 60%;overflow: hidden;text-overflow: ellipsis"/>
                        <label for="" v-if="elet.code==1003" class="psshow1" style="width: 60%">
                            <el-row class="demo-autocomplete" v-if="elet.code==1003" style="">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="state2"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入公司名称"
                                        :trigger-on-focus="false"
                                        @select="handleSelect"
                                        @blur="leave"
                                        @focus="enter"
                                >
                                </el-autocomplete>
                            </el-row>
                        </label>

                        <!--<p style="width: 10%" @click="chooseCom">-->
                        <!--<img src="../assets/images/right.png"-->
                        <!--v-if="elet.code==1003"-->
                        <!--style="width: .3rem;margin-left: 10.2rem">-->
                        <!--</p>-->
                        <label for="" v-if="elet.code==1004" class="psshow">
                        <span :class="activeClass == index ? 'active' : ''" v-for="(item,index) in itemList"
                              :key="index"
                              @click="setClass(index)" :data-flag="item.flag">{{item.text}}</span>
                        </label>
                    </li>
                </ul>

            </div>
            <!-- 列表结束 -->
            <!--底部开始 -->
            <div class="foot">
                <!--<div class="myButtom" to='/submit' @click="subindex" style="font-size: .767rem" :disabled="isDisable">-->
                <button class="myButtom" @click="subindex" :disabled="isDisable">提交</button>
                <!--</div>-->
                <!--<div class="enter" @click="funen()">物业端入口>></div>-->
                <!--                <div class="enter" @click="funen1()" style="margin-top: .638rem">公司端入口>></div>-->
            </div>
            <div class="empty"></div>
            <div class="banner" v-show="hideshow">
                <swiper></swiper>
            </div>
        </div>
        <!--选择车牌号 首个汉字键盘 弹出层-->
        <div class="plate_number">
            <van-popup v-model="show_chinese" position="bottom" :overlay="true" overlay-class="displayNone">
                <div class="plate_chinese_box" id="plate_number">
                    <!-- 点击对应的汉字，进行输入 -->
                    <van-button
                            size="small"
                            v-for="(item, index) in ChineseList"
                            :key="item.id"
                            @click="checkChinese(index)"
                    >{{item.name}}
                    </van-button>
                </div>
            </van-popup>
        </div>
        <!-- 英文 数字 键盘 -->
        <div class="allBoard">
            <van-popup
                    v-model="show_allBoard"
                    position="bottom"
                    :overlay="true"
                    overlay-class="displayNone"
            >
                <div class="plate_number_box">
                    <!-- 点击对应的字母或数字，进行输入 -->
                    <van-button
                            size="small"
                            v-for="(item, index) in English_Number"
                            :key="item.id"
                            @click="checkEnglish_num(index)"
                    >{{item.name}}
                    </van-button>
                </div>
            </van-popup>
        </div>


        <preload v-show="show1"></preload>
    </div>
</template>

<script>
    import swiper from "./common/swiper";
    import {formatDateMin} from '@/assets/js/util/formatdate.js'
    import {MessageBox} from 'mint-ui';
    import qs from 'qs';
    import wx from "../../config/wx";
    import Preload from "./wuye/preload";
    import {Toast} from 'mint-ui';
    import {Indicator} from 'mint-ui';

    var currentdate = formatDateMin(new Date()); //时间格式化
    export default {
        name: 'Index',
        data() {
            return {
                left: '',
                top: '',
                restaurants: [],
                state1: '',
                state2: '',
                isDisable: false,
                hideshow: true,  //显示或者隐藏footer
                buildingId: '',
                registerTime: currentdate,
                msg: {},
                activeClass: 0,
                buildingLogo: '',
                src: '',
                itemList: [
                    {"text": '商务', "flag": '0'},
                    {"text": '面试', "flag": '1'},
                    {"text": '私人', "flag": '2'},
                    {"text": '其他', "flag": '3'}

                ],
                ifshow: false,
                num: {},
                show1: false,
                show2: false,
                openId: '',
                code: '',
                showKeyboard: true,    //车牌号输入框是否聚焦
                show_chinese: false,     //是否显示汉字键盘
                show_allBoard: false,     //是否显示英文数字键盘
                ChineseList: [
                    {name: '京', id: 1},
                    {name: '津', id: 2},
                    {name: '冀', id: 3},
                    {name: '晋', id: 4},
                    {name: '蒙', id: 5},
                    {name: '辽', id: 6},
                    {name: '吉', id: 7},
                    {name: '黑', id: 8},
                    {name: '沪', id: 9},
                    {name: '苏', id: 10},
                    {name: '浙', id: 11},
                    {name: '皖', id: 12},
                    {name: '闽', id: 13},
                    {name: '赣', id: 14},
                    {name: '鲁', id: 15},
                    {name: '豫', id: 16},
                    {name: '鄂', id: 17},
                    {name: '湘', id: 18},
                    {name: '粤', id: 19},
                    {name: '桂', id: 20},
                    {name: '琼', id: 21},
                    {name: '渝', id: 22},
                    {name: '川', id: 23},
                    {name: '贵', id: 24},
                    {name: '云', id: 25},
                    {name: '藏', id: 26},
                    {name: '陕', id: 27},
                    {name: '甘', id: 28},
                    {name: '青', id: 29},
                    {name: '宁', id: 30},
                    {name: '新', id: 31},
                    {name: '←', id: 99},
                ],
                English_Number: [
                    {name: '1', id: 28},
                    {name: '2', id: 29},
                    {name: '3', id: 30},
                    {name: '4', id: 31},
                    {name: '5', id: 32},
                    {name: '6', id: 33},
                    {name: '7', id: 34},
                    {name: '8', id: 35},
                    {name: '9', id: 36},
                    {name: '0', id: 37},
                    {name: 'Q', id: 38},
                    {name: 'W', id: 39},
                    {name: 'E', id: 40},
                    {name: 'R', id: 41},
                    {name: 'T', id: 42},
                    {name: 'Y', id: 43},
                    {name: 'U', id: 44},
                    {name: 'I', id: 45},
                    {name: 'O', id: 46},
                    {name: 'P', id: 47},
                    {name: 'A', id: 48},
                    {name: 'S', id: 49},
                    {name: 'D', id: 50},
                    {name: 'F', id: 51},
                    {name: 'G', id: 52},
                    {name: 'H', id: 53},
                    {name: 'J', id: 54},
                    {name: 'K', id: 55},
                    {name: 'L', id: 56},
                    {name: 'Z', id: 57},
                    {name: 'X', id: 58},
                    {name: 'C', id: 59},
                    {name: 'V', id: 60},
                    {name: 'B', id: 61},
                    {name: 'N', id: 62},
                    {name: 'M', id: 63},
                    {name: '←', id: 99},
                ],
                plate_number: '',   //车牌号
                first: '',
                numArr: [],
                chepai: '',
                hehe: '',
                comId: '',
                data6: [],
                result5: {},//选择后的结果
                timer: null,
                currentTop: 0
            }
        },
        beforeCreate() {
            Indicator.open({
                text: '码上加载中...',
                spinnerType: 'fading-circle'
            });
        },
        /**判断从哪里跳转过来的，是否保存页面缓存*/
        beforeRouteEnter(to, from, next) {
            if (from.path == "/SearchCompany") {
                to.meta.isBack = true;
            } else {
                to.meta.isBack = false;
            }
            next();
        },
        created() {
            this.left = document.documentElement.clientWidth - 50;
            this.top = document.documentElement.clientHeight * 0.01;
            localStorage.clear();
            this.buildingId = this.$route.params.buildingId;
            localStorage.setItem('FbuildingId', this.$route.params.buildingId);
            let code = this.getUrlKey("code");
            if (code) {
                this.getNewsInfo(code);
                this.code = code;
            } else {
                this.getCodeApi();
            }
            this.ooo();//模糊查询初始化
        },
        activated() {
            if (!this.$route.meta.isBack) {
                // console.log("扫码进入页面");
            } else {
                /**从选择公司页返回，设置公司id和名称*/
                let m = JSON.parse(localStorage.getItem('ComInfo'));
                console.log(m);
                if (m != null) {
                    this.state2 = m.name;
                    let arr = this.msg.visitorRegisterRequiredTemplate;
                    for (let i in arr) {
                        if (arr[i].code == '1003') {
                            this.msg.visitorRegisterRequiredTemplate[i].value = m.name;
                        }
                    }
                    this.comId = m.value.companyId;
                    localStorage.removeItem('ComInfo');
                }
                Indicator.close();
            }
            this.$route.meta.isBack = false;
        },
        mounted() {

            window.addEventListener('scroll', this.handleScrollStart);
            // this.$nextTick(()=>{
            //     const div = this.$refs.div;
            //     div.addEventListener("touchstart",()=>{
            //         div.style.transition = 'none';
            //     });
            //     div.addEventListener("touchmove",(e)=>{
            //         if (e.targetTouches.length === 1) {
            //             let touch = event.targetTouches[0];
            //             this.left = touch.clientX - 25;//组件的宽度是50
            //             this.top = touch.clientY - 25;
            //         }
            //     });
            //     div.addEventListener("touchend",()=>{
            //         div.style.transition = 'all 0.3s';
            //         if(this.left>document.documentElement.clientWidth/2){
            //             this.left = document.documentElement.clientWidth - 50;
            //         }else{
            //             this.left = 0;
            //         }
            //     });
            // });
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScrollStart);
        },

        methods: {
            handleScrollEnd() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop === this.currentTop) {
                    if (this.left > document.documentElement.clientWidth / 2) {
                        this.left = document.documentElement.clientWidth - 50;
                    } else {
                        this.left = 0;
                    }
                    clearTimeout(this.timer);
                }
            },
            handleScrollStart() {
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.handleScrollEnd();
                }, 1000);
                this.currentTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (this.left > document.documentElement.clientWidth / 2) {
                    this.left = document.documentElement.clientWidth - 25;
                } else {
                    this.left = -25;
                }
            },
            tochange() {
                this.$router.push({path: '/robot'})
            },
            querySearch(queryString, cb) {
                var restaurants = this.data6;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > 0);
                };
            },
            handleSelect(item) {
                this.result5 = item;
            },
            //公司模糊查询
            ooo() {
                const data = {
                    "buildingId": this.buildingId,
                    "companyName": ''
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    data: qs.parse(data),
                    url: 'visit/visitor/getCompanyList'
                };
                this.axios(options).then((res) => {
                    console.log(res.data);
                    if (res.data.state == 1) {
                        for (let i in Object.values(res.data.data)) {
                            for (let j in Object.values(res.data.data)[i]) {
                                const obj = {
                                    value: Object.values(res.data.data)[i][j].companyName,
                                    address: Object.values(res.data.data)[i][j]
                                };
                                this.data6.push(obj)

                            }
                        }
                    }
                }).catch(function (error) {
                });

            },
            leave() {
                this.hideshow = true
            },
            enter() {
                this.hideshow = false
            }
            ,
            select(e) {
                var cur = e.currentTarget;
                if (cur.getAttribute("data-code") == 1004) {
                    e.currentTarget.style.display = "none";
                    var showtoggle = e.currentTarget.nextElementSibling;
                    showtoggle.classList.add("psshow")
                }
                this.hideshow = true
            },

            // 页面初始化
            getNewsInfo(code) {
                let openid = '';
                const data = {
                    "buildingId": this.buildingId,
                    "code": code,
                    "openId": openid
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    data: qs.parse(data),
                    url: 'visit/visitor/index'
                };
                this.axios(options).then((response) => {
                    if (response.data.state == 1) {
                        // console.log(response.data,'页面初始化');
                        this.msg = response.data.data;
                        this.$store.state.message = this.msg;
                        this.openId = this.msg.openId;
                        localStorage.setItem("openId", this.msg.openId);
                        localStorage.setItem('buildingWelcome', this.msg.buildingWelcome);
                        localStorage.setItem('buildingLogo', this.msg.buildingLogo);
                        localStorage.setItem('buildingName', this.msg.buildingName);
                        let arr = this.msg.visitorRegisterRequiredTemplate;
                        for (let i in arr) {
                            if (arr[i].code == '1003') {
                                this.state2 = this.msg.visitorRegisterRequiredTemplate[i].value;
                                let m = JSON.parse(localStorage.getItem('ComInfo'));
                                this.comId = this.msg.visitorRegisterRequiredTemplate[i].value1;
                                if (m != null) {
                                    this.msg.visitorRegisterRequiredTemplate[i].value = m.name;
                                    this.comId = m.value.companyId;
                                    localStorage.removeItem('ComInfo')
                                }
                            }
                            //默认保存上一次的拜访是由
                            if (arr[i].code == '1004') {
                                this.activeClass = this.msg.visitorRegisterRequiredTemplate[i].value
                            }
                        }
                        Indicator.close();
                        if (response.data.data.flag == "0") {
                            this.show1 = false;
                            this.show2 = true
                        } else if (response.data.data.flag == "1") {
                            this.show1 = true;
                            this.show2 = false
                        }
                    } else {
                        Toast(response.data.retMsg)
                    }
                }).catch(function (error) {
                    Toast(error)
                });
            },
            getCodeApi() {//获取code
                let urlNow = encodeURIComponent(window.location.href);
                let scope = wx.scope_baseinfo;
                let appid = wx.appid;
                let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}`;
                window.location.href = url;
            },
            getUrlKey(name) {//获取url 参数
                return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;

            },
            subindex() {
                if (JSON.stringify(this.result5) != "{}") {
                    this.comId = this.result5.companyId;
                }
                //防止重复点击
                this.isDisable = true;
                var list1 = document.querySelectorAll("input[data-is-required='1']");
                //验证规则
                for (var i = 0; i < list1.length; i++) {
                    var a = list1[i];
                    var code = '' + a.getAttribute("data-code");
                    var value = a.value;
                    //姓名验证
                    if (code == 1001) {
                        var value = a.value;
                        var reg = /^([\u4e00-\u9fa5]){2,10}$/;
                        if (value.length <= 1 && value.length > 0) {
                            MessageBox('提示', '请输入正确的姓名');
                            this.isDisable = false;
                            return false;
                        } else if (value == "") {
                            MessageBox('提示', '请输入姓名');
                            this.isDisable = false;
                            return false;
                        }
                    }
                    //手机号验证
                    if (code == 1002) {
                        var value = a.value;
                        var reg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
                        if (!reg.test(value) && value.length != 0) {
                            MessageBox('提示', '请输入正确的手机号');
                            this.isDisable = false;
                            return false;
                        } else if (value == "") {
                            MessageBox('提示', '请输入手机号');
                            this.isDisable = false;
                            return false;
                        }
                    }
                    //公司
                    // if (code == 1003) {
                    //     var value = a.value;
                    //     var reg = /^[\(\)\（\）\u4E00-\u9FA5]+$/;
                    //     if (!reg.test(value) && value.length != 0) {
                    //         MessageBox('提示', '请输入正确的单位名称');
                    //         this.isDisable = false;
                    //         return false;
                    //     } else if (value == "") {
                    //         MessageBox('提示', '请输入单位名称');
                    //         this.isDisable = false;
                    //         return false;
                    //     }
                    // }
                    //身份证号码
                    if (code == 1005) {
                        var value = a.value;
                        var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                        if (!reg.test(value) && value.length != 0) {
                            MessageBox('提示', '请输入正确的身份证号');
                            this.isDisable = false;
                            return false;
                        } else if (value == "") {
                            MessageBox('提示', '请输入身份证号');
                            this.isDisable = false;
                            return false;
                        }
                    }
                    //随行人数
                    if (code == 1006) {
                        var value = a.value;
                        if (value < 0) {
                            MessageBox('提示', '请输入正确的人数');
                            this.isDisable = false;
                            return false;
                        } else if (value.length == 0) {
                            MessageBox('提示', '请输入人数');
                            this.isDisable = false;
                            return false;
                        }
                    }
                    //拜访楼层
                    if (code == 1007) {
                        var value = a.value;
                        if (value != "" && value < 2) {
                            MessageBox('提示', '请输入正确的楼层');
                            this.isDisable = false;
                            return false;
                        } else if (value.length == 0) {
                            MessageBox('提示', '请输入楼层');
                            this.isDisable = false;
                            return false;
                        }
                    }
                    //拜访
                    if (code == 1011) {
                        var value = a.value;
                        if (value.length <= 1 && value.length > 0) {
                            MessageBox('提示', '请输入正确的被访人员');
                            this.isDisable = false;
                            return false;
                        } else if (value == "") {
                            MessageBox('提示', '请输入被访人员');
                            this.isDisable = false;
                            return false;
                        }
                    }
                    //  车牌号
                    if (code == 1010) {
                        var value = a.value;
                        var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
                        if (!reg.test(value) && value.length != 0) {
                            MessageBox('提示', '请输入正确的车牌号');
                            this.isDisable = false;
                            return false;
                        } else if (value == "") {
                            MessageBox('提示', '请输入车牌号');
                            this.isDisable = false;
                            return false;
                        }
                    }
                }
                //拿到页面数据做成json格式
                var array = [];
                if (list1.length > 0) {
                    for (var i = 0; i < list1.length; i++) {
                        var a = list1[i];
                        console.log(a);
                        var code = '' + a.getAttribute("data-code");
                        var is_required = '' + a.getAttribute("data-is-required");
                        var value = '';
                        if (code == '1004') {
                            var c = document.getElementsByClassName('psshow')[0].querySelector('.active');
                            value = c.getAttribute("data-flag");
                        } else if (code == '1003') {
                            value = this.state2
                        } else {
                            value = a.value;
                        }
                        var object = {};
                        object.code = code;
                        object.is_required = is_required;
                        object.value = value;
                        array.push(object);
                    }
                }
                var list2 = document.querySelectorAll("input[data-is-required='0']");
                if (list1.length > 0) {
                    for (var i = 0; i < list2.length; i++) {
                        var a = list2[i];
                        var code = '' + a.getAttribute("data-code");
                        console.log(code);
                        var is_required = '' + a.getAttribute("data-is-required");
                        var value = a.value;
                        var object = {};
                        object.code = code;
                        object.is_required = is_required;
                        object.value = value;
                        array.push(object);
                    }
                }
                console.log(object, list1);
                let visitorRegisterInfo = JSON.stringify(array);
                let openId = localStorage.getItem('openId');
                //发生请求
                // console.log(openId);
                const data = {
                    "buildingId": this.buildingId,
                    "registerTime": this.registerTime,
                    "visitorRegisterInfo": visitorRegisterInfo,
                    "openId": openId,
                    "companyId": this.comId
                };
                // console.log(this.comId);
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    data: qs.parse(data),
                    url: 'visit/visitor/registerSubmit'
                };
                this.axios(options).then((response) => {
                    // console.log(response.data);
                    this.isDisable = false;//释放按钮的点击功能
                    if (response.data.state == '1') {
                        this.$store.state.visitInfo = response.data.data;
                        if (response.data.data.reviewType == '2') {
                            this.$router.push({path: '/Pass'});
                            Toast('访问通过')
                        } else {
                            this.$router.push({path: '/submit'});
                            Toast('提交成功')
                        }
                    } else {
                        Toast(response.data.retMsg)
                    }
                }).catch(function (error) {
                    Toast(error);
                    this.isDisable = false;//释放按钮的点击功能
                });
            },
            setClass: function (index) {
                this.activeClass = index
            },
            chooseCom() {
                this.$router.push({path: '/SearchCompany'})
            }
            ,
            // 唤起键盘
            getItem1: function (index, e) {
                this.hideshow = false;
                if (index == 1010) {
                    e.target.setAttribute('v-model', this.chepai);
                    this.chepai = this.first + this.numArr.join().replace(/,/g, '');
                    if (!this.first) {
                        this.show_chinese = true;
                    } else {
                        this.show_chinese = false;
                        this.show_allBoard = true;
                    }
                } else {
                    this.show_chinese = false;
                    this.show_allBoard = false;
                }
            },

            // 选择车牌号前面的汉字
            checkChinese(index) {
                // 如果点击删除键，删除第一个格的内容
                if (this.ChineseList[index].id == 99) {
                    this.first = '';
                } else {
                    // 把选中的字赋值给第一个格，并且切换键盘
                    this.first = this.ChineseList[index].name;
                    this.show_chinese = false;
                    this.show_allBoard = true;
                }
                /**车牌号赋值*/
                let val = this.first + this.numArr.join().replace(/,/g, '');
                document.getElementById('1010').value = val;
                let arr = this.msg.visitorRegisterRequiredTemplate;
                for (let i in arr) {
                    if (arr[i].code == '1010') {
                        this.msg.visitorRegisterRequiredTemplate[i].value = val;
                        break;
                    }
                }
            },
            // 选择车牌号后面的数字和字母
            checkEnglish_num(index) {
                // 如果点击删除键，删除 numArr 的最后一个值
                if (this.English_Number[index].id == 99) {
                    this.numArr.pop();
                    // 如果 numArr 里面被删的没有值了，切换键盘
                    if (this.numArr.length == 0) {
                        this.show_chinese = true;
                        this.show_allBoard = false;
                    }
                } else {
                    // 把选中的值 push 到 numArr 内
                    this.numArr.push(this.English_Number[index].name);
                    // 如果 numArr 中的值超过 7 个（车牌号的最大位数），删除最后一个
                    if (this.numArr.length > 7) {
                        this.numArr.pop()
                    }
                }
                /**车牌号赋值*/
                let val = this.first + this.numArr.join().replace(/,/g, '');
                document.getElementById('1010').value = val;
                let arr = this.msg.visitorRegisterRequiredTemplate;
                for (let i in arr) {
                    if (arr[i].code == '1010') {
                        this.msg.visitorRegisterRequiredTemplate[i].value = val;
                        break;
                    }
                }
            },
            // 关闭虚拟键盘
            close_keyboard() {
                this.show_chinese = false;
                this.show_allBoard = false;
            }
        },
        components: {
            Preload,
            swiper
        }
    }
</script>


<style lang="scss" scoped>
    .el-autocomplete {
        width: 100% !important;


    }

    .el-input__inner {
        border: 0px solid black !important;
        padding: 0;
        z-index: 2;
    }

    .down {
        width: 67%;
        background-color: red;
    }

    .mask {
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 50;
        position: fixed;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
    }

    .content {
        margin: 0;
        padding: 0;
        /*height:80%;*/
    }

    h2 {
        text-align: center;
        font-size: 0.7rem;
        font-weight: normal
    }

    .head_title {
        font-size: .766rem;
        margin-top: 0.9rem;
        margin-bottom: 0.638rem;
        color: #333333;
    }

    .imgBox {
        width: 1.7rem;
        height: 1.7rem;
        margin: 0.126rem auto;

    }

    .imgBox img {
        width: 100%;
        height: 100%;
    }

    .mint-header .mint-button {
        color: #2c2c2c;
    }

    .mint-header-title {
        color: #030303;
        font-size: 0.7rem;
    }

    .geduan {
        height: 0.638rem;
        width: 100%;
        background-color: #f1f1f1;

    }

    .list li {
        position: relative;
        height: 2.08rem;
        line-height: 2.08rem;
        padding-left: 0.638rem;
        border-bottom: #dddddd solid 1px;

    }

    .list li p {
        display: inline-block;
        color: #333;

    }

    .list h4 {
        width: 3.4rem;
        text-align: left;
        display: inline-block;
        font-size: 0.6rem;
        color: #7a7a7a;
        margin-right: 0.638rem;
        font-weight: normal;
    }

    .list p {
        font-size: 0.638rem;
    }

    .list h4 i {
        color: #f41f1f;
        margin-right: .09rem;
    }

    .list input {
        color: #333;
        font-size: 0.6rem;
        border: none;
    }

    .list span {
        width: 2.128rem;
        height: 1.27rem;
        border: #999 solid 1px;
        display: inline-block;
        text-align: center;
        line-height: 1.27rem;
        border-radius: 0.085rem;
        margin-right: .4rem;
        color: #666;
        font-size: 0.6rem;
    }

    .list .active {
        background-color: #557ef6;
        color: #fff;
        border: #557ef6 solid 1px;
    }

    .list label {
        position: absolute;
        top: 0;
        left: 4.8rem;
    }

    .foot {
        margin: 0.85rem 0;
    }

    .myButtom {
        border: 0;
        background-color: #557ef6;
        border-radius: 0.213rem;
        width: 14.687rem;
        height: 1.87rem;
        color: #fff;
        font-size: 0.8rem;
        display: block;
        text-align: center;
        text-decoration: none;
        line-height: 1.87rem;
        cursor: pointer;
        margin: 0 auto;
    }

    .enter {
        font-size: 0.596rem;
        color: #999;
        text-align: center;
        display: block;
        text-align: center;
        text-decoration: none;
        margin-top: 1.45rem;
    }

    .banner {
        position: fixed;
        bottom: -0.2rem;
        width: 100%;
        height: 3.83rem;
    }

    .imgBox img {
        width: 100%;
        height: 100%;
        margin: 0.426rem auto;
    }

    input {
        line-height: 1.277rem;
        width: 67%;
    }

    .empty {
        width: 10rem;
        height: 5.168rem;
        /*background: red;*/
    }

    .keyboard {
        width: 100%;
        position: absolute;
    }

    .input-box {
        width: 21rem;
        height: 3.2rem;
        margin: auto;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 6px 8px 0px rgba(96, 100, 112, 0.1);
        border-radius: .4rem;
        border: 1px solid rgba(206, 208, 210, 1);
        margin: 0 auto 2rem;
        display: flex;
        justify-content: center;

        li {
            flex: 1;
            border-right: 1px solid rgba(206, 208, 210, 1);
            box-sizing: border-box;
            margin-left: -1px;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #323233;
        }

        li:last-child {
            border: none;
        }
    }

    .class-close-box {
        width: 2rem;
        height: 1.5rem;
        position: absolute;
        right: 0.5rem;
        top: -1.3rem;
    }

    .class-close-box-div {
        width: 1rem;
        height: 1rem;
        font-size: 0.8rem;
        line-height: 1rem;
        margin: auto;
        text-align: center;
        border: 1px solid #666;
        border-radius: 50%;
    }

    .class-close-box-li {
        width: 1px;
        height: 0.5rem;
        background: #666;
        margin: auto;
    }

    .overflow-y {
        overflow-y: inherit;
    }

    .class-van-button-small {
        min-width: 0;
        border-radius: 5px;
        margin: 5px 2px;
        box-shadow: 5px 5px 5px #aaa;
    }

    .class-plate-box {
        width: 100%;
        padding: 0.7rem 0.5rem;
        box-sizing: border-box;
        background: #eaf1f9;
        position: relative;
    }

    .plate_number {
        .van-popup {
            @extend .overflow-y;
        }

        .van-popup--bottom {
            background: #eee;
        }

        .plate_chinese_box {
            width: 100%;
            @extend .class-plate-box;

            .close-box {
                @extend .class-close-box;

                div {
                    @extend .class-close-box-div;
                }

                li {
                    @extend .class-close-box-li;
                }
            }

            .van-button--small {
                width: 11.3%;
                height: 2rem;
                @extend .class-van-button-small;
            }
        }
    }

    .allBoard {
        .van-popup {
            @extend .overflow-y;
        }

        .plate_number_box {
            width: 100%;
            @extend .class-plate-box;

            .close-box {
                @extend .class-close-box;

                div {
                    @extend .class-close-box-div;
                }

                li {
                    @extend .class-close-box-li;
                }
            }

            .van-button--small {
                width: 8.8%;
                height: 2rem;
                @extend .class-van-button-small;
            }

            .van-button--small:nth-child(1) {
                margin-bottom: 5px;
            }

            .van-button--small:nth-child(21) {
                margin-left: 5%;
            }

            .van-button--small:nth-child(30) {
                margin-left: 10%;
            }

            .van-button--small:last-child {
                width: 13%;
            }
        }
    }
</style>

<style lang="scss">
    .changestyle {
        transition: all 0.3s;
        position: fixed !important;
        right: .638rem;
        top: .5rem;
        width: 1.8rem;
        height: 1.8rem;
        z-index: 99999;
        border-radius: 50%;
        box-shadow: 0px 4px 9px #999999;
    }

    .displayNone {
        display: none !important;

    }

    .el-input__inner {
        border: 0;
        padding: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        font-size: .638rem;
    }

    .el-input__inner::placeholder {
        color: #333;
    }
</style>
