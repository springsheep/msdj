<template>
  <div class="container">

    <div class="myTitle">
      <div class='imgBox'><img :src="src==''?(msg.buildingLogo==''?src1:msg.buildingLogo):src" alt=""></div>
      <h2>{{msg.buildingWelcome }}</h2>
    </div>
    <!-- 头部结束 -->
    <div class="geduan"></div>

    <div class="tu">
      <img src="../assets/images/yes.png" alt=""/>
      <p>您的拜访已经通过审核</p>
    </div>
    <p class="foot">本页面技术由易渡提供<br>如有疑义 请致电<a :href="'tel:' + 15397031258">15397031258</a></p>
  </div>

</template>

<script type="text/javascript">
  import qs from 'qs';

  export default {
    name: 'Agree',
    data() {
      return {
        msg: '',
        num: this.$route.params.num,
        buildingId: this.$route.params.id,
        src1: '/static/image/logo.png',//先设置一个默认图片
        src: ''
      }
    },
    created() {
      this.getNewsInfo();
    },
    methods: {
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .time {
    font-size: .638rem;
    text-align: center;
  }
  h2 {
    text-align: center;
    font-size: .766rem;
    font-weight: normal
  }

  .myTitle {
    padding-bottom: .851rem;
  }

  .imgBox {
    width: 1.702rem;
    height: 1.702rem;
    background: green;
    margin: .426rem auto;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .mint-header-title {
    color: #030303;
    font-size: .638rem;
  }

  .geduan {
    height: .638rem;
    width: 100%;
    background-color: #f1f1f1;
  }

  .tu {

    img {
      width:4.255rem;
      height: 4.255rem;
      margin: 4.266rem auto .1rem;
      display: block;
    }
    p {
      text-align: center;
      color: #333;
      font-size: .638rem;
      margin-bottom: .23rem;
    }
  }

  .container {
    height: 28.1rem;
  }

  .foot {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: .426rem;
    font-size: .511rem;
    a {
      color: #4595d0;
    }
  }
</style>
