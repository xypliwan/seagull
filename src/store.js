import Vue from 'vue'
import Vuex from 'vuex'
import { getLocalStorage } from "@/utils/localStorage"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    userinfo:{}
  },
  mutations: {
    'SET_ISLOGIN': (state,isLogin)=>{
      state.userinfo = isLogin;
    },
    'SET_USERINFO': (state,userinfo)=>{
      state.userinfo = userinfo;
    },
  },
  actions: {
    setIsLogin: ({ commit },isLogin)=>{

      return commit('SET_ISLOGIN',isLogin)
    },
    setUserinfo: ({ commit },userinfo)=>{

      return commit('SET_USERINFO',userinfo)
    },
  },
  getters: {
    isLogin: state => state.isLogin,
    userinfo: state => state.userinfo
  }
})
