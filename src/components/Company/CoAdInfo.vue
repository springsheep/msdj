<template>
    <div class="">
        <ul>
            <li>
                <h4>姓名：</h4>
                <input type="text" id="name" :placeholder="ComangerInfo.userName" :value="ComangerInfo.userName">
            </li>
            <li>
                <h4>头像：</h4>
                <div class="people">
                    <img src="../../assets/images/123.png" alt="">
                </div>
            </li>
            <li>
                <h4>手机：</h4>
                <input type="text" id="phone" maxlength="11" :placeholder="ComangerInfo.mobilePhoneNo" v-model="msg">
            </li>
            <!--<li>-->
            <!--<h4>类别：</h4>-->
            <!--<span>-->
            <!--<span-->
            <!--style="display: inline-block;line-height: 1.5rem;padding: 0 .638rem;font-size: .638rem;border-radius: 5px;border: .1px solid rgba(0,0,0,0.1); margin-top: .3rem"-->
            <!--@click="choosexitong" :class="{xuanzhong:xuanzhong}">系统管理员</span>-->
            <!--<span-->
            <!--style="display: inline-block;line-height: 1.5rem;padding: 0 .638rem;font-size: .638rem;border-radius: 5px;border: .1px solid rgba(0,0,0,0.1);margin-left: .638rem"-->
            <!--@click="chooseputong" :class="{xuanzhong:!xuanzhong}">普通管理员</span>-->
            <!--</span>-->
            <!--</li>-->
            <!--<li style="">-->
            <!--<h4 style="">权限：</h4>-->
            <!--<div style="display: flex;flex-wrap: wrap;flex-direction: column" v-if="xuanzhong">-->
            <!--<el-checkbox v-model="checked1" style="line-height: 2rem;font-size: .638rem">管理员增加/删除</el-checkbox>-->
            <!--<el-checkbox v-model="checked2" style="line-height: 2rem;font-size: .638rem">管理员信息修改</el-checkbox>-->
            <!--<el-checkbox v-model="checked3" style="line-height: 2rem;font-size: .638rem">来访申请审核</el-checkbox>-->
            <!--<el-checkbox v-model="checked4" style="line-height: 2rem;font-size: .638rem">外部采购申请</el-checkbox>-->
            <!--<el-checkbox v-model="checked5" style="line-height: 2rem;font-size: .638rem">外部采购审核</el-checkbox>-->
            <!--</div>-->
            <!--<div style="display: flex;flex-wrap: wrap;flex-direction: column" v-if="!xuanzhong">-->
            <!--<el-checkbox v-model="checked3" style="line-height: 2rem;font-size: .638rem">来访申请审核</el-checkbox>-->
            <!--<el-checkbox v-model="checked4" style="line-height: 2rem;font-size: .638rem">外部采购申请</el-checkbox>-->
            <!--</div>-->

            <!--</li>-->
            <li style="display: flex">
                <h4>角色：</h4>
                <div id="ss" style="width:30%;font-size: .638rem" @click="change">{{juese}}
                    <img src="../../assets/images/xiala.png" alt="" style="width: .5rem">
                </div>
                <mt-actionsheet
                        :actions="actions"
                        v-model="sheetVisible">
                </mt-actionsheet>
                <!--<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>-->
            </li>
            <li>
                <h4>是否接收通知：</h4>
                <mt-switch v-model="value"
                           style="width: 2.5rem;position: relative;left: 6.8rem"></mt-switch>
            </li>
        </ul>
        <div class="foot">
            <button @click="submit">保存</button>
        </div>

    </div>
</template>

<script type="text/javascript">
    import qs from 'qs';
    import {MessageBox} from 'mint-ui';
    import {Toast} from 'mint-ui';

    export default {

        name: 'CoAdInfo',
        data() {
            return {
                companyId: localStorage.getItem('companyId'),
                mobilePhoneNo: localStorage.getItem('CmobilePhoneNo'),
                buildingId: localStorage.getItem('CbuildingId'),
                token:localStorage.getItem('CToken'),
                msg: "",
                checked1: false, checked2: false, checked3: false, checked4: false, checked5: false,
                xuanzhong: true,
                ComangerInfo: {},
                value: '',//判断是否接收
                slots: [
                    {
                        values: ['系统管理员', '普通管理员'],
                    }
                ],
                sheetVisible: false,
                actions: [{name: "系统管理员", method: this.xitong}, {name: "普通管理员", method: this.putong}],
                juese: '',

            }
        },
        created() {
            console.log(this.$store.state.CoManger);
            this.ComangerInfo = this.$store.state.CoManger;
            this.msg=this.$store.state.CoManger.mobilePhoneNo;
            this.value = this.$store.state.CoManger.isReceiveMsg == '0' ? true : false;
            this.juese = this.$store.state.CoManger.userRole == '100000' ? '系统管理员' : '普通管理员'
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
            choosexitong() {
                this.xuanzhong = true;
            },
            chooseputong() {
                this.xuanzhong = false;
            },
            //保存
            submit: function () {
                var userRole;
                var isReceiveMsg='';
                var name = document.getElementById('name');
                var userName = name.value;
                var phone = document.getElementById('phone');
                var mobilePhoneNo = phone.value;
                // var reg = /^[1][3,4,5,7,8][0-9]{9}$/
                // if (!reg.test(mobilePhoneNo)) {
                //     this.$toast("手机号码有误，请重填!");
                //     return false;
                // }
                if (this.juese == '系统管理员') {
                    userRole = "100000"
                }
                if (this.juese== '普通管理员') {
                    userRole = "100001"
                }
                if (this.value == true) {
                    isReceiveMsg = "0"
                }
                if (this.value == false) {
                    isReceiveMsg = "1"
                }

                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                    "phoneNo": this.msg,
                    "userName": userName,
                    "userRole": userRole,
                    "userId": this.$store.state.CoManger.userId,
                    'isReceiveMsg':isReceiveMsg,
                    "companyId":this.companyId
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json','token': this.token},
                    data: data,
                    url: '/visit/company/saveUser'
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
</script>

<style lang="scss" scoped>
    .xuanzhong {
        background-color: #1a96d4;
        color: #f1f1f1;
    }

    ul {
        margin-top: 0px;
        border-top: #ddd solid 1px;

        li {
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
