<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="jumbotron" v-if="$store.state.userAuthenticated">
      <h1 class="display-4">Welkom {{$store.state.userData.user.username}}</h1>      
    </div>
    <div class="jumbotron" v-if="!$store.state.userAuthenticated">
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
    </div>    

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
