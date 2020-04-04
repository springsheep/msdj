<template>
  <div class="container">
    <!--<div style="text-align: right;font-size: .638rem;line-height: 1.4rem;padding-right: .838rem ;background-color: #1a96d4;color: #f1f1f1"@click="back">返回</div>-->
    <ul class="table">
      <li v-for="(es,index) in list" :key="index" class="lis" @click="gogogo(es)">
        <a href="javascript:;">
          <label for="" class="labelcon">
            <img v-if="es.flag==0" src="../../assets/images/business.png">
            <img v-if="es.flag==1" src="../../assets/images/audition.png">
            <img v-if="es.flag==2" src="../../assets/images/people.png">
            <img v-if="es.flag==3" src="../../assets/images/other.png">
            <img v-if="es.flag!=0&&es.flag!=1&&es.flag!=2&&es.flag!=3" src="../../assets/images/business.png">
          </label>
          <div class="media">
            <h4>{{es.companyName}}</h4>
            <div class="msg">
              <span>时间：{{es.registerTime}}</span>
              <span>拜访人：{{es.visitorName}} </span>
            </div>
          </div>

        </a>
        <div class="img"><img src="../../assets/images/999.png" alt=""></div>
      </li>
    </ul>
    <div class="empty" style="text-align: center;margin-top: 50%" v-show="Object.keys(this.list).length==0">
      <img src="../../assets/images/empty.png" alt="" style="width: 4.255rem">
      <div style="font-size: .638rem;color: #999999;margin-top: .2rem">暂无拜访记录</div>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui'

  export default {
    name: "Admshenhe",
    data() {
      return {
        list: [],
        buildingId: localStorage.getItem('WbuildingId'),
        mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
      }
    },
    created() {
      this.getData();//页面初始化
    },
    methods: {
      //返回设置页面
      back() {
        this.$router.push({name: 'Property'})
      },
      gogogo(i) {
        this.$router.push({
          path: '/sure',
          name: 'sure',
          params: {"buildingId": this.buildingId, "visitorRecordId": i.visitorRecordId}
        });
        this.$store.state.msg = i
      },
      getData() {
        const data = {
          "buildingId": this.buildingId,
          "mobilePhoneNo": this.mobilePhoneNo
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
          data: data,
          url: 'visit/building/getVisitorReviewList'
        };
        this.axios(options).then((response) => {
          if (response.data.state == '1') {
            // console.log(response.data)
            if(response.data.data.visitorReviewList!=null){
              this.list = response.data.data.visitorReviewList;
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .img {
    width: .638rem;
    height: .638rem;
    position: relative;
    left: 14rem;
    top: -1.6rem;
    z-index: 100;
    img {
      width: 100%;
      height: 100%;
      z-index: 100;
    }
  }

  .table {
    border-top: #ddd solid .5px;
    li {
      border-bottom: #ddd solid .5px;
      height: 2.553rem;
      padding-left: .638rem;
      a {
        height: 2.553rem;
        display: block;
        overflow: hidden;
        label {
          float: left;
        }
        img {
          width: 1.702rem;
          height: 1.702rem;
          margin: .426rem .638rem 0 0;

        }
        .media {
          float: left;
          margin-top: .34rem;
          h4 {
            height: 1.064rem;
            line-height: 1.063rem;
            color: #333;
            font-size: .638rem;
          }
          .msg {
            height: 0.851rem;
            color: #999;
            font-size: .511rem;

            span {
              height: 0.851rem;
              display: inline-block;
              margin-right: 0.638rem;

            }
          }
        }
      }
    }
  }
</style>
