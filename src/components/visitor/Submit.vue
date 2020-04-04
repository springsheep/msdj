<template>
  <div class="container">
    <CommonHeader></CommonHeader>
    <div class="tu">
      <img src="../../assets/images/time.png" alt=""/>
      <p>您的信息正在审核中</p>
      <div class="time">{{minute}}:{{second}}</div>
    </div>

    <div class="banner">
      <swiper></swiper>
    </div>
  </div>

</template>

<script type="text/javascript">
  import swiper from "../common/swiper";
  import CommonHeader from "../wuye/CommonHeader";

  export default {
    data() {
      return {
        msg: '信雅达科技大厦欢迎您',
        minutes: 1,
        seconds: 0,
        time: 60,
        destory: 0,
        a: '',
        b: '',
        message: {}
      }
    },
    mounted() {
      this.add();
      this.a = setInterval(() => {
        this.time--;
        this.getData();
        if (this.message.reviewStatus === "1") {
          // this.$router.push({path: '/Pass'})
          if (this.message.reviewResult === '0') {
            this.$router.push({path: '/Pass'})
          } else {
            this.$router.push({name: 'Back'})
          }
        } else if (this.message.reviewStatus === "2") {
          this.$router.push({path: '/Oppose'})
        }
      }, 2000);
      this.b = setTimeout(() => {
        if (this.message.reviewResult === '0') {
          this.$router.push({path: '/Pass'})
        } else {
          this.$router.push({name: 'Back'})
        }

        clearInterval(this.a)
      }, 60000)
    },
    methods: {
      getData() {
        const data = {
          "buildingId": this.$store.state.visitInfo.buildingId,
          "visitorRecordId": this.$store.state.visitInfo.visitorRecordId
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          data: data,
          url: '/visit/visitor/getReviewResult'
        };
        this.axios(options).then((res) => {
          this.message = res.data.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      num: function (n) {
        return n < 10 ? '0' + n : '' + n
      },
      add: function () {
        var _this = this;
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59;
            _this.minutes -= 1
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0;
            window.clearInterval(time)
          } else {
            _this.seconds -= 1
          }
        }, 2000)
      }
    },
    watch: {
      second: {
        handler(newVal) {
          this.num(newVal)
        },
        time: {
          function() {
            // console.log(1)
          }
        }
      },
      minute: {
        handler(newVal) {
          this.num(newVal)
        }
      }
    },
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    },
    components: {
      CommonHeader,
      swiper
    },
    beforeDestroy() {
      clearInterval(this.a);
      clearTimeout(this.b)
    }
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
    /*background: green;*/
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
      width: 2.723rem;
      height: 2.723rem;
      margin: 4.255rem auto .638rem;
      display: block;
    }
    p {
      text-align: center;
      color: #333;
      font-size: .638rem;
      margin-bottom: .23rem;
    }
  }

  .banner {
    margin-top: .851rem;
    position: fixed;
    bottom: 0;
    width: 100%
  }

  .banner img {
    width: 100%;
    height: 100%;
  }

  .container {
   height: 100%;
  }
</style>
