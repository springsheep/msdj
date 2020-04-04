<template>
  <div class="container">
    <div style="text-align: center"><img src="../../assets/images/logo.png" alt="" class="logo"></div>
    <div class="title">欢迎使用码上登记</div>
    <div class="ask">请填写信息，完成初始配置</div>
    <div class="body">
      <div class="content">
        <span>LOGO<p>*</p></span>
        <span style="width: 60%">
          <label for="file">
            <img :src="src" alt="" srcset="" v-show="src.length !=0" class="logo1" style="width: 1.277rem;height: 1.277rem">
            <img src="../../assets/images/logo.png" alt="" srcset="" v-show="src.length ==0" class="logo1">
          </label>
          <input type="file" id="file" style="opacity: 0; position: fixed" @change="getFile" ref="file" >
        </span>
      </div>
      <div class="content">
        <span>名  称<p>*</p></span>
        <input type="text" class="people" placeholder="请输入大厦名称" style="font-size: .638rem" v-model="msg2"/>
      </div>

      <div class="content">
        <span>姓  名<p>*</p></span>
        <input type="text" class="people" placeholder="请输入管理员姓名" style="font-size: .638rem" v-model="msg3"/>
      </div>
      <div class="content">
        <span>手机号<p>*</p></span>
        <input type="text" class="people" placeholder="请输入管理员手机号" style="font-size: .638rem" v-model="msg4"/>
      </div>
    </div>

    <div class="foot">
      <button class="btn" style="width: 8.511rem;height: 1.872rem;font-size: .767rem" @click="submit">完成</button>
    </div>
  </div>

</template>

<script>
  import { Indicator } from 'mint-ui';
  import {Toast} from 'mint-ui';
  export default {
    name: "preload",
    data() {
      return {
        msg1: '',
        msg2: '',
        msg3: '',
        msg4: '',
        msg5:'',
        src: '',
        src1: '/static/image/logo.png',
        a: "",
        b: "",
        c: ""
      }
    },
    methods: {
      //图片上传预览
      getFile(e) {
        Indicator.open({
          text: '图片上传中...',
          spinnerType: 'fading-circle'
        });
        // console.log(2111)
        let _this = this;
        var files = e.target.files[0];
        console.log(files);
        if (!e || !window.FileReader) return;  // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
        reader.onloadend = function () {
          _this.src = this.result;
          Indicator.close();
          Toast("上传成功")
        }
      },
      //点击保存按钮
      submit() {
        //验证公司
        var reg = /^[\u4e00-\u9fa5]{2,}$/;
        if (!reg.test(this.msg2) && this.msg2.length != 0) {
          alert('请输入正确的公司名称');
          return false;
        } else if (this.msg2 == "") {
          alert('请输入公司名称');
          return false;
        } else {
          this.a = 1
        }
        //验证姓名
        if (this.msg3.length <= 1 && this.msg3.length > 0) {
          alert("请输入正确的姓名");
          return false;
        } else if (this.msg3 == "") {
          alert("请输入姓名");
          return false;
        } else {
          this.b = 1
        }
        //验证手机号
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(this.msg4) && this.msg4.length != 0) {
          alert('请输入正确的手机号');
          return false;
        } else if (this.msg4.length == "") {
          alert('请输入手机号');
          return false;
        } else {
          this.c = 1
        }

        if (this.a == 1 && this.b == 1 && this.c == 1) {
          var formData = new FormData();
          formData.append("buildingId",localStorage.getItem('FbuildingId'));
          formData.append("buildingName", this.msg2);
          formData.append("userName", this.msg3);
          formData.append("phoneNo", this.msg4);
          formData.append("buildingAddress", '');
          if (document.getElementById('file').files[0] != null && document.getElementById('file').files[0] != undefined) {
            formData.append("buildingLogo", document.getElementById('file').files[0])
          }
          const options = {
            method: 'POST',
            headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
            data: formData,
            url: 'visit/building/qRCodeBind'
          };
          this.axios(options).then((res) => {
            // console.log(res.data)
            if(res.data.state==1){
              this.$store.state.message.buildingName=this.msg2;
              localStorage.setItem('buildingLogo', document.getElementById('file').files[0]);
              localStorage.setItem('buildingName', this.msg2);
              this.$store.state.phone=this.msg4,//存储手机号到登录页面
              this.$router.push({ name: 'Login'})
            }else{
              alert(res.data.retMsg)
            }

          }).catch(function (error) {
            alert(error)
          });
        }

      }

    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    width: 2.533rem;
    height: 2.021rem;
    margin: .426rem auto;
  }

  .container {
    width: 100%;
    /*display: flex;justify-content: space-around;*/

  }

  .title {
    font-size: 1.021rem;
    text-align: center;
    color: #333333;
  }

  .ask {
    margin: 2.177rem 0 1.277rem;
    font-size: .511rem;
    color: #333333;
    text-align: center;
  }

  .content {
    display: flex;
    justify-content: space-between;
    line-height: 2.533rem;
    text-align: center;
    width: 100%;
    /*background-color: red;*/
    span {
      width: 25%;
      font-size: .638rem;
      color: #333333;
      p {
        display: inline-block;
        color: #f16f6f;
        width: 1%;
      }
    }
    input {
      display: inline-block;
      width: 68%;
      line-height: 1rem;
      border: 0;
      font-size: .638rem;
    }
    .logo1 {
      width: 1.702rem;
      height: 1.277rem;
      position: relative;
      right: 5.2rem;
      top: .3rem;
    }
  }

  .btn {
    background-color: #1a96d4;
    color: #f1f1f1;
    border: 0px;
    border-radius: 5px;
    margin: 2.128rem auto;
  }

  .foot {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
