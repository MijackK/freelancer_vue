<template>


<input type="submit"  value="List a Job" @click="$emit('openJobForm',true)" class="job-button">

<div v-show="list.length == 0" style="display:flex; justify-content:center;color:grey">
    <h1> There is nothings here </h1>
</div>
<div v-for="(item,index) in list" :key='index' class="grid-box">
<div v-if="selectedNav=='jobs'">
<section class="flex-box">
  <summary>
      <img class="thumbnail"  :src="item.thumbnail"  alt="">
 </summary>
 <article>
    <router-link :to="'/job/'+item.id"><h4>{{item.name}}</h4></router-link>
    <span class="view-count"> Views: {{item.views}} <i class="fas fa-dollar-sign" style="color:green;margin-left:5px;" >100000</i> </span>
    <p>{{item.description}}</p>
    <div class="footer">
        Ksh <span>{{item.price}}</span>
        <i class="far fa-trash-alt delete-icon my-icon" @click="$emit('deleteJob',item.id)"></i>
        <i class="fas fa-pen  edit-icon my-icon" @click="expandJob(item.id)"></i>
        
    </div>
 </article>
</section>

<form class="update-form"  v-if="selectedJob==item.id && showForm">
   
    <label> Name </label>
    <input  type="text"   v-model="update.name" :placeholder="item.name">
    <label> Description </label>
    <textarea v-model="update.description" :placeholder="item.description" cols="90" row='10' ></textarea>
    <label> Price </label>
    <input type="number" v-model="update.price" :placeholder="item.price" min="0" >
    <input type ="submit" value="update" @click.prevent="$emit('updateJob',[update,item.id])" >
    <input type="hidden"  :value="item.id">
 

</form>
</div>

<div v-if="selectedNav=='hired'">
    <section class="flex-box">
  <summary>
       <img class="thumbnail"  :src="item.thumbnail"  alt="">
 </summary>
 <article>
   <h4>{{item.job_name}}</h4>
     <label :style=" item.status =='cancelled'?'font-size:12px;'+'color:red;':'font-size:12px;'+'color:green;'">{{item.status}}</label>
    <p style="margin:3px;">{{item.request}}</p>
     <label style="font-weight: bold; text-decoration:underline; color:grey; font-size:13px;">Freelancer</label>
    <div class="footer" style="margin-top:0px;">
        <span><img class="current-img" :src="item.avatar">{{item.user_name}}</span>
        Ksh <span>{{item.price}}</span>
        <input type="submit" value="Request Cancel" style="margin-bottom:3px;" @click="expandJob(item.id)"/>
    </div>
 </article>
</section>
<form class="cancel-form"   v-if="selectedJob==item.id && showForm">
    <label> Cancellation Request </label>
    <textarea placeholder="Please tell us your reason for cancelling" cols="90" row='20' ></textarea>
    <input type ="submit" value="sendRequest">
    <input type="hidden"  :value="item.id">
</form>

</div>

</div>
</template>
<script>
export default {
    emits:['updateJob','deleteJob','expandJob','openJobForm'],
    props:{
        list:{type:Array},
        selectedNav:{type:String}
    },
    emits: ['deleteJob'],
    data(){
        return{
            showForm:false,
            update:{
                name:"",
                description:"",
                price:"",
            },
            selectedJob:"",
            length: this.list.length
        }
    },
    methods:{
        expandJob(id){
            this.showForm=!this.showForm
            this.selectedJob=id
           // this.$emit('expandJob',id)
        }
    }
}
</script> 
<style scoped>
a{
    text-decoration: none;
    color: black;
}
.job-button{
    background-color:transparent;
  padding-left: 20px ;
  padding-right: 20px;
  margin-left: 20px;
  transition-duration: 0.1s;
  box-shadow: 0 5px #666;

}
.job-button:hover{
    background-color:whitesmoke;
  padding-left: 20px ;
  padding-right: 20px;
  margin-left: 20px;

}
.job-button:active{
    background-color:whitesmoke;
  box-shadow: none;
  transform: translateY(5px);
}
.update-form{
   padding: 10px;
   border-style: solid;
   border-top: none;
   border-width: thin;
   display: flex;
   flex-direction: column;
   background-color: white;
   animation-name: show-form;
   animation-duration: 0.4s;
   animation-timing-function: linear;
   overflow: hidden;
   
}
.cancel-form{
   border-style: solid;
   border-top: none;
   border-width: thin;
   display: flex;
   flex-direction: column;
   background-color: white;
   animation-name: show-form;
   animation-duration: 0.4s;
   animation-timing-function: linear;
   overflow: hidden;
    padding:20px;
}
.cancel-form >textarea{
    height:100px;
}
label{
   font-family: 'Dekko';
   font-size: 19px;

}
textarea{
    width:80%;
    margin:10px;
  
}
input[type=text]{
    
    margin:10px;
    border-radius:5px;
}
input[type=number]{
    width:10%;
    margin:10px;
    border-radius:5px;
}
input[type=submit]{
  
    color:white;
    border-style: none;
    background-color: rgba(35, 35, 46, 0.9);
    height:25px;
    font-family: 'Dekko';
    font-size:15px;
   
}
input[type=submit]:hover{
    background-color: rgba(35, 35, 46, 1);
}
.grid-box{
    display: grid;
    grid-template-columns: 100%
}
.flex-box{
    display: flex;
    justify-content: flex-start;
    margin-top:10px;
    background-color: white;
    border-style: solid;
    border-width: thin;
    border-radius:10px;
   
}
.flex-box >article{
    
    flex-direction: column;
    width:100%;
    height: 100%;
    margin-left:20px;
}

span{
    color:rgb(46, 95, 53);
    margin-right:3%;

}
.my-icon{
    margin-right:15px;
}
.edit-icon:hover{
    color:rgb(67, 28, 172);

}
.delete-icon:hover{
    color:red;
    
}
h4{
   
    text-decoration: underline;
    margin-bottom:0px;
   
}
.view-count{
    font-size:13px;
    font-style: italic;
    color:grey;
}
.footer{
   margin-top:5%;
}

.thumbnail{
  width: 18rem;
  border-radius: 10px;
  border-width: 1px;
 object-fit: cover;
 height: 170px;
}
.current-img{
    height:50px;
    width:50px;
    border-radius: 50%;

}
@keyframes show-form {
 from {height: 0 }
  to { height: 50% }
}
@media only screen and (max-width: 600px) {

    
.thumbnail{

display: none;
}
}
</style>