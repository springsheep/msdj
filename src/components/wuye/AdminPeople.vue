<template>
    <div class="">
        <ul>
            <li>
                <h4>姓名：</h4>
                <input type="text" id="name" placeholder="请输入姓名">
            </li>
            <li>
                <h4>头像：</h4>
                <div class="people">
                    <img src="../../assets/images/123.png" alt="">
                </div>
            </li>
            <li>
                <h4>手机：</h4>
                <input type="text" id="phone" maxlength="11" placeholder="请输入手机号" v-model="msg">
            </li>
            <li>
                <h4>角色：</h4>
                <div id="ss" style="width:30%;font-size: .638rem" @click="change">{{juese}}
                    <img src="../../assets/images/xiala.png" alt="" style="width: .5rem">
                </div>
                <mt-actionsheet
                        :actions="actions"
                        v-model="sheetVisible">
                </mt-actionsheet>
            </li>
            <li>
                <h4>是否接收通知：</h4>
                <mt-switch v-model="value" style="margin-left: 6.6rem"></mt-switch>
            </li>
        </ul>
        <div class="foot">
            <button @click="submit">保存</button>
        </div>

    </div>
</template>

<script type="text/javascript">
    import qs from 'qs';
    import Warning from "./warning";
    import {MessageBox} from 'mint-ui';
    import {Toast} from 'mint-ui';

    export default {
        components: {Warning},
        name: 'AdminPeople',
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
            }
        },
        methods: {
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
                var userRole = '';
                var isReceiveMsg = '';
                var name = document.getElementById('name');
                var userName = name.value;
                var mobilePhoneNo =this.msg;
                if (userName.length == 0) {
                    MessageBox('提示', '请输入姓名');
                    return false;
                } else {
                    this.a = 1;
                }
                var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!reg.test(mobilePhoneNo) && mobilePhoneNo.length != 0) {
                    MessageBox('提示', '请选择正确的手机号');
                    return false;
                } else if (mobilePhoneNo.length == 0) {
                    MessageBox('提示', '请输入手机号');
                    return false;
                } else {
                    this.b = 1
                }
                //判断是否是什么管理员
                if (this.juese == '系统管理员') {
                    userRole = "100000"
                }
                if (this.juese == '普通管理员') {
                    userRole = "100001"
                }
                //判断是否接受消息提示
                if (this.value == true) {
                    isReceiveMsg = "0"
                }
                if (this.value == false) {
                    isReceiveMsg = "1"
                }
                //只有部位空的时候才会发起请求
                if (this.a == 1 && this.b == 1) {
                    const data = {
                        "buildingId": this.buildingId,
                        "mobilePhoneNo": this.mobilePhoneNo,
                        "userName": userName,
                        "userRole": userRole,
                        "phoneNo": this.msg,
                        'isReceiveMsg': isReceiveMsg
                    };
                    const options = {
                        method: 'POST',
                        headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                        data: qs.parse(data),
                        url: '/visit/building/saveUser'
                    };
                    this.axios(options).then((response) => {
                        if (response.data.state == '1') {
                            this.$router.go(-1);
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
    }
</script>

<style lang="scss" scoped>
    ul {
        margin-top: 0px;
        border-top: #ddd solid 1px;

        li {
            height: 2.085rem;
            line-height: 2.085rem;
            padding-left: 0.638rem;
            border-bottom: #ddd solid 1px;
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
        /*margin:1.277rem 15px 0.38rem 0;*/
        height: 1.872rem;
        margin-top: 1.277rem;
        display: flex;
        justify-content: center;

        button {
            height: 1.874rem;
            display: inline-block;
            width: 14.687rem;
            // background-color: #1a96d4;
            border: none;
            border-radius: 5px;
            color: #fff;
            background: #1a96d4;
            font-size: 0.767rem;
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
