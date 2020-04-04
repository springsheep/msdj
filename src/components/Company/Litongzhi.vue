<template>
    <div class="">
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
                        @confirm="dateConfirm()">

                </mt-datetime-picker>

            </div>
            <div class="pickerPop time" @touchmove.prevent>
                <!-- 年月日时分选择 -->
                <mt-datetime-picker
                        :start-date="startDate"
                        :end-date="endDate1"
                        lockScroll="true"
                        ref="datePicker1"
                        v-model="dateVal1"
                        class="myPicker"
                        type="date"
                        year-format="{value}"
                        month-format="{value}"
                        date-format="{value}"
                        @confirm="dateConfirm1()">
                </mt-datetime-picker>
            </div>

            <div style="height: .426rem ; background-color: #f1f1f1"></div>
            <div class="content">
                <ul style="height: 19rem;overflow: scroll">
                    <li style="line-height: 2.553rem;width: 100%" v-for="(item,index) in LSTZ" @click="EnterInfo(item)"
                        :key="index">
                        <div style="width: 1.702rem;line-height: 1.702rem;background-color: #1a96d4;border-radius: 50%;color: #FFFFFF;font-size: .638rem;text-align: center">
                            {{kind[item.noticeType]}}
                        </div>
                        <div class="middle" style="width: 9.149rem;line-height: 1.402rem">
                            <div>{{item.noticeTitle}}</div>
                            <span>发布人：{{item.publisher}}</span><span
                                style="width: .851rem;display: inline-block"></span><span>阅读数：75</span>
                        </div>
                        <div class="right">{{item.publishTime}}</div>
                    </li>
                    <div style="font-size: .638rem;line-height: 1.2rem;text-align: center;margin-top: .638rem"
                         @click="addmore" ref="more1">点击加载更多...
                    </div>
                </ul>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">
    import {Toast} from 'mint-ui';
    import {formatDate} from '@/assets/js/util/formatdate.js'

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
        name: 'Litongzhi',
        props: {date: String},  //接受父组件中请求json得到的日期值
        data() {
            return {
                dateVal: '', // 默认是当前日期
                dateVal1: '',
                selectedValue: '',
                selectedValue1: '',
                startDate: new Date(),
                endDate: new Date(),
                endDate1: new Date(),
                LSTZ: [],
                i: 0,
                kind: ['停水', '停电', '断网', '电梯', '装修', '消防', '防鼠', '办卡', '缴费', '招领', '启事', '福利', '简报', '提示', '其他'],//通知类
            }
        },
        created() {
            this.tdate();
            this.getTZ()
        },
        methods: {
            //初始时间
            tdate() {
                let date = new Date();
                let seperator1 = "-";
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                this.startDate = new Date();
                this.selectedValue = year + seperator1 + month + seperator1 + strDate;
                this.selectedValue1 = year + seperator1 + month + seperator1 + strDate;
            }
            ,
            selectData() { // 打开时间选择器
                this.dateVal = new Date();
                this.startDate = new Date();
                this.$refs['datePicker'].open()
            },
            selectData1() { // 打开时间选择器
                this.dateVal1 = new Date();
                this.$refs['datePicker1'].open()
            },
            dateConfirm() { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
                this.startDate = this.dateVal;
                this.selectedValue = formatDate(this.dateVal);
                this.$refs.first.style.color = "#333333";
                this.LSTZ = [];
                this.getTZ(0)
            },
            dateConfirm1() { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
                this.selectedValue1 = formatDate(this.dateVal1);
                this.endDate = this.dateVal1;
                this.$refs.second.style.color = "#333333";
                this.LSTZ = [];
                this.getTZ(0)
            },
            //进入查看具体通知
            EnterInfo(i) {
                this.$store.state.CseeTZ = i;
                this.$router.push({
                        name: 'seeTZ', params: {
                            buildingId: localStorage.getItem('CbuildingId'),
                            companyId: localStorage.getItem('companyId'),
                            phoneNo: localStorage.getItem('CmobilePhoneNo'),
                            token: localStorage.getItem('CToken')
                        }
                    },
                )
            },
            getTZ(i) {
                console.log(1111);
                this.axios.post('visit/building/getNoticeList', {
                    "buildingId": localStorage.getItem('CbuildingId'),
                    "mobilePhoneNo": localStorage.getItem('CmobilePhoneNo'),
                    "companyId": localStorage.getItem('companyId'),
                    "queryStartDate": this.selectedValue,
                    "queryEndDate": this.selectedValue1,
                    "pageNo": i,
                    "pageSize": 6,
                    "noticeFlag": '1'
                }).then((res) => {
                    if (res.data.state == 1) {
                        if (res.data.data.historyNoticeList != null) {
                            for (let i in res.data.data.historyNoticeList) {
                                this.LSTZ.push(res.data.data.historyNoticeList[i])
                            }
                            if (res.data.data.historyNoticeList.length < 5) {
                                this.$refs.more1.innerHTML = '暂无更多';
                            }
                        } else {
                            this.$refs.more1.innerHTML = '暂无更多'
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            addmore(i) {
                this.i++;
                this.getTZ(this.i)
            }

        }

    }
</script>

<style lang="scss" scoped>
    .content {
        ul {
            li {
                display: flex;
                justify-content: space-around;
                align-items: center;

                .middle {
                    div {
                        line-height: .766rem;
                        font-size: .638rem;
                        color: #333333;
                        font-weight: 600;
                    }

                    span {
                        color: #999999;
                        font-size: .511rem;
                    }
                }

                .right {
                    font-size: .511rem;
                    color: #999999;
                    line-height: .638rem;
                }
            }
        }
    }

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
            line-height: 1.872rem;
            font-size: .766rem;
            text-align: center;
            color: white;
            background-color: #1a96d4;
        }

        input {
            display: inline-block;
            padding-left: .638rem;
            width: 87%;
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
        margin: 0 auto;
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

    .foot {
        width: 100%;
        position: fixed;
        bottom: -3.826rem;
        text-align: center;
        font-size: .426rem;
        color: #999999;

        i {
            color: #4595d0;
        }
    }
</style>
