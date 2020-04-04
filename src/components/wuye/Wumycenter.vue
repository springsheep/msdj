<template>
    <div class="" style="height: 100%">
        <ul style="height: 35%">
            <li>
                <h4>姓名：</h4>
                <input type="text" id="name" placeholder="请输入姓名" :value="message.userName">
            </li>
            <li>
                <h4>头像：</h4>
                <div class="people">
                    <img src="../../assets/images/123.png" alt="">
                </div>
            </li>
            <li>
                <h4>手机：</h4>
                <input type="text" id="phone" maxlength="11" placeholder="请输入手机号" :value="message.mobilePhoneNo">
            </li>
            <li>
                <h4>接收通知：</h4>
                <mt-switch v-model="value" style="margin-left: 7.6rem"></mt-switch>
            </li>
        </ul>
        <div class="foot">
            <div @click="submit">保存</div>
            <div @click="changeUser">切换账号</div>
            <div @click="closed"> 退出账号</div>
        </div>

    </div>
</template>

<script type="text/javascript">
    import {MessageBox} from 'mint-ui';
    import {Toast} from 'mint-ui';

    export default {
        name: 'Wumycenter',
        data() {
            return {
                buildingId: localStorage.getItem('WbuildingId'),
                mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
                ifshow: false,
                msg: "",
                value: false,//判断是否接受信息提醒
                sheetVisible: false,
                actions: [{name: "系统管理员", method: this.xitong}, {name: "普通管理员", method: this.putong}],
                juese: '普通管理员',
                a: 0, b: 0,
                message: {},//存放个人信息
            }
        },
        created() {
            this.getinfo();//初始化
        },
        methods: {
            //初始化
            getinfo() {
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                    data: data,
                    url: 'visit/building/getUserList'
                };
                this.axios(options).then((response) => {
                    // console.log(response.data.data);
                    if (response.data.state == 1) {
                        for (let i in response.data.data) {
                            if (response.data.data[i].isOneself == 1) {
                                this.message = response.data.data[i];
                                if (response.data.data[i].isReceiveMsg == 0) {
                                    this.value = true
                                } else {
                                    this.value = false
                                }
                            }
                        }
                    }
                }).catch(function (error) {
                    Toast(error)
                });
            },
            //退出登录
            closed() {
                MessageBox.confirm(
                    "您确定要退出吗"
                ).then(() => {
                    this.axios.post('/user/logout', {
                        "buildingId": this.buildingId,
                        "mobilePhoneNo": this.mobilePhoneNo
                    }).then((res) => {
                        // console.log(res.data);
                        if (res.data.state == 1) {
                            Toast({
                                message: '退出成功',
                                duration: 2000
                            });
                            localStorage.clear();
                            this.$router.push({path: '/login'});
                        } else {
                            Toast({
                                message: res.data.retMsg,
                                duration: 2000
                            })
                        }
                    }).catch((error) => {
                        Toast({
                            message: error,
                            duration: 2000
                        })
                    })
                })

            },
            changeUser() {
                this.axios.post('visit/building/getAccountList', {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo
                }).then((res) => {
                    if (res.data.state == 1) {
                        this.$store.state.bindwuye = res.data.data;
                        for (let i in this.$store.state.bindwuye) {
                            if (this.buildingId == this.$store.state.bindwuye[i].buildingId) {
                                this.$store.commit('choosebuild', i)
                            }
                        }
                        this.$router.push({path: '/ChoodeBuild'})
                    } else {
                        Toast({
                            message: res.data.retMsg,
                            duration: 2000
                        })
                    }
                }).catch((error) => {
                    Toast({
                        message: error,
                        duration: 2000
                    })
                });
            },
            xitong() {
                this.juese = '系统管理员';
            },
            putong() {
                this.juese = '普通管理员';
            },
            change() {
                this.sheetVisible = true
            },
            //保存
            submit: function () {
                // console.log(this.message);
                var isReceiveMsg='';
                if (this.value == true) {
                    isReceiveMsg = "0"
                }
                if (this.value == false) {
                    isReceiveMsg = "1"
                }
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                    "phoneNo": this.message.mobilePhoneNo,
                    "userName": this.message.userName,
                    "userRole": this.message.userRole,
                    "userId":  this.message.userId,
                    'isReceiveMsg': isReceiveMsg
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                    data:data,
                    url: '/visit/building/saveUser'
                };
                this.axios(options).then((response) => {
                    if (response.data.state == '1') {
                        Toast({
                            message: '保存成功',
                            duration: 1500
                        });
                    } else {
                        Toast(response.data.retMsg);
                    }
                }).catch(function (error) {
                    Toast(error);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        margin-top: 0px;
        border-top: rgba(0, 0, 0, 0.1) solid 1px;

        li {
            height: 2.085rem;
            line-height: 2.085rem;
            padding-left: 0.638rem;
            border-top: rgba(0, 0, 0, 0.1) solid 1px;
            display: flex;
            align-items: center;

            select {
                width: 5rem;
                border: none;
                background-color: #fff;
                height: 1.277rem;
            }
        }

        .people {
            vertical-align: 1rem;
            width: 1.277rem;
            height: 1.277rem;

            img {
                width: 100%;
                height: 100%;
                position: relative;
                margin-bottom: 2rem;
            }
        }

        h4 {
            display: inline-block;
            color: #333;
            margin-right: 1.489rem;
        }

        input {
            border: none;
        }

    }

    .foot {
        padding-top: .426rem;
        background: rgba(0, 0, 0, 0.05);
        font-size: .638rem;
        text-align: center;
        width: 100%;
        position: absolute;
        top: 8.7rem;
        bottom: 0px;

        div {
            line-height: 2.085rem;
            background: #FFFFFF;
        }

        div:nth-child(1) {
            margin-bottom: .426rem;
        }

        div:nth-child(2) {
            border-bottom: rgba(0, 0, 0, 0.1) solid 1px;
        }
    }

    select, h4, input {
        font-size: 0.638rem;
    }

    option {
        font-size: .4rem;
    }

    input {
        line-height: 1.277rem;
        width: 67%;
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
</style>
