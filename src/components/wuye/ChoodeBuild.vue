<template>
    <div class="container">
        <div class="head">请选择物业账号</div>
        <div class="content">
            <div class="first" v-for="(item , index) in message" :key="index" @click="build1(item,index)">
                <div class="img"><img src="../../assets/images/tu3.png" alt=""></div>
                <div class="name">{{item.buildingName}}</div>
                <div class="img1"><img src="../../assets/images/tu6.png" alt="" v-if="build==index?true:false"></div>
            </div>

        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        name: "ChoodeBuild",
        data() {
            return {
                build: this.$store.state.choosedbuild,//初始化选中的大厦
                message: []
            }
        },
        created() {
            this.message = this.$store.state.bindwuye;
            // console.log(this.$store.state.choosedbuild,11112333234213412)
        }, methods: {
            build1(item,i) {
                // console.log(item);
                this.$store.state.message=item;
                this.build = i;
                localStorage.setItem('buildingName',item.buildingName);
                localStorage.setItem('buildingId',item.buildingId);
                localStorage.setItem('buildingLogo',item.buildingLogo);
                localStorage.setItem('buildingWelcome',item.buildingWelcome);
                localStorage.setItem('WbuildingId',item.buildingId);
                localStorage.setItem('mobilePhoneNo',item.mobilePhoneNo);
                localStorage.setItem('WmobilePhoneNo',item.mobilePhoneNo);
                const data = {
                    "buildingId": item.buildingId,
                    "mobilePhoneNo": item.mobilePhoneNo,
                    "openId": localStorage.getItem('openId')
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json'},
                    data: data,
                    url: 'user/login'
                };
                this.axios(options).then((response) => {
                    // console.log(response.data);
                    if (response.data.state === "1") {
                        localStorage.setItem('choosebuild', JSON.stringify(response.data.data));//点击选择 存储选择公司
                        localStorage.setItem("WToken", response.data.data.token);
                        localStorage.setItem("WmobilePhoneNo", this.msg2);
                        setTimeout(() => {
                            Toast({
                                message: '登陆成功',
                                duration: 500
                            });
                            this.$router.push({path: '/wuye/property'})
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