<template>
<div v-for="(item,index) in conversations" :key='index' :class="inputTo[0]==(item.to==currentUser?item.from:item.to)?'flex-container-conversation-active':'flex-container-conversation' " @click="$emit('getMessages',item.to==currentUser?[item.from,item.idFrom]:[item.to,item.idTo])">

  <div>
   <img :src="item.to==currentUser?item.savatar:item.ravatar" :alt="currentUser" width="60" height="60">
  </div>
  <article>
    <div class="user-name">
    {{item.to==currentUser? item.from:item.to}}  
    </div>
  <div><p>{{item.text.slice(0,40)}}.. <date class="last-date">{{item.date}} </date></p></div> 

  </article>

</div>

    
</template>
<script>
export default {
  emits:['getMessages'],
  props:{
    conversations:{type:Array},
    inputTo:{type:Array}, 
    currentUser:{type:String},

  },
    
}
</script>
<style scoped>
.flex-container-conversation {
  display: flex;
  flex-wrap: nowrap;
  background-color: transparent;

  width:100%;
  overflow: hidden;
  cursor: pointer; 

 
}

.flex-container-conversation-active {
  display: flex;
  flex-wrap: nowrap;
  background-color: transparent;
padding:4px;
  width:98%;
  overflow: hidden;
 cursor: pointer; 
  background-color:rgba(0, 0, 0, 0.2);
  
  
 
}


.flex-container-conversation > article {
  background-color: transparent;
  font-family: "Times New Roman", Times, serif;
  justify-content:center;
  text-align: Left;
  font-size: 15px;
   display: flex;
   flex-direction:column;
   
   

}

.flex-container-conversation-active > article {
  background-color: transparent;
  font-family: "Times New Roman", Times, serif;
  width: fit-content;
  justify-content:center;
  text-align: Left;
 
  font-size: 15px;
   display: flex;
   flex-direction:column;
    
   

}

img{
border-radius:50%;
margin-top:23px;
margin-right:5px;
margin-left:3px;

}

p{
    margin:0px;
    color:rgb(12, 12, 12);
}
.last-date{
    color:grey;
    font-size: 13px;
    margin-left:5px;
}
.user-name{
  width: 50px;
  height:30px; 
  font-size: 18px;

}
/* Small screens */
@media only screen and (max-width: 600px) {

 .flex-container-conversation{
   border-style: none;
   width:100%;
   justify-content: center;
   
 
 }
  .flex-container-conversation > article{
   display: none;
   
 }
   .flex-container-conversation-active > article{
   display: none;
   }
  .flex-container-conversation > div{
   width:fit-content;
   height: fit-content;
  
 }
 .flex-container-conversation-active > div{
   width:fit-content;
   height: fit-content;
  
 }
 

.flex-container-conversation-active{
  box-shadow: none;
  margin-left:auto;
  background-color:rgba(0, 0, 0, 0.0);
  border-radius: 30%;;

}

 .flex-container-conversation-active > div> img{
   
    box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 1) 
 }


}

</style>