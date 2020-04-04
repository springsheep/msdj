<template>
    <div class="container" style="width: 100%">
        <div class="head" @click="choosekind"
             style="width: 92%;display: flex;align-items: center;justify-content: space-between;font-size: .638rem;padding: .126rem .638rem;">
            <div style="width: 15%;line-height:2.128rem">类型<span class="pp">*</span></div>
            <div style="width:71.5%">
                {{newskindname}}
            </div>
            <img src="../../assets/images/999.png" alt=""
                 style="width:.811rem;height: .811rem;">
            <!--<div style="width: 100%" class="anniu">-->
            <!--<span style="width: 22%;display: inline-block;margin-left: 2.3%;font-size: .6rem" :class="{xuanze:num==(index+1)?true:false}"-->
            <!--@click="choose1(index+1)" :id="index+1" v-for="(item , index) in kind">{{item}}</span>-->
            <!--</div>-->
        </div>
        <div class="title"
             style="line-height: 2.128rem ;width: 92%;display: flex;justify-content: space-between;font-size: .638rem;padding: 0 .638rem ; border-bottom: .1px solid #f1f1f1;border-top: .1px solid #f1f1f1;">
            <div style="width: 15%;line-height: 2.128rem;z-index: 1">标题<span class="pp">*</span></div>
            <div style="width:81%">
                <input type="text" style="line-height: 1rem;width: 75%;border: 0" placeholder="请输入标题" v-model="biaoti"
                       maxlength="15">
                <span style="font-size: .511rem;margin-left: 1rem">{{num1}}/15</span>
            </div>
        </div>
        <div class="title"
             style="line-height: 2.128rem ;width: 92%;display: flex;justify-content: space-between;font-size: .638rem;padding: 0 .638rem ;border-bottom: .5px solid #f1f1f1;">
            <div style="width: 15%;line-height: 2.128rem;z-index: 1">接收人</div>
            <div style="width: 81%">
                <el-checkbox v-model="checked1" style="line-height: 2rem;font-size: .638rem" @change="choose2">全体入住公司
                </el-checkbox>
                <el-checkbox v-model="checked2" style="line-height: 2rem;font-size: .638rem" @change="choose3">物业人员
                </el-checkbox>
            </div>
        </div>
        <div class="title"
             style="width: 92%;font-size: .638rem;padding: 0 .638rem ; margin-top: .638rem;border-bottom: .5px solid #f1f1f1;">
            <div style="width: 100%">
        <textarea type="text" ref="count" name="" clos="60" rows="20" style="width: 100%;border: 0;resize: none"
                  placeholder="输入正文内容"
                  v-model="content">  </textarea>
                <!--<editor-elem :catchData="ppp"></editor-elem>-->
            </div>
        </div>

        <div @click="submit" class="save"
             style="width: 92%;;background-color: #1a96d4;color: #f1f1f1;font-size: .767rem;text-align: center;margin: .9rem auto 0;line-height: 1.913rem;border-radius: .213rem;">
            发布
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';
    import EditorElem from "./editorElem";
    import {formatDate} from '@/assets/js/util/formatdate.js'

    export default {
        name: "NewTongzhi",
        components: {EditorElem},
        data() {
            return {
                checked1: true,
                checked2: false,
                num: '1',
                content: `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                    '     \n' +
                    '       接电力局通知，将于2019年6月26日（星期三）上午8：30-16:30对江四开G23间隔至湘人II开G21间隔电缆迁改，施工期因安全需要，将进行停电，施工结束后及时恢复供电。\n' +
                    ' \n' +
                    '       电力故障报修电话: 5122 8669；\n' +
                    '       电力台区经理电话: 137-5085-4677;\n' +
                    '       物业24小时咨询电话:86875255;\n' +
                    '       停电停水范围：1幢至17幢，所有高层业主。 \n' +
                    ' \n' +
                    `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                    `                                                              ${formatDate(new Date())}`,
                biaoti: '',//要输入的标题
                num1: 0,//输入标题的字数
                buildingId: localStorage.getItem('WbuildingId'),
                mobilePhoneNo: localStorage.getItem('mobilePhoneNo'),
                noticeTitle: '',
                noticeType: 0,
                noticeReceiver: '',
                newskindname:'请选择通知类型',
                noticeContent: '',
                a: 0, b: 0,//判断发送的人类型
                kind: ['停水停电', '电梯维修', '装修通知', '消防演练', '消杀通知', '寻物招领', '办卡通知', '费用催缴', '放假通知', '温馨提示', '福利活动', '其它杂项']
            }
        },
        watch: {
            num() {
                if (this.num == '1') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        '     \n' +
                        '       接电力局通知，将于2019年6月26日（星期三）上午8：30-16:30对江四开G23间隔至湘人II开G21间隔电缆迁改，施工期因安全需要，将进行停电，施工结束后及时恢复供电。\n' +
                        ' \n' +
                        '       电力故障报修电话: 5122 8669；\n' +
                        '       电力台区经理电话: 137-5085-4677;\n' +
                        '       物业24小时咨询电话:86875255;\n' +
                        '       停电停水范围：1幢至17幢，所有高层业主。 \n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else if (this.num == '2') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        按照物业统一规划，本大厦【4号楼1楼】，将于【2019年06月22日（星期六）-2019年06月24日（星期一）三天】进行【敲墙（装修）】作业。如果对贵司工作造成影响，敬请理解！\n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else if (this.num == '3') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        按照物业统一规划，本大厦【4号楼1楼】，将于【2019年06月22日（星期六）-2019年06月24日（星期一）三天】进行【敲墙（装修）】作业。如果对贵司工作造成影响，敬请理解！\n\n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else if (this.num == '4') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        您好！物业服务中心秉承“预防为主，防消结合”的消防工作指导方针，为进一步加强本大厦的消防管理，让广大业户及员工了解消防安全知识，更好地保护大厦及个人人身财产安全，物业服务中心将于【2017年11月8日】组织一次消防演练。\n' +
                        ' \n' +
                        '        “和谐消防，人人有责”，本次消防演练期待您的关注与参与！感谢您对我们工作的支持！如有其他建议或需求，请您致电：\n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else if (this.num == '5') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        为了给大家提供一个舒适、卫生的生活环境，进一步有效控制大厦“四害”孳生，减少“四害”对大家工作环境的影响，物业服务中心计划 【11月份】安排大厦公共区域集中消杀【2次】，敬请各位业主/入职公司注意以下事项：\n' +
                        ' \n' +
                        '      1、消杀可能产生药雾、难闻气味等，如需要请您关闭好公司单元门、窗；\n' +
                        '      2、在蚊、蝇消杀的同时，建议各入驻公司自行同步做好单元内消杀，以提高蚊、蝇消杀效果\n' +
                        '      3、如因天气原因影响消杀工作，物业管理中心将调整消杀服务时间并另行通知；\n' +
                        '      4、如遇到消杀操作现场，请您注意避让，不便之处，敬请谅解。 \n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else if (this.num == '6') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        您好，现物业服务中心员工在【1楼大厅】拾到【一串钥匙】，请有以上遗失物品的业主（住户）到物业服务中心前台咨询，确认您遗失的物品后，请凭您的有效证件在物业服务中心前台登记领取。\n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                                ${formatDate(new Date())}`
                } else if (this.num == '7') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        现本大厦已升级门禁管理系统，物业管理中心为加强大厦工作人员车辆进出管理，确保大厦办公安全和谐，须对大厦内车辆进出办理车主进出卡，大厦员工须凭车主卡进出大厦地下车库。请业主于近期内到物业管理中心办理，谢谢合作！\n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                                ${formatDate(new Date())}`
                } else if (this.num == '10') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        暑假已至，很多员工为方便看管，上班时将孩子带入写字楼。写字楼内有各类设备，电器等，小孩子因好奇心强，且有些行为不知深浅，可能导致火灾、坠亡等一些无法预测的危险。\n' +
                        '        办理业主卡需带资料：\n' +
                        '\n' +
                        '【1、租房合同复件1份；2、公司营业执照复件1份；3、员工身份证复件1张】。\n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                            ${formatDate(new Date())}`
                } else if (this.num == '8') {
                    this.content = '尚未交费的业主：\n' +
                        ' \n' +
                        '        您好！在广大业主的大力支持与配合下，【2018年度】物业管理费收缴工作已接近尾声，但至今仍有少数业主由于某种原因未能按时交费。\n' +
                        '\n' +
                        '        物业费是小区治安秩序环境绿化及卫生，房屋公共设施配套管理的根本保证，如果物业费不能按时缴纳，将会对物业管理和服务造成致命的影响。同时，严重侵犯了已交费业主的切身利益，为此我们再一次郑重提示，从【12月31日】起我们将按有关规定按日3‰收取滞纳金逾期未交费的业主，将按照《物业管理条例》第六章第六十七条规定依法进行追缴，请未交费业主尽快抽时间到物业公司交费。\n' +
                        '\n' +
                        '如您在此期间来管理处缴费用有困难，请务必和管理处联系协商解决。物业公司同时也随时接受业主的监督，持续改进，竭诚为业主服务，谢谢您的理解与支持！\n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else if (this.num == '9') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        您好！“【元旦佳节】”将至，本大厦物业中心全体员工祝各位业主/住户节日快乐，同时为了保障您度过一个安全、祥和的假期，根据政府消防工作要求和近期周边治安情况，敬请各位业主/住户注意以下事项：\n' +
                        '\n' +
                        '放假期间：【2018年12月31日至2019年01月02日】，大厦将停止一切室内装修工程，【2019年01月03日】恢复正常装修施工。' +
                        '2、消防/安全提示：\n' +
                        '请勿在公共区域堆放私人物品，随意堵塞大厦/楼层消防通道，勿随意燃烧物品；若您发现有可疑人员尾随进入楼道或在楼道徘徊时，请您立即致电公告栏下方管理处24小时值班电话或与当班的安保人员取得联系。' +
                        '\n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else if (this.num == '11') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        ' \n' +
                        '        本大厦一楼新引入【网易严选】，商家计划【2019年7月14日至2019年7月31日】，举行开业庆典，全部商品【8折】。有请意向的入驻企业/业主可携带工牌前往选购！' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else if (this.num == '12') {
                    this.content = `尊敬的${localStorage.getItem('buildingName')}入驻企业：：\n` +
                        '        \n' + '诚挚感谢大家对物业管理中心工作的支持与配合！如有其他建议或需求，请您致电：\n' +
                        ' \n' +
                        '客服电话：0571-【3987038】（08:30-17:30）\n' +
                        '                   0571-【3987040】（24小时值班电话）\n' +
                        ' \n' +
                        `                                               ${localStorage.getItem('buildingName')}物业管理中心\n` +
                        `                                                              ${formatDate(new Date())}`
                } else {
                    this.content = "请您输入内容"
                }
            },
            biaoti() {
                this.num1 = this.biaoti.length;
                if (this.num1 >= 15) {
                    this.num1 = 15
                }
            }
        },
        methods: {
            choosekind() {
                this.$router.push({path:'/newskind'})
            },
            choose2(e) {
                if (e == true) {
                    this.a = 1
                } else {
                    this.a = 0
                }
            },
            choose3(e) {
                if (e == true) {
                    this.b = 1
                } else {
                    this.b = 0
                }
            },
            //选择类型
            choose1(i, e) {
                this.num = i;
                this.noticeType = i - 1;
            },
            //点击提交
            submit() {
                this.noticeContent = this.content;
                this.noticeTitle = this.biaoti;
                // if (this.a == 1 && this.b == 0) {
                //     this.noticeReceiver = 0;
                //
                // } else if (this.a == 0 && this.b == 1) {
                //     this.noticeReceiver = 1;
                // } else {
                //     this.noticeReceiver = 2;
                // }
                if (this.biaoti == '') {
                    MessageBox('提示', '请填写标题');
                    return false;
                }

                // else if(this.a==0&&this.b==0){
                //     MessageBox('提示', '请选择接收人');
                //     return false;
                // }
                else if (this.content == '') {
                    MessageBox('提示', '请填写通知内容请填写标题');
                    return false;
                } else {
                    console.log(this.mobilePhoneNo, localStorage.getItem('WmobilePhoneNo'), localStorage);
                    const data = {
                        "buildingId": this.buildingId,
                        "mobilePhoneNo": this.mobilePhoneNo,
                        "noticeTitle": this.noticeTitle,
                        "noticeContent": this.noticeContent,
                        "noticeType": this.noticeType,
                        "noticeReceiver": 0,
                    };
                    const options = {
                        method: 'POST',
                        headers: {'content-type': 'application/json', 'token': localStorage.getItem('WToken')},
                        data: data,
                        url: '/visit/building/publishNotice'
                    };
                    this.axios(options).then((response) => {
                        if (response.data.state == 1) {
                            Toast('发布成功');
                            this.$router.push({path: '/wuye/property'});
                        } else {
                            Toast(response.data.retMsg)
                        }
                    }).catch((err) => {
                        Toast(err)
                    })
                }


            }
        },
        mounted() {
            console.log(this.$store.state.newskind)
            this.num=this.$store.state.newskind
            this.noticeType = this.$store.state.newskind - 1;
            if(this.$store.state.newskindname!=null){
                this.newskindname=this.$store.state.newskindname
            }

        }
    }
</script>

<style scoped lang="scss">
    .xuanze {
        background-color: #1a96d4;
        color: #ffffff;
        z-index: 10;
        border: 0;
    }

    .pp {
        color: #e54747;
    }

    .anniu {
        span {
            line-height: 1.277rem;
            border: .5px solid #999999;
            text-align: center;
            margin-top: .213rem;
            border-radius: .113rem;
        }
    }
</style>
