<template>
    <!--全部的时候-->
    <div class="content" style="font-size: .638rem;color: #333333">
        <div>
            <div v-for="(value,key) in message"  :key="key" style="">
                <div style="background: #f1f1f1;padding-left: .638rem;line-height: 1.702rem">{{key}}</div>
                <div style="display: flex;justify-content: space-between;align-items: center;border-bottom: .5px solid #f1f1f1;line-height: 2.02rem;padding: 0 .638rem"
                     v-for="(i,index) in value"  :key="index" @click="into(i)">
                    <div style="display: flex;align-items: center">
                        <img src="../../assets/images/logo.png" alt="" style="width: auto;height: 1.1rem;">
                    </div>
                    <div style="font-size: .638rem;margin-left: .3rem;width:12rem;text-align: left">
                        {{i.companyName}}
                    </div>
                    <img src="../../assets/images/right.png" alt="" style="height: .422rem;width: .3rem">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Wunotread",
        data() {
            return {
                message: {}
            }
        }, created() {
            this.message = this.$store.state.notreadCo
        },methods:{
            into(i){
                console.log(i);
                this.$store.commit('WuCoXQ',i);
                this.$router.push({path:'/WucompanyInfo'})
            }
        }
    }
</script>

<style scoped>

</style>