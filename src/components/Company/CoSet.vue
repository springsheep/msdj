<template>
  <div class="container">
    <div class="first" @click="tomanger">
      <span>管理员设置</span>
      <img src="../../assets/images/right.png" alt="">
    </div>
    <div class="first" @click="tofangke">
      <span>访客端设置</span>
      <img src="../../assets/images/right.png" alt="">
    </div>
    <div class="first" @click="toshenhe">
      <span>审核设置</span>
      <img src="../../assets/images/right.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CoSet",
    methods: {
      tomanger() {
        this.$router.push({path: '/CoAdAm'})
      },
      tofangke() {

      },
      toshenhe() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    div {
      font-size: .638rem;
      line-height: 2.18rem;
      border-bottom: .5px solid rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      padding: 0 .638rem;
      span {

      }
      img {
        height: .5rem;
        position: relative;
        top: .73rem;
      }
    }
  }
</style>
