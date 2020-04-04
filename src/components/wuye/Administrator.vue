<template>
  <div class="">
    <ul>
      <li v-for="item in msg" :key="item.mobilePhoneNo" @click="incheck(item)">
        <div class="people">
          <img src="../../assets/images/123.png" alt="">
        </div>
        <p>{{item.userName}}</p>
      </li>
    </ul>
    <div class="foot">
      <i><img src="../../assets/images/add.png" alt=""></i>
      <router-link :to="'/wuye/admin/adpeople'">
        <button>添加管理员</button>
      </router-link>
    </div>
  </div>
</template>

<script type="text/javascript">
  import qs from 'qs';
  import {Indicator} from 'mint-ui'
  import {Toast} from 'mint-ui';
  export default {
    name: 'Administrator',
    data() {
      return {
        buildingId: localStorage.getItem('WbuildingId'),
        mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
        msg: '',
        userName: '',
        userRole: ''
      }
    },
    created() {
      Indicator.open('加载中...');
      this.getData()
    },
    methods: {
      //点击进入每个管理员
      incheck(i) {
        this.$router.push({path: '/check'});
        this.$store.state.AdmInfo = i;
        console.log(i)
      },
      //页面初始化
      getData: function () {
        const data = {
          "buildingId": this.buildingId,
          "mobilePhoneNo": this.mobilePhoneNo,
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
          data: qs.parse(data),
          url: 'visit/building/getUserList'
        };
        this.axios(options).then((response) => {
          if(response.data.state=='1'){
            this.msg = response.data.data;
          }else {
            Toast(response.data.retMsg)
          }
          Indicator.close();
        }).catch(function (error) {
          Toast(error)
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    border-top: #ddd solid 1px;
    li {
      a {
        display: block;
      }
      height: 2.085rem;
      line-height: 2.085rem;
      padding-left: .638rem;
      border-bottom: #ddd solid 1px;
    }
    .people {
      width: 1.277rem;
      height: 1.277rem;
      margin-right: .426rem;
      display: inline-block;
      vertical-align: middle;
      img {
        width: 100%;
        height: 100%;
        margin-bottom: 2rem;
      }
    }
    p {
      display: inline-block;
      color: #333;
      font-size: .638rem;
    }
    span {
      width: .255rem;
      height: .851rem;
      display: inline-block;
      float: right;
      margin-right: .638rem;
      img {
        width: 100%;
      }
    }
  }

  .foot {
    margin: 1.277rem .638rem 0;
    height: 1.915rem;
    position: relative;
    button {
      height: 1.915rem;
      display: inline-block;
      width: 100%;
      border: none;
      border-radius: 5px;
      color: #fff;
      background: #1a96d4;
      font-size: .681rem;
    }
    .mybutton {
      margin-top: .426rem;
    }
    i {
      width: 0.851rem;
      height: 0.851rem;
      position: absolute;
      left: 50%;
      margin-left: -2.766rem;
      top: 50%;
      margin-top: -.425rem;
      img {
        width: 100%;
      }
    }
  }

</style>
