<template>
  <div style="">
    <!-- 登录 -->
    <div class="head" style="font-size: .767rem">管理员登录</div>
    <div class="useLogin">
      <div class="phone">
        <span>手机</span>
        <input type="number" pattern="[0-9]*" class="people" placeholder="请输入手机号" style="font-size: .638rem"
               v-model="msg2"/>
      </div>
      <div class="pass">
        <span>密码</span>
        <input v-model="msg3" type="text" pattern="[0-9]*" class="password pass1" placeholder="请输入验证码"
               style="width: 5.5rem;font-size: .638rem"/>
        <span style="font-size: .638rem;color: grey"  ref="ppp">发送验证码</span>
      </div>
      <div class="mybutton mybutton1">登录</div>
    </div>
    <div class="banner">
      <p class="foot">本页面技术由易渡提供<br>如有疑问 请致电<a :href="'tel:' + 15397031258">15397031258</a></p>
      <!--<swiper></swiper>-->
    </div>
</template>

<script>
    export default {
        name: "try"
    }
</script>

<style lang="scss" scoped>
  .head {
    font-size: .851rem;
    color: #000000;
    text-align: center;
    margin-top: 1.2rem;
  }

  .mybutton1 {
    border: #ddd solid 1px;
    border-radius: .235rem;
    margin-top: 1.7rem;
  }

  .phone, .pass {
    border-bottom: 1px solid #dddddd;
  }

  .useLogin {
    margin-top: 1.1rem;
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    span {
      font-size: 0.638rem;
    }
    input, .mybutton {
      height: 1.83rem;
      border: 0;
      /*border: #ddd solid 1px;*/
      /*border-radius: .235rem;*/
      width: 12.364rem;
    }
    input {
      width: 9.064rem !important;
      padding-left: 1.695rem;
      font-size: .638rem;
      margin-top: .8rem;
      margin-bottom: 0.2rem;

    }
  }

  .mybutton {
    width: 12rem !important;
    background-color: #1a96d4;
    color: #ffffff;
    font-size: .638rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    outline: none;
    border: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
  }

  h2 {
    text-align: center;
    font-size: .723rem;
    font-weight: normal
  }

  .myTitle {
    padding-bottom: .638rem;
  }

  .imgBox {
    width: 1.7rem;
    height: 1.7rem;

    margin: .426rem auto;
    img {
      width: 100%;
      height: 100%;
    }

  }

  .mint-header .mint-button {
    color: #2c2c2c;
  }

  .mint-header-title {
    color: #030303;
    font-size: .68rem;
  }

  .geduan {
    height: .426rem;
    width: 100%;
    background-color: #f1f1f1;
  }

  .foot {
    text-align: center;
    margin-top: .851rem;
    margin-bottom: .68rem;
    font-size: .426rem;
    a {
      color: #4595d0;
    }
  }

  .banner {
    margin-top: 8.815rem;
    width: 100%;
    z-index: 10;
    color: #999999;
  }

</style>

