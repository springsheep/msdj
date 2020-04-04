<template>
    <div class="app">
        <div class="xw-header">
            <div class="xw-header-content" @touchstart="showInfo" style="position: relative">
                <div :class="[toShowMaskInfo ? '' : 'bounceInUp' , 'animated']" style="    ">
                    <div class="w-header-logox  pulse animated " style="animation-iteration-count:999">
                        <img src="../../assets/robotlogo.png" alt="" style="">
                    </div>
                    <div class="xw-header-title-wrap" style="width: 100%">
                        <div class="xw-header-title" style="width: 100%">访客登记助理小渡，很高兴为您服务...</div>
                    </div>
                </div>
                <div style="position: absolute;right: 20px;bottom: 13px;">
                    <img src="../../assets/robotlisten.png" alt="" style="width: .638rem;height: .638rem"
                         @click="listen=false" v-if="listen">
                    <img src="../../assets/robotnotlisten.png" alt="" style="width: .638rem;height: .638rem"
                         @click="listen=true" v-else>
                </div>
            </div>
        </div>

        <div class="xw-content" @touchstart="toShowMaskInfo=false" ref="xwBody">
            <div class="xw-chat-wrap">
                <ul>
                    <li v-for="messageList in records">
                        <div v-if="messageList.type==1">
                            <div class="xw-chat-time">{{messageList.time}}</div>
                            <div class="xw-chat-servicer">
                                <div class="xw-chat-msg">
                                    <span v-html="replaceFace(messageList.content)"></span>
                                </div>
                            </div>
                        </div>

                        <!-- 用户发送的消息模板-->
                        <div v-else>
                            <div class="xw-chat-time">{{messageList.time}}</div>
                            <div class="xw-chat-customer">
                                <div class="xw-chat-msg" style="display:inline-block">
                                    <span v-html="replaceFace(messageList.content)"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>


        <div class="xw-footer-wrap" v-if="showvoice">
            <div class="xw-footer-content" >
                <div class="xw-vmodel-wrap">
                    <input class="xw-content-textarea" placeholder="请您输入..." v-model="content"
                           @focus="onFocusText"></input>
                </div>
                <div class="xw-chat-tool">
                    <div class="xw-chat-tool-item">
                        <div v-if="content.length==0"
                             style="background: #557ef6;width: 1.5rem;height: 1.5rem ;border-radius: 50%;display: flex;justify-content: center;align-items: center"
                             @touchstart="changestyle"
                        >
                            <img src="../../assets/robotvoice.png" alt="" style="width: .6rem ;height: 1rem ">
                        </div>
                        <a href="javascript:void(0)" class="xw-send-btn-text" @click="sendMsg" v-else>发送</a>
                    </div>
                </div>
            </div>

        </div>
        <div class="xw-footer-wrap" style="box-shadow: 0 0 0" v-else>
            <div class="mask" v-if="showstartvoice">
                <div style="width: 100%;text-align: center;margin-top: 20%">
                    <img src="../../assets/js/robotvoice1.jpg" style="width: 2rem ;height: 2.2rem "/>
                </div>
                <div style="text-align: center;width: 100%;margin-top: .6rem">正在输入...</div>
            </div>
            <div class="xw-footer-content1" style="background-color: #f1f1f1;box-shadow: 0 0 0 ">
                <div class="xw-vmodel-wrap" style="display: flex;justify-content: center;align-items: center">
                    <div
                            @touchstart.prevent="startvoice"
                            @touchend="endvoice"
                            style="width: 40%;height: 1.4rem;background-color: #557ef6;display: flex;justify-content: center;align-items: center;border-radius: 1rem">
                        <img src="../../assets/robotvoice.png" style="width: .5rem ;height: .8rem;margin-right: .4rem ">
                        <div style="color: #FFFFFF;font-size: .6rem   ">按住说话</div>
                    </div>

                </div>
                <div class="xw-chat-tool">
                    <div class="xw-chat-tool-item" style="background-color: #f1f1f1">
                        <div v-if="content.length==0"
                             style="background: #FFFFFF;width: 1.5rem;height: 1.5rem ;border-radius: 50%;display: flex;justify-content: center;align-items: center"
                             @touchstart="changestyle"
                        >
                            <img src="../../assets/robotkeys1.png" style="width: .9rem ;height: .5rem "/></div>
                    </div>
                    <!--<a href="javascript:void(0)" class="xw-send-btn-text"  @click="sendMsg"  v-else>发送</a>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'robot',
        data() {
            return {
                showstartvoice:false,
                showvoice: true,
                comment: {},
                showEmoji: true,//是否显示表情
                showToast: false,//显示提示框
                toastText: '',
                showMoreOpratin: false,//是否显示更多操作
                toShowMaskInfo: false,//点击头部是否显示相信信息
                bellStatus: true,//头部区域铃声图标
                myaudio: '../../static/audio/msg.mp3',//铃音
                videoVal: false,//点击视频文字时候
                showNarrowPopVal: false,//点击切换成小窗口
                testContents: ["您的手机号", '您要拜访的单位', '您的拜访是由是？', '好的，登记中请稍后--', '您还有什么咨询的吗', '正在查询...', '请耐心等待哟！', '我们的的工作人员正在加急处理中，请您稍后！'],
                content: '',
                //聊天记录
                records: [{
                    type: 1,
                    time: new Date().toLocaleTimeString(),
                    content: '您好，我是语音机器人小渡，请您依次回答以下问题完成访客登记 '
                },
                    {
                        type: 1,
                        time: new Date().toLocaleTimeString(),
                        content: '请问您的姓名是'
                    }],
                imgFile: {},
                EXPS: [],
                num: 0,
                listen: true
            }
        },
        created() {
            this._loadEmojiData();
        },
        methods: {
            startvoice() {
               this.showstartvoice=true;
            },
            endvoice() {
               this.showstartvoice=false;
            },
            changestyle() {
                console.log('出发了语音');
                this.showvoice = !this.showvoice;
            },
            showInfo() {
                this.toShowMaskInfo = true;
            },
            //点击控制表情切换（显示和隐藏）
            emojiFuc() {
                this.showEmoji = !this.showEmoji;
            },
            videoFuc() {
                this.videoVal = true;
                this.showNarrowPopVal = false;
            },
            //提示音
            hint(staus) {
            },
            showNarrowPopFuc() {
                this.showNarrowPopVal = true;
                this.videoVal = false;
            }, showBigPopFuc() {
                this.showNarrowPopVal = false;
                this.videoVal = true;
            }, showEvaluateFuc() {
                this.showScore = !this.showScore;
            },
            sendMsg() {
                var content = this.content.trim();
                this.records.push({
                    time: new Date().toLocaleTimeString(),
                    content: content,
                    type: 2
                });
                this.content = "";
                setTimeout(() => {
                    this.hint();
                    this.records.push({
                        time: new Date().toLocaleTimeString(),
                        content: this.testContents[this.num],
                        type: 1
                    });
                    this.scrollToBottom();
                    this.num++
                }, 800);
            },
            getEmotionData(pageNow, pageSize) {
                return this.EXPS.slice((pageNow - 1) * pageSize, pageSize * pageNow)
            },
            replaceFace(con) {
                if (!con) {
                    return;
                }
                if (con.toString().indexOf('/:') > -1) {
                    var exps = this.EXPS;
                    for (var i = 0; i < exps.length; i++) {
                        con = con.replace(exps[i].reg, '<img src="' + exps[i].file + '"  alt="" />');
                    }
                }
                return con;
            },
            //滚动到底
            scrollToBottom() {
                setTimeout(() => {
                    //滚动条长度
                    var currentDistance = this.$refs.xwBody.scrollHeight - this.$refs.xwBody.clientHeight;
                    //当前滚动条距离顶部的距离
                    var currentScroll_y = this.$refs.xwBody.scrollTop;
                    if (currentDistance > 0 && currentDistance > currentScroll_y) {
                        currentScroll_y = Math.ceil((currentDistance - currentScroll_y) / 10) + currentScroll_y;
                        currentScroll_y = currentScroll_y > currentDistance ? currentDistance : currentScroll_y;
                        //微信和qq浏览器不支持 scrollTo？
                        //this.$refs.xwBody.scrollTo(0,currentScroll_y);
                        this.$refs.xwBody.scrollTop = currentScroll_y;
                        this.scrollToBottom();
                    }
                }, 13);
            },
            onFocusText() {
                this.scrollToBottom();
            },
            _loadEmojiData() {
                // getEmojiData().then((res)=>{
                //     var json = eval('('+res+')');
                //     this.EXPS=json.EXPS.slice(0);
                // });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .mask{
        width: 7rem;
        height: 7rem;
        background-color: #666666;
        color: #FFFFFF;
        position: fixed;
        top: 30%;
        left: 28%;
        font-size: .7rem;
        border-radius: .6rem;
    }
    .w-header-logox {
        width: 100%;
        height: 2.0851rem;
        display: flex;
        justify-content: center;

        img {
            width: 2.0851rem;
            height: 2.0851rem;
        }
    }

    ::-webkit-scrollbar-track {
        border-radius: 0;
        padding: 0;
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        padding: 0;
        background-color: rgba(0, 0, 0, .2);
    }

    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        background-color: transparent;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .xw-ring-wrap {
        position: absolute;
        right: 5px;
        top: 3px;
        padding: 0 2px;
        z-index: 4;
    }

    .xw-ring-icon {
        float: right;
        padding: 5px;
        margin-right: 3px;
        height: 30px;
        width: 30px;
        opacity: .6;
        cursor: pointer;
        text-indent: -9999px;
        overflow: visible;
    }

    .xw-body-wrap-scroll, .xw-body-wrap-scroll-main {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow: hidden;
        -webkit-overflow-scrolling: auto;
    }

    .xw-header {
        z-index: 2;
        max-height: 360px;
        background: #557ef6;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
        width: 92%;
        margin: 0 .638rem;
        height: 4.4rem;
        border-radius: .213rem .213rem .4rem .4rem
    }

    .xw-header-content {
        position: relative;
        overflow: hidden;
        padding: 0px .638rem;
        min-height: 50px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .xw-chat-servicer:after,
    .xw-chat-servicer:before,
    .xw-chat-customer:after,
    .xw-chat-customer:before,
    .xw-chat-wrap:after,
    .xw-chat-wrap:before,
    .xw-chat-tool:after,
    .xw-chat-tool:before,
    .xw-chat-ul-box:after,
    .xw-chat-ul-box:before {
        display: table;
        content: "";
    }

    .xw-header-avatar {
        float: left;
        height: 40px;
        width: 40px;
        border-radius: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
        margin-right: 8px;
        margin-top: 5px;
    }

    .xw-header-title-wrap {
        padding: 3px 0;
        float: left;
        width: 200px;
    }

    .xw-header-title {
        font-size: .6rem;
        color: #fff;
        margin-top: 8px;
    }

    .xw-chat-wrap {
        overflow: auto;
        padding-bottom: 20px;
    }

    .xw-chat-wrap .xw-chat-time,
    .xw-chat-wrap time {
        line-height: 1;
        text-align: center;
        display: block;
        margin-bottom: 8px;
        margin-top: 8px;
        font-size: 12px;
        color: #999;
        text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
    }

    .xw-chat-servicer,
    .xw-chat-customer {
        position: relative;
        margin-bottom: 16px;
        /*padding: 0 10px 0 0px;*/
    }

    .xw-servicer-avantar-wrap {
        position: absolute;
        bottom: 0;
        line-height: 0;
    }

    .xw-send-btn-text {
        display: inline-block;
        width: 50px;
        text-align: center;
        line-height: 30px;

        background-color: #557ef6;
        color: #fff;
        border-radius: 3px;
    }

    .xw-customer-avantar-wrap {
        position: absolute;
        bottom: 0;
        right: 8px;
        line-height: 0;
    }

    .xw-chat-servicer .xw-servicer-avantar-wrap, .xw-customer-avantar-wrap {
        left: 0;
    }

    .xw-servicer-avantar {
        border-radius: 100%;
    }

    .xw-servicer-avantar-wrap img, .xw-customer-avantar-wrap img {
        height: 34px;
        width: 34px;
    }

    .xw-chat-msg {
        -webkit-font-smoothing: antialiased;
        hyphens: auto;
        word-wrap: break-word;
        word-break: normal;
        position: relative;
        clear: both;
        padding: 8px 16px;
        border: 1px solid transparent;
        min-width: 50px;
        min-height: 22px;
        line-height: 1.6em;
        max-width: 70%;
        font-size: .638rem;
        color: #333333;
        border-radius: 5px;
    }

    .xw-chat-servicer .xw-chat-msg {
        background: #FFFFFF;
        border-color: #FFFFFF;
        float: left;
        border-radius: 5px;
    }

    .xw-chat-msg :last-child {
        margin-bottom: 0;
    }

    .xw-chat-msg span {
        white-space: pre-line;
    }

    .xw-chat-servicer,
    .xw-chat-customer {
        position: relative;
        margin-bottom: 16px;
        /*padding: 0 10px 0 0px;*/
    }

    .xw-chat-customer {
        text-align: right;
    }

    .xw-chat-customer .xw-chat-msg {
        float: right;
        text-align: left;
        background:rgba(85,126,246,0.3) ;
    }

    .xw-customer-avantar {
        border-radius: 50%;
    }

    .xw-chat-msg :last-child {
        margin-bottom: 0;
    }

    .xw-chat-wrap .xw-system-info-time,
    .xw-chat-wrap time {
        line-height: 1;
        text-align: center;
        display: block;
        margin-bottom: 8px;
        font-size: 12px;
        color: #999;
        text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
    }

    .xw-system-info {
        margin-bottom: 8px;
    }

    .xw-chat-wrap > :last-child {
        margin-bottom: 16px;
    }

    .xw-system-info {
        text-align: center;
        font-size: 12px;
    }

    .xw-system-info span {
        display: inline-block;
        background: rgba(0, 0, 0, .08);
        padding: 4px 8px;
        line-height: 1;
        color: #7c7c7c;
        border-radius: 2px;
        text-shadow: 1px 1px 1px hsla(0, 0%, 100%, .6);
    }

    .xw-footer-wrap {
        width: 100%;
        box-shadow: 0 -1px 4px rgba(0, 0, 0, .05);
        background: #fff;
        z-index: 2;
        height: 2.2rem;
    }

    .xw-footer-content {
        position: relative;
        height: 52px;
        display: flex;
        box-shadow: rgba(0, 0, 0, 0.05) 0px -1px 4px;
        height: 100%;
        align-items: center;
        width: 100%;
    }

    .xw-footer-content1 {
        position: relative;
        height: 52px;
        display: flex;
        height: 100%;
        align-items: center;
        width: 100%;
    }

    .xw-vmodel-wrap {
        width: 100%;

    }

    .xw-content-textarea {
        box-sizing: border-box;
        z-index: 1;
        overflow-y: auto;
        font-size: .638rem;
        line-height: 14px;
        border: none;
        resize: none;
        width: 80%;
        /*padding: 22px 0px 0px 14px;*/
        font-family: inherit;
        word-wrap: break-word;
        padding-left: .638rem;
    }

    .xw-chat-tool {
        position: absolute;
        right: 0px;
        bottom: 0;
        z-index: 2;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .xw-chat-tool-item {
        height: 52px;
        line-height: 52px;
        position: relative;
        float: left;
        background: #fff;
        padding-right: .638rem;
        display: flex;
        align-items: center;
    }

    .xw-chat-tool-btn {
        display: block;
    }

    .xw-chat-tool-btn {
        margin-top: 7px;
        height: 38px;
        width: 38px;
        border-radius: 100%;
        text-indent: -9999px;
        opacity: .5;
        overflow: hidden;
        transform: translateZ(0);
        margin-left: 10px;
    }

    .xw-chat-tool-btn.xw-face {
        background: url(/static/images/smileOn.svg) no-repeat 50%;
    }

    .xw-chat-tool-btn.xw-face-close {
        background: url(/static/images/smileClose.svg) no-repeat 50%;
    }

    .xw-chat-tool-item .xw-window-text {
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-bottom: -3px;
        -webkit-transform: translateX(-60%);
        transform: translateX(-60%);
        white-space: nowrap;
        box-shadow: 0 3px 18px 2px rgba(0, 0, 0, .1), 0 0 1px rgba(0, 0, 0, .05);
        font-size: 12px;
        background: #fff;
        line-height: 1em;
    }

    .xw-chat-tool-item .xw-window-text.xw-face-emoji-ul {
        right: -23px;
        left: auto;
        -webkit-transform: none;
        transform: none;
    }

    .xw-chat-tool-item .xw-window-text h4 {
        font-size: 12px;
        margin: 0;
        font-weight: 400;
        padding: 12px 8px;
        padding-bottom: 0;
    }

    .xw-chat-ul-box {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .xw-chat-ul-box {
        position: relative;
        z-index: 1;
        background: #fff;
        padding: 8px;
        height: 130px;
        overflow: hidden;
        width: 340px;
        margin: 0px auto;
    }

    .xw-chat-tool-item .xw-window-text .xw-chat-ul-box {
        padding: 8px;
    }

    .swiper-slide {
        float: left;
    }

    .xw-chat-ul-box a {
        display: block;
        height: 40px;
        width: 40px;
    }

    .swiper-pagination {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        display: inline-block;
        background: #ccc;
        border-radius: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .swiper-pagination-bullet-active {
        background: #007aff;
    }

    .xw-chat-tool-item {
        height: 52px;
        position: relative;
        float: left;
    }

    .xw-hide-operation {
        background: url(/static/images/addOn.svg) no-repeat 50%;
        width: 38px;
        height: 38px;
        margin-right: 10px;
        transform: scale(.7);
    }

    .xw-hide-operation-close {
        background: url(/static/images/addClose.svg) no-repeat 50%;
        width: 38px;
        height: 38px;
        margin-right: 10px;
        transform: scale(.7);
    }

    .xw-chat-tool-item .xw-window-text span {
        display: block;
        padding: 10px 12px;
        background: #fff;
        position: relative;
        z-index: 1;
        font-size: 17px;
        line-height: 16px;
    }

    .xw-chat-servicer:after,
    .xw-chat-customer:after,
    .xw-chat-wrap:after,
    .xw-chat-tool:after,
    .xw-chat-ul-box:after {
        clear: both;
    }

    .xw-chat-msg:last-child:before {
        bottom: -1px;
    }

    .xw-chat-msg:last-child:after,
    .xw-chat-msg:last-child:before {
        content: "";
        position: absolute;
        height: 0;
        width: 0;
        display: block;
    }

    .xw-chat-customer .xw-chat-msg:last-child:before {
        //display: inline-block;
        //height: 0;
        //width: 0;
        //border: 10px solid transparent;
        //border-bottom: 10px solid  #cee4ff;
        //right: -10px;
        //border-left-width: 9px;
    }

    .xw-chat-servicer .xw-chat-msg:last-child:before {
        //display: inline-block;
        //height: 0;
        //width: 0;
        // border: 10px solid transparent;
        // border-bottom: 10px solid #efefef;
        // left: -10px;
        // border-left-width: 9px;
    }

    //.xw-chat-servicer .xw-chat-msg:last-child:after {
    //display: inline-block;
    //height: 0;
    //width: 0;
    //border: 10px solid transparent;
    //border-bottom: 10px solid #FFFFFF;
    //left: -8px;
    // border-left-width: 9px;
    //bottom: 0px;
    //}
    .xw-show-info-box {
        height: 200px;
        margin-top: -50px;
        z-index: 1000;
        background: #ed4858;
        color: #fff;
    }

    .xw-logo {
        text-align: center;
    }

    .xw-logo img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 20px;
    }

    .xw-header-info p {
        height: 110px;
        padding: 0 16px;
        line-height: 1.6rem;
        word-wrap: break-word;
        text-align: left;
        overflow: auto;
    }

    .xw-faceEmoji {
        margin-bottom: 7px;
        width: 20%;
        float: left;
    }

    .xw-faceEmoji-main {
        text-align: center;
    }

    .xw-samll-pop-wrap {
        position: absolute;
        height: 160px;
        width: 30%;
        top: 0;
        right: 0;
        background-size: 100% 100%;
        background: url(/static/images/s.jpg) no-repeat;
        z-index: 1000;
    }

    .xw-pop-server {
        background: url(/static/images/s.jpg) no-repeat;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
    }

    .xw-pop-customer {
        position: absolute;
        bottom: 20px;
        width: 80%;
        height: 200px;
        background: url(/static/images/c.jpg) no-repeat;
        z-index: 101;
        left: 50%;
        margin-left: -40%;
        text-align: center;
    }

    .xw-narrow-pop {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 5px;
        top: 5px;
        display: inline-block;
        background: red;
        color: #fff;
        text-align: center;
    }

    .xw-big-pop {
        display: block;
        background: red;
        color: #fff;
        line-height: 40px;
        text-align: center;
    }

    .xw-hang-up {
        background: red;
        width: 100px;
        height: 34px;
        display: inline-block;
        border-radius: 20%;
        position: absolute;
        bottom: 10px;
        transform: translateX(-50%);
    }

    .xw-hang-up-icon {
        position: relative;
        z-index: 1290;
        width: 40px;
        height: 34px;
    }

    .xw-chat-msg span img {
        vertical-align: middle;
    }

    .mint-swipe-items-wrap > div {
        text-align: center;
    }

    .xw-scroll-ul {
        min-height: 340px;
    }

    .mint-swipe-indicator.is-active {
        background: #ed4858;
        opacity: 1;
    }

    .app {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background: #f1f1f1;
        width: 100%;
        height: 100%;
    }

    .xw-content {
        flex: 1;
        position: relative;
        overflow: auto;
        transition: height .8s;
        background: #f1f1f1;
        padding: 0 .638rem;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(20px);
        opacity: 0;
    }

    .animated {
        -webkit-animation-duration: 1s;
        animation-duration: 1s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }

    .animated.bounceIn,
    .animated.bounceOut {
        -webkit-animation-duration: .75s;
        animation-duration: .75s;
    }

    @-webkit-keyframes bounceInDown {
        from, 60%, 75%, 90%, to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            -webkit-transform: translate3d(0, -3000px, 0);
            transform: translate3d(0, -3000px, 0);
        }
        60% {
            opacity: 1;
            -webkit-transform: translate3d(0, 25px, 0);
            transform: translate3d(0, 25px, 0);
        }
        75% {
            -webkit-transform: translate3d(0, -10px, 0);
            transform: translate3d(0, -10px, 0);
        }
        90% {
            -webkit-transform: translate3d(0, 5px, 0);
            transform: translate3d(0, 5px, 0);
        }
        to {
            -webkit-transform: none;
            transform: none;
        }
    }

    .bounceInDown {
        -webkit-animation-name: bounceInDown;
        animation-name: bounceInDown;
    }

    @keyframes bounceInLeft {
        from, 60%, 75%, 90%, to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        0% {
            opacity: 0;
            -webkit-transform: translate3d(-3000px, 0, 0);
            transform: translate3d(-3000px, 0, 0);
        }
        60% {
            opacity: 1;
            -webkit-transform: translate3d(25px, 0, 0);
            transform: translate3d(25px, 0, 0);
        }
        75% {
            -webkit-transform: translate3d(-10px, 0, 0);
            transform: translate3d(-10px, 0, 0);
        }
        90% {
            -webkit-transform: translate3d(5px, 0, 0);
            transform: translate3d(5px, 0, 0);
        }
        to {
            -webkit-transform: none;
            transform: none;
        }
    }

    .bounceInLeft {
        -webkit-animation-name: bounceInLeft;
        animation-name: bounceInLeft;
    }

    @-webkit-keyframes bounceInRight {
        from, 60%, 75%, 90%, to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        from {
            opacity: 0;
            -webkit-transform: translate3d(3000px, 0, 0);
            transform: translate3d(3000px, 0, 0);
        }
        60% {
            opacity: 1;
            -webkit-transform: translate3d(-25px, 0, 0);
            transform: translate3d(-25px, 0, 0);
        }
        75% {
            -webkit-transform: translate3d(10px, 0, 0);
            transform: translate3d(10px, 0, 0);
        }
        90% {
            -webkit-transform: translate3d(-5px, 0, 0);
            transform: translate3d(-5px, 0, 0);
        }
        to {
            -webkit-transform: none;
            transform: none;
        }
    }

    .bounceInRight {
        -webkit-animation-name: bounceInRight;
        animation-name: bounceInRight;
    }

    @keyframes bounceInUp {
        from, 60%, 75%, 90%, to {
            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, 3000px, 0);
            transform: translate3d(0, 3000px, 0);
        }
        60% {
            opacity: 1;
            -webkit-transform: translate3d(0, -20px, 0);
            transform: translate3d(0, -20px, 0);
        }
        75% {
            -webkit-transform: translate3d(0, 10px, 0);
            transform: translate3d(0, 10px, 0);
        }
        90% {
            -webkit-transform: translate3d(0, -5px, 0);
            transform: translate3d(0, -5px, 0);
        }
        to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    }

    .bounceInUp {
        -webkit-animation-name: bounceInUp;
        animation-name: bounceInUp;
    }
</style>
