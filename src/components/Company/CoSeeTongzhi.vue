<template>
    <div style="">
        <div class="title" style="font-size: .766rem;color: #333333;padding: .638rem .638rem 0">{{info.noticeTitle}}
        </div>
        <div style="font-size: .511rem;color:#333333;;display: flex;padding: .511rem .638rem;border-bottom: .5px solid #f1f1f1">
            <p>{{info.publisher}}</p>
            <span style="width: .851rem;display: inline-block"></span>
            <p>{{info.publishTime}}</p>
        </div>
        <div class="content" style="font-size: .638rem;color: #333333;padding: .638rem">
             <textarea name="" id="" cols="40" rows="30" style="resize:none;border: 0" v-model="info.noticeContent">
            </textarea>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CoSeeTongzhi",
        data() {
            return {
                info: {},//接收物业端通知信息
                buildingId: this.$route.params.buildingId,
                companyId: this.$route.params.companyId,
                phoneNo: this.$route.params.phoneNo,
                token: this.$route.params.token
            }
        }, created() {
            this.getinfo();

        },
        methods: {
            getinfo() {
                this.axios.post('visit/company/noticeDetail', {
                    buildingId: this.buildingId,
                    companyId: this.companyId,
                    mobilePhoneNo: this.phoneNo,
                    noticeId: this.$store.state.CseeTZ.noticeId
                }).then((res) => {
                    console.log(res.data,222);
                    if (res.data.state == 1) {

                        this.info = res.data.data;
                        this.see()
                    }
                })
            },
            see(){
                let noticeId =this.info.noticeId;
                this.axios.post('visit/company/noticeViewLog', {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.phoneNo,
                    "companyId": this.companyId,
                    "noticeId":noticeId
                }).then((res) => {
                    console.log(res.data,1111)
                }).catch((error) => {
                    console.log(error)
                })            }
        }
    }
</script>

<style scoped>

</style>
