<template>
    <div style="    width: 100%">
        <el-input
                placeholder="搜索地点"
                v-model="keyword" style="margin: .638rem 5%;width: 90%">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <baidu-map :zoom="15">
            <bm-view class="map" style="height: 14rem"></bm-view>
            <bm-local-search :pageCapacity="3"
                             :keyword="keyword"
                             :auto-viewport="true"
                             id="baidu_ditu"
            ></bm-local-search>
            <bm-info-window @close="infoWindowOpen($event,arr_id.id)"
                            :show="infoWindow.show"></bm-info-window>
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

        </baidu-map>

    </div>
</template>

<script>
    import BaiduMap from "vue-baidu-map/components/map/Map.vue";

    export default {
        name: "Wumap",
        components: {BaiduMap},
        data() {
            return {
                allList: [],
                keyword: "浙江",
                xuanfu: true, //悬浮框
                anniu: false, //悬浮框消失显示的按钮
                Map_: false, //显示地图地址的容器
                off_anniu: false, //关闭容器的按钮
                ARR: {}, //后台传过来的数组
                Token: "", //登录保存的token
                show: false, //弹出提示框
                FacilityId: "", //最外层设备id
                infoWindow: {
                    show: true
                },
                ARR_1: [], //机房所在位置信息
                Arr_name: [], //所有机房的名字
                arr_id: [] //所有id
            };
        },

        methods: {
            infoWindowOpen(type,e) {
                //地图容器
                console.log(type.currentTarget.bb.V.nextSibling.title);
                //点击地址的时候跳转页面携带ID
                this.keyword = type.currentTarget.bb.V.nextSibling.title;
                this.infoWindow.show = true;
                this.$store.state.address2=this.keyword;
                this.$router.go(-1)
            },
            Input_dizhi() {
                if (this.keyword != "广州") {
                    this.xuanfu = false;
                    this.anniu = false;
                }
            },
            OFF_Map() {
                this.Map_ = false;
                this.off_anniu = false;
            },
            handler({BMap, map}) {
                map.enableScrollWheelZoom(true);
            },
            OFf() {
                this.xuanfu = false;
                this.anniu = true;
            },
            showData() {
                this.xuanfu = true;
                this.anniu = false;
            }
        }
    };
</script>

<style scoped lang="scss">
    #baidu_ditu {
        height: 10rem;
        position: fixed;
        bottom: 0;
        width: 90%;
        left: 5%;
        border: 0;

        div:nth-child(1) {
            border: 0;
            background: #3a8ee6;
        }
    }
</style>
<style lang="scss">
    #baidu_ditu {
        height: 10rem;
        position: fixed;
        bottom: 0;
        width: 90%;
        left: 5%;
        border: 0;
        overflow: scroll;

        div {
            border: 0 !important;

        }

        div:nth-child(1) {
            border-radius: 5px !important;
        }

        a {
            display: none !important;
        }
    }
</style>
