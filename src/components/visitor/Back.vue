<template>
  <div class="">
    <CommonHeader></CommonHeader>
    <div class="divMsg">
      <p>已经审核通过您的拜访申请，您共有<i>{{msg.validCount}}</i> 次使用机会</p>
      <p class="mt30">本次请使用下方二维码扫闸机进入</p>
      <img class="mt30" :src="msg.qrCodeUrl" alt="" srcset="">
      <p class="jishi">本二维码有效使用时间（{{time}}S）</p>
    </div>

  </div>

</template>

<script type="text/javascript">

  // import qs from 'qs';
  import CommonHeader from "../wuye/CommonHeader";
  import {MessageBox} from 'mint-ui';
  export default {
    name: 'Back',
    data() {
      return {
        msg: '',
        num: '',
        buildingId: this.$store.state.buildingId,
        src: '',
        time: '',
        a: ''//计时器
      }
    },
    created() {

      console.log(this.$store.state.message)
      this.getFirst();

      this.a = setInterval(() => {
        this.time--;
        if(this.time<0){
          MessageBox.confirm('二维码超时失效').then(action => {
            this.$router.push({path: `/index/:${this.$store.state.buildingId}`})
          });
        }
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.a)
    }
    ,
    methods: {
      //返回主界面
      goBack() {
        this.$router.push({path: `/index/${this.$store.state.buildingId}`});
      },
      //初始化获取二维码时间
      getFirst() {
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
          this.msg = res.data.data;
          this.time=this.msg.validTime;
          console.log(this.msg,111)
        })
      }
    },
    components: {CommonHeader},
    mounted() {
      if (window.history && window.history.pushState) {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    },
    destroyed() {
      window.removeEventListener('popstate', this.goBack, false);
    }
  }
</script>

<style lang="scss" scoped>
  .jishi {
    font-size: 12px !important;
    z-index: 1;
    margin-top: 0 !important;
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
    font-size: .638rem;
  }

  .geduan {
    height: .638rem;
    width: 100%;
    background-color: #f1f1f1;
  }

  .divMsg {
    p {
      text-align: center;
      margin: .638rem 1.915rem 2rem;
      font-size: .638rem;
      color: #999;
      i {
        color: #4595d0;
        padding: 0 .255rem;
      }
    }
    .mt30 {
      margin-bottom: 1.276rem;
    }
    img {
      width: 6.383rem;
      height: 6.383rem;
      margin: 0 auto;
      display: block;
    }
  }
</style>
