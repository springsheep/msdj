<template>
  <div class="">
    <ul>
      <li>
        <h4>姓名：</h4>
        <input type="text" id="name" placeholder="请输入姓名">
      </li>
      <li>
        <h4>头像：</h4>
        <div class="people">
          <img src="../../assets/images/123.png" alt="">
        </div>
      </li>
      <li>
        <h4>手机：</h4>
        <input type="text" id="phone" maxlength="11" placeholder="请输入手机号" v-model="msg">
      </li>
      <li>
        <h4>类别：</h4>
        <span>
          <span
            style="display: inline-block;line-height: 1.5rem;padding: 0 .638rem;font-size: .638rem;border-radius: 5px;border: .1px solid rgba(0,0,0,0.1); margin-top: .3rem"
            @click="choosexitong" :class="{xuanzhong:xuanzhong}">系统管理员</span>
          <span
            style="display: inline-block;line-height: 1.5rem;padding: 0 .638rem;font-size: .638rem;border-radius: 5px;border: .1px solid rgba(0,0,0,0.1);margin-left: .638rem"
            @click="chooseputong" :class="{xuanzhong:!xuanzhong}">普通管理员</span>
        </span>
      </li>
      <li style="">
<!--        <mt-checklist title="权限列表" v-model="value" :options="options">-->
<!--        </mt-checklist>-->
        <h4 style="">权限：</h4>
        <div style="display: flex;flex-wrap: wrap;flex-direction: column" v-if="xuanzhong">
          <el-checkbox v-model="checked1" style="line-height: 2rem;font-size: .638rem">管理员增加/删除</el-checkbox>
          <el-checkbox v-model="checked2" style="line-height: 2rem;font-size: .638rem">管理员信息修改</el-checkbox>
          <el-checkbox v-model="checked3" style="line-height: 2rem;font-size: .638rem">来访申请审核</el-checkbox>
          <el-checkbox v-model="checked4" style="line-height: 2rem;font-size: .638rem">外部采购申请</el-checkbox>
          <el-checkbox v-model="checked5" style="line-height: 2rem;font-size: .638rem">外部采购审核</el-checkbox>
        </div>
        <div style="display: flex;flex-wrap: wrap;flex-direction: column" v-if="!xuanzhong">
          <el-checkbox v-model="checked3" style="line-height: 2rem;font-size: .638rem">来访申请审核</el-checkbox>
          <el-checkbox v-model="checked4" style="line-height: 2rem;font-size: .638rem">外部采购申请</el-checkbox>
        </div>

      </li>
    </ul>
    <div class="foot">
      <button @click="submit">保存</button>
    </div>

  </div>
</template>

<script type="text/javascript">
  import qs from 'qs';
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {

    name: 'CoAdm',
    data() {
      return {
        buildingId: this.$store.state.buildingId,
        msg: "",
        options:"",
        checked1: false, checked2: false, checked3: false, checked4: false, checked5: false,
        xuanzhong: true,
      }
    },
    methods: {
      choosexitong() {
        this.xuanzhong = true;
      },
      chooseputong() {
        this.xuanzhong = false;
      },
      //保存
      submit: function () {
        // var userRole = '';
        // var name = document.getElementById('name')
        // var userName = name.value
        // var mobilePhoneNo = this.$store.state.mobilePhoneNo
        // // console.log(userName.length)
        // if (userName.length == 0) {
        //   MessageBox('提示', '请输入姓名');
        //   return false;
        // }
        // var reg = /^[1][3,4,5,7,8][0-9]{9}$/
        // if (!reg.test(mobilePhoneNo) && mobilePhoneNo.length != 0) {
        //   MessageBox('提示', '请选择正确的手机号');
        //   return false;
        // } else if (mobilePhoneNo.length == 0) {
        //   MessageBox('提示', '请输入手机号');
        //   return false;
        // }
        // var mySelect = document.getElementById('ss');
        // var index = mySelect.selectedIndex;
        // var text = mySelect.options[index].text; // 选中文本
        // if (text == '系统管理员') {
        //   userRole = "100000"
        // }
        // if (text == '普通管理员') {
        //   userRole = "100001"
        // }
        // console.log(this.msg, "msg")
        // const data = {
        //   "buildingId": this.$store.state.buildingId,
        //   "mobilePhoneNo": this.$store.state.mobilePhoneNo,
        //   "userName": userName,
        //   "userRole": userRole,
        //   "phoneNo": this.msg,
        // };
        // const options = {
        //   method: 'POST',
        //   headers: {'content-type': 'application/json', 'token': this.$store.state.success},
        //   data: qs.parse(data),
        //   url: '/visit/building/saveUser'
        // };
        // this.axios(options).then((response) => {
        //   if (response.data.state == '1') {
        //     this.$router.go(-1);
        //     Toast({
        //       message: '保存成功',
        //       duration: 500
        //     });
        //   } else {
        //     Toast(response.data.retMsg);
        //   }
        // }).catch(function (error) {
        //   console.log(error);
        // });

      }
    }
  }
</script>

<style lang="scss" scoped>
  .xuanzhong {
    background-color: #1a96d4;
    color: #f1f1f1;
  }

  ul {
    margin-top: 0px;
    border-top: #ddd solid 1px;

    li {
      line-height: 2.085rem;
      padding-left: 0.638rem;
      border-bottom: #ddd solid 1px;
      display: flex;
      align-items: center;
      select {
        width: 5rem;
        border: none;
        background-color: #fff;
        height: 1.277rem;
      }
    }

    .people {
      vertical-align: 1rem;
      width: 1.277rem;
      height: 1.277rem;
      img {
        width: 100%;
        height: 100%;
        position: relative;
        margin-bottom: 2rem;
      }
    }
    h4 {
      display: inline-block;
      color: #333;
      margin-right: 1.489rem;
    }
    input {
      border: none;
    }

  }

  .foot {
    /*margin:1.277rem 15px 0.38rem 0;*/
    height: 1.872rem;
    margin-top: 1.277rem;
    display: flex;
    justify-content: center;

    button {
      height: 1.874rem;
      display: inline-block;
      width: 14.687rem;
      // background-color: #1a96d4;
      border: none;
      border-radius: 5px;
      color: #fff;
      background: #1a96d4;
      font-size: 0.767rem;
    }
  }

  select, h4, input {
    font-size: 0.638rem;
  }

  option {
    font-size: .4rem;
  }

  input {
    line-height: 1.277rem;
    width: 67%;
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
