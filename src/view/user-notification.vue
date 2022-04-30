<template>
 <h1> Notifications </h1>
 <div  class="notify-containert scroller" > 
 <div v-for="(item,index) in notifications" :key='index' >
     <div  class="flex-box" @click="item.title.includes('Message')?$router.push('/message'):$router.push('/home') ">
     <img :src='item.avatar' class="the-thumbnail">
     <article class="notify-content"> 
         <h2> {{item.title}}</h2>
         <label>{{item.job_name}}</label>
         <p>{{item.content}}</p>
     </article>
     <i class="fa fa-times" @click="deleteNotification(item.id)"></i>
     </div>

 </div>
 
</div>

</template>

<script>
import ajaxR from '../ajax'
export default {
 emits: ['setNotify'],
 mounted(){
     document.body.style.background = "whitesmoke"
     this.getNotifications()

 },
 data(){
     return{
         notifications:[],

     }
 },
 methods:{
     getNotifications(){
         ajaxR.get('api/notification').then(response=>{
             console.log(response)
             this.notifications =response.data.reverse()
         }).catch(e=>{
             console.log(e)

         })
     },
     deleteNotification(id){
      ajaxR.delete('/api/notification/'+id).then(response=>{
        alert(response.data)
        this.getNotifications()
      })
      
    },


 }
    
}
</script>

<style scoped>
h1{
    color:tomato;
    background-color:#23232e;
   padding:10px;
     margin-top:0px;
     text-align: center;
     margin-right:2%;
     margin-left:5%;
  
       
  
}
p{
    margin-bottom: 0px;
    margin-top:0px;
    color: grey;
}
h2{
    margin:0px;
    font-size: 18px;
    
}
.flex-box{
    display:flex;
    padding:10px;
    border-bottom: solid;
    border-width: thin;
    margin-top:0px;
  
    
}
.flex-box:hover{
    background-color: rgba(0,0,0,0.3);
     cursor:pointer;
    
}
.notify-content{
   margin-left:6px;
   overflow: hidden;
  
}
.the-thumbnail{
    display: flex;
    width:70px;
    height:70px;
    margin-left:10px;
    justify-content: center;
    margin-left:0px;
    margin-right:4px;
    border-radius: 50%;
   
}

label{
    font-size: 13px;
    margin:0px;
    font-style: italic;
}
i{
    margin-left:auto;
    margin-right:5px;
    margin-top:2px;
    color:grey;
}
i:hover{
    color:black;
}
.notify-containert{
background-color: white;
  max-height:720px;
 margin-right:2%;
    margin-left:5%;
    padding:10px;
}
</style>

