<template>
<div class="modal-body"  v-show="edit==true">
  <div class="modal-form">
 <form>
     <i class="fas fa-times" @click="edit=false"></i>
   <label> Name </label>
   <input type="text">
   <label> Email </label>
   <input type="email">
   <label> avatar </label>
   <input type="text">
   <input type="submit" value="Change" @click.prevent="edit=false">

 </form>
  </div>
</div>
<div class="grid-box">
<section>
<div class="card">
  <img :src="myProfile?info[2]:info.avatar" alt="John" style="width:90%;margin-top:10px; ">
  <h1>{{myProfile?info[1]:info.name}}</h1>
  <p class="title">[insert profession here]</p>
  <p>[insert education here]</p>
  <div style="margin: 24px 0;">

  </div>
  <p  v-if="myProfile" @click="edit=true"><button>Edit</button></p>
  <p  class="footer" v-else></p>
  
</div>

<div class="skill-card">
    <h3> Skills </h3>
    <ul>
        <li>Expert marksman </li>
        <li>Explosive specialist </li>
        <li>Cybernetics </li>
        <li>Driving </li>
        <li>Full stack development </li>

    </ul>
</div>
</section>

<section class="user-jobs scroller">
<h1 class="job-header"> Jobs </h1>
<Item :list='list' @hire-freelancer="hireFreelancer"/>
</section>
 <section class="user-reviews">
        <div>
    <h1 style="width:fit-content; float:left; margin-right:10px; ">Customer Reviews </h1> <span style="color:grey;">({{reviews.length}})</span> 
    <div class="rating-square" :style="average >= 4 ?' background-color:rgb(13, 220, 13);':average==3 ?'background-color:orange':'background-color:red'"> <summary >{{average.toString().slice(0,1)}}</summary></div>
        </div>
</section>
<section class=user-reviews>
  <Review :list="reviews" />
</section>
</div>

</template>


<script>
import Item from '../components/jobcard-item.vue'
import ajaxR from '../ajax'
import Review from  '../components/review-item'
export default {
    components:{
        Item,
        Review,

    },
    props:{
        myProfile:{type:Boolean,default:true}
    },
 
     emits: ['setNotify'],
     data(){
         return{
            list:[],
            info:[],
            average:0,
            reviews:[],
            edit:false,
            
         }                
    },
    mounted(){
      document.body.style.background = "whitesmoke"
        if(this.myProfile){
        this.getUser()
        this.getJob()
        this.myReviews()
        }
        else{
            this.getProfile()
            this.profileJob()
            this.getReviews()
        }
       
    },
    methods:{
     getJob(){
      ajaxR.get('/api/userjobs').then(response=>{
         this.list=response.data[0]
        for(var i=0; i<this.list.length; i++){
          this.list[i].rscore=response.data[1][i]
          this.list[i].rcount=response.data[2][i]
        }
      })
    },
     hireFreelancer(hire){
    this.$router.push('/gig/'+hire.id)

    },
      getUser(){
           ajaxR.get('/api/userinfo').then(response=>{
             
             this.info=response.data
              if(!this.info){
                    this.$router.push('/404')
                }
           })
      },
      getProfile(){
          ajaxR.get('/api/userinfo/'+this.$route.params.id).then(response=>{
             
         this.info=response.data
           if(!this.info){
                    this.$router.push('/404')
                }
           })
      },
        profileJob(){
      ajaxR.get('/api/profilejobs/'+this.$route.params.id).then(response=>{
          this.list=response.data[0]
        for(var i=0; i<this.list.length; i++){
          this.list[i].rscore=response.data[1][i]
          this.list[i].rcount=response.data[2][i]
        }
         
      })
    },
    getReviews(){
      ajaxR.get('api/userReview/'+this.$route.params.id).then(response=>{
        this.reviews=response.data
        this.average = this.reviews.reduce(function (accumulator, currentValue){
           return accumulator + currentValue.score
        },0)/this.reviews.length
        
      })
    },
    myReviews(){
       ajaxR.get('api/myReview').then(response=>{
        this.reviews=response.data
           this.average = this.reviews.reduce(function (accumulator, currentValue){
           return accumulator + currentValue.score
        },0)/this.reviews.length
      })

    },

    }
   
}
</script>
<style  scoped>

.rating-square{
    display: flex;
    height:60px;
    width:60px;
    background-color:rgb(13, 220, 13);
    border-style:solid;
   border-radius: 10px;
    color: white;
    float:left;
    align-items: center;
    justify-content: center;
    font-size:30px;
    margin-left: auto;
    margin-top:15px;
}
.grid-box{
    display: grid;
    grid-template-columns: 30% 70%;
    width:80%;
    margin-left:10%;
    
    background-color: white;
    padding:20px;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
.skill-card{
    display:flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    flex-direction: column;
    max-width: 300px;
    margin:auto;

}
.skill-card >h3{
    margin-bottom: 0px;
    margin-left:25px;
    font-size:20px;;
}
.user-jobs{
    display: flex;
    width:100%;
    flex-wrap: wrap;
    height:fit-content;
    max-height:773px;
    overflow: scroll;
}
.user-reviews{
    margin-top:60px;
    grid-column: 1 / span 3;
}

.footer{
    background-color: black;
    height: 30px;
}
.job-header{
    display: none;
   
    font-size:30px;
}
.modal-body{
  display:flex;
  justify-content:center;
  width:100%;
  height:100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.9);
  top:0;
  left:0;
  animation: fade 1s;

}
.modal-form{
  display:flex;
  justify-content:center; 
  flex-direction:column;
  height: 70%;
}
.modal-form > form{
  display:flex;
  flex-direction: column;
  color: white;
  width:400px;
 
     background-color: rgba(35, 35, 46, 0.90);
     padding:15px;
}
i{
    display: flex;
    font-size: 25px;
    justify-content: flex-end;
    opacity:0.60;
    border-bottom:solid;
    border-width: thin;
    width: 100%;
    margin-bottom:10px;
    cursor: pointer;
       
}
i:hover{
    opacity: 1; 
}
input[type=submit]{
    margin-top:10px;
    border-radius: 0px;
    border-style: none;
    font-size:20px;
    cursor: pointer;
    margin-top:16px;
 
}
input[type=submit]:hover{
    background-color: rgba(255, 255, 255, 0.5);
}
label{
    margin-top:5px;
    margin-bottom:5px;
    font-size:20px;
}

@media only screen and (max-width: 600px) {
    .grid-box{
        display: flex;
        flex-direction: column;
        margin:0px;
        width:100%;
        margin-bottom:80px;
    }
    .card{
        max-width: 90%;
        margin:0px;
        margin-bottom:20px;
        
    }
    .skill-card{
        max-width: 90%;
        margin:0px;
        margin-bottom:10%;
        margin-top:10%;
    }
    .user-jobs{
        margin:0px;
        width:90%;
    }
    .job-header{
    display: block;
}
.user-reviews{
  width:96%;
}

}

</style>