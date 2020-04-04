<template>
  <div id="app">
    <transition name="slide-fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="slide-fade">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
  import {} from './utils/resize'
  import CoLogin from "./components/Company/CoLogin";
  import CoProperty from "./components/Company/CoProperty";

  export default {
    name: 'App',

    data() {
      return {}
    },
    components: {CoProperty, CoLogin},
    created() {
      //在页面加载时读取sessionStorage里的状态信息
      if (localStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        localStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    }
  }
</script>

<style>

  .slide-fade {
    position: absolute;
    left: 0;
    right: 0;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    left: 0;
    right: 0;
    transform: translateY(10px);
    opacity: 0;
  }
#app{
  height: 100%;
  width: 100%;
}

</style>
