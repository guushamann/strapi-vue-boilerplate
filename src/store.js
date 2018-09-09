import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)
import Strapi from 'strapi-sdk-javascript';
const strapi = new Strapi('http://localhost:1337');

export default new Vuex.Store({
  state: {
    userData:{},
    LoginError:false,    
    userAuthenticated:false

  },
  mutations: {
    Login (state,authobj) {
      // mutate state
      state.userData = authobj
      state.userAuthenticated = true
      router.push({ name: 'home'})
    },
    Logout (state) {
      // mutate state      
      state.userAuthenticated = false
      state.userData = {}
      router.push({ name: 'home'})
    },
    LoginError(state,loginstate){
      state.LoginError=loginstate
    }
  },
  actions: {
    async Login ({ commit },{email,password}) {
      
      
      let user,err
      [err, user] = await to(strapi.login(email, password));
      
      if(!user){
        console.log(err)
        commit('LoginError',true)
      }else{
        commit('LoginError',false)
        commit('Login',user)        
      }
      
    },
    async Logout ({ commit }) {
        commit('Logout')      
    }

  }
})


function to(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}