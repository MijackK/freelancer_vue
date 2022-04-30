<template>
<div v-show="list.length == 0" style="display:flex; justify-content:center; color:grey">
    <h3> There is nothings here </h3>
</div>
<div v-for="(item,index) in list " :key='index' class="flex-box">
  
<li class="request-order" v-if="orderType=='requests'">
<section >
    <h5 style="">{{item.user_name}}</h5>
  <img :src="item.avatar" class="profile">
  </section>
  <section style="margin-right:0%; width:65%">
      <h5>JobRequest </h5>
    <i  style="font-size:13px;margin:0px;">{{item.job_name}}</i>
      <p style="font-family: 'Lucida Console', 'Courier New', monospace;"> {{item.request}} </p>
  </section>
  <section style='justify-content:center; margin-left:auto;'>
      <div>
      <i class="fa fa-check" @click="$emit('handleRequest',{'status':'accepted','order':item.id})"></i>
      <i class="fa fa-times"  @click="$emit('handleRequest',{'status':'declined','order':item.id})"></i>
      </div>
  </section>
</li>


<li class="hired-order" v-if="orderType=='orders'">
   
    <article>
        <h4>{{item.job_name}} </h4>
        <p>{{item.request}}</p>
        <span><label style="font-weight: bold;">{{Date.now()<Date.parse(item.predicted_at)?'Due: ':'OverDue: '}}</label><time> {{item.predicted_at.slice(0,19)}} </time></span>
        <span class="hired-order-footer">
        <img class="current-img" :src="item.avatar" >
         {{item.user_name}}
         <input class="hired-order-complete" type="submit" value="complete now" @click="$emit('handleRequest',{'status':'completed','order':item.id})" />
         <input class="hired-order-cancel" type="submit" value="Cancel" @click="$emit('handleRequest',{'status':'cancelled','order':item.id})"/>
        
        </span>
        
    </article>
    
   
</li>


<li class="hired-order" v-if="orderType=='default'">
   
    <article>
        <h4>{{item.job_name}} </h4>
        <p>{{item.request}}</p>
        <span><label style="font-weight: bold;">Due: </label><time> {{item.predicted_at.slice(0,10)}} </time></span>
        <span class="hired-order-footer">
        <img class="current-img" :src="item.avatar" >
         {{item.user_name}}
     
        
        </span>
        
    </article>
    
   
</li>


</div>

</template>
<script>
export default {
    emits:['handleRequest'],
    props:{
        list:{type:Array},
        orderType:{type:String,default:"default"},
        checkmeout:{type:Boolean},
    },
    created(){
   


    },
    data(){
        return{
        
            length: this.list.length
        }
    }
   
}
</script> 
<style  scoped>



.flex-box{
    display: flex;
    background-color: white;
    margin-top:10px;
    margin-left:5px;
     border-style: solid;
    border-width: thin;
    margin-right:3px;
  
}

li{
    list-style-type: none;
    display: flex;
    width:100%;
}
.profile{
    width:80px;
    height:80px;
    border-radius: 50%;
}

 .request-order > section{
    display:flex;
    flex-direction: column;
    margin-left:5px;
    margin-right:10px;
   
}
.hired-order{
    padding:6px;
}
.hired-order >article{
    display: flex;
    flex-direction: column;
}
.hired-order-footer{
    display:flex; 
    align-items:flex-end;
}
.hired-order-complete{
   margin-left: 30px;
    width:100%;
    color:white;
    font-size:16px;
    background-color: rgba(1, 119, 1,0.8);   
}
.hired-order-cancel{
   margin-left:5px;
   text-decoration: underline;
    color:grey;
    font-size:13px;
   background-color: transparent;
   border-style: none;
}
.hired-order-complete:hover{
     background-color: rgba(1, 119, 1,1); 
}
.hired-order-cancel:hover{
      color:black;
}
.hired-order > article >h4{
    margin:0px;
    text-decoration: underline;
    

}
.hired-order > article >p{
    margin-top:10px;
    margin-bottom:10px;
  

}
.current-img{
    height:50px;
    width:50px;
    border-radius: 50%;

}

h5{
    margin:0px;
    padding:3px;
    text-decoration: underline;
   
}
i{
    margin:10px;
    font-size:18px;
}
.fa-check{
     color: green;
}
.fa-times{
    color: rgba( 255, 0, 0, 0.6);
}
.fa-check:hover{
 
  color: rgba(0, 255, 0, 0.8);
}
.fa-times:hover{
  color: red;
}

time{
    color:blue;
}

</style>