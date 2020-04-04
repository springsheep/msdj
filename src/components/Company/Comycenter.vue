<template>
    <div class="">
        <ul>
            <li>
                <h4>姓名：</h4>
                <input type="text" id="name" placeholder="请输入姓名" value="易小渡">
            </li>
            <li>
                <h4>头像：</h4>
                <div class="people">
                    <img src="../../assets/images/123.png" alt="">
                </div>
            </li>
            <li>
                <h4>手机：</h4>
                <input type="text" id="phone" maxlength="11" placeholder="请输入手机号" value="15397031258">
            </li>
            <li>
                <h4>接收通知：</h4>
                <mt-switch v-model="value" style="margin-left: 7.6rem"></mt-switch>
            </li>
        </ul>
        <div class="foot">
            <div>保存</div>
            <div @click="change1">切换账号</div>
            <div @click="closed"> 退出账号</div>
        </div>

    </div>
</template>

<script type="text/javascript">
    import qs from 'qs';
    import Warning from "../wuye/warning";
    import {MessageBox} from 'mint-ui';
    import {Toast} from 'mint-ui';

    export default {
        name: 'Comycenter',
        data() {
            return {
                companyId: localStorage.getItem('companyId'),
                mobilePhoneNo: localStorage.getItem('CmobilePhoneNo'),
                buildingId: localStorage.getItem('CbuildingId'),
                token:localStorage.getItem('CToken'),
                ifshow: false,
                msg: "",
                value: false,//判断是否接受信息提醒
                a: 0, b: 0,
            }
        },
        methods: {
            //退出登录
            closed() {
                MessageBox.confirm(
                    "您确定要退出吗"
                ).then(() => {
                    this.axios.post('/user/company/logout', {
                        "buildingId": this.buildingId,
                        "mobilePhoneNo": this.mobilePhoneNo,
                        "companyId": this.companyId
                    }).then((res) => {
                        console.log(res.data);
                        if (res.data.state == 1) {
                            this.$router.push({path: '/CoLogin'});
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
                            duration: 500
                        })
                    })
                })
            },
            //切换账号
            change1() {

                this.axios.post('visit/company/getAccountList', {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                    "companyId": this.companyId
                }).then((res) => {
                    console.log(res.data,5555);
                    if (res.data.state == 1) {
                        this.$store.state.bindcompany=res.data.data
                    } else {
                        Toast({
                            message: res.data.retMsg,
                            duration: 1500
                        })
                    }
                }).catch((error) => {
                    Toast({
                        message: error,
                        duration: 500
                    })
                });
                for (let i in this.$store.state.bindcompany) {
                    if (this.companyId == this.$store.state.bindcompany[i].companyId) {
                        this.$store.commit('chooseCom', i)
                    }
                }
                this.$router.push({path: '/Cochoose'});

            },
            //保存
            // submit: function () {
            //     var userRole = '';
            //     var isReceiveMsg = '';
            //     var name = document.getElementById('name')
            //     var userName = name.value
            //     var mobilePhoneNo = this.$store.state.mobilePhoneNo
            //     // console.log(userName.length)
            //     if (userName.length == 0) {
            //         MessageBox('提示', '请输入姓名');
            //         return false;
            //     } else {
            //         this.a = 1;
            //     }
            //     var reg = /^[1][3,4,5,7,8][0-9]{9}$/
            //     if (!reg.test(mobilePhoneNo) && mobilePhoneNo.length != 0) {
            //         MessageBox('提示', '请选择正确的手机号');
            //         return false;
            //     } else if (mobilePhoneNo.length == 0) {
            //         MessageBox('提示', '请输入手机号');
            //         return false;
            //     } else {
            //         this.b = 1
            //     }
            //     //判断是否是什么管理员
            //     if (this.juese == '系统管理员') {
            //         userRole = "100000"
            //     }
            //     if (this.juese == '普通管理员') {
            //         userRole = "100001"
            //     }
            //     //判断是否接受消息提示
            //     if (this.value == true) {
            //         isReceiveMsg = "0"
            //     }
            //     if (this.value == false) {
            //         isReceiveMsg = "1"
            //     }
            //     //只有部位空的时候才会发起请求
            //     if (a == 1 && b == 1) {
            //         const data = {
            //             "buildingId": this.$store.state.buildingId,
            //             "mobilePhoneNo": this.$store.state.mobilePhoneNo,
            //             "userName": userName,
            //             "userRole": userRole,
            //             "phoneNo": this.msg,
            //             'isReceiveMsg': isReceiveMsg
            //         };
            //         const options = {
            //             method: 'POST',
            //             headers: {'content-type': 'application/json', 'token': this.$store.state.success},
            //             data: qs.parse(data),
            //             url: '/visit/building/saveUser'
            //         };
            //         this.axios(options).then((response) => {
            //             if (response.data.state == '1') {
            //                 this.$router.go(-1);
            //                 Toast({
            //                     message: '保存成功',
            //                     duration: 1500
            //                 });
            //             } else {
            //                 Toast(response.data.retMsg);
            //             }
            //         }).catch(function (error) {
            //             Toast(error);
            //         });
            //     }
            // }
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
