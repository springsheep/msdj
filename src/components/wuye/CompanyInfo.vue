<template>
  <div class="app1">
    <form action="" enctype="multipart/form-data">
      <ul>
        <li>
          <h4>LOGO</h4>
          <label for="file">
            <img :src="src" alt="" srcset="" v-show="src.length !=0" class="logo"
                 style="margin-top: 1rem;width: 1.277rem;height: 1.277rem;">
            <img src="../../assets/images/logo.png" alt="" srcset="" v-show="src.length ==0"
                 style="width: 1.277rem;height: auto;margin-top: 1rem">
          </label>
          <input type="file" id="file" style="opacity: 0;" ref="file" @change="getFile">

        </li>
        <li>
          <h4>公司名称<i>*</i></h4>
          <input type="text" :value="message.companyName" @change="msg1" @focus="enter" @blur="leave">
        </li>
        <li>
          <h4>公司简称</h4>
          <input type="text" :value="message.companyAbbreviateName" @change="msg7" @focus="enter" @blur="leave">
        </li>
        <li>
          <h4>所在楼层<i>*</i></h4>
          <input type="text" :value="message.storey" @change="msg2" @focus="enter" @blur="leave">
        </li>
        <li>
          <h4>详细位置</h4>
          <input type="text" :value="message.address" @change="msg3" @focus="enter" @blur="leave">
        </li>
      </ul>
      <div class="title"></div>
      <ul>
        <li>
          <h4>姓名<i>*</i></h4>
          <input type="text" :value="message1.name" @change="msg4" @focus="enter" @blur="leave">
        </li>
        <li>
          <h4>联系方式<i>*</i></h4>
          <input type="text" :value="message1.phoneNo" @change="msg5" @focus="enter" @blur="leave">
        </li>
        <li>
          <h4>职位</h4>
          <input type="职位*" :value="message1.position" @change="msg6" @focus="enter" @blur="leave">
        </li>
        <div class="title"></div>
      </ul>
    </form>
    <div class="bac">
    </div>
    <warning v-if="showcom" :showcom="showcom" @update="getMsg($event)" :prompt="promptContent"
             style="z-index: 51"></warning>
    <div class="mask" v-show="ifshow" @click="miss"></div>
    <div style="background-color: #f1f1f1;width: 100%;height: 2.96rem">
      <div class="foot">
        <button @click="delete1">删除</button>
        <button @click="back">保存</button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Warning from "./warning";
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';
  import { Indicator } from 'mint-ui';
  export default {
    name: 'CompanyInfo', components: {Warning},
    data() {
      return {
        companyName: '',
        buildingId: localStorage.getItem('WbuildingId'),
        mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
        companyStorey: '',
        companyAddress: '',
        companyContactInfos: [],
        name: '',
        phoneNo: '',
        position: '',
        companyAbbreviateName: '',
        message1: {},
        message: {},
        hideshow: true,
        showcom: '',//提示框显示隐藏
        promptContent: '',//提示框内容
        ifshow: false,
        src: '',
        companLogo: ''
      }
    },
    methods: {
      //点击蒙版取消
      miss() {
        this.ifshow = false;
        this.showcom = false;
      },
      //接受提示框返回的数据
      getMsg(data) {
        this.showcom = data;
        this.ifshow = false;
        this.deleteOp();
      },
      //点击输入框隐藏按钮
      enter() {
        this.hideshow = false
      },
      //离开输入框显示按钮
      leave() {
        this.hideshow = true
      },
      //图片上传预览
      getFile(e) {
        Indicator.open({
          text: '图片上传中...',
          spinnerType: 'fading-circle'
        });
        let _this = this;
        var files = e.target.files[0];
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src = this.result;
          Indicator.close();
          // console.log(_this.src,)
        }
      },
      back() {
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let e = 0;
        let f = 0;
        let g = 0;
        //验证正确的公司名称
        var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/;
        if (this.message.companyName.length == '' || this.message.companyName == '浙江' || this.message.companyName == '杭州' || this.message.companyName == '公司') {
          MessageBox('提示', '请输入正确公司名称');
          return false;
        } else if (this.message.companyName == "") {
          MessageBox('提示', '请输入公司名称');
          return false;
        } else {
          a = 1
        }
        // console.log(this.message.companyAbbreviateName)
        // //验证正确的公司简称
        // var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/
        // if (!reg.test(this.message.companyAbbreviateName) && this.message.companyAbbreviateName != null) {
        //   MessageBox('提示', '请输入正确公司简称');
        //   return false;
        // } else if (this.message.companyAbbreviateName == null) {
        //   MessageBox('提示', '请输入公司简称');
        //   return false;
        // } else {
        //   b = 1
        // }
        //验证正确的公司楼层
        var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/;
        if (!reg.test(this.message.storey) && this.message.storey == null) {
          MessageBox('提示', '请输入正确公司楼层');
          return false;
        } else if (this.message.storey == null) {
          MessageBox('提示', '请输入公司楼层');
          return false;
        } else {
          c = 1
        }
        // //验证详细的地理位置
        // if (this.message.address == null) {
        //   MessageBox('提示', '请输入详细地址');
        //   return false;
        // } else {
        //   d = 1
        // }
        //验证姓名
        if (this.message1.name <= 1 && this.message1.name != null) {
          MessageBox('提示', '请输入正确的姓名');
          return false;
        } else if (this.message1.name == null) {
          MessageBox('提示', '请输入姓名');
          return false;
        } else {
          e = 1
        }
        //验证手机号
        var value = this.message1.phoneNo;
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(value) && value.length != null) {
          MessageBox('提示', '请输入正确的手机号');
          return false;
        } else if (value ==null ) {
          MessageBox('提示', '请输入手机号');
          return false;
        } else {
          f = 1
        }
        // //职位的验证
        // var value = this.message1.position;
        // var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/
        // if (!reg.test(value) && value != null) {
        //   MessageBox('提示', '请输入正确的职位');
        //   return false;
        // } else if (value == null) {
        //   MessageBox('提示', '请输入职位');
        //   return false;
        // } else {
        //   g = 1
        // }
        if (a == 1 && c == 1  && e == 1 && f == 1  && e == 1) {

          this.save()
        }
      },
      save() {
        var formData = new FormData();
        formData.append("buildingId", this.buildingId);
        formData.append("mobilePhoneNo", this.mobilePhoneNo,);
        if (document.getElementById('file').files[0] != null && document.getElementById('file').files[0] != undefined) {
          formData.append("companyLogo", document.getElementById('file').files[0])
          // console.log(document.getElementById('file').files[0], 111)
        }
        formData.append("companyId", this.message.companyId.toString());
        formData.append("companyName", this.message.companyName);
        formData.append("companyStorey", this.message.storey);
        formData.append("companyAddress", this.message.address);
        formData.append("companyAbbreviateName", this.message.companyAbbreviateName);
        var obj = {
          'name': this.message1.name,
          'phoneNo': this.message1.phoneNo,
          'position': this.message1.position,
          "companyContactId": this.message1.companyContactId.toString(),
        };
        this.companyContactInfos.push(obj);
        formData.append("companyContactInfos", JSON.stringify(this.companyContactInfos));
        const options = {
          method: 'POST',
          data: formData,
          url: 'visit/building/saveCompany',
          headers: {'token': localStorage.getItem('WToken')}
        };
        this.axios(options).then((response) => {
          if (response.data.state == '1') {
            this.$router.push({name: 'Into'});
            Toast({
              message: '保存成功',
              duration: 500
            });
          } else {
            this.$toast(response.data.retMsg);
          }
        }).catch(function (error) {
          console.log(error);
        });
      },
      delete1() {
        MessageBox.confirm('您确定删除吗').then(action => {
          this.deleteOp()
        });
      },
      deleteOp() {
        const data = {
          "buildingId": this.buildingId,
          "mobilePhoneNo": this.mobilePhoneNo,
          "companyId": this.message.companyId
        };
        const options = {
          method: 'POST',
          data: data,
          headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
          url: "visit/building/deleteCompany"
        };
        this.axios(options).then((res) => {
          this.$router.push({name: 'Into'});
          Toast({
            message: '删除成功',
            duration: 500
          });
        }).catch((error) => {

        })
      },
      msg1(event) {
        this.message.companyName = event.target.value
      },
      msg2(event) {
        this.message.storey = event.target.value
      },
      msg3(event) {
        this.message.address = event.target.value
      },
      msg4(event) {
        this.message1.name = event.target.value
      },
      msg5(event) {
        this.message1.phoneNo = event.target.value
      },
      msg6(event) {
        this.message1.position = event.target.value
      },
      msg7(event) {
        this.message.companyAbbreviateName = event.target.value
      }
    },
    created() {
      //  取公司数据
      this.message = this.$route.query.message;
      console.log(this.message);
      if (this.$route.query.message.hasOwnProperty("buildingCompanyContacts")) {
        this.message1 = this.$route.query.message.buildingCompanyContacts[0]
      } else {
        this.message1 = {name: '', companyContactId: '', phoneNo: '', position: ''}
      }
    }

  }
</script>

<style lang="scss" scoped>
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
