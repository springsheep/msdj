<template>
  <div class="content">
    <!-- 顶部 -->
    <CommonHeader></CommonHeader>
    <!-- 列表开始 -->
    <div class="list">
      <ul>
        <li v-for="elet in a.visitorRecordInfo" :key="elet.code">
          <h4>{{elet.name}}:</h4>
          <p>{{elet.value}}</p>
          <label for="" v-if="elet.code==1004" class="psshow">
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import qs from 'qs';
  import CommonHeader from "./CommonHeader";

  export default {
    name: 'detail',
    components: {CommonHeader},
    data() {
      return {
        a: {}
      }
    },
    created() {
      this.a = this.$store.state.msg
    },
  }
</script>
<style lange="scss" scoped>


  .content {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

  }
  .list{
    width: 100%;

  }
  ul{
    width: 100%;
  }
  h2 {
    text-align: center;
    font-size: 0.7rem;
    font-weight: normal
  }
  .list li h4{
    width: 20%;
  }
  .list li p{
    width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list li {
    width: 100%;
    height: 2.08rem;
    line-height: 2.08rem;
    padding-left: 0.638rem;
    border-bottom: #dddddd solid 1px;
    display: flex;
  }

  .list li p {
    display: inline-block;
    color: #333;

  }

  .list h4 {
    width: 3.4rem;
    text-align: left;
    display: inline-block;
    font-size: 0.638rem;
    color: #333333;
    margin-right: 0.638rem;
    font-weight: normal;
  }

  .list p {
    font-size: 0.638rem;
  }

  .list h4 i {
    color: #f41f1f;
    margin-right: .09rem;
  }

  .list input {
    color: #333333;
    font-size: 0.638rem;
    border: none;
  }

  .list span {
    width: 2.128rem;
    height: 1.27rem;
    border: #999 solid 1px;
    display: inline-block;
    text-align: center;
    line-height: 1.27rem;
    border-radius: 0.085rem;
    margin-right: .213rem;
    color: #666;
    font-size: 0.6rem;
  }

  .list .active {
    background-color: #1a96d4;
    color: #fff;
    border: #1a96d4 solid 1px;
  }

  .list label {
    position: absolute;
    top: 0;
    left: 5.1rem;
  }
  /*input {*/
    /*line-height: 30px;*/
    /*width: 67%;*/
  /*}*/
</style>



