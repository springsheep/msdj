import vue from 'vue'
import vuex from 'vuex'
import state from './state'
import mutation from './mutations'
vue.use(vuex);
const  store = new vuex.Store(
  {
    state:state,
      mutations:mutation

  }
)
export default store;
