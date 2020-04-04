<template>
  <div class="container" style="padding-top: 2.128rem;height: 100%">
    <div style="text-align: center"><img src="../../assets/images/logo.png" alt="" class="logo">
    </div>
    <div class="title" style="font-size: 1.212rem;">码上登记</div>
    <div style="font-size: .638rem;text-align: center;color: #666666;margin: .638rem auto">Version 2.0</div>
    <div class="body" style="margin-top: 2.55rem">
      <div class="content " style="border-top: .5px solid #dddddd" @click="inus">
        <span>功能介绍</span>
        <img src="../../assets/images/999.png" alt=""
             style="width:.511rem;height: .511rem;margin-top: 1rem;margin-right: .638rem">
      </div>
      <div class="content" style="border-top: .5px solid #dddddd;border-bottom: .5px solid #dddddd"
           @click="introduce">
        <span>建议反馈</span>
        <img src="../../assets/images/999.png" alt=""
             style="width:.511rem;height: .511rem;margin-top: 1rem;margin-right: .638rem">
      </div>
    </div>
    <div class="banner">
        <p class="foot">本页面技术由易渡提供<br>如有疑问 请致电<a :href="'tel:' + 15397031258">15397031258</a></p>
    </div>
  </div>

</template>

<script>
  export default {
    name: "introduce",
    data() {
      return {
        msg1: '',
        msg2: '',
        msg3: '',
        msg4: ''
      }
    },
    methods: {
      //进入反馈
      introduce() {
        this.$router.push({name: "Suggest"})
        // console.log(111)
      },
    //  进入功能介绍
      inus(){
        this.$router.push({path:'/introduceUs'})
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
    span {
      width: 25%;
      font-size: .638rem;
      color: #333333;
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
      right: 5.4rem;
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
    text-align: center;
    font-size: .426rem;
    a {
      color: #4595d0;
    }
  }

  .banner {
    position: fixed;
    bottom: .426rem;
    left: 0;
    right: 0;
  }
</style>
