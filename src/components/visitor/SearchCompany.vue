<template>
  <div style="width: 100%;padding-top: .4rem;" >
    <div class="head"
         style="width: 88%;margin: 0 auto;line-height: 1.7rem;font-size: .638rem;border: .5px solid #999999 ;padding: 0 .4rem ;margin-bottom: 1.277rem">
      <input type="text" placeholder="请输入公司名称" style="width: 85%;border: 0;line-height: 1rem" v-model="content">
      <span
        style="display: inline-block;text-align: center;border-left: 1px solid #999999;line-height: .85rem;width: 13%;color: #999999"
        @click="quxiao">取消</span>
    </div>
    <!--全部的时候-->
    <div class="content" v-if="showcon" style="font-size: .638rem;color: #333333">
      <div  >
        <div v-for="(value,key) in message"  :key="key" style="">
          <div style="background: #f1f1f1;padding-left: .638rem;line-height: 1.702rem">{{key}}</div>
          <div style="display: flex;justify-content: space-between;align-items: center;border-bottom: .5px solid #f1f1f1;line-height: 2.02rem;padding: 0 .638rem" v-for="(i,index) in value" @click="sureInfo1(i)" :key="index">
            <div style="display: flex;align-items: center">
              <img src="../../assets/images/logo.png" alt="" style="width: auto;height: 1.1rem;">
            </div>
            <div  style="font-size: .638rem;margin-left: .3rem;width:12rem;text-align: left">{{i.companyName}}</div>
            <img src="../../assets/images/right.png" alt="" style="height: .422rem;width: .3rem">
          </div>
        </div>
      </div>
    </div>
    <!--搜索结果-->
    <div class="result" v-if="!showcon" style="border-top: 1px solid rgba(0,0,0,0.1)">
      <div
        style="height: 2.128rem;padding: 0 .638rem;display: flex;align-items: center;border-bottom: 1px solid rgba(0,0,0,0.1)"
        v-for="item in results" @click="sureInfo(item)">
        <img src="../../assets/images/logo.png" alt="" style="height: 1.277rem;width: auto">
        <span style="display: inline-block;line-height: 1rem;font-size: .638rem;margin-left: .638rem"
              v-html='item.value.companyName'></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchCompany",
    data() {
      return {
        content: '',
        showcon: true,//控制所有公司显影
        timer: '',
        results: [],
        message: {},
        keys: [],
        values: []
      }
    },
    watch: {
      content() {
        if (this.content == '') {
          this.showcon = true;
        } else {
          this.showcon = false;
          this.clearTimer();
          this.timer = setTimeout(() => {
            const data = {
              "buildingId": localStorage.getItem('FbuildingId'),
              "companyName": this.content
            };
            const options = {
              method: 'POST',
              headers: {'content-type': 'application/json'},
              data: data,
              url: 'visit/visitor/getCompanyList'
            };
            this.axios(options).then((res) => {
              this.changeColor(res.data.data)
            }).catch(function (error) {
            });
          }, 1000);
        }
      }
    },
    methods: {
      sureInfo1(i){
        // console.log(i);
        let name = i.companyName;
        let obj ={'name':name,'value':i};
        localStorage.setItem('ComInfo',JSON.stringify(obj));
        this.$router.go(-1)
      },
      sureInfo(i) {
        this.$store.state.comInfo = i;
        localStorage.setItem('ComInfo',JSON.stringify(i));
        this.$router.go(-1)
      },
      clearTimer() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.results = []
        }
      },
      //点击取消
      quxiao() {
        this.$router.go(-1)
      },
      changeColor(resultsList) {
        if (resultsList == null) {
          resultsList = [];
        }
        for (let i in resultsList) {
          for (let j in resultsList[i]) {
            if (this.content && this.content.length > 0) {
              // 匹配关键字正则
              let replaceReg = new RegExp(this.content, 'g');
              // // 高亮替换v-html值
              let replaceString = '<span class="search-text" style="color:red;">' + this.content + '</span>';
              let obj={name:resultsList[i][j].companyName,value:resultsList[i][j]};
              obj.value.companyName = resultsList[i][j].companyName.replace(replaceReg, replaceString);
              this.results.push(obj)
            }
          }


        }
      },
      //初始化
      getInfor() {
        const data = {
          "buildingId": localStorage.getItem('FbuildingId')
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          data: data,
          url: 'visit/visitor/getCompanyList'
        };
        this.axios(options).then((res) => {
          if (res.data.state == 1) {
            this.message = res.data.data

          }
        }).catch(function (error) {
        });
      },
    },

    created() {
      this.getInfor()
    }
  }
</script>

<style scoped>
  input::-webkit-input-placeholder {
    color: #dddddd;
  }

  .search-text {
    color: red;
  }
</style>
