<template>
    <div class="header">
        <div class="imgBox">
            <img :src="buildingLogo" alt="" srcset="" v-if="buildingLogo != 'null'&&buildingLogo != null && buildingLogo != ''"
                 style="height: 1.7rem;width: auto;max-width: 2.8rem;margin: 0 auto">
            <img src="../../assets/images/logo.png" alt="" srcset="" v-if="buildingLogo == 'null'||buildingLogo == null || buildingLogo == ''"
                 style="width: auto;height: 1.7rem">
        </div>
        <h2 style="font-size: .766rem" v-if="">
            {{buildingWelcome != 'null'&&buildingWelcome != null && buildingWelcome != ''?buildingWelcome:buildingName+'欢迎您'}}</h2>
        <!--<h2 style="font-size: .766rem" v-if="buildingWelcome == null || buildingWelcome == ''">-->
            <!--{{}}</h2>-->
        <div style="height: .426rem;background-color: #f1f1f1;margin-top: .638rem"></div>
    </div>
</template>

<script>
    import {Indicator} from 'mint-ui';
    export default {
        name: "CommonHeader",
        data() {
            return {
                msg: {},
                buildingLogo: '',
                buildingWelcome: '',
                buildingName: ''
            }
        }, created() {

        },
        mounted() {
            this.buildingName=localStorage.getItem('buildingName');
            this.buildingLogo=localStorage.getItem('buildingLogo');
            this.buildingWelcome=localStorage.getItem('buildingWelcome');
            // console.log(this.buildingLogo,1111,this.buildingWelcome,this.buildingName)
        }
    }
</script>

<style scoped lang="scss">
    .header {
        .imgBox {
            text-align: center;
            padding-top: .638rem;
            display: flex;
            justify-content: center;
        }

        h2 {
            margin-top: .638rem;
            text-align: center;
        }
    }

</style>
