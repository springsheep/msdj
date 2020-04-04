import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Submit from '@/components/visitor/Submit'
import Back from '../components/visitor/Back'
import robot from '../components/visitor/robot'
import Login from "@/components/wuye/Login"
import Property from '@/components/wuye/Property'
import Administrator from '@/components/wuye/Administrator'
import Show from '@/components/wuye/Show'
import Into from '@/components/wuye/Into'
import Examine from '@/components/wuye/Examine'
import Inquire from '@/components/wuye/Inquire'
import PublicService from '@/components/wuye/PublicService'
import AdminPeople from '@/components/wuye/AdminPeople'
import Intopro from '@/components/wuye/Intopro'
import Suggest from '@/components/wuye/Suggest'
import Check from '../components/wuye/CheckAdmin'
import AdmCheck from '../components/wuye/Admshenhe'
import sure from '../components/wuye/sure'
import agree from '../components/Agree'
import Pass from "../components/visitor/Pass"
import Oppose from "../components/visitor/Oppose"
import CompanyInfo from "../components/wuye/CompanyInfo"
import after from "../components/wuye/AfterSuggest"
import introduce from "../components/wuye/introduce"
import preload from "../components/wuye/preload"
import detail from "../components/wuye/detail"
import introduceUs from "../components/wuye/introduceUs"
import SearchCompany from '../components/visitor/SearchCompany'
import WuTz from '../components/wuye/WuTongzhi'
import NewTongzhi from '../components/wuye/NewTongzhi'
import Wumycenter from '../components/wuye/Wumycenter'
import Comycenter from '../components/Company/Comycenter'
import ChoodeBuild from '../components/wuye/ChoodeBuild'
import WuseeTZ from '../components/wuye/WuseeTZ'
import WuReader from '../components/wuye/WuReader'
import Wunotread from '../components/wuye/Wunotread'
import WucompanyInfo from "../components/wuye/WucompanyInfo";
import Wusetter from "../components/wuye/Wusetter";
import Wubasicsetting from "../components/wuye/Wubasicsetting";
import Wumap from "../components/wuye/Wumap";
import newskind from "../components/wuye/newskind";
import {post} from "../utils/request";
import axios from 'axios'

//公司端
import CoLogin from '../components/Company/CoLogin'
import CoProperty from '../components/Company/CoProperty'
import CoShenhe from '../components/Company/CoAdmshenhe'
import Tongzhi from '../components/Company/Tongzhi'
import CoAbout from '../components/Company/CoAbout'
import CoPublicS from '../components/Company/CoPublicS'
import CoSearch from '../components/Company/CoSearch'
import CoSeeTZ from '../components/Company/CoSeeTongzhi'
import CoAdAm from '../components/Company/CoAdAm'
import CoAdm from '../components/Company/CoAdm'
import CoAdInfo from '../components/Company/CoAdInfo'
import CoBaoXiu from '../components/Company/CoBaoXiu'
import CoSet from '../components/Company/CoSet'
import Cochoose from '../components/Company/Cochoose'
import Cosure from '../components/Company/Cosure'
//引入的插件

Vue.prototype.$post = post;
Vue.use(Router);
Vue.prototype.axios = axios;
import wx from "../../config/wx";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//样式文件一定要引入
Vue.use(ElementUI);

const router = new Router({
    routes: [
        //访客端
        {path: '/', redirect: '/index/:buildingId'},
        {path: '/index/:buildingId', name: 'Index', component: Index,
            meta: {keepAlive:true, isBack: true,}},
        {path: "/Pass", component: Pass},//审核通过
        {path: "/Oppose", component: Oppose},//审核拒绝
        {path: '/submit', name: 'Submit', component: Submit},//审核等待
        {path: '/back', name: 'Back', component: Back},//审核通过（显示二维码）
        {path: '/SearchCompany', component: SearchCompany},//选择物业公司页
        {path: '/robot', component: robot},
        //物业端
        {path: '/sure/:buildingId/:visitorRecordId', name: 'sure', component: sure},
        {path: "/agree", component: agree},
        {path: "/map", component: Wumap},
        {path: "/CompanyInfo", component: CompanyInfo},
        {path: "/after", component: after},
        {path: "/introduce", component: introduce},
        {path: "/preload", component: preload},
        {path: "/detail", component: detail},
        {path: '/Login', name: 'Login', component: Login},
        {path: '/wuye/property', name: 'Property', component: Property},
        {path: '/wuye/inquire', name: 'Inquire', component: Inquire,
            meta: {keepAlive:true, isBack: true,}},
        {path: '/wuye/public', name: 'PublicService', component: PublicService},
        {path: '/wuye/admin', name: 'Administrator', component: Administrator,},
        {path: '/wuye/show', name: 'Show', component: Show},
        {path: '/wuye/examine', name: 'Examine', component: Examine},
        {path: '/wuye/into', name: 'Into', component: Into},
        {path: '/wuye/admin/adpeople', name: 'AdminPeople', component: AdminPeople},
        {path: '/wuye/into/intopro', name: "Intopro", component: Intopro},
        {path: '/wuye/suggest', name: "Suggest", component: Suggest},
        {path: '/check', component: Check},
        {path: "/adshenhe", component: AdmCheck},
        {path: '/introduceUs', component: introduceUs},
        {path: '/Tongzhi1', component: WuTz},//物业通知
        {path: '/NewTongzhi', component: NewTongzhi},//新建通知
        {path: '/Wumycenter', component: Wumycenter},
        {path: '/ChoodeBuild', component: ChoodeBuild},//选择物业
        {path: '/WuseeTZ', component: WuseeTZ},//物业段查看通知
        {path:"/WuReader",component:WuReader},//查看阅读公司
        {path:"/Wunotread",component:Wunotread},//查看没阅读公司
        {path:'/WucompanyInfo',component:WucompanyInfo},//点击是否阅读的公司进去的公司详情页
        {path:'/Wusetting',component:Wusetter},//详细设置
        {path:'/Wubasicsetting',component:Wubasicsetting},//基础信息设置
        {path:'/Wumap',component:Wumap},//地图定位
        {path:'/newskind',component:newskind},//通知类型

        //  公司端
        {path: '/CoLogin', component: CoLogin},//公司登陆
        {path: '/CoProperty', name: 'com', component: CoProperty},//功能页
        {path: '/Coshenhe', component: CoShenhe},//拜访申请
        {path: '/Tongzhi', component: Tongzhi},//公司通知
        {path: '/CoAbout', component: CoAbout},//关于我们
        {path: '/CoPublic', component: CoPublicS},//服务项目
        {path: '/CoSearch', component: CoSearch},//查询记录
        {path: '/seeTZ/:buildingId/:companyId/:phoneNo/:token', name: 'seeTZ', component: CoSeeTZ},//具体通知页面
        {path: '/CoAdAm', component: CoAdAm},//管理员设置
        {path: '/CoAdm', component: CoAdm},//添加管理员
        {path: '/CoAdInfo', component: CoAdInfo},//查看管理员信息，可以改
        {path: '/CoBaoXiu', component: CoBaoXiu},//公司保修
        {path: '/CoSet', component: CoSet},
        {path: '/Comycenter', component: Comycenter},//公司个人中心
        {path: '/Cochoose', component: Cochoose},//选择公司
        {path: '/Cosure/:buildingId/:visitorRecordId', name: 'Cosure', component: Cosure},
    ]
});
export default router;

//全局前置守卫,判断是否登陆状态
router.beforeEach((to, from, next) => {
    /**访客端页面路由*/
    let visit_filter = ['/Pass', '/Oppose', '/submit', '/back','/SearchCompany'];
    // console.log(localStorage);
    if (to.params.buildingId) {
        localStorage.setItem("WbuildingId", to.params.buildingId);
    }
    let buildingId = localStorage.getItem("WbuildingId");
    let Token = localStorage.getItem("WToken");
    let openId = localStorage.getItem("openId");
    let CopenId = localStorage.getItem("CopenId");
    if (openId == undefined) {
        openId = ''
    }

    if (CopenId == undefined) {
        CopenId = ''
    }

    /**访客端过滤器*/
    if(visit_filter.indexOf(to.path) > -1  || to.path === `/index/${buildingId}`){
        next();
    }else if (to.path == '/CoLogin') {
        let code = getUrlKey("code");
        if (!code) {
            getCodeApi();
        } else {
            axios.post('/user/company/loginInit', {
                "openId": CopenId,
                "code": code,
            }).then((res) => {
                let msg1 = res.data.data;
                if (msg1.flag == 0) {
                    localStorage.setItem('CopenId', msg1.openId);
                    next()
                } else {
                    localStorage.setItem('companyId', msg1.companyId);
                    localStorage.setItem('CbuildingId', msg1.buildingId);
                    localStorage.setItem('CmobilePhoneNo', msg1.mobilePhoneNo);
                    localStorage.setItem('CToken', msg1.token);
                    localStorage.setItem('CopenId', msg1.openId);
                    localStorage.setItem('companyName', msg1.companyName);
                    localStorage.setItem('companyLogo', msg1.companyLogo);
                    next('/CoProperty')
                }
            }).catch((error) => {
                console.log(error)
            })
        }

    }else if (to.path == '/Login') {
        let code = getUrlKey("code");
        if (!code) {
            getCodeApi();
        } else {
            axios.post('/user/loginInit', {
                "openId": openId,
                "code": code,
            }).then((res) => {
                let msg1 = res.data.data;
                    if (msg1.flag == 0) {
                        localStorage.setItem("openId", msg1.openId);
                        next();
                    } else {
                        localStorage.setItem("openId", msg1.openId);
                        localStorage.setItem("WbuildingId", msg1.buildingId);
                        localStorage.setItem('mobilePhoneNo', msg1.mobilePhoneNo);
                        localStorage.setItem("WmobilePhoneNo", msg1.mobilePhoneNo);
                        localStorage.setItem("WToken", msg1.token);
                        localStorage.setItem("buildingName", msg1.buildingName);
                        localStorage.setItem("buildingLogo", msg1.buildingLogo);
                        localStorage.setItem("buildingWelcome", msg1.buildingWelcome);
                        next('/wuye/property')
                    }
                // }
            }).catch((error) => {
                console.log(error)
            })
        }
    }else if (to.path !== '/Login' && to.path !== `/index/${buildingId}`) {
        if (Token == null || Token == "") {
            //获取openid
            let code = getUrlKey("code");
            if (!code) {
                getCodeApi();
            } else {
                axios.post('/user/loginInit', {
                    "code": code,
                    "openId": openId
                }).then((res) => {
                    if (res.data.state == 1) {
                        localStorage.setItem('WmobilePhoneNo', res.data.data.mobilePhoneNo);
                        localStorage.setItem('mobilePhoneNo', res.data.data.mobilePhoneNo);
                        localStorage.setItem('buildingLogo', res.data.data.buildingLogo);
                        localStorage.setItem('buildingName', res.data.data.buildingName);
                        localStorage.setItem('buildingWelcome', res.data.data.buildingWelcome);
                        localStorage.setItem("openId", res.data.data.openId);
                        localStorage.setItem("WToken", res.data.data.token);
                        if (res.data.data.flag == 0) {
                            next('/Login');
                        } else {
                            next()
                        }
                    } else {
                        console.log("后台报错，原因：" + res.data.retMsg);

                    }
                }).catch((error) => {
                    console.log("接口调用错误，原因：" + error);
                });
            }
        } else {
            const data = {
                "buildingId": buildingId,
            };
            const options = {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                data: data,
                url: 'visit/building/getBuildingInfo'
            };
            axios(options).then((response) => {
                if (response.data.state == 1) {
                    localStorage.setItem('buildingWelcome', response.data.data.buildingWelcome);
                    localStorage.setItem('buildingLogo', response.data.data.buildingLogo);
                    localStorage.setItem('buildingName', response.data.data.buildingName)
                }
            }).catch(function (error) {
            });
            next()
        }
    }

    function getCodeApi() {
        let urlNow = encodeURIComponent(window.location.href);
        let scope = wx.scope_userinfo;
        let appid = wx.appid;
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}`;
        window.location.href = url;
    }
    function getUrlKey(name) {//获取url 参数
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }
});

