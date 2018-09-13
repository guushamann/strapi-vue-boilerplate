<template>
  <div class="home">
    <div class="jumbotron" v-if="$store.state.userAuthenticated">
      <h1 class="display-4">Welkom {{$store.state.userData.user.username}}</h1>      
      <input v-model="addtodotext" class="form-control" @keyup.enter="CreateTodo"
                  type="text"
                  placeholder="add todo"/>
      <h2>todo's</h2>
      <ul class="list-group">
        <li class="list-group-item custsizeicon" v-for="(todo,index) in $store.state.todos" :key="index">

          <span class="d-flex w-100 justify-content-between">
            <span>
              <span class="btn btn-default btn-lg" @click="updatetodo({id:todo.id,data:{done:!todo.done}})"><i class="icon" :class="{'ion-md-checkmark':todo.done,'ion-md-square-outline':!todo.done}"></i>
              </span>
              {{todo.todo}}
              </span>
            <span class="btn btn-default btn-lg" @click="removetodo(todo.id)"><i class="icon ion-md-close"></i></span>

          </span>
        </li>
      </ul>
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
import io from 'socket.io-client';
import { mapActions } from 'vuex'
export default {
  name: 'home',
  data(){
    return {
      addtodotext:''
    }
  },
  methods:{
    ...mapActions(['gettodos','updatetodo','removetodo','createtodo']),  
    async CreateTodo(){      
      
      await this.createtodo(this.addtodotext)
      this.addtodotext=''
      
    }
  },
  mounted(){
    const socket = io('http://localhost:1337');
    socket.on('data_update', () => {
      this.gettodos()
    });
  }
}
</script>
