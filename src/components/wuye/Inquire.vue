<template>
    <!--<refresh @refresh="refresh">-->
    <!--<scroller ref="my_scroller">-->
    <div class="" style="min-height: 25rem;display: inline-block;width: 100%">
        <!-- 头部 -->
        <div class="empty" style="text-align: center;margin-top: 50%;position: fixed;left: 5.5rem;top: 4rem;"
             v-show="list.visitorRecordList == null">
            <img src="../../assets/images/empty.png" alt="" style="width: 4.255rem">
            <div style="font-size: .638rem;color: #999999;margin-top: .2rem">暂无拜访记录</div>
        </div>
        <div class="top">
            <span>今日累计：<i>{{list.toDayCount}}</i></span>
            <span>本周累计: <i>{{list.thisWeekCount}}</i></span>
            <span>本月累计: <i>{{list.thisMonthCount}}</i></span>
        </div>
        <div style="height: 10px ; background-color: #f1f1f1"></div>
        <!-- 登记查询信息 -->
        <div class='registration'>
            <div class="time1">
                <div class="showTime" ref="first">
                    <p class="timeDes" @click="selectData">{{this.selectedValue}}</p>
                </div>
                <div class="showTime">至</div>
                <div class="showTime second " ref="second">
                    <p class="timeDes" @click="selectData1">{{this.selectedValue1}}</p>
                </div>
            </div>
            <!-- @touchmove.prevent 阻止默认事件，此方法可以在选择时间时阻止页面也跟着滚动。 -->
            <div class="pickerPop time" @touchmove.prevent>
                <!-- 年月日时分选择 -->
                <mt-datetime-picker
                        :end-date="endDate"
                        lockScroll="true"
                        ref="datePicker"
                        v-model="dateVal"
                        class="myPicker"
                        type="date"
                        year-format="{value}"
                        month-format="{value}"
                        date-format="{value}"
                        @confirm="dateConfirm()"
                        @cancel="datacancel()"
                >

                </mt-datetime-picker>

            </div>
            <div class="pickerPop time" @touchmove.prevent>
                <!-- 年月日时分选择 -->
                <mt-datetime-picker
                        :start-date="startDate1"
                        :end-date="endDate1"
                        lockScroll="true"
                        ref="datePicker1"
                        v-model="dateVal1"
                        class="myPicker"
                        type="date"
                        year-format="{value}"
                        month-format="{value}"
                        date-format="{value}"
                        @confirm="dateConfirm1()"
                        @cancel="datacancel1()">
                </mt-datetime-picker>

            </div>

            <div class="showTime xinxi">
                <input @keypress="searchBtn" type="text" placeholder="请输入登记人员姓名/手机号/身份证号" class="message"/>
            </div>
            <div style="height: 10px ; background-color: #f1f1f1"></div>
        </div>
        <ul class="table" style="">
            <li v-for="(es,index) in visitorRecordList" :key="index" class="lis" @click="into(es)">
                <a href="javascript:">
                    <label for="" class="labelcon">
                        <img v-if="es.flag==0" src="../../assets/images/business.png">
                        <img v-if="es.flag==1" src="../../assets/images/audition.png">
                        <img v-if="es.flag==2" src="../../assets/images/people.png">
                        <img v-if="es.flag==3" src="../../assets/images/other.png">
                        <img v-if="es.flag!=0&&es.flag!=1&&es.flag!=2&&es.flag!=3"
                             src="../../assets/images/business.png">
                    </label>
                    <div class="media">
                        <h4>{{es.companyName}}</h4>
                        <div class="msg">
                            <span>时间：{{es.registerTime}}</span>
                            <span>拜访人：{{es.visitorName}} </span>
                        </div>
                    </div>
                </a>
            </li>
            <div class="loadmore" @click="getData(selectedValue,selectedValue1,keywords,num)"
                 v-show="visitorRecordList.length == 0 ? false : true" ref="more"
                 style="margin-bottom: 2.338rem">点击加载更多...
            </div>
        </ul>

        <div style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0.4) ;z-index: 9"
             v-show="show8"></div>
        <div class="tip bounceIn" v-show="show7">
            <div class="tip_head">发送到邮箱
                <img src="../../assets/images/delete.png" alt=""
                     style="width: .8rem;height:.8rem;position: relative;left: 3.5rem;top: .2rem;" @click="quxiao">
            </div>
            <div style="display: flex;justify-content: center;padding-top: 1.233rem;">
                <input type="text" placeholder="输入邮箱地址" ref="sendmail">
            </div>
            <div class="tip_sure" @click="sureSend">确定</div>
        </div>

        <div style="width: 100% ;background-color: white;position:fixed;bottom: 0" v-if="show9">
            <div class="sendEmail" @click="sendmessage">
                发送访客记录到邮箱
            </div>
        </div>
    </div>


</template>

<script type="text/javascript">

    import qs from 'qs';
    import {formatDate} from '@/assets/js/util/formatdate.js'
    import refresh from './refresh'
    import {Toast} from 'mint-ui';
    import {Indicator} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import Vue from 'vue'
    import VueScroller from 'vue-scroller'

    Vue.use(VueScroller);
    export default {
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date)
            }
        },
        name: 'Inquire',
        props: {date: String},  //接受父组件中请求json得到的日期值
        data() {
            return {
                dateVal: new Date(), // 默认是当前日期
                dateVal1: new Date(),
                selectedValue: '',
                selectedValue1: '',
                buildingId: localStorage.getItem('WbuildingId'),
                mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
                list: {},
                top: 0,
                startY: 0,          // 保存 y轴点的位置
                touching: false,   // 代表当前是否处于 下拉刷新行为的开关，也就是当属于滚动行为时，就要退出该事件机制
                num: 0,
                keywords: '',
                show5: false,
                visitorRecordList: [],
                startDate1: new Date(),
                endDate: new Date(),
                endDate1: new Date(),
                show7: false,
                show8: false,
                show9: true,//控制发送邮件显影
            }
        },
        // created() {
        //     this.selectedValue1 = this.selectedValue = formatDate(new Date())
        //     this.getData(this.selectedValue, this.selectedValue1, this.keywords,0);
        // },
        /**初始化方法*/
        activated() {
            if (!this.$route.meta.isBack) {
                this.visitorRecordList = [];
                this.num = 0;
                this.selectedValue1 = this.selectedValue = formatDate(new Date());
                this.getData(this.selectedValue, this.selectedValue1, this.keywords,0);
            }
            this.$route.meta.isBack = false;
        },
        //判断从哪里跳转过来的，是否保存页面缓存
        beforeRouteEnter(to, from, next) {
            if (from.path == "/detail") {
                to.meta.isBack = true;
            } else {
                to.meta.isBack = false;
            }
            next();
        },
        methods: {
            //取消发送
            quxiao() {
                this.show7 = false;
                this.show8 = false;//取消发送，蒙版消失
            },
            //确认发送邮件
            sureSend() {
                this.show7 = false;
                this.show8 = false;//确认发送，蒙版消失
                let msg = this.$refs.sendmail.value;
                let reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
                if (!reg.test(msg) && msg.length != 0) {
                    MessageBox('提示', '请输入正确的邮箱');
                    return false;
                } else if (msg == "") {
                    MessageBox('提示', '请输入邮箱');
                    return false;
                } else {
                    Indicator.open('邮件发送中...');
                    this.sendE(msg, this.selectedValue, this.selectedValue1, this.keywords)
                }

            },
            //点击发送邮件
            sendmessage() {
                this.show7 = true;
                this.show8 = true;//点击发送 蒙版和模块显示
            },
            into(i) {
                this.$store.state.msg = i;
                this.$router.push({path: "/detail"})
            },
            //点击键盘搜索出发搜索功能
            searchBtn(event) {
                // console.log(event)
                if (event.keyCode === 13) { //如果按的是enter键 13是enter
                    event.preventDefault(); //禁止默认事件（默认是换行）s
                    this.keywords = event.target.value;
                    var search_val = event.target.value;
                    if (search_val === '' || search_val === null) {
                        this.getData(this.selectedValue, this.selectedValue1, this.keywords,0);
                    } else {
                        this.getData(this.selectedValue, this.selectedValue1, this.keywords,0);
                    }
                }

            },
            getData(a, b, c,pageno) {
                let bid = localStorage.getItem('WbuildingId');
                let phone = localStorage.getItem('mobilePhoneNo');
                let token = localStorage.getItem('WToken');
                if(pageno == 0){
                    this.num = 0;
                    this.visitorRecordList=[];
                }else{
                    if(this.show5)
                        return;
                }
                const data = {
                    buildingId: bid,
                    mobilePhoneNo: phone,
                    "queryStartDate": a,
                    "queryEndDate": b,
                    "queryKeyword": c,
                    "pageNo": pageno,
                    "pageSize": 7
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': token},
                    data: qs.parse(data),
                    url: '/visit/building/queryVisitorRecord'
                };
                this.axios(options).then((response) => {
                    this.list = response.data.data;
                    let datalist = this.list.visitorRecordList;
                    if (datalist != null) {
                        for(let i in datalist){
                            this.visitorRecordList.push(datalist[i]);
                        }
                        this.num ++;
                        this.show5 = datalist.length < 7;
                        this.$refs.more.innerHTML = datalist.length < 7 ? '暂无更多' : '点击加载更多...';
                    }else{
                        this.$refs.more.innerHTML = '暂无更多';
                        this.show5 = true;
                    }
                })
            },

            selectData() { // 打开时间选择器
                this.endDate = this.dateVal1;
                this.$refs['datePicker'].open();
                this.show9 = false;
            },
            selectData1() { // 打开时间选择器
                this.startDate1 = this.dateVal;
                this.$refs['datePicker1'].open();
                this.show9 = false;
            },
            dateConfirm() { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
                this.selectedValue = formatDate(this.dateVal);
                this.getData(this.selectedValue, this.selectedValue1, this.keywords,0);
                this.$refs.first.style.color = "#333333";
                this.show9 = true;
            },
            dateConfirm1() { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
                this.selectedValue1 = formatDate(this.dateVal1);
                this.getData(this.selectedValue, this.selectedValue1, this.keywords,0);
                this.$refs.second.style.color = "#333333";
                this.show9 = true;
            },
            datacancel() {
                this.show9 = true;
            },
            datacancel1() {
                this.show9 = true;
            }
            ,
            //发送邮件
            sendE(msg, a, b, c) {
                console.log(this.buildingId);
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                    "email": msg,
                    "queryStartDate": a,
                    "queryEndDate": b,
                    "queryKeyword": c,
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                    data: data,
                    url: '/visit/building/sendVisitorRecordMail'
                };
                this.axios(options).then((res) => {
                    // console.log(res.data)

                    if (res.data.state == 1) {
                        Indicator.close();//邮件发送完毕
                        Toast({
                            message: '发送成功',
                            duration: 500
                        })
                    } else {
                        Indicator.close();
                        Toast({
                            message: res.data.retMsg,
                            duration: 1500
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    //邮箱提示框
    .tip {
        position: fixed;
        top: 30%;
        left: 4%;
        width: 92%;
        margin: 0 auto;
        height: 8.5rem;
        background-color: white;
        z-index: 10;

        .tip_head {
            padding-left: 1.5rem;
            line-height: 1.872rem;
            font-size: .766rem;
            text-align: center;
            color: white;
            background-color: #1a96d4;
        }

        input {
            display: inline-block;
            padding-left: .638rem;
            width: 12.3rem;
            line-height: 1.872rem;
            font-size: .638rem;
            border-radius: .936rem;
            color: #333333;
            border: 0;
            background-color: #f1f1f1;
        }

        .tip_sure {
            text-align: center;
            margin: 0.726rem auto 1rem;
            width: 87%;
            line-height: 1.872rem;
            font-size: .766rem;
            border-radius: .936rem;
            background-color: #1a96d4;
            color: white;
        }
    }

    .sendEmail {
        width: 92%;
        line-height: 1.872rem;
        border-radius: .213rem;
        text-align: center;
        background-color: #1a96d4;
        color: white;
        font-size: .766rem;
        margin: .638rem auto;
    }

    .xinxi {
        /*margin: 0 auto;*/
        width: 90% !important;
        z-index: 5;

    }

    .message {
        display: inline-block;
    }

    .middle {
        padding-top: 0.6rem;
    }

    .time1 {
        display: flex;
        border-bottom: #ddd solid .5px;
    }

    .showTime {
        width: 40%;
    }

    .showTime:nth-child(2) {
        width: 5%;
        z-index: 2;
        padding-left: 0 !important;
    }

    .showTime:nth-child(1) {
        width: 25%;
        z-index: 2;
    }

    .showTime p {
        /*padding-left: 1.8rem;*/
    }

    .time {
        position: fixed;
        top: 0;
    }

    .loadmore {
        text-align: center;
        font-size: .638rem;
        line-height: 2.553rem;
    }

    .table {
        border-top: #ddd solid .5px;

        li {
            border-bottom: #ddd solid .5px;
            height: 2.553rem;
            padding-left: .638rem;

            a {
                height: 2.553rem;
                display: block;
                overflow: hidden;

                label {
                    float: left;
                }

                img {
                    width: 1.702rem;
                    height: 1.702rem;
                    margin: .426rem .638rem 0 0;

                }

                .media {
                    float: left;
                    margin-top: .34rem;

                    h4 {
                        height: 1.064rem;
                        line-height: 1.063rem;
                        color: #333;
                        font-size: .638rem;
                    }

                    .msg {
                        height: 0.851rem;
                        color: #999;
                        font-size: .511rem;

                        span {
                            height: 0.851rem;
                            display: inline-block;
                            margin-right: 0.638rem;

                        }
                    }
                }
            }
        }
    }

    .top {
        height: 2.128rem;
        border-bottom: #ddd solid .5px;
        border-top: #ddd solid .5px;
        padding-left: .638rem;

        span {
            font-size: .638rem;
            color: #333;
            line-height: 2.128rem;
            width: 32%;
            display: inline-block;

            i {
                color: #4595d0;
                font-weight: bold;
            }
        }
    }

    .myHeader {
        background: #f8f8f8;
    }

    h2 {
        text-align: center;
        font-size: 0.638rem;
        font-weight: normal
    }

    .mint-header .mint-button {
        color: #2c2c2c;
    }

    .mint-header-title {
        color: #030303;
        font-size: 0.638rem;
    }

    .registration {

        .showTime {
            height: 2.128rem;
            /*border-bottom: #ddd solid .5px;*/
            line-height: 2.128rem;
            font-size: .638rem;
            color: #999;
            padding-left: .638rem;

            input {
                border: none;
                border-bottom: #ddd solid .5px;
                width: 100%;
                height: 2.128rem;
                color: #999;
                font-size: .638rem;
                padding: 0;
            }

            input::-webkit-input-placeholder {
                color: #999;
                font-size: .638rem;
            }
        }
    }

</style>
