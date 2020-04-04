<template>
        <div class="list" >
            <router-link :to='{path:item.menuUrl}' v-for="(item,index) in msg" :key="index">
                <!--<mt-cell :title="item.menuName" is-link class="ml15" style="font-size: .638rem">-->
                <!--</mt-cell>-->
                <div style="line-height: 2.3rem;font-size: .638rem;
                display: flex;justify-content: space-between;
                border-bottom: 1px solid #f1f1f1;align-items: center;padding:0 .638rem ;color: #333">
                    <div>{{item.menuName}}</div>
                    <img src="../../assets/images/right.png" height=".5rem" width="5px"/>
                </div>

            </router-link>
        </div>
</template>

<script>
    export default {
        name: "Wusetter",
        data(){
            return{
                msg: this.$store.state.childMenuInfos,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .num {
        width: 0.7rem;
        height: .7rem;
        background-color: #ec4040;
        border-radius: 50%;
        color: cornsilk;
        text-align: center;
        margin-right: 0.2rem;
        font-size: .477rem;
    }

    .gogogo {
        color: #333333;
    }

    .rt {
        display: block;
        text-decoration: none;
        color: inherit;
    }

    .myHeader {
        background: #f8f8f8;
    }

    h2 {
        text-align: center;
        font-size: .723rem;
        font-weight: normal;
        color: #333333;
    }

    .myTitle {
        padding-bottom: .638rem;
    }

    .imgBox {
        width: 1.7rem;
        height: 1.7rem;
        margin: .426rem auto .426rem;
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
        font-size: .681rem;
    }

    .geduan {
        height: .638rem;
        width: 100%;
        background-color: #f1f1f1;
    }

    .list {
        /*border-bottom: #dddddd solid 1px;*/
        color: #333333;
        font-size: 0.638rem;
        font-weight: 300;
    }

    .list .title {
        font-size: .638rem;
        text-align: center;
        background-origin: border-box;
    }

    .foot {
        padding: .638rem .851rem .426rem;
        font-size: .426rem;
    }

    .myButtom {
        border: 0;
        background-color: #1a96d4;
        border-radius: .213rem;
        width: 100%;
        height: 1.872rem;
        color: #fff;
        font-size: .765rem;

    }

    .mint-cell-text {
        font-size: 15px;
        color: red;
        background: black;
    }

    .ml15 {
        height: 2.043rem;
        /*border-bottom: 1px solid black;*/
    }

    .foot {
        text-align: center;
        margin-top: .97rem;
        font-size: .510rem;
        color: #999999;

        a {
            color: #4595d0;
        }
    }

</style>