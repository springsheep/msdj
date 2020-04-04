<template>
    <div>
        <div class="head"
             style="width: 100%;display: flex;justify-content: space-around;padding: .422rem 0;border-bottom: .1px solid #f1f1f1">
            <div class="head_title" style="width: 20%;font-size: .638rem;text-align: center;line-height: 1.877rem">类型*
            </div>
            <div style="width: 80%;line-height: 1.877rem">
                <el-button :type="choose==1?'primary':''" size="medium" style="font-size: .638rem" @click="choose=1">
                    保修
                </el-button>
                <el-button :type="choose==2?'primary':''" plain size="medium" style="font-size: .638rem"
                           @click="choose=2">投诉
                </el-button>
            </div>
        </div>
        <div class="head" style="width: 100%;border-bottom: .1px solid #f1f1f1;">
            <div class="head_title" style="width: 20%;font-size: .638rem;text-align: center;line-height: 1.877rem">内容*
            </div>
            <div style="width: 80%;position: relative;left: 3rem;top: -1.447rem;">
                <textarea cols="30" rows="22" maxlength="200"
                          style="width: 100%;border: 0;resize: none;font-size: .638rem" ref="count" v-model="items"
                          :placeholder="`输入${choose==1?'保修':'投诉'}内容`"></textarea>
                <div class="write" style="margin-left: 10.9rem;position: relative;top: 1rem">{{number}}<span>/200</span>
                </div>
            </div>

        </div>
        <div class="bottom" style="width: 100%;display: inline-block;position: absolute;top: 23rem;bottom: 0">
            <div style="font-size: .877rem;color: #f1f1f1;background-color: #1a96d4;width: 92%;line-height: 1.766rem;text-align: center;margin: 0 auto;border-radius: 5px">
                提交
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CoBaoXiu",
        data() {
            return {
                number: '0',
                items: '',
                choose: 1
            }
        },
        watch: {
            items() {
                this.number = this.$refs.count.value.length;
            }
        }
    }
</script>

<style scoped>

</style>
