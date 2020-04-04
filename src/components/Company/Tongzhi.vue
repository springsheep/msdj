<template>
    <div>
        <div class="head">
            <div :class="{'xuanzhong':xuanzhong}" @click="zuijin">近期通知</div>
            <div :class="{'xuanzhong':xuanzhong1}" @click="lishi">历史通知</div>
        </div>
        <div class="geduan" style="height:.426rem;background-color: #f1f1f1 "></div>
        <div class="content" v-show="showzuijin">
            <ul style="">
                <li style="line-height: 2.553rem;width: 100%" v-for="(item,index) in JQTZ" @click="EnterInfo(item)">
                    <div style="width: 1.702rem;line-height: 1.702rem;background-color: #1a96d4;border-radius: 50%;color: #FFFFFF;font-size: .638rem;text-align: center">
                        {{kind[item.noticeType]}}
                    </div>
                    <div class="middle" style="width: 9.149rem;line-height: 1.402rem;padding-top: .566rem">
                        <div><span v-if="item.isViewed==0" style="display: inline-block;width: 5px;height: 5px;background: red;border-radius: 50%;margin-right:.238rem;margin-bottom: .15rem"></span>
                            {{item.noticeTitle}}
                        </div>
                        <span>发布人：{{item.publisher}}</span><span
                            style="width: .851rem;display: inline-block"></span>
                    </div>
                    <div class="right">{{item.publishTime}}</div>
                </li>
                <div style="font-size: .638rem;line-height: 1.2rem;text-align: center;margin-top: .638rem"
                     @click="addmore" ref="more">点击加载更多...
                </div>
            </ul>
        </div>
        <Litongzhi v-show="showlishi"></Litongzhi>
    </div>
</template>

<script>
    import Litongzhi from "./Litongzhi";
    import {Toast} from 'mint-ui';

    export default {
        name: "Tongzhi",
        components: {Litongzhi},
        data() {
            return {
                xuanzhong: true,//控制近期通知变化
                xuanzhong1: false,
                showzuijin: true,
                showlishi: false,
                JQTZ: [],
                i: 0,
                kind: ['停水', '停电', '断网', '电梯', '装修', '消防', '防鼠', '办卡', '缴费', '招领', '启事', '福利', '简报', '提示', '其他'],//通知类
            }
        }, methods: {
            //点击查看最近
            zuijin() {
                this.xuanzhong = true;
                this.xuanzhong1 = false;
                this.showzuijin = true;
                this.showlishi = false
            },
            //点击查看历史
            lishi() {
                this.xuanzhong1 = true;
                this.xuanzhong = false;
                this.showzuijin = false;
                this.showlishi = true;
            },
            //进入查看具体通知
            EnterInfo(i) {
                this.$store.state.CseeTZ = i;
                this.$router.push({
                    name:'seeTZ',
                    params: {
                        buildingId: localStorage.getItem('CbuildingId'),
                        companyId: localStorage.getItem('companyId'),
                        phoneNo: localStorage.getItem('CmobilePhoneNo'),
                        token: localStorage.getItem('CToken')
                    }
                })
            },
            //初始化加载
            getTZ(i) {
                this.axios.post('visit/company/getNoticeList', {
                    "buildingId": localStorage.getItem('CbuildingId'),
                    "mobilePhoneNo": localStorage.getItem('CmobilePhoneNo'),
                    "companyId": localStorage.getItem('companyId'),
                    "queryStartDate": '',
                    "queryEndDate": '',
                    "pageNo": i,
                    "pageSize": 7,
                    "noticeFlag": '0'
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.state == 1) {
                        for (let i in res.data.data.weekNoticeList) {
                            this.JQTZ.push(res.data.data.weekNoticeList[i])
                        }
                        if (res.data.data.weekNoticeList.length < 5) {
                            this.$refs.more.innerHTML = '暂无更多';
                        }
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            //加载更多
            addmore() {
                this.i++;
                this.getTZ(this.i)
            }

        },
        created() {
            this.getTZ(this.i);
        }
    }

</script>

<style scoped lang="scss">
    .head {
        line-height: 2.23rem;
        display: flex;
        justify-content: space-around;
        font-size: .638rem;

        div {
            line-height: 2.23rem;
            width: 5rem;
            text-align: center;

        }
    }

    .content {
        ul {
            li {
                display: flex;
                justify-content: space-around;
                align-items: center;

                .middle {
                    display: inline-block;
                    line-height: 2.253rem;

                    div {
                        line-height: .866rem;
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

    .foot {
        position: fixed;
        bottom: .426rem;
        text-align: center;

        div {
            border-radius: .213rem;
            margin: 0 auto;
        }
    }

    .xuanzhong {
        border-bottom: 4px solid #1a96d4;
        color: #1a96d4;
    }
</style>
