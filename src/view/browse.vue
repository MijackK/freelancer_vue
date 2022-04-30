<template>

<div class="home-header">
  <div>
 <input placeholder="Search here.." class="search-header" v-model="question" @keyup.enter="goSearch()" >
 <div class="auto-box" v-show="showAuto">
  <div v-for="(item,index) in filteredList" :key='index' >
      <li><i class="fas fa-search"></i><router-link :to="'/job/'+item.id"> {{item.name}} </router-link> </li>
  </div>
 </div>

  </div>
</div>
    <i class="fas fa-arrow-right arrow" style="margin-left:89%;margin-top:20%;" @click="slideFoward()"></i>
 <i class="fas fa-arrow-left arrow" style="margin-right:88%;margin-top:20%;" @click="slideBackwards()"></i>
<div class="flex-container-browse  " >
 
 <div class="category category-slide invisible" style="display:flex"> <router-link to="/category/9"><p>Web development</p></router-link></div>
 <div class="category category-slide invisible"> <router-link to="/category/10"><p>Animation</p></router-link></div>
 <div class="category category-slide invisible"> <router-link to="/category/11"><p>Cleaning</p></router-link></div>
 <div class="category category-slide invisible"> <router-link to="/category/12"><p>Logo Design</p></router-link></div>
 <div class="category category-slide invisible"> <router-link to="/category/13"><p>Game development</p></router-link></div>
   <div class="category category-slide invisible"> <router-link to="/category/14"><p>Training</p></router-link></div>
     <div class="category category-slide invisible"> <router-link to="/category/15"><p>Repair</p></router-link></div>
   

</div>
 <h1> Best Sellers </h1>
<div class="flex-container-browse scroller" >
    <Item :list='bestSelling.sort((a,b)=>b.orders-a.orders).slice(0,5)' @hire-freelancer="hireFreelancer"  />
</div>
<h1> Top rated</h1>
<div class="flex-container-browse scroller">
   <Item :list='topRated.sort((a,b)=>b.rscore-a.rscore).slice(0,5)' @hire-freelancer="hireFreelancer"  />
  
</div>
<h1> Most Viewed</h1>
<div class="flex-container-browse scroller">
   <Item :list='viewed.sort((a,b)=>b.views-a.views).slice(0,5)' @hire-freelancer="hireFreelancer"  />
 
</div>
</template>
<script>
import Item from '../components/jobcard-item.vue'
import ajaxR from '../ajax.js'

export default {
   emits: ['setNotify'],
    components:{
        Item
    },
    mounted(){
      document.body.style.background = "white"
        this.getJob()
        
        
    },
    data(){
        return{
        list:[],
        viewed:[],
        topRated:[],
        bestSelling:[],
        slideIndex:0,
        x:document.getElementsByClassName("category"),
         filteredList:[],
           question:'',
           showAuto:false,
        }
    },
    watch:{
       question(newQuestion,oldQuestion){
         if(newQuestion==""){
           this.showAuto=false
         }
         else{
      this.getAnswer() 
         }   
  },

    },
    methods:{
     getJob(){
      ajaxR.get('/api/jobs').then(response=>{
        this.list=response.data[0]
        for(var i=0; i<this.list.length; i++){
          this.list[i].rscore=response.data[1][i]
          this.list[i].rcount=response.data[2][i]
          this.list[i].orders=response.data[3][i]
        }
        this.viewed=this.list.slice()
        this.bestSelling=this.list.slice()
        this.topRated=this.list.slice()

      })
      
    },
    hireFreelancer(hire){
    this.$router.push('/gig/'+hire.id)

    },
    slideFoward(){
      if(this.slideIndex <this.x.length-1){
        this.slideIndex=this.slideIndex+1
        for(var i=0;i<this.x.length;i++){
          this.x[i].style.display = "none";
        }
        this.x[this.slideIndex].style.display = "flex";
      }
    },
      slideBackwards(){
        if(this.slideIndex >0){
          this.slideIndex=this.slideIndex-1
           for(var i=0;i<this.x.length;i++){
          this.x[i].style.display = "none";
        }
        this.x[this.slideIndex].style.display = "flex";

        }
    },
     getAnswer(){
  this.showAuto=true
   this.filteredList=this.list.filter(list => list.name.toLowerCase().includes(this.question.toLowerCase())) 
   
  },
  goSearch(){
     this.$router.push('/search/'+this.question)
  }

 }

    
}
</script>
<style scoped>
.category{
  background-color: #23232e;
  height:fit-content;
  width: 200px;
  margin:10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.category > a{
  text-decoration: none;
  color:white;
  text-align: center;

}
.category > a:hover{
  text-decoration: underline;
}

.category:hover{
 
   background-color: rgba(0, 0, 0, 1);
}

h1{
  margin-left:7%;
  color:black;
  margin-bottom: 0px;
  padding:5px;
}
.flex-container-browse {
 margin-left:7%;
 margin-right:3%;
  display: flex;
  flex-wrap:nowrap;

  width:90%;
  
   
}
.search-header{
  width:95%;
  border-radius: 10px;
  border-width: thin;
  padding:10px;
  margin-top:10px;
 

}
.home-header{
  display: flex;
 margin-left:6%;
 margin-bottom:10px;
 align-items: flex-end;
flex-direction: column;
}
.home-header >div{
  width:100%;
  
}
.header-icon{
  color:rgba(35, 35, 46, 0.80);
  font-size:20px;
  margin:10px;
}
.header-icon:hover{
  color:rgba(35, 35, 46, 1);
}
.arrow{
  color:grey;
  font-size:30px;
  width:fit-content;
  display: none;
   cursor: pointer;
}
.arrow:hover{
  color:black;

}
.arrow:active{
  color:white;

}
.auto-box{
  margin-top:10px;
    background-color:white;
    border-radius: 10px;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);  
    position: absolute;
    padding-top:15px;
    padding-bottom:15px;
  
}
i{
  margin-right:10px;
  margin-left:10px;
}
a{
  text-decoration: none;
    color:black;
}
li{
  list-style-type: none;
  margin-bottom:5px;
}
li:hover{
  color:white;
  background-color: rgba(0,0,0,0.3);
}

@media only screen and (max-width: 600px){
  .flex-container-browse {
 width:100%;
 margin:0px;
 justify-content: center;
 flex-wrap: wrap;
  margin-bottom: 80px;



 
}
.home-header{
  margin-left:5px;
}
.search-header{
  width:95%
}
.arrow{
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  

}
.category-slide{
  width:98%;
  height:200px;
  flex-wrap: nowrap;
}
.invisible{
  display:none;
}
h1{
  margin:0px;
}



}

</style>