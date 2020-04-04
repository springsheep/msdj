<template>
    <div class="container"style="height: 100%">
        <div style="height: 80.5%">
            <div class="title" style="font-size: .766rem;text-align: center;padding-top: 1.277rem;color: #333333">
                欢迎使用码上登记
            </div>
            <!-- 登录 -->
            <div class="head" style="font-size: .767rem">公司入口</div>
            <div class="useLogin">
                <div class="phone" style="width: 13.1rem">
                    <span>手机号:</span>
                    <input type="number" pattern="[0-9]*" class="people" placeholder="输入手机号"
                           style="font-size: .638rem;width: 6.5rem"
                           v-model="msg2"/>
                </div>
                <div class="pass" style="width: 13.1rem">
                    <span>验证码:</span>
                    <input v-model="msg3" type="text" pattern="[0-9]*" class="password pass1" placeholder="输入验证码"
                           style="width: 4.6rem;font-size: .638rem" maxlength="6"/>
                    <span style="font-size: .638rem;color: #1a96d4;width: 3.5rem;display: inline-block;text-align: right;"
                          @click="include" ref="ppp">发送验证码</span>
                </div>
                <div class="mybutton mybutton1" @click="funen">登录</div>
            </div>
        </div>
        <div class="banner" style="height: 18.5%" v-show="showBtn">
            <div>
                <p class="foot">本页面技术由易渡提供<br>如有疑问 请致电<a :href="'tel:' + 15397031258">15397031258</a></p>
                <swiper></swiper>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import swiper from "../common/swiper";
    import {MessageBox} from 'mint-ui';
    import {Toast} from 'mint-ui';

    export default {
        name: 'CoLogin',
        data() {
            return {
                msg: '',
                src: '',
                isOriginHei: true,
                msg2: "",//手机号
                msg3: '',//验证码
                state: 0,
                state1: 0,
                state3: 0,
                time1: false,
                a: 0, b: 0, c: 0,
                showBtn: true,  // 控制按钮盒子显示隐藏
                clientHeight:document.documentElement.clientHeight,
            }
        },
        components: {
            swiper
        },
        methods: {
            // 获取验证码
            include() {
                var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!reg.test(this.msg2) && this.msg2.length != 0) {
                    MessageBox('提示', '请输入正确的手机号');
                    return false;
                } else if (this.msg2 == "") {
                    MessageBox('提示', '请输入手机号');
                    return false;
                } else if (reg.test(this.msg2)) {
                    const data = {
                        "mobilePhoneNo": this.msg2
                    };
                    const options = {
                        method: 'POST',
                        headers: {'content-type': 'application/json'},
                        data: data,
                        url: 'user/company/getLoginCaptcha'
                    };
                    this.axios(options).then((res) => {
                        this.state = res.data.state;
                        if (this.state === "1") {
                            let time = 59;
                            this.$refs.ppp.style.color = "#999999";
                            this.time1 = setInterval(() => {
                                time--;
                                this.$refs.ppp.innerHTML = time + "s";
                                this.state3 = 0;
                                if (time === 0) {
                                    clearInterval(this.time1);
                                    this.$refs.ppp.style.color = "#1a96d4";
                                    this.$refs.ppp.innerHTML = '重新发送';
                                    this.state3 = 1
                                }
                            }, 1000);
                            Toast({
                                message: '发送成功',
                                duration: 500
                            });
                        } else if (this.state === "0") {
                            Toast({
                                message: res.data.retMsg,
                                duration: 1500
                            })
                        }
                    }).catch(function (error) {
                        Toast({
                            message: error,
                            duration: 1500
                        })
                    });
                }
            },
            //登录
            funen() {
                //   console.log(1111)

                //存入账号密码
                clearInterval(this.time1);
                this.$store.state.phone = this.msg2;

                if (this.msg3.length == 0) {
                }
                var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!reg.test(this.msg2) && this.msg2.length != 0) {
                    MessageBox('提示', '请输入正确的手机号');
                    return false;
                } else if (this.msg2 == "") {
                    MessageBox('提示', '请输入手机号');
                    return false;
                } else {
                    this.a = 1
                }
                if (this.msg3.length == 0) {
                    MessageBox('提示', '请输入验证码');
                    return false;
                } else {
                    this.b = 1
                }
                if (this.a == 1 && this.b == 1) {
                    const data = {
                        "mobilePhoneNo": this.msg2,
                        "captcha": this.msg3,
                    };
                    const options = {
                        method: 'POST',
                        headers: {'content-type': 'application/json'},
                        data: data,
                        url: 'user/company/getLoginAccount'
                    };
                    this.axios(options).then((response) => {
                        this.$store.state.bindcompany=response.data.data;//存储绑定过的公司
                        this.state1 = response.data.state;
                        console.log(response.data,11111222);
                        if (this.state1 === "1") {
                            this.$router.push({path: '/Cochoose'});
                            Toast({
                                message: '登陆成功',
                                duration: 500
                            });
                            this.$store.state.mobilePhoneNo = this.msg2
                        } else if (this.state1 === "0") {
                            Toast({
                                message: response.data.retMsg,
                                duration: 1500
                            })
                        }
                    }).catch(function (error) {
                        Toast({
                            message: error,
                            duration: 1500
                        })
                    });
                }

            },
        },
        mounted() {
            //存入账号密码
            this.msg2 = this.$store.state.phone;
            window.onresize= ()=>{
                if(this.clientHeight>document.documentElement.clientHeight) {
                    this.showBtn =false
                }else{
                    this.showBtn = true
                }

            }
        },
        beforeCreate() {
        }
    }
</script>

<style lang="scss" scoped>
    /*.container{*/
    /*display: flex;*/
    /*flex-direction:column;*/
    /*height: 100%;*/
    /*.banner{*/
    /*flex: 1;*/
    /*display: flex;*/
    /*div{*/
    /*width: 100%;*/
    /*align-self: flex-end;*/
    /*}*/
    /*}*/
    /*}*/
    .head {
        font-size: .851rem;
        color: #000000;
        text-align: center;
        margin-top: 2.5rem;
    }

    .mybutton1 {
        border: #ddd solid 1px;
        border-radius: .235rem;
        margin-top: 1.7rem;
    }

    .phone, .pass {
        border-bottom: 1px solid #dddddd;
    }

    .useLogin {
        margin-top: 1.1rem;
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;

        span {
            font-size: 0.638rem;
        }

        input, .mybutton {
            height: 1.83rem;
            border: 0;
            /*border: #ddd solid 1px;*/
            /*border-radius: .235rem;*/
            width: 12.364rem;
        }

        input {
            width: 9.064rem;
            padding-left: 2.4rem;
            font-size: .638rem;
            margin-top: .8rem;
            margin-bottom: 0.2rem;

        }
    }

    .mybutton {
        width: 13.1rem !important;
        background-color: #1a96d4;
        color: #ffffff;
        font-size: .638rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        outline: none;
        border: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }

    h2 {
        text-align: center;
        font-size: .723rem;
        font-weight: normal
    }

    .myTitle {
        padding-bottom: .638rem;
    }

    .imgBox {
        width: 1.7rem;
        height: 1.7rem;

        margin: .426rem auto;

        img {
            width: 100%;
            height: 100%;
        }

    }

    .mint-header .mint-button {
        color: #2c2c2c;
    }

    .mint-header-title {
        color: #030303;
        font-size: .68rem;
    }

    .geduan {
        height: .426rem;
        width: 100%;
        background-color: #f1f1f1;
    }

    .foot {
        text-align: center;
        font-size: .426rem;

        a {
            color: #4595d0;
        }
    }

    .banner {
        width: 100%;
        z-index: 10;
        color: #999999;
    }
</style>
