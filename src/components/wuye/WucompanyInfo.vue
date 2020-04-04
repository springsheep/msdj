<template>
    <div class="app1">
        <form action="" enctype="multipart/form-data">
            <ul>
                <li>
                    <h4>LOGO</h4>
                    <div><img :src="message.companyLogo" alt="" srcset="" v-if="message.companyLogo !='null'"
                              class="logo"
                              style="margin-top: 1rem;width: 1.277rem;height: 1.277rem;">
                        <img src="../../assets/images/logo.png" alt="" srcset="" v-if="message.companyLogo ==null"
                             style="width: 1.277rem;height: auto;margin-top: 1rem"></div>
                </li>
                <li>
                    <h4>公司名称</h4>
                    <input type="text" :value="message.companyName=='null'?'':message.companyName" readonly="readonly">
                </li>
                <li>
                    <h4>公司简称</h4>
                    <input type="text" :value="message.companyAbbreviateName=='null'?'':message.companyAbbreviateName" readonly="readonly">
                </li>
                <li>
                    <h4>所在楼层</h4>
                    <input type="text" :value="message.storey=='null'?'':message.storey" readonly="readonly">
                </li>
                <li>
                    <h4>详细位置</h4>
                    <input type="text" :value="message.address=='null'?'':message.address" readonly="readonly">
                </li>
            </ul>
            <div class="title"></div>
            <ul>
                <li>
                    <h4>姓名</h4>
                    <input type="text"
                           :value="message1.name=='null'?'':message1.name" readonly="readonly">
                </li>
                <li>
                    <h4>联系方式</h4>
                    <input type="text"
                           :value="message1.phoneNo=='null'?'':message1.phoneNo" readonly="readonly">
                    <a :href="'tel:' + message1.phoneNo" style="display: inline-block;height: 100%;display: flex;align-items: center" v-if="message1.phoneNo!='null'">
                        <img src="../../assets/images/phone.png" alt="" style="width: .8rem">
                    </a>
                </li>
                <li>
                    <h4>职位</h4>
                    <input type="职位"
                           :value="message1.position=='null'?'':message1.position" readonly="readonly">
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
    export default {
        name: "WucompanyInfo",
        data() {
            return {
                message: this.$store.state.WuCoXQ,
                message1:{}
            }
        },
        created() {
            console.log(this.message);
            if (this.message.hasOwnProperty("buildingCompanyContacts")) {
                this.message1 = this.message.buildingCompanyContacts[0]
            } else {
                this.message1 = {name: '', companyContactId: '', phoneNo: '', position: ''}
            }
        }
    }
</script>

<style scoped lang="scss">
    #app {
        background-color: #f1f1f1;
    }

    .phone {
        width: .851rem;
        height: .851rem;
    }

    .connect {
        margin: 0 auto;
        font-size: .638rem;
        color: #1a96d4;
    }

    .logo {
        width: 1.277rem;
        height: 1.277rem;
    }

    ul {
        border-top: #ddd solid .5px;

        li {
            display: flex;
            align-items: center;
            height: 2.128rem;
            line-height: 2.128rem;
            padding-left: .638rem;
            border-bottom: #ddd solid .5px;

            h4 {
                display: inline-block;
                color: #333333;
                width: 3.83rem;
                font-size: .638rem;

                i {
                    color: #f16f6f;
                }
            }

            input {
                border: none;
                width: 67%;
                line-height: 1.277rem;
                vertical-align: center;
                font-size: .638rem;
                font-weight: 300;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

    input::-webkit-input-placeholder {
        color: #dddddd;
    }

    .title {
        height: 0.426rem;
        line-height: 2.128rem;
        background-color: #f1f1f1;
        padding-left: .638rem;
        font-size: .638rem;
        font-weight: 400;
        color: #333;

        i {
            width: 5px;
            height: 2.128rem;
            background-color: #1a96d4;
            float: left;
            margin-left: -.638rem;
        }
    }

    .add {
        color: #999999;
        text-align: center;
        position: relative;

        span {
            width: .851rem;
            height: .851rem;
            position: absolute;
            left: 50%;
            margin-left: -2.34rem;
            top: 50%;
            margin-top: -0.851rem;

            img {
                width: 100%;
            }

        }
    }

    .foot {
        margin: 0 .638rem .638rem;
        width: 14.681rem;
        height: 1.915rem;
        /*position: relative;*/
        /*bottom: 0.426rem;*/
        display: flex;
        justify-content: space-around;

        button {
            height: 1.915rem;
            display: inline-block;
            width: 44%;
            // background-color: #1a96d4;
            border: none;
            border-radius: 5px;
            color: #fff;
            background: #1a96d4;
            font-size: 0.767rem;
        }

        button:nth-child(1) {
            background: red;
        }
    }

    .bac {
        height: 3.6rem;
        background: #f1f1f1;

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