<template>
  <!--提示框组件-->
  <div  class="PublicPrompt bounceIn" v-if="showcom1">
    <img src="../../assets/images/jinggao.png" alt="" class="PublicPrompt_img">
    <p>{{prompt}}</p>
    <div @click="CertainEvents">确认</div>
  </div>
</template>

<script>
  export default {
    name: "warning",
    data(){
      return {
        showcom1:'',
      }
    },
    props:['showcom','prompt'],
    created(){
      this.showcom1=this.showcom;
    },
    methods:{
      CertainEvents(){
        this.showcom1=false;
        this.$emit('update' ,this.showcom1);
      }
    },
  }
</script>

<style scoped>
  .PublicPrompt{
    width: 12rem;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -6rem;
    margin-left: -6rem;
    border-radius: .25rem;
    box-sizing: border-box;
    padding-top: .6rem;
    text-align: center;
    background-color: #FFFFFF;
    /*transition: bounceIn 2s;*/
  }
  .PublicPrompt_img{
    width: 3rem;
    height: 3rem;
    display: inline-block;
    background-size: 100% 100%;
  }
  .PublicPrompt>p{
    margin-top: .8rem;
    margin-bottom: 0;
  }
  .PublicPrompt>div{
    width: 100%;
    line-height: 1.8rem;
    background-color: #1a96d4;
    border-radius: .2rem;
    color: white;
    margin-top: .8rem;
  }
</style>
