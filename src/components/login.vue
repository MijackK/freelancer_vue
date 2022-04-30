<template>
<div style="float:right;">
  Email:
  <input v-model="login.email"/>
  password:
  <input type='password' v-model="login.password"/>
 <input type="submit" value="Login" @click="$emit('logIn',login)"/>
 <input type="submit" value="Register" @click="showForm=!showForm"/>
 <div>
<transition name="registerForm">
<div v-show="showForm" class="register-form">
 <label> Password: </label>
 <br>
  <input type='password' v-model="register.password"/>
  <br>
  <label>Confirm Password:</label>
  <br>
 <input type='password' v-model="register.password_confirmation"/>
 <br>
 <input type="submit" value="Sign Up" @click="$emit('registerUser',register)"/>
</div>
</transition>
 </div>
 </div>
  


         
          

</template>
<script>

export default {
  emits:['registerUser','logIn'],
  data(){
    return{
      login:{
        email:'',
        password:'',
      }, 
      register:{
        name:'',
        email:'',
        avatar:'',
        password:'',
        password_confirmation:''
      },
      modal:false,
      showForm:false,
      } 
      },

}
</script>
<style scoped>
.the-header{
  display:flex;

}
input{
  border: 2px solid grey;
  border-radius: 5px;
  background-color:transparent;
  margin-top: 10px;
}
input[type=submit]{
  background-color:transparent;
  padding-left: 20px ;
  padding-right: 20px;
  margin-left: 20px;
  transition-duration: 0.1s;
  box-shadow: 0 5px #666;

}
input[type=submit]:hover{
  background-color:whitesmoke;
  padding-left: 20px ;
  padding-right: 20px;
  margin-left: 20px;

}
input[type=submit]:active{
   background-color:whitesmoke;
  box-shadow: none;
  transform: translateY(5px);
}

.register-form{
  border-style: solid;
  border-color: grey;
  border-radius: 15px;
  padding:20px 20px;
  margin-top:20px;
  width: fit-content;
  margin-left:70%;
 
}
.registerForm-enter-active {
  animation-name: formAnimation;
  animation-duration: 0.3s;
  animation-timing-function: linear;
}
.registerForm-leave-active {  
  animation-name: formAnimation;
  animation-duration: 0.3s;
  animation-timing-function: linear;
  animation-direction: reverse; 
}

@keyframes  formAnimation {
  0%{
    transform: scale(0, 0) ;

  }
  25%{
    transform: scale(0.25, 0.25) ;

  }
  50%{
    transform: scale(0.50, 0.50) ;

  }
  75%{
    transform: scale(0.75, 0.75) ;

  }
  100%{
    transform: scale(1, 1) ;
  }
 
}



</style>