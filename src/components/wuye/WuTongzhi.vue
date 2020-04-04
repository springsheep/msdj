<template>
    <div style="height: 100%;">
        <div style="height: 10%">
            <div class="head">
                <div :class="{'xuanzhong':xuanzhong}" @click="zuijin">近期通知</div>
                <div :class="{'xuanzhong':xuanzhong1}" @click="lishi">历史通知</div>
            </div>
            <div class="geduan" style="height:.426rem;background-color: #f1f1f1 "></div>

        </div>

        <div class="content" v-show="showzuijin" style="height: 80%;overflow: scroll">
            <ul style="padding: 0 .638rem">
                <li style="line-height: 2.553rem;width: 100%" v-for="(item,index) in JQTZ" @click="EnterInfo(item)">
                    <div style="width: 1.702rem;line-height: 1.702rem;background-color: #1a96d4;border-radius: 50%;color: #FFFFFF;font-size: .638rem;text-align: center">
                        {{kind[item.noticeType]}}
                    </div>
                    <div class="middle" style="padding-left:.438rem;width: 9.8rem;line-height: 1.402rem;padding-top: .566rem">
                        <div style="padding-left: .208rem   ">{{item.noticeTitle}}</div>
                        <span>发布人：{{item.publisher}}</span><span
                            style="width: .251rem;display: inline-block"></span>
                        <span>未阅读<i style="color: green"> {{item.noticeNotViewCount}}</i></span>
                        <span style="border-left: 1px solid #999999;margin-left: .2rem"></span>
                        <span>已阅读 <i style="color: red;">{{item.noticeViewedCount}}</i></span>
                    </div>
                    <div class="right">{{item.publishTime}}</div>
                </li>
                <div style="font-size: .638rem;line-height: 1.2rem;text-align: center;margin-top: .638rem"
                     @click="addmore" ref="more">点击加载更多...
                </div>
            </ul>
        </div>
        <WuLitongzhi v-show="showlishi" style="height: 80%"></WuLitongzhi>

        <div class="foot" style="height:10%;width: 100%;background-color: white">
            <div style="width:92%;line-height: 1.872rem;font-size: .766rem;color: white;background-color: #1a96d4"
                 @click="CreateTZ">新建通知
            </div>
        </div>
    </div>
</template>

<script>


    import WuLitongzhi from "./WuLitongzhi";
    import {Toast} from 'mint-ui';
    export default {
        name: "WuTongzhi",
        components: {WuLitongzhi},
        data() {
            return {
                xuanzhong: true,//控制近期通知变化
                xuanzhong1: false,
                showzuijin: true,
                showlishi: false,
                JQTZ: [],
                i: 0,
                kind: ['停水', '停电', '断网', '维修', '装修', '消防', '防虫', '办卡', '缴费', '招领', '寻物', '福利', '简报', '提示', '其他'],//通知类型
            }
        },
        methods: {
            //新建通知
            CreateTZ() {
                this.$router.push({path: '/NewTongzhi'})
            },
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
                this.$store.state.WseeTZ = i;
                this.$router.push({path: '/WuseeTZ'})
            },
            //初始化加载
            getTZ(i) {
                this.axios.post('visit/building/getNoticeList', {
                    "buildingId": localStorage.getItem('WbuildingId'),
                    "mobilePhoneNo": localStorage.getItem('mobilePhoneNo'),
                    "queryStartDate": '',
                    "queryEndDate": '',
                    "pageNo": i,
                    "pageSize": 6,
                    "noticeFlag": '0'
                }).then((res) => {
                    if (res.data.state == 1) {
                        console.log(res.data);
                        if (res.data.data.weekNoticeList != null) {
                            for (let i in res.data.data.weekNoticeList) {
                                this.JQTZ.push(res.data.data.weekNoticeList[i])
                            }
                            if (res.data.data.weekNoticeList.length < 5) {
                                this.$refs.more.innerHTML = '暂无更多';
                            }
                        } else {
                            this.$refs.more.innerHTML = '暂无更多'
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
                        padding-left: .2rem;
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
