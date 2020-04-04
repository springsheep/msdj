<template>
    <div class="header">
        <div class="imgBox">
            <!--<img :src="companyLogo==null?'../../../static/image/tu3.png':companyLogo" alt=""-->
                 <!--style="width: auto;height: 1.7rem">-->
            <img :src="companyLogo" alt="" srcset="" v-if="companyLogo != 'null'&&companyLogo != null && companyLogo != ''"
                 style="height: 1.7rem;width: auto;max-width: 2.8rem;margin: 0 auto">
            <img src="../../assets/images/tu3.png" alt="" srcset="" v-if="companyLogo == 'null'||companyLogo == null || companyLogo == ''"
                 style="width: auto;height: 1.7rem">
        </div>
        <h2 style="font-size: .766rem">
            {{companyName}}</h2>
        <div style="height: .426rem;background-color: #f1f1f1;margin-top: .638rem"></div>
    </div>
</template>

<script>
    export default {
        name: "Cocomheader",
        data() {
            return {
                companyName: localStorage.getItem('companyName'),
                companyLogo: localStorage.getItem('companyLogo'),
            }
        },
        created() {
            console.log(localStorage.getItem('companyLogo'),localStorage.getItem('companyName'))
        }
    }
</script>


<style scoped lang="scss">
    .header {
        padding-top: .638rem;
        .imgBox {
            text-align: center;
            display: flex;
            justify-content: center;
        }

        h2 {
            margin-top: .638rem;
            text-align: center;
        }
    }

</style>