<template>
    <div class="container">
        <div class="head">请选择公司账号</div>
        <div class="content" v-for="(item,index) in bindcompany" :key="index">
            <div class="first" @click="choose1(index,item)">
                <div class="img">
                    <!--<img :src="item.companyLogo==null?'../../../static/image/tu3.png':item.companyLogo"-->
                    <!--alt="">-->
                    <img :src="item.companyLogo" alt="" srcset=""
                         v-if="item.companyLogo != 'null'&&item.companyLogo != null && item.companyLogo != ''">
                    <img src="../../assets/images/tu3.png" alt="" srcset=""
                         v-if="item.companyLogo == 'null'||item.companyLogo == null || item.companyLogo == ''"
                    >
                </div>
                <div class="name">{{item.companyName}}</div>
                <div class="img1"><img src="../../assets/images/tu6.png" alt="" v-if="build==index?true:false"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';

    export default {
        name: "Cochoose",
        data() {
            return {
                build: 0,
                bindcompany: []//绑定过的公司
            }
        },
        methods: {
            choose1(i, item) {
                this.build = i;
                const data = {
                    "buildingId": item.buildingId,
                    "mobilePhoneNo": item.mobilePhoneNo,
                    "companyId": item.companyId,
                    "openId": localStorage.getItem('CopenId')
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    data: data,
                    url: 'user/company/login'
                };
                this.axios(options).then((response) => {
                    if (response.data.state === "1") {
                        console.log(response.data.data);
                        localStorage.setItem('choosecompany', JSON.stringify(response.data.data));//点击选择 存储选择公司
                        localStorage.setItem("CToken", response.data.data.token);
                        localStorage.setItem("CmobilePhoneNo", response.data.data.mobilePhoneNo);
                        localStorage.setItem("companyId", response.data.data.companyId);
                        localStorage.setItem("CbuildingId", response.data.data.buildingId);
                        localStorage.setItem('companyName',  response.data.data.companyName);
                        localStorage.setItem('companyLogo',  response.data.data.companyLogo);
                        setTimeout(() => {
                            this.$router.push({path: '/CoProperty'});
                            Toast({
                                message: '登陆成功',
                                duration: 500
                            });
                        }, 1000)
                    } else if (this.state1 === "0") {
                        Toast({
                            message: response.data.retMsg,
                            duration: 500
                        });
                    }
                }).catch(function (error) {
                    Toast({
                        message: error,
                        duration: 500
                    });
                });
            }
        }, created() {
            this.bindcompany = this.$store.state.bindcompany;
            this.build=this.$store.state.choosedcompany;
            console.log(this.$store.state.choosedcompany)
        }
    }
</script>

<style scoped lang="scss">
    .container {
        width: 100%;

        .head {
            width: 100%;
            line-height: 3.126rem;
            font-size: .638rem;
            text-align: center;
            color: #333333;
            text-align: center;
            border-bottom: .5px solid #f1f1f1;
        }

        .content {
            width: 100%;

            .first {
                border-bottom: .5px solid #f1f1f1;
                font-size: .638rem;
                line-height: 2.128rem;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 .638rem;

                .img {
                    height: 1.277rem;
                    width: 1.064rem;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .img1 {
                    height: .489rem;
                    width: .638rem;
                    flex: 1;

                    img {
                        height: .489rem;
                        width: .638rem;
                        position: relative;
                        left: .628rem;
                        bottom: .638rem;
                    }
                }

                .name {
                    padding-left: .638rem;
                    width: 75%;
                }

            }
        }
    }
</style>