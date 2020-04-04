<template>
  <div class="container">
    <ul>
      <div class="empty" style="text-align: center;margin-top: 50%;position: fixed;left: 5.9rem" v-show="msg==null">
        <img src="../../assets/images/empty.png" alt="" style="width: 4.255rem">
        <div style="font-size: .638rem;color: #999999;margin-top: .2rem">暂无公司记录</div>
      </div>
      <li v-for="(item, index) in msg" :key="index" @click="InCompany(item)">
        <router-link :to="{path:'/CompanyInfo',query:{message:item}}">
          <div class="people">
            <!--<img :src="item.companyLogo" alt="">-->
            <img :src="item.companyLogo" alt="" srcset="" v-if="item.companyLogo!=null">
            <img src="../../assets/images/logo.png" alt="" srcset="" v-if="item.companyLogo==null" class="img1"
                 style="width: 1.277rem;height: auto;max-height: 1.277rem">
          </div>
          <p>{{item.companyName}}</p>
          <img src="../../assets/images/right.png" alt="" class="img">
        </router-link>
      </li>
    </ul>

    <div class="foot1">
      <div class="foot">
        <router-link to="/wuye/into/intopro">
          <button>添加公司</button>
        </router-link>
      </div>
      <div class="foot foottb">
        <button class="btn1" @click="synchro1">同步信息</button>
      </div>
    </div>


  </div>
</template>

<script type="text/javascript">
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui'
  export default {
    name: 'Administrator',
    data() {
      return {
        msg: {},
        msg1: {},
        buildingId: localStorage.getItem('WbuildingId'),
        mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
      }
    },
    methods: {
      //点击同步
      synchro1() {
        Indicator.open('同步中...');
        const data = {
          "buildingId": this.buildingId,
          "mobilePhoneNo": this.mobilePhoneNo
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
          data: data,
          url: 'visit/building/companyInfoSync'
        };
        this.axios(options).then((response) => {
          console.log(this.msg,111)
          if (response.data.state == '1') {
            // this.$router.go(0);
            Indicator.close()
            Toast({
              message: '同步成功',
              duration: 1500
            });
          }else{
            Indicator.close()
            Toast({
              message: response.data.retMsg,
              duration: 1500
            });
          }
        }).catch(function (error) {
          Indicator.close()
          Toast({
            message: error,
            duration: 1500
          });
        });
        setTimeout(() => {
          // this.$router.go(0)
        }, 100)
      },
      //点击进入公司详情
      InCompany(i) {
        //存储公司信息到vuex
        this.$store.state.CompanyInfo = i;
        // console.log(this.$store.state.CompanyInfo,1)
        this.msg1 = i;
      }
    }, updated() {
      // this.$store.state.CompanyInfo=this.msg1
    },
    created() {
      Indicator.open('加载中...');
      const data = {
        "buildingId": this.buildingId,
        "mobilePhoneNo": this.mobilePhoneNo
      };
      const options = {
        method: 'POST',
        headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
        data: data,
        url: 'visit/building/getCompanyList'
      };
      this.axios(options).then((response) => {
        Indicator.close();
        this.msg = response.data.data;
      }).catch(function (error) {
        console.log(error);
      });
    }

  }
</script>

<style lang="scss" scoped>
  ul {
    border-top: #ddd solid 0.5px;
    margin-bottom: 3rem;
    li {

      a {
        /*display: block;*/
        display: flex;
        align-items: center;
      }
      height: 2.128rem;
      line-height: 2.128rem;
      padding-left: .638rem;
      border-bottom: #ddd solid .5px;
    }
    .people {
      width: 1.277rem;
      height: 1.277rem;
      // margin-top: 10px;
      margin-right: .426rem;
      display: inline-block;
      /*vertical-align: .4rem;*/
      img {
        width: 100%;
        height: auto;
      }
    }
    p {
      display: inline-block;
      color: #333;
      font-size: .638rem;
      width: 11.277rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .img {
      height: .426rem;
      width: .255rem;
      margin-left: 1.5rem;
    }

  }

  .foot {
    height: 1.915rem;
    position: relative;
    width: 44%;
    button {
      height: 1.915rem;
      display: inline-block;
      width: 100%;
      // background-color: #1a96d4;
      border: none;
      border-radius: .213rem;
      color: #fff;
      background: #1a96d4;
      font-size: .766rem;
    }
    i {
      width: .851rem;
      height: .851rem;
      position: absolute;
      left: 50%;
      margin-left: -2.638rem;
      top: 50%;
      margin-top: -0.426rem;
      img {
        width: 100%;
      }
    }
  }

  .foottb {
    margin-top: .426rem;
    i {
      margin-left: -3.064rem;
    }
  }

  .foot1 {
    position: fixed;
    bottom: 0;
    width: 100%;
    /*display: flex;*/
    /*justify-content: space-between;*/
    background-color: white;
    padding: .426rem 0;
  }

  .foot {
    float: left;
  }

  .foot:nth-child(1) {
    margin-left: .638rem;
  }

  .foot:nth-child(2) {
    margin: 0 .638rem;
  }

  .container {
    height: 28.383rem;
  }
</style>


