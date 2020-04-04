<template>
  <div class="">
    <ul>
      <li>
        <h4>姓名：</h4>
        <input type="text" id="name" placeholder="请输入姓名" :value="$store.state.AdmInfo.userName">
      </li>
      <li>
        <h4>头像：</h4>
        <div class="people">
          <img src="../../assets/images/123.png" alt="">
        </div>
      </li>
      <li>
        <h4>手机：</h4>
        <input type="text" id="phone" maxlength="11" placeholder="请输入手机号" :value="$store.state.AdmInfo.mobilePhoneNo"
               ref="second">
      </li>
      <li style="display: flex">
        <h4 >角色：</h4>
        <div id="ss" style="width:30%;font-size: .638rem" @click="change">{{juese}}
          <img src="../../assets/images/xiala.png" alt="" style="width: .5rem">
        </div>
        <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
        </mt-actionsheet>
        <!--<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>-->
      </li>
      <li>
        <h4>是否接收通知：</h4>
        <mt-switch v-model="value" style="width: 2.5rem;position: relative;top: -1.9rem;left: 12.8rem"></mt-switch>
      </li>
    </ul>
    <div class="bottom" v-if="$store.state.AdmInfo.isOneself!=0?false:true">
      <button class="delete1" @click="deletemsg">删除</button>
      <button class="submit" @click="submit">保存</button>

    </div>
    <div class="bottom" style="width: 100%" v-if="$store.state.AdmInfo.isOneself!=0?true:false">
      <button class="submit" style="width: 92%;margin: 0 auto" @click="submit">保存</button>
    </div>
  </div>
</template>

<script>
  import qs from 'qs';
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';
  export default {
    name: "CheckAdmin",
    data() {
      return {
        buildingId: localStorage.getItem('WbuildingId'),
        mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
        userRole:'',
        value:'',//判断是否接收
        slots: [
          {
            values: ['系统管理员','普通管理员'],
          }
        ],
        sheetVisible:false,
        actions:[{name:"系统管理员",method:this.xitong},{name:"普通管理员",method:this.putong}],
        juese:''
      }
    },
    methods: {
      xitong(){
        this.juese='系统管理员';
      },
      putong(){
        this.juese='普通管理员';
      },
      change(){
        this.sheetVisible=true
      },
      //删除管理员信息
      deletemsg() {
        MessageBox.confirm(
          "您确定要删除吗"
        ).then(() => {
          const data = {
            "buildingId": this.buildingId,
            "mobilePhoneNo": this.mobilePhoneNo,
            "userId": this.$store.state.AdmInfo.userId
          };
          const options = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            data: qs.parse(data),
            url: 'visit/building/deleteUser'
          };
          this.axios(options).then((response) => {
            if (response.data.state == '1') {
              this.$router.go(-1)
              Toast('删除成功');
            } else {
              Toast(response.data.retMsg);
            }
          }).catch(function (error) {
            Toast(error);
          });
        });

      },
      submit: function () {
        var userRole;
        var isReceiveMsg='';
        var name = document.getElementById('name')
        var userName = name.value
        var phone = document.getElementById('phone')
        var mobilePhoneNo =phone.value
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!reg.test(mobilePhoneNo)) {
          this.$toast("手机号码有误，请重填!");
          return false;
        }
        if (this.juese == '系统管理员') {
          userRole = "100000"
        }
        if (this.juese== '普通管理员') {
          userRole = "100001"
        }
        if (this.value == true) {
          isReceiveMsg = "0"
        }
        if (this.value == false) {
          isReceiveMsg = "1"
        }

        if (this.$store.state.AdmInfo.mobilePhoneNo != this.$refs.second.value) {
          this.$store.state.AdmInfo.mobilePhoneNo = this.$refs.second.value
        }
        const data = {
          "buildingId": this.buildingId,
          "mobilePhoneNo": this.mobilePhoneNo,
          "phoneNo": mobilePhoneNo,
          "userName": userName,
          "userRole": userRole,
          "userId": this.$store.state.AdmInfo.userId,
          'isReceiveMsg':isReceiveMsg
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
          data: qs.parse(data),
          url: '/visit/building/saveUser'
        };
        this.axios(options).then((response) => {
          if (response.data.state == '1') {
            this.$router.go(-1);
            Toast({
              message: '保存成功',
              duration: 1500
            });
          } else {
            Toast(response.data.retMsg);
          }
        }).catch(function (error) {
          Toast(error);
        });
      }
    },
    created() {
      this.value=this.$store.state.AdmInfo.isReceiveMsg=='0'?true:false;
      this.juese=this.$store.state.AdmInfo.userRole=='100000'?'系统管理员':'普通管理员'
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    border-top: #ddd solid 1px;
    li {
      height: 2.085rem;
      line-height: 2.085rem;
      padding-left: 0.638rem;
      border-bottom: #ddd solid 1px;
      select {
        width: 5rem;
        border: none;
        background-color: #fff;
        height: 1.277rem;
      }
    }

    .people {
      width: 1.277rem;
      height: 1.277rem;
      display: inline-block;
      vertical-align: middle;
      img {
        width: 100%;
        height: 100%;
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

  .bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 1.872rem;
    margin-top: 1.277rem;

  }

  .delete1, .submit {
    height: 1.915rem;
    display: inline-block;
    width: 44%;
    border: none;
    border-radius: .213rem;
    color: #fff;
    background: #1a96d4;
    font-size: .766rem;
  }

  .delete1 {
    background-color: red;
  }
</style>

