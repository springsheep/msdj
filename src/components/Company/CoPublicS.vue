<template>
  <div class="container">
    <ul>
      <li><a href="javascript:;"><img src="../../assets/images/1.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/2.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/3.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/4.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/5.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/6.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/7.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/8.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/9.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/10.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/11.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/12.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/13.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/14.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/15.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/16.png" alt="" srcset=""></a></li>
      <li><a href="javascript:;"><img src="../../assets/images/17.png" alt="" srcset=""></a></li>
    </ul>
    <div class="ooo">
      <p class="foot">本页面技术支持由易渡提供<br>如有疑义 请致电<i>1597031258</i>
      </p>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'CoPublicS',
    data() {
      return {}
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .container{
    height: 27.8rem;
  }
  .myHeader {
    background: #f8f8f8;
  }

  h2 {
    text-align: center;
    font-size: 17px;
    font-weight: normal
  }

  .mint-header .mint-button {
    color: #2c2c2c;
  }

  .mint-header-title {
    color: #030303;
    font-size: 16px;
  }

  ul {
    margin-top: .638rem;
    padding: 0 .426rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;

    li {
      margin-bottom: .426rem;
      width: 25%;
      display: flex;
      justify-content: center;
      a {
        width: 80px;
        height: 90px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .foot {
    text-align: center;
    margin-top: 1.277rem;
    font-size: .426rem;
    color: #999999;
    i {
      color: #4595d0;
    }
  }
  .ooo{
    width: 100%;
    position: fixed;
    bottom: 0.426rem;
    left: 0;
    text-align: center;
  }
</style>
