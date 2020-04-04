<template>
    <div style=" width: 100%;height: 100%">
        <div class="title" style="font-size: .766rem;color: #333333;padding: .638rem .638rem 0">{{info.noticeTitle}}
        </div>
        <div style="font-size: .6rem;color:#333333;;display: flex;padding: .511rem .638rem;border-bottom: .5px solid #f1f1f1">
            <p>{{info.publisher}}</p>
            <span style="width: .851rem;display: inline-block"></span>
            <p>{{info.publishTime}}</p>
        </div>
        <div class="content" style="font-size: .638rem;color: #333333;padding: .638rem" >
            <textarea name="" id="" cols="40" rows="30" style="resize:none;border: 0" v-model="info.noticeContent">
            </textarea>
        </div>
        <div class="footer">
            <div style="background: #1a96d4" @click="readed('1')">已阅读 {{info.noticeViewedCount}}</div>
            <div style="background: #e14b4b" @click="notread('0')"> 未阅读 {{info.noticeNotViewCount}}</div>
        </div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    export default {

        name: "WuseeTZ",
        data() {
            return {
                info: {},//接收物业端通知信息
                mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
                buildingId: localStorage.getItem('WbuildingId'),
            }
        }, created() {
            //信息负值
            this.info = this.$store.state.WseeTZ
            console.log(this.info.noticeContent)

        },
        methods: {
            readed(i) {
                if(this.info.noticeViewedCount==0){
                    MessageBox('提示', '暂无阅读公司');
                }else{
                    Indicator.open({
                        text: '加载中...',
                    });
                    this.axios.post('visit/building/getViewNoticeCompanyList', {
                        "buildingId": this.buildingId,
                        "mobilePhoneNo": this.mobilePhoneNo,
                        "noticeFlag": i,
                        "noticeId": this.info.noticeId
                    }).then((res) => {
                        Indicator.close();
                        if (res.data.state == 1) {
                            this.$store.commit('readedCo', res.data.data);
                            this.$router.push({path: "/WuReader"});
                            Toast('加载成功')
                        } else {
                            Toast(res.data.retMsg)
                        }
                    }).catch((error) => {
                        Toast(error)
                    })
                }

            },
            notread(i) {
                Indicator.open({
                    text: '加载中...',
                });
                this.axios.post('visit/building/getViewNoticeCompanyList', {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo,
                    "noticeFlag": i,
                    "noticeId": this.info.noticeId
                }).then((res) => {
                    Indicator.close();
                    if (res.data.state == 1) {
                        this.$store.commit('notreadCo', res.data.data);
                        this.$router.push({path: "/Wunotread"});
                        Toast('加载成功')
                    } else {
                        Toast(res.data.retMsg)
                    }
                }).catch((error) => {
                    Toast(error)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .footer {
        height: 2.766rem;
        width: 100%;
        line-height: 2.766rem;
        background: #FFFFFF;
        display: block;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        bottom: 0;

        div {
            height: 1.872rem;
            text-align: center;
            line-height: 1.872rem;
            width: 44%;
            font-size: .766rem;
            color: #FFFFFF;
            border-radius: 5px;
        }
    }
</style>
