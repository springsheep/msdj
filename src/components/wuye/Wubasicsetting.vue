<template>
    <div>
        <div class="logoup">
            <span class="logoname" style="display: inline-block;width: 3.2rem">LOGO</span>
            <span class="preview">
         <label for="file" style="width: 100%;height: 100%;display: flex;align-items: center">
           <img :src="src" alt="" srcset="" v-show="src!=null" style="height: 1.702rem;width: auto;max-width:2.7rem ">
          <img src="../../assets/images/logo.png" alt="" srcset="" style="width: 1.702rem;height: auto"
               v-show="src==null&&msg1.buildingLogo==null">
           <img :src="msg1.buildingLogo" alt="" style="height: 1.702rem;width: auto;max-width:2.7rem"
                v-show="src==null">
              <img src="../../assets/images/right.png" height=".5rem" width="7px"
                   style="position: relative;left: 8.5rem"/>
         </label>
       </span>
            <span class="upload">
         <input type="file" @change="getFile" ref="file" id="file"/>
        </span>

        </div>
        <div class="welcome" style="color: #333333;align-items: center;display: flex">
            <span style="display: inline-block;width: 3.2rem">名称</span>
            <input type="text" style="color: #999999;width: 70%" id="name" :value="msg.buildingName">
        </div>
        <div class="welcome" style="color: #333333;align-items: center;display: flex">
            <span style="display: inline-block;width: 3.2rem">欢迎词</span>
            <input type="text" :value="msg.buildingWelcome" id="welcome" style="color: #999999;width: 70%">
        </div>

        <div class="welcome" style="color: #333333;align-items: center;display: flex" @click="choose">
            <span style="display: inline-block;width: 3.2rem">地区</span>
            <input type="text" style="color: #999999;width: 68%" placeholder="请选择所在地区" v-model="area"  readonly= "true ">
            <img src="../../assets/images/right.png" height=".5rem" width="7px"/>

        </div>
        <div class="welcome" style="color: #333333;align-items: center;display: flex">
            <span style="display: inline-block;width: 3.2rem">详细地址</span>
            <input type="text" style="color: #999999;width: 65%" id="address"   placeholder="如街道，乡镇，门牌号" :value="location">
            <img src="../../assets/images/position.jpg" height="20" width="20" @click="mapposition"/>

        </div>
        <div class="divwrap" v-if="show">
            <v-distpicker type="mobile"
                          @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"
                          :province="temp.addressprovince"
                          :city="temp.addresscity"
                          :area="temp.address__dist"
            ></v-distpicker>
        </div>
        <button class="bao" @click="baocun">保存</button>

    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'

    export default {
        name: "Wubasicsetting",
        components: {VDistpicker},
        data() {
            return {
                area: '',
                show: false,
                msg1: this.$store.state.message,
                buildingId: localStorage.getItem('WbuildingId'),
                mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
                msg: {},
                buildingWelcome: '',
                src: this.$store.state.message.buildingLogo,
                visitorRegisterTemplate: '',
                buildingLogo: '',
                temp: {
                    addressprovince: '',
                    addresscity: '',
                    address__dist: '',
                },
                backurl:null,
                location:null,
                location1:null

            }
        },
        mounted() {
            this.getNewsInfo();
            this.backurl = 'http://127.0.0.1:8080/#/Wubasicsetting'

            // this.backurl = 'https://test.kelibbb.com/static/visit/#/Wubasicsetting'
            let decodedUrl = decodeURI(window.location.href);
            let query = decodedUrl.split('?')[1];
            let queryObj = {};
            if (query) {
                let queryArr = query.split('&');
                queryArr.forEach(item => {
                    let itemArr = item.split('=');
                    queryObj[itemArr[0]] = itemArr[1];
                })
            }

            if (queryObj.name == '我的位置') {
                this.location1 = queryObj.addr
            } else {
                this.location1 = queryObj.name
            }

        },
        methods: {
            mapposition(){
              // this.$router.push({path:'/Wumap'})
                var key = 'MTABZ-CULEV-PHAPY-UWQ4M-WVGH7-7LBTU'
                window.location.href = `https://apis.map.qq.com/tools/locpicker?&key=${key}&referer=myapp&search=1&type=0&backurl=${this.backurl}`
            },
            //开始选择地区
            choose() {
                this.show = !this.show
            },
            //点击省份
            onChangeProvince(a) {
                if (a.code == undefined) {

                } else {
                    this.temp.addressprovince = a.value;
                    console.log(a)
                }
                this.area = this.temp.addressprovince + this.temp.addresscity + this.temp.address__dist
            },
            //点击市区
            onChangeCity(a) {
                if (a.code == undefined) {

                } else {
                    this.temp.addresscity = a.value;
                    console.log(a)
                }
                this.area = this.temp.addressprovince + this.temp.addresscity + this.temp.address__dist
            },
            //点击地区
            onChangeArea(a) {
                if (a.code == undefined) {
                    this.area = this.temp.addressprovince + this.temp.addresscity + this.temp.address__dist
                } else {
                    this.temp.address__dist = a.value;
                    this.area = this.temp.addressprovince + this.temp.addresscity + this.temp.address__dist;
                    this.show = false
                }

            },
            //保存
            baocun() {
                if (document.getElementById('welcome').value == '') {
                    MessageBox('提示', '欢迎词不能为空');
                } else if (document.getElementById('name').value == '') {
                    MessageBox('提示', '公司名称不能为空');
                } else {
                    //发生请求
                    var formData = new FormData();
                    formData.append("buildingId", this.buildingId);
                    formData.append("mobilePhoneNo", this.mobilePhoneNo);
                    formData.append("buildingWelcome", document.getElementById('welcome').value);
                    formData.append("buildingName", document.getElementById('name').value);
                    formData.append("buildingAddress", document.getElementById('address').value);
                    formData.append("province ", this.temp.addressprovince);
                    formData.append("city ", this.temp.addresscity);
                    formData.append("district ", this.temp.address__dist);
                    if (document.getElementById('file').files[0] != null && document.getElementById('file').files[0] != undefined) {
                        formData.append("buildingLogo", document.getElementById('file').files[0])
                    }
                    const options = {
                        method: 'POST',
                        headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                        data: formData,
                        url: 'visit/building/saveVisitorSetting'
                    };
                    this.axios(options).then((response) => {
                        if (response.data.state == '1') {
                            this.$toast('保存成功');
                        } else {
                            this.$toast(response.data.retMsg);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }


            },
            //图片上传预览
            getFile(e) {
                Indicator.open('头像上传中...');
                let _this = this;
                var files = e.target.files[0];
                // console.log(files)
                if (!e || !window.FileReader) return;  // 看支持不支持FileReader
                let reader = new FileReader();
                reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function () {
                    _this.src = this.result;
                    Indicator.close();
                    Toast("上传成功")
                }
            },//初始化页面
            getNewsInfo() {
                const data = {
                    "buildingId": this.buildingId,
                    "mobilePhoneNo": this.mobilePhoneNo
                };
                const options = {
                    method: 'POST',
                    headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                    data: data,
                    url: 'visit/building/getVisitorSetting'
                };
                this.axios(options).then((response) => {

                    console.log(response.data.data);

                    this.msg = response.data.data;
                    // this.msg.buildingAddress=this.$store.state.address2==''?this.msg.buildingAddress:
                    this.temp.addressprovince = response.data.data.province==null?'':response.data.data.province;
                    this.temp.addresscity = response.data.data.city==null?'':response.data.data.city;
                    this.temp.address__dist = response.data.data.district==null?'':response.data.data.district;
                    this.area = this.temp.addressprovince + this.temp.addresscity + this.temp.address__dist
                    // console.log(this.area,this.temp.addressprovince,this.temp.addresscity,this.temp.address__dist)
                    // if(this.area==0){
                    //     this.area='';
                    // }
                    if(this.location1==null){
                        this.location=this.msg.buildingAddress
                    }else {
                        this.location=this.location1
                    }

                }).catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*省市区三级联动*/
    .divwrap {
        height: 40%;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 99;
        font-size: .55rem;
    }

    /*外部*/
    .divwrap > .distpicker-address-wrapper {
        color: #0d0d0d;
        height: 100%;
    }

    /*头部*/
    .address-header {
        background: #000;
        color: #fff;
        width: 100%;
        position: fixed;
        bottom: 50%;
        height: 0.5rem;
        font-size: 0.2rem;
    }

    /*头部内容*/
    .address-header ul li {
        flex-grow: 1;
        text-align: center;
    }

    /*选择过省市区的头部*/
    .divwrap > > > .address-header .active {
        color: #fff;
        border-bottom: 0.05rem solid #666;
    }

    /*内容部分*/
    .divwrap > > > .address-container {
        overflow: scroll;
        height: 100%;
    }

    /*点过的地区内容*/
    .divwrap > > > .address-container .active {
        color: red;
    }

    .divwrap {
        .address-container {
            overflow: scroll;
            height: 100%;
            z-index: 100;

            .active {
                color: red;
            }
        }
    }

    .sortable-chosen {
        /*display: none;*/
        /*display: none;*/

    }

    //不显示影子元素。
    .sortable-ghost {
        /*background: black;*/
    }

    .welcome input {
        border: none;
    }

    input[type='file'] {
        display: none;
        z-index: 10;
        width: 5.106rem;
        font-size: 0;
        height: 1.277rem;
    }

    .list {
        .handle {
            position: relative;
            right: -14.262rem;
            bottom: 1.7rem;
        }

        img {
            width: .851rem;
            height: .34rem;
            margin-bottom: .4rem;
        }

        border-bottom: #ddd solid .5px;
        height: 2.128rem;
        width: 16.026rem;
        line-height: 2.128rem;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
        .ck {
            top: .596rem;
            width: .638rem;
            height: .638rem;
        }

        .inputdate {
            // padding-top: 18px;
            padding-left: .213rem;
            font-size: .638rem;
            color: #333;
            border: none;
            background: none;
        }
    }

    .welcome {
        height: 2.128rem;
        line-height: 2.128rem;
        padding-left: .638rem;
        border-bottom: #ddd solid .5px;
        color: #333333;
        font-size: .638rem;

        span {
            color: #333333;
            font-size: .638rem;
            margin-right: .6rem;
        }

        input {
            font-size: .638rem;
            line-height: 1rem;
        }
    }

    .title {
        text-align: center;
        color: #333333;
    }

    .mint-header-title {
        color: #333333;
        font-size: .681rem;
    }

    .logoup {
        padding-left: .638rem;
        padding-top: .426rem;
        overflow: hidden;
        border-bottom: #ddd solid .5px;
        padding-bottom: .426rem;

        span {
            display: inline-block;
            vertical-align: top;
            line-height: 100%;
        }

        .logoname {
            margin-top: 0.5rem;
            font-size: .638rem;
            color: #333333;
            margin-right: .6rem;
            vertical-align: center;
        }

        .preview {
            width: 1.787rem;
            height: 1.787rem;

        }

        .upload {
            width: 2.553rem;
            height: 1.777rem;
            float: right;
            margin-right: .638rem;
        }
    }

    .bao {
        margin-left: .638rem;
        margin-right: .638rem;
        margin-top: .894rem;
        background-color: #1a96d4;
        border: #1a96d4 solid .5px;
        border-radius: 5px;
        line-height: 1.615rem;
        color: #fff;
        width: 92%;
        font-size: .7rem;
    }

    input {
        height: 1.872rem;
        width: 80%;
        color: #333333 !important;
    }
</style>
<style scoped>
    /*内容部分*/
    .divwrap >>> .address-container {
        overflow: scroll;
        height: 100%;
    }

    /*点过的地区内容*/
    .divwrap >>> .address-container .active {
        color: red;
    }
</style>