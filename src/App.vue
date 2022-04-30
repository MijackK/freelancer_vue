<template  >
  
    <nav v-if="this.expiretDate > this.currentDate " class="navbar">
    <ul class="navbar-nav">
      <li class="logo">
       
          <router-link to="/browse" class="nav-link">
          <p class="link-text logo-text">Project</p>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fad"
            data-icon="angle-double-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
          >
            <g class="fa-group">
              <path
                fill="currentColor"
                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                class="fa-secondary"
              ></path>

            </g>
          </svg>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/home" class="nav-link">
          <i class="fa fa-home fontIcon" aria-hidden="true" ></i>
          <p class="link-text" >Home</p>
        </router-link>
      </li>
       <li class="nav-item">
        <router-link to="/browse" class="nav-link">
          <i class="fas fa-search fontIcon"></i>
          <p class="link-text" >Browse</p>
        </router-link>
      </li>

      <li class="nav-item">
       <router-link to="/profile" class="nav-link">
          <i class="fas fa-user fontIcon" aria-hidden="true" ></i>
          <p class="link-text">Profile</p>
       </router-link>
      </li>
       <li class="nav-item">
        <router-link to="/message" class="nav-link">
          <i class="far fa-envelope fontIcon" aria-hidden="true" ></i>
          <p class="link-text" >Messages</p>
        </router-link>
      </li>
        <li class="nav-item" @click="getNotification">
        <router-link to="/notification" class="nav-link">
          <i class="fas fa-bell fontIcon" aria-hidden="true" >    
            
        </i>
        <span class="dot" v-show="notify" style="background-color: red;"></span>
          <p class="link-text" >Notification</p>
        </router-link>
      </li>
      
      <li class="nav-item" v-show="false">
          <router-link to="/about" class="nav-link">
           <i class="fas fa-chart-line fontIcon" aria-hidden="true" ></i>
          <p class="link-text">Admin</p>
        </router-link>
      </li>
       <li class="nav-item" @click='setLogin'>
        <router-link to="/" class="nav-link">
       <i class="fas fa-door-open fontIcon"></i>
          <p class="link-text">Logout</p>
        </router-link>
      </li>
    </ul>
  </nav>

  <main>

<!--    
<div style="width:100%" >
 <LForm @log-in="logIn" @register-user="registerUser" v-if=" currentDate >expiretDate || !isAuth"/>
</div> 
-->

<router-view  @set-notify="setNotify"  @log-in="logIn" @register-user="registerUser" >

</router-view>




  </main> 
</template>

<script>
import ajaxR from './ajax.js'
import axios from 'axios';
import LForm from './components/login.vue'
import Header from './components/header.vue'
export default {
  components:{
    LForm,
    Header,
  },
  mounted(){
    this.connect()
    this.connect2()
   
    document.body.style.background =this.expiretDate >this.currentDate ? "whitesmoke":"#23232e"
    this.expiretDate=new Date(localStorage.auth)
    this.isAuth=localStorage.auth;
  },

  data(){
    return{
      currentDate: new Date(),
      expiretDate: new Date(localStorage.auth),
       isAuth:'',
       showLogin:false,
       notify:false,
        modal:false,
    }
  },
  methods:{
      connect(){
      ajaxR.get('/api/user').then(response=>{
        window.Echo.private("jobs."+response.data).
        listen('JobRequest', (e)=>{
          this.$toast.show(`Job `+e.job.name+' has been posted');
          this.notify=true
        })
      })
    },
       connect2(){
        ajaxR.get('/api/user').then(response=>{
        window.Echo.private("order." +response.data).
        listen('OrderRequest', (e)=>{
          console.log(e)
          this.notify=true
          this.$toast.show(`${e.order.name} ${e.order.content}`);
        })
      })
    },
  registerUser(info){
      var userData
      axios.get('https://randomuser.me/api').then(response=>{
        userData=response.data.results[0]
        info.avatar=userData.picture.large
        info.name=userData.name.first
        info.email=userData.email
        console.log(info)
        ajaxR.post('/register',info).then(response=>{
          console.log(response)
          alert('Welcome '+info.name+' your email is '+info.email)
        }).catch(error=>{
          console.log(error)
        })
      })
    },
   

    logIn(credentials){
      var expiry =new Date()
      if(localStorage.auth){
      }
      ajaxR.get('/sanctum/csrf-cookie').then(response=>{
        console.log(response.status)
        ajaxR.post('/login',credentials).then(response=>{
            document.body.style.background = "white"
            expiry.setHours( expiry.getHours() + 10 );
            console.log(expiry)
            localStorage.setItem('auth',expiry)
            this.expiretDate =new Date(localStorage.auth)
            this.isAuth=true
            this.showLogin=false
            this.$router.push('/browse')
        }).catch(error=>{
          if(error !== '204'){
             alert('could not authenticate')
          }
        })
      }) 
    },
    setLogin(){
      if(localStorage.auth){
        document.body.style.background = "#23232e"
        this.isAuth=false
        this.expiretDate="";
       localStorage.setItem('auth','')
       ajaxR.post('/logout').then(response=>{
            this.isAuth=false
            localStorage.setItem('auth','')
       })
      }
      else{
        this.showLogin=!this.showLogin
      } 
    },
    getNotification(){
      this.notify=false
    },
    setNotify(){
      this.notify=true
    }
  }  
}
</script>
<style >

:root {
  font-size: 16px;
  font-family: 'Open Sans';
  --text-primary: #b6b6b6;
  --text-secondary: #ececec;
  --bg-primary: #23232e;
  --bg-secondary: #141418;
  --transition-speed: 600ms;
   --typewriterSpeed: 6s;
  --typewriterCharacters: 24;
  --bg-color: hsl(49 37% 94%);
}

body {
  color: black;
  margin: 0;
  padding: 0;

}

.scroller {
  overflow-y: scroll;
  scrollbar-color: grey transparent;
  scrollbar-width: thin;

}

main {
  margin-left: 6rem;
  margin-top:10px;
   height: 100vh;

}

.navbar {
  position: fixed;
 background-color: rgba(35, 35, 46, 1);
  transition: width 600ms ease;
  border-radius: 0px;
 
}
.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.nav-item {
  width: 100%;
  
}

.nav-item:last-child {
  margin-top: auto;
}

.nav-link {
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--text-primary);
  filter:  opacity(0.7);
  transition: var(--transition-speed);
   text-decoration: none;
}

.nav-link:hover {
  filter: grayscale(0%) opacity(0.80);
  background: var(--bg-secondary);
  color: var(--text-secondary);
}
.nav-link:active{
  text-decoration: none;
}

.link-text {
  display: none;
  margin-left: 1rem;
  
}

.nav-link svg {
  width: 2rem;
  min-width: 2rem;
  margin: 0 1.5rem;
  margin-left: 35px;

  transition-duration:var(--transition-speed);
}

.logo {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
  width: 100%;
}

.logo svg i {
  transform: rotate(0deg);
  transition: var(--transition-speed);
  
}

.logo-text
{
  display: inline;
  position: absolute;
  left: -999px;
  transition: var(--transition-speed);
}

.navbar:hover .logo svg {
  transform: rotate(-180deg);
 
}
.navbar:hover{
   background-color: rgba(35, 35, 46, 1);
}
.header-logo{
  text-align: right;
  background-color: var(--bg-secondary);
  color: white;
  font-family: "Lucida Console", "Courier New", monospace;
  font-size: 20px;
  width:100%;
 
}
.error-message{
  color: red;
  font-style: italic;
  animation: shake 0.5s; 

}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
@keyframes fade {
  from {opacity: 0;}
  to {opacity:1 ;}
}

/* Small screens */
@media only screen and (max-width: 600px) {
  .navbar {
    bottom: 0;
    margin-bottom: 0px;
    width: 100vw;
    height: 5rem;
    overflow: scroll;
    scrollbar-width: none;
    
  }

  .logo {
    display: none;
  }

  .navbar-nav {
    flex-direction: row;
  }

  .nav-link {
    justify-content: center;
   
  }
  
  main {
    padding-left: 0px;
    margin-left:0px;

  }
}
.nothing-here{
    text-align: center;
    width:100%;
    height:90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
/* Large screens */
@media only screen and (min-width: 600px) {
  .navbar {
    top: 0;
    width: 5.8rem;
    height: 100vh;
    overflow: scroll;
    scrollbar-width: none;
  }

  .navbar:hover {
    width: 16rem;
  }

  .navbar:hover .link-text {
    display: inline;
   
  }

  .navbar:hover .logo svg
  {
    margin-left: 12.3rem;
  }

  .navbar:hover .logo-text
  {
    left: 0px;
  }
}

.fontIcon{
  font-size:35px; 
  margin-left:25px; 
  margin-right:13px;
  align-items: center;
 
}
.dot {
  height: 7px;
  width: 7px;

  border-radius: 50%;
  display: inline-block;
  margin-right:3;
}
.the-header{
  position: fixed;
  font-weight: bold;
  text-transform: uppercase;
  
  text-align: right;
  color: var(--text-primary);
  background: var(--bg-secondary);
  font-size: 1.5rem;
  letter-spacing: 0.3ch;
}



</style>

