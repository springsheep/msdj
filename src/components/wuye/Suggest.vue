<template>

  <div class="homeBox">
    <div class="content">
      <p>请输入您的建议</p>
      <div class="textarea">
        <textarea type="text" v-model="items" ref="count" name="" clos="40" rows="10">  </textarea>
        <div class="write">{{number}}<span>/200</span></div>
      </div>
      <div class="foot">
        <button class="myButtom" @click="submit">提交</button>
      </div>
      <div class="ooo">
        <p class="ti" v-show="isOriginHei">本页面技术支持由易渡提供<br> 如有疑义 请致电<i>15397031258</i></p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {Toast} from 'mint-ui';
  export default {
    name: 'Suggest',
    data() {
      return {
        number: '0',
        items: '',
        screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要），
        originHeight: document.body.clientHeight, //默认高度在watch里拿来做比较
        originHeight: true,   // 这个属性是固定定位按钮的显隐开关
        isOriginHei: true
      }
    },
    mounted() {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          that.screenHeight = window.screenHeight
        })()
      }
    },
    watch: {
      screenHeight(val) {
        if (this.originHeight != val) {
          this.isOriginHei = false;
        } else {
          this.isOriginHei = true;
        }
      },
      items: {
        handler: function () {
          var _this = this;
          var _sum = 200;
          _this.$refs.count.setAttribute("maxlength", _sum);
          _this.number = _this.$refs.count.value.length;
        },
        deep: true,
      }
    },
    methods: {
      submit() {
        // console.log(this.items)
        if (this.items == "") {
          alert("内容为空")
        } else {
          this.$router.push({path: "/after"})
          Toast({
            message: '提交成功',
            duration: 500
          });
        }

      }

    }


  }
</script>

<style lang="scss" scoped>
  .homeBox {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    background-color: #f1f1f1;
  }

  .content {
    margin: .638rem;
    font-size: .638rem;
    p {
      color: #666;
      margin: .638rem 0;
    }
    .textarea {
      position: relative;
    }
    textarea {
      display: inline-block;
      padding: .638rem;
      resize: none;
      display: flex;
      width: 92%;
      font-size: .638rem;
      color: #333;
      border: none;
    }
    .write {
      position: absolute;
      right: .213rem;
      bottom: .213rem;
      color: #999;
    }
    .foot {
      padding-top: 1.277rem;
    }
    .myButtom {
      border: 0;
      background-color: #1a96d4;
      border-radius: .213rem;
      width: 100%;
      height: 1.872rem;
      color: #fff;
      font-size: .767rem;

    }
    .ti {
      margin: 0 auto;
      text-align: center;
      font-size: .426rem;
      color: #999999;
      i {
        color: #4595d0;
      }
    }
    .ooo {
      width: 100%;
      position: fixed;
      bottom: 0.426rem;
      left: 0;
      text-align: center;
    }
  }
</style>
