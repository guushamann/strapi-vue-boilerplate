<template>
  <div id="app">
      <nav class="sticky-top navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Strapi Boiler plate</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Home<span class="sr-only">(current)</span></router-link>      
            </li>
            <li class="nav-item" v-if="!$store.state.userAuthenticated">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>     
            <li class="nav-item">
              <router-link class="nav-link" to="/about">about</router-link>
            </li>  
          </ul>

          <ul class="navbar-nav " v-if="$store.state.userAuthenticated">

            
              
              <span class="navbar-text usericontext" >          
                {{$store.state.userData.user.username}}
              </span>      
              <i class="usericon custsizeicon icon ion-md-contact"></i>
            <li class="nav-item active">
              <a class="nav-link"  href="#" @click="Logout" >Logout</a>      
            </li>            
          </ul>      

          
              
        </div>

      </nav>
    <div class="container">
      <router-view/>
    </div>
    
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  methods: {
    ...mapActions(['Logout'])    
  },
  watch:{
    
  }
}
</script>
<style lang="scss">
.custsizeicon, {
  font-size: 30px;
}
.usericon, .usericontext{
  margin-right:10px;
}
#app {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
