<template>
    <div class="content">
        <Cocomheader></Cocomheader>
        <!-- 列表开始 -->
        <div class="list" style="min-height: 10.638rem">
            <ul>
                <li v-for="elet in a" :key="elet.code">
                    <h4>{{elet.name}}:</h4>
                    <input type="text"
                           :value="elet.value"/>
                </li>
            </ul>
        </div>
        <div class="bottom">
            <button class="delete1" @click="oppose">拒绝</button>
            <button class="submit" @click="agree">同意</button>
        </div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    import {Toast} from 'mint-ui';
    import Cocomheader from "./Cocomheader";


    export default {
        name: 'Cosure',
        components: {Cocomheader},
        data() {
            return {
                msg: {},
                a: {},
                visitorRecordId: this.$route.params.visitorRecordId,
                buildingId: this.$route.params.buildingId,
                companyId: localStorage.getItem('companyId'),
                mobilePhoneNo: localStorage.getItem('CmobilePhoneNo'),
                token:localStorage.getItem('CToken'),
            }
        },
        created() {
            this.askMsg()//请求详细信息
        },
        methods: {
            //请求数据
            askMsg() {
                this.axios.post('visit/company/visitorReviewDetail', {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                    "visitorRecordId": this.visitorRecordId,
                    'companyId':this.companyId
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.state == 1) {
                        this.a = res.data.data.visitorRecordInfo
                    } else {
                        MessageBox(res.data.retMsg);
                    }
                })
            },
            //  反对
            oppose() {
                MessageBox.confirm('确定执行此操作?').then(action => {
                    this.getData("2")
                });

            },
            //  同意
            agree() {
                this.getData("1")
            },
            getData(result) {
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                    "visitorRecordId": this.visitorRecordId,
                    "reviewResult": result,
                    'companyId':this.companyId
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': this.token},
                    data: data,
                    url: 'visit/company/visitorReview'
                };
                this.axios(options).then((res) => {
                    if (res.data.state == 1) {
                        this.$router.push({path: '/CoProperty'});
                        Toast({
                            message: '操作成功',
                            duration: 500
                        });
                    } else {
                        Toast({
                            message: res.data.retMsg,
                            duration: 1500
                        });
                    }
                })
            }
        }
    }
</script>
<style lange="scss" scoped>
    .bottom {
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 1.872rem;
        margin-top: 1.277rem;

    }

    .delete1, .submit {
        height: 1.915rem;
        display: inline-block;
        width: 44%;
        border: none;
        border-radius: .213rem;
        color: #fff;
        background: #1a96d4;
        font-size: .766rem;
    }

    .delete1 {
        background-color: red;
    }

    .content {
        margin: 0;
        padding: 0;
    }

    h2 {
        text-align: center;
        font-size: 0.7rem;
        font-weight: normal
    }

    .head_title {
        margin-top: 0.9rem;
        margin-bottom: 0.638rem;
        color: #333333;
    }

    .imgBox {
        width: 1.7rem;
        height: 1.7rem;
        margin: 0.126rem auto;

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
        font-size: 0.7rem;
    }

    .geduan {
        height: 0.638rem;
        width: 100%;
        background-color: #f1f1f1;

    }

    .list li {
        position: relative;
        height: 2.08rem;
        line-height: 2.08rem;
        padding-left: 0.638rem;
        border-bottom: #dddddd solid 1px;

    }

    .list li p {
        display: inline-block;
        color: #333;

    }

    .list h4 {
        width: 3.4rem;
        text-align: left;
        display: inline-block;
        font-size: 0.638rem;
        color: #333333;
        margin-right: 0.638rem;
        font-weight: normal;
    }

    .list p {
        font-size: 0.638rem;
    }

    .list h4 i {
        color: #f41f1f;
        margin-right: .09rem;
    }

    .list input {
        color: #333333;
        font-size: 0.638rem;
        border: none;
    }

    .list span {
        width: 2.128rem;
        height: 1.27rem;
        border: #999 solid 1px;
        display: inline-block;
        text-align: center;
        line-height: 1.27rem;
        border-radius: 0.085rem;
        margin-right: .213rem;
        color: #666;
        font-size: 0.6rem;
    }

    .list .active {
        background-color: #1a96d4;
        color: #fff;
        border: #1a96d4 solid 1px;
    }

    .list label {
        position: absolute;
        top: 0;
        left: 5.1rem;
    }

    .foot {
        margin: 0.85rem 0px 0.85rem;

    }

    .myButtom {
        border: 0;
        background-color: #1a96d4;
        border-radius: 0.213rem;
        width: 14.687rem;
        height: 1.87rem;
        color: #fff;
        font-size: 0.6rem;
        display: block;
        text-align: center;
        text-decoration: none;
        line-height: 1.87rem;
        cursor: pointer;
        margin: 0 auto;
    }

    .enter {

        font-size: 0.596rem;
        color: #999;
        text-align: center;
        display: block;
        text-align: center;
        text-decoration: none;
        margin-bottom: 0.45rem;
    }

    .banner {
        margin-top: 0.815rem;
        position: relative;
        bottom: -3.815rem;
        width: 100%;
    }

    .imgBox img {
        margin: 0.426rem auto;
    }

    input {
        line-height: 30px;
        width: 67%;
    }
</style>



