<template>
  <div>
   <mt-swipe :auto="4000">
      <mt-swipe-item >
        <img src="../../assets/images/banner01.jpg" alt="" class="full">
      </mt-swipe-item>
      <mt-swipe-item >
        <img src="../../assets/images/banner02.jpg" alt="" class="full">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  // props: ["lunbotuList", "isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 3.83rem;
 
  .mint-swipe-item {
    text-align: center;
npm
    img {
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>
