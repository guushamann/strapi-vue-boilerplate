import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import Strapi from 'strapi-sdk-javascript';
Vue.use(Vuex)

const strapi = new Strapi('http://localhost:1337');



export default new Vuex.Store({
  state: {
    userData:{},
    LoginError:false,    
    userAuthenticated:false,
    todos:[]
  },
  getters:{
    todos: state => {
      return state.todos
    }
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
    },
    todos(state,todos){
      state.todos=todos
    }
  },
  actions: {
    async Login ({ commit },{email,password}) {
      
      
      let user,err
      [err, user] = await to(strapi.login(email, password));
      
      if(!user){        
        commit('LoginError',true)
        console.log(err)
      }else{
        commit('LoginError',false)
        commit('Login',user)
        const todos = await strapi.getEntries('todos');  
        commit('todos',todos)      
      }
      
    },
    async Logout ({ commit }) {
        commit('Logout')      
    },
    // eslint-disable-next-line
    async createtodo ({},todotext) {
         
        await strapi.createEntry('todos', {
          todo:todotext,
          done:false
        })
        // const todos = await strapi.getEntries('todos');  
        // commit('todos',todos)         
    },
    // eslint-disable-next-line
    async updatetodo ({},{id,data}) {
        await strapi.updateEntry('todos',id,data);  
        // const todos = await strapi.getEntries('todos');  
        // commit('todos',todos)         
    },
    // eslint-disable-next-line
    async removetodo ({},id) {
        await strapi.deleteEntry('todos',id);  
        // const todos = await strapi.getEntries('todos');  
        // commit('todos',todos)         
    },
    async gettodos({commit}){
      const todos = await strapi.getEntries('todos');  
      commit('todos',todos)      
    }
  }
})


function to(promise) {
  return promise.then(data => {
     return [null, data];
  })
  .catch(err => [err]);
}