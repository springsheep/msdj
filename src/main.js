import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(MintUI);
Vue.use(ElementUI);
import App from './App'
import router from './router'

import './styles/reset.css'
import axios from 'axios'
import qs from 'qs';
import store from '../store/index'
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import Vant from 'vant';
import 'vant/lib/index.css';
import {Button} from 'mint-ui';
Vue.component(Button.name, Button);
//引入复选
import {Checklist} from 'mint-ui';
Vue.component(Checklist.name, Checklist);
Vue.use(Vant);
Vue.use(animated);
import BaiduMap from 'vue-baidu-map'
import {BmlMarkerClusterer} from 'vue-baidu-map';
Vue.component('bml-marker-cluster', BmlMarkerClusterer);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '3W52Yvk6Gn5781rTyRB5LtUTGbmSibex'
});

// 引用
//后台接口的配置
//福哥的ip
// axios.defaults.baseURL = 'http://192.168.123.124:8880';
// 测试环境
// axios.defaults.baseURL = 'https://test.msdj.yiducode.com';
//实际环境
axios.defaults.baseURL = 'https://msdj.yiducode.com';  //上传后访问路径

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

Vue.use(MintUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  qs,
  components: {App},
  template: '<App/>'
});
