<template>
  <div class="app1">
    <form action="" enctype="multipart/form-data">
      <ul>
        <li>
          <h4>LOGO</h4>
          <label for="file" style="display: flex;align-items: center">
            <img :src="src" alt="" srcset="" v-show="src.length!=0" style="width: 1.277rem;height: 1.277rem" class="logo">
            <img src="../../assets/images/logo.png" alt="" srcset="" v-show="src.length==0"
                 style="width: 1.277rem;height: auto" class="logo">
          </label>
          <input type="file" id="file" style="opacity: 0;" @change="getFile" ref="file">

        </li>
        <li>
          <h4>公司名称<i>*</i></h4>
          <input type="text" placeholder="请输入公司名称" @change="msg1">
        </li>
        <li>
          <h4>公司简称</h4>
          <input type="text" placeholder="请输入公司简称" @change="msg7">
        </li>
        <li>
          <h4>所在楼层<i>*</i></h4>
          <input type="text" placeholder="请输入楼层" @change="msg2">
        </li>
        <li>
          <h4>详细位置</h4>
          <input type="text" placeholder="请输入详细地址" @change="msg3">
        </li>
      </ul>
      <div class="title"></div>
      <ul>
        <li>
          <h4>姓名<i>*</i></h4>
          <input type="text" placeholder="请输入姓名" @change="msg4">
        </li>
        <li>
          <h4>联系方式<i>*</i></h4>
          <input type="text" placeholder="请输入联系方式" @change="msg5">
        </li>
        <li>
          <h4>职位</h4>
          <input type="text" placeholder="请输入职位" @change="msg6">
        </li>
        <div class="title"></div>
      </ul>
    </form>
    <div class="bac">
    </div>
    <div class="foot">
      <button @click="back">保存</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    name: 'Intopro',
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
        src: ''
      }
    },
    methods: {
      //点击保存 验证信息 正确则调用保存并跳转界面
      back() {
        let a = 0;
        let b = 0;
        let c = 0;
        let d = 0;
        let e = 0;
        let f = 0;
        let g = 0;
        //验证正确的公司名称
        var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/
        if (!reg.test(this.companyName) && this.companyName.length != 0 || this.companyName == '浙江' || this.companyName == '杭州' || this.companyName == '公司') {
          MessageBox('提示', '请输入正确的公司');
          return false;
        } else if (this.companyName == "") {
          MessageBox('提示', '请输入公司');
          return false;
        } else {
          a = 1
        }
        //验证正确的公司简称
        // var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/
        // if (!reg.test(this.companyAbbreviateName) && this.companyAbbreviateName.length != 0) {
        //   MessageBox('提示', '请输入正确的公司简称');
        //   return false;
        // } else if (this.companyAbbreviateName == '') {
        //   MessageBox('提示', '请输入公司简称');
        //   return false;
        // } else {
        //   b = 1
        // }
        //验证正确的公司楼层
        var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/
        if (!reg.test(this.companyStorey) && this.companyStorey == '') {
          MessageBox('提示', '请输入正确的公司楼层');
          return false;
        } else if (this.companyStorey == '') {
          MessageBox('提示', '请输入公司楼层');
          return false;
        } else {
          c = 1
        }
        //验证详细的地理位置
        // if (this.companyAddress == '') {
        //   MessageBox('提示', '请输入详细的公司位置');
        //   return false;
        // } else {
        //   d = 1
        // }
        //验证姓名
        if (this.name <= 1 && this.name != '') {
          MessageBox('提示', '请输入正确的姓名');
          return false;
        } else if (this.name == '') {
          MessageBox('提示', '请您输入姓名');
          return false;
        } else {
          e = 1
        }
        //验证手机号
        var value = this.phoneNo;
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!reg.test(value) && value.length != 0) {
          MessageBox('提示', '请您输入正确的手机号');
          return false;
        } else if (value == "") {
          MessageBox('提示', '请您输入手机号');
          return false;
        } else {
          f = 1
        }
        //职位的验证
        // var value = this.position;
        // var reg = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/
        // if (!reg.test(value) && value.length != 0) {
        //   MessageBox('提示', '请您输入正确的职位');
        //   return false;
        // } else if (value == "") {
        //   MessageBox('提示', '请您输入职位');
        //   return false;
        // } else {
        //   g = 1
        // }
        if (a == 1  && c == 1  && e == 1 && f == 1 && e == 1) {
          this.save()
        }

      },
      //保存时间
      save() {
        var formData = new FormData();
        formData.append("buildingId", this.buildingId);
        formData.append("mobilePhoneNo", this.mobilePhoneNo,)
        if (document.getElementById('file').files[0] != null && document.getElementById('file').files[0] != undefined) {
          formData.append("companyLogo", document.getElementById('file').files[0])
        }
        formData.append("companyName", this.companyName)
        formData.append("companyStorey", this.companyStorey)
        formData.append("companyAddress", this.companyAddress)
        formData.append("companyAbbreviateName", this.companyAbbreviateName)
        var obj = {'name': this.name, 'phoneNo': this.phoneNo, 'position': this.position}
        this.companyContactInfos.push(obj)
        formData.append("companyContactInfos", JSON.stringify(this.companyContactInfos))
        const options = {
          method: 'POST',
          data: formData,
          headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
          url: '/visit/building/saveCompany'
        };
        this.axios(options).then((response) => {
          if (response.data.state == '1') {
            this.$router.push({path: '/wuye/into'})
            this.$toast('保存成功');
          } else {
            this.$toast(response.data.retMsg);
          }
        }).catch(function (error) {
        });
      },
      //图片上传预览
      getFile(e) {
        let _this = this
        var files = e.target.files[0]
        if (!e || !window.FileReader) return  // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src = this.result
        }
      },
      //获取每个输入框的内容
      msg1(event) {
        this.companyName = event.target.value
      },
      msg2(event) {
        this.companyStorey = event.target.value
      },
      msg3(event) {
        this.companyAddress = event.target.value
      },
      msg4(event) {
        this.name = event.target.value
      },
      msg5(event) {
        this.phoneNo = event.target.value
      },
      msg6(event) {
        this.position = event.target.value
      },
      msg7(event) {
        this.companyAbbreviateName = event.target.value
      }
    }
  }
</script>

<style lang="scss" scoped>

  .connect {
    margin: 0 auto;
    font-size: .638rem;
    color: #1a96d4;
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
        text-wrap: none;
        text-overflow: ellipsis;
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

    margin: 0 .638rem;
    width: 14.681rem;
    height: 1.915rem;
    position: fixed;
    bottom: 0.426rem;
    button {
      height: 1.915rem;
      display: inline-block;
      width: 100%;
      // background-color: #1a96d4;
      border: none;
      border-radius: 5px;
      color: #fff;
      background: #1a96d4;
      font-size: 0.767rem;
    }
  }

  .bac {
    height: 7.426rem;
    background: #f1f1f1;

  }
</style>
