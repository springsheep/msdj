<template>
    <div>
      <div  v-for="(item,index) in kind" @click="choose(index+1,item)">
          <mt-field :label="item" readonly="readonly" >
              <img src="../../assets/images/999.png" alt=""  style="width:.9rem;height: .9rem;">
          </mt-field>
      </div>
    </div>
</template>

<script>
    export default {
        name: "newskind",
        data(){
            return{
                kind: ['停水通知','停电通知', '电梯维修', '装修通知', '消防演练', '消杀通知', '寻物招领', '办卡通知', '费用催缴', '放假通知', '温馨提示', '福利活动', '其它杂项']
            }
        },
        methods:{
            choose(m,n){
                this.$store.state.newskind=m;
                this.$store.state.newskindname=n;
                this.$router.push({path:'/NewTongzhi'})
            }
        }
    }
</script>

<style scoped>

</style>