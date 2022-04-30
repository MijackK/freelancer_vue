<template>

<div v-for="(item,index) in list" :key='index' class="job-card ">
  <img class="thumbnail"  :src="item.thumbnail"  alt="">
  <div class="">
    <router-link :to="'/job/'+item.id"><h4 class="title">{{item.name}}  </h4></router-link>
    <p class="description">{{item.description.slice(0,100)}}</p>
    <span class="rating-square" :style="item.rscore >= 4 ?' background-color:green;':item.rscore==3 ?'background-color:orange':'background-color:red'">
      {{item.rscore == null ?'':item.rscore.slice(0,1)}}</span> {{item.rcount==0?'':('('+item.rcount+')')}}
   <div class='footer'>
     <img :src="item.avatar" class="profile">
     <router-link :to="'/user/'+item.user_id"> <span>{{item.user_name}}</span></router-link>
    Ksh {{item.price}} 
      <input class="hire-button"
 type='submit' value='Hire'
 @click="$emit('hireFreelancer',{'id':item.id})"/>
   </div>
  
</div>
  
 

</div>
</template>
<script>
export default {
    props:{
        list:{type:Array},
        reviewData:{type:Array}
    },
    emits: ['hireFreelancer'],
}
</script> 
<style  scoped>

span{
    color:#b6b6b6;
    text-decoration: underline;

}
.title{
  margin-top:0px;
  margin-bottom:0px;
  padding:5px;
  text-decoration: underline;
}
.description{
height:44px;
padding:3px;
}
.footer{
  border-top: solid;
  border-color: rgba(0, 0, 0, 0.3);
  padding:3px;
  max-height: 56px;

}
.job-card{
  width: 18rem;
  border-style: solid;
  border-radius: 13px;
  border-color: rgba(0, 0, 0, 0.5);
  border-width: 2px;
  margin:10px;
  background-color: white;;
  
}

.thumbnail{
  width: 18rem;
  border-radius: 10px;
  border-width: 1px;
  height: 200px;
  
}
.profile{
  border-radius: 50%;
  width:50px;
  height:50px;

}
a{
  text-decoration: none;
  color: black;
}

input[type=submit]{
  background-color:rgba(38, 128, 38, 0.7);
  padding-left: 20px ;
  padding-right: 20px;
  margin-left: auto;
  border-radius: 5px;
  color:whitesmoke;
  border-style: none;
}
input[type=submit]:hover{
  background-color:rgba(51, 196, 51, 1);
  cursor: pointer;
}
.rating-square {
  height: fit-content;
  width: fit-content;
  background-color: green;
  display: inline-block;
  font-size:15px;
  padding-left:6px;
  padding-right:6px;
  color:white;
  margin-bottom:5px;
  margin-left:5px;
  border-radius: 5px;
}

@media only screen and (max-width: 600px){
  .job-card{
    width:100%;
    border-radius: 0%;
    border-width: thin;
  }
  .thumbnail{
    width:100%;
    border-radius: 0%;
  }
}

</style>