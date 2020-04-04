<template>
    <div class="" style="height: 100%">
        <!-- 顶部 -->
        <CommonHeader></CommonHeader>
        <!-- 列表 -->
        <div class="list" v-if="msg.menuList">
            <!--&lt;!&ndash;<router-link :to="{path:'/map'}">11111</router-link>&ndash;&gt;-->
            <!--<mt-cell class="title" title="请设置并管理您的：" style="font-size: .638rem"></mt-cell>-->
            <!--<router-link class="rt" :to='{path:item.menuUrl}' v-for="(item,index) in msg.menuList" :key="index">-->
                <!--<mt-cell :title="item.menuName" is-link class="ml15" style="font-size: .638rem">-->
                    <!--<mt-badge size="small" type="error" v-show="item.menuNum==0?false:true" v-if="index==0">{{item.menuNum}}</mt-badge>-->
                <!--</mt-cell>-->
            <!--</router-link>-->
            <mt-cell class="title" title="请设置并管理您的：" style="font-size: .638rem;border-bottom: 1px solid #f1f1f1;"></mt-cell>
            <router-link  :to='{path:item.menuUrl}' v-for="(item,index) in msg.menuList" :key="index">
                <div style="line-height: 2rem;font-size: .638rem;
                display: flex;justify-content: space-between;
                border-bottom: 1px solid #f1f1f1;align-items: center;padding:0 .638rem ;color: #333">
                    <div>{{item.menuName}}</div>
                    <mt-badge size="small" type="error" v-show="item.menuNum==0?false:true" v-if="index==0" style="line-height: .5rem;position: relative;left: 5rem">{{item.menuNum}}</mt-badge>
                    <img src="../../assets/images/right.png" height=".5rem" width="5px"/>
                </div>
            </router-link>
        </div>
        <!-- 提交 -->
        <div class="ooo">
            <p class="foot">本页面技术支持由易渡提供<br>如有疑问 请致电<a :src="'tel:' + 15397031258">15397031258</a>
            </p>
        </div>
        <!-- 提交结束 -->
    </div>
</template>

<script type="text/javascript">
    import qs from 'qs';
    import CommonHeader from "./CommonHeader";
    import {Toast} from 'mint-ui';
    import {Indicator} from 'mint-ui';
    import {MessageBox} from 'mint-ui';

    export default {
        name: 'Property',
        data() {
            return {
                mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
                buildingId: localStorage.getItem('WbuildingId'),
                msg: {},
                src: '',
            }
        },
        created() {
            Indicator.open('加载中...');
            this.getNewsInfo();
        },
        components: {CommonHeader},
        methods: {
            //退出登录
            closed() {
                MessageBox.confirm(
                    "您确定要退出吗"
                ).then(() => {
                    this.axios.post('/user/logout', {
                        "buildingId": this.buildingId,
                        "mobilePhoneNo": this.mobilePhoneNo
                    }).then((res) => {
                        if (res.data.state == 1) {
                            this.$router.push({path: '/login'});
                            localStorage.clear();
                            Toast({
                                message: '退出成功',
                                duration: 1000
                            })
                        } else {
                            Toast({
                                message: res.data.retMsg,
                                duration: 1500
                            })
                        }
                    }).catch((error) => {
                        Toast({
                            message: error,
                            duration: 1500
                        })
                    })
                })

            },
            //初始化
            getNewsInfo() {
                console.log();
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                    data: qs.parse(data),
                    url: 'visit/building/index'
                };
                this.axios(options).then((response) => {
                    // console.log(response.data,1111);
                    if (response.data.state == 1) {
                        this.msg = response.data.data;
                        console.log(this.msg);
                        this.$store.state.childMenuInfos=response.data.data.menuList[2].childMenuInfos
                    }
                    Indicator.close();
                }).catch(function (error) {
                    Toast({
                        message: error,
                        duration: 1500
                    })
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .num {
        width: 0.7rem;
        height: .7rem;
        background-color: #ec4040;
        border-radius: 50%;
        color: cornsilk;
        text-align: center;
        margin-right: 0.2rem;
        font-size: .477rem;
    }

    .gogogo {
        color: #333333;
    }

    .rt {
        display: block;
        text-decoration: none;
        color: inherit;
    }

    .myHeader {
        background: #f8f8f8;
    }

    h2 {
        text-align: center;
        font-size: .723rem;
        font-weight: normal;
        color: #333333;
    }

    .myTitle {
        padding-bottom: .638rem;
    }

    .imgBox {
        width: 1.7rem;
        height: 1.7rem;
        margin: .426rem auto .426rem;
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
        font-size: .681rem;
    }

    .geduan {
        height: .638rem;
        width: 100%;
        background-color: #f1f1f1;
    }

    .list {
        /*border-bottom: #dddddd solid 1px;*/
        color: #333333;
        font-size: 0.638rem;
        font-weight: 300;
    }

    .list .title {
        font-size: .638rem;
        text-align: center;
        background-origin: border-box;
    }

    .foot {
        padding: .638rem .851rem .426rem;
        font-size: .426rem;
    }

    .myButtom {
        border: 0;
        background-color: #1a96d4;
        border-radius: .213rem;
        width: 100%;
        height: 1.872rem;
        color: #fff;
        font-size: .765rem;

    }

    .mint-cell-text {
        font-size: 15px;
        color: red;
        background: black;
    }

    .ml15 {
        height: 2.043rem;
        /*border-bottom: 1px solid black;*/
    }

    .foot {
        margin-top: 1.8rem;
        text-align: center;
        font-size: .510rem;
        color: #999999;

        a {
            color: #4595d0;
        }
    }

</style>
