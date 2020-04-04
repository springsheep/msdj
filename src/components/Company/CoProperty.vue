<template>
    <div class="" style="height: 100%">
        <!-- 顶部 -->
        <Cocomheader></Cocomheader>
        <!-- 列表 -->
        <div class="list" v-if="">
            <router-link class="rt" :to="{path: '/Coshenhe'}">
                <mt-cell :title="'拜访申请'" is-link class="ml15 gogogo" style="font-size: .638rem">
                    <!--<div class="num" v-show="num==0?false:true" style="line-height: .7rem">{{num}}</div>-->
                    <mt-badge size="small" type="error" v-show="num==0?false:true"> {{num}}</mt-badge>
                </mt-cell>
            </router-link>
            <router-link class="rt" :to="{path: '/Tongzhi'}">
                <mt-cell :title="'物业通知'" is-link class="ml15 gogogo" style="font-size: .638rem">

                    <!--<div class="num" v-show="num==0?false:true" style="line-height: .7rem">{{num}}</div>-->
                </mt-cell>
            </router-link>
            <router-link class="rt" :to="{path: '/CoAdAm'}">
                <mt-cell :title="'管理员设置'" is-link class="ml15 gogogo" style="font-size: .638rem">
                </mt-cell>
            </router-link>
            <router-link class="rt" :to="{path:'/CoPublic'}">
                <mt-cell :title="'公众服务采购'" is-link class="ml15 gogogo" style="font-size: .638rem">
                </mt-cell>
            </router-link>
            <router-link class="rt" :to="{path:'/CoSearch'}">
                <mt-cell :title="'查询统计'" is-link class="ml15 gogogo" style="font-size: .638rem">
                </mt-cell>
            </router-link>
            <router-link class="rt" :to="{path:'/CoBaoXiu'}">
                <mt-cell :title="'报修/投诉'" is-link class="ml15 gogogo" style="font-size: .638rem">
                </mt-cell>
            </router-link>
            <router-link class="rt" :to="{path: '/Comycenter'}">
                <mt-cell :title="'个人中心'" is-link class="ml15 gogogo" style="font-size: .638rem">
                </mt-cell>
            </router-link>
            <router-link class="rt" :to="{path:'/CoAbout'}">
                <mt-cell :title="'关于我们'" is-link class="ml15 gogogo" style="font-size: .638rem">
                </mt-cell>
            </router-link>

            <!--后期渲染效果-->
            <!--<router-link class="rt" :to='{path:item.menuUrl}' v-for="(item,index) in msg.menuList" :key="index">-->
            <!--<mt-cell :title="item.menuName" is-link class="ml15" style="font-size: .638rem"></mt-cell>-->
            <!--</router-link>-->
        </div>
        <!-- 列表结束 -->

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
    import {Toast} from 'mint-ui';
    import Cocomheader from "./Cocomheader";

    export default {
        name: 'CoProperty',
        data() {
            return {
                companyId: localStorage.getItem('companyId'),
                mobilePhoneNo: localStorage.getItem('CmobilePhoneNo'),
                buildingId: localStorage.getItem('CbuildingId'),
                token:localStorage.getItem('CToken'),
                msg: {},
                src: '',
                num: 0
            }
        },
        created() {
            // this.getNewsInfo();
            this.getData()

        },
        components: {Cocomheader},
        methods: {

            //查看请求人数的数量
            getData() {
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                    'companyId': this.companyId
                };
                const options = {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'token': localStorage.getItem('CToken')
                    },
                    data: data,
                    url: 'visit/company/getVisitorReviewList'
                };
                this.axios(options).then((response) => {
                    if (response.data.state == 1) {
                        this.list = response.data.data;
                        if (this.list.visitorReviewList != null) {
                            this.num = response.data.data.visitorReviewList.length
                        }
                    } else {
                        Toast({
                            message: response.data.retMsg,
                            duration: 1500
                        })
                    }
                }).catch((error) => {
                    console.log(error)
                })
            },
            //初始化
            // getNewsInfo() {
            //     console.log(this.buildingId,this.mobilePhoneNo ,124)
            //     const data = {
            //         "buildingId": this.buildingId,
            //         "mobilePhoneNo": this.mobilePhoneNo
            //     };
            //     const options = {
            //         method: 'POST',
            //         headers: {
            //             'content-type': 'application/json',
            //             'token': localStorage.getItem('CToken')
            //         },
            //         data: qs.parse(data),
            //         url: 'visit/company/index'
            //     };
            //     this.axios(options).then((response) => {
            //         console.log(response.data,111)
            //         if(response.data.state==1){
            //             this.msg = response.data.data;
            //         }
            //
            //     }).catch(function (error) {
            //         console.log(error);
            //     });
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .closed {
        width: 4.255rem;
        line-height: 1.277rem;
        background-color: #ffffff;
        border-radius: .17rem;
        border: solid .5px #999999;
        font-size: .638rem;
        color: #999999;
        text-align: center;
        margin: 1.1rem auto 0;
    }

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
        padding: .638rem .851rem .3rem;
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
        text-align: center;
        font-size: .510rem;
        color: #999999;

        a {
            color: #4595d0;
        }
    }

    .ooo {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

</style>
