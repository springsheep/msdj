<template>
  <div class="container">
    <ul class="table">
      <li v-for="(es,index) in list.visitorReviewList" :key="index" class="lis" @click="gogogo(es)">
        <a href="javascript:">
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
    <div class="empty" style="text-align: center;margin-top: 50%" v-show="list.visitorReviewList==null">
      <img src="../../assets/images/empty.png" alt="" style="width: 4.255rem">
      <div style="font-size: .638rem;color: #999999;margin-top: .2rem">暂无拜访记录</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CoAdmshenhe",
    data() {
      return {
        list: {},
        companyId: localStorage.getItem('companyId'),
        mobilePhoneNo: localStorage.getItem('CmobilePhoneNo'),
        buildingId: localStorage.getItem('CbuildingId'),
        token:localStorage.getItem('CToken'),
      }
    },
    methods: {
      gogogo(i) {
        this.$router.push({path: '/Cosure',name:'Cosure',params:{"buildingId":this.buildingId,"visitorRecordId":i.visitorRecordId}})
      },
      getData() {
        const data = {
          "buildingId": this.buildingId,
          "mobilePhoneNo": this.mobilePhoneNo,
          'companyId':this.companyId
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token':this.token},
          data: data,
          url: 'visit/company/getVisitorReviewList'
        };
        this.axios(options).then((response) => {
          this.list = response.data.data;
          console.log(response.data);
          console.log(response.data,1111)

        })
      },
    },
    created() {
      this.getData();
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
