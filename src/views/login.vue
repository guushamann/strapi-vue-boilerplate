<template>
  <div>
    <b-form  v-if="show">
      <h1>Login</h1>
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    label-for="email"
                    description="We'll never share your email with anyone else.">
        <b-form-input id="email"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Password:"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password"
                      required 
                      >
        </b-form-input>
      </b-form-group>      
      <b-alert :show="$store.state.LoginError"
             dismissible
             @dismissed="$store.state.LoginError=false"
             variant="warning"
            >
      <p>email of wachtwoord niet goed</p>
      </b-alert>
      <b-button type="button" variant="primary" @click.prevent="Login({email:form.email,password:form.password})" >Submit</b-button>
      
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {
        email: '',       
        password:''
      },
      show: true,
      dismissSecs: 10,
      dismissCountDown: 10,
      showDismissibleAlert: false
    }
  },
  methods: {
    ...mapActions(['Login']),
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  },
  watch:{
    
  }
}
</script>