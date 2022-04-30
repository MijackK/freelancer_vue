<template>
<div>
 <input placeholder="Search here.." class="search-header" v-model="question"  >
  <i class="fas fa-sort header-icon" @click="selected='sort'"> </i>
 <i class="fas fa-filter header-icon"  @click="selected='filter'" ></i>
   <div class="sort-box" v-show="selected=='sort'"> 
     <i class="fa fa-times" style="margin-left:94%" @click="selected=''"></i>
     <li>Best Selling</li>
     <li>Newest</li>

    </div>
     <div class="filter-box" v-show="selected=='filter'"> 
       <i class="fa fa-times" style="margin-left:94%" @click="selected=''"></i>
       <label> Min </label>
   <input type="number" min="0">
   <label> Max </label>
     <input type="number" min="0">
     <input type="submit" value="apply" class="apply-button" >
    </div>
    
</div>

 <div class="auto-box" v-show="showAuto">
  <div v-for="(item,index) in filteredList" :key='index' >
      <li><i class="fas fa-search"></i><router-link :to="'/job/'+item.id"> {{item.name}} </router-link> </li>
  </div>

 </div>
    <div class="flex-container-browse ">
    <Item :list='filteredList' @hire-freelancer="hireFreelancer"  />
</div>

</template>
<script>
import Item from '../components/jobcard-item.vue'
import ajaxR from '../ajax.js'
export default {
     components:{
        Item
    },
    mounted(){
      document.body.style.background = "white"
        this.getJob()

    },
    data(){
        return{
           filteredList:[],
           question:this.$route.params.id,
           showAuto:false,
            list:[],
            sortValue:"",
            filterValue:null,
            selected:'',

        }

    },
    methods:{
           getJob(){
      ajaxR.get('/api/jobs').then(response=>{
        this.list=response.data[0]
        for(var i=0; i<this.list.length; i++){
          this.list[i].rscore=response.data[1][i]
          this.list[i].rcount=response.data[2][i]
        }
        this.filteredList=this.list.filter(list => list.name.toLowerCase().includes(this.$route.params.id.toLowerCase())) 
      })
      
    },
    hireFreelancer(hire){
    this.$router.push('/gig/'+hire.id)

    },
getAnswer(){
  this.showAuto=true
  if(this.sortValue){
    console.log('sort')
  }
  if(this.filterValue){
    console.log('filter')
  }
   this.filteredList=this.list.filter(list => list.name.toLowerCase().includes(this.question.toLowerCase())) 
   
  },

    },
    watch:{
    question(newQuestion,oldQuestion){
        if(newQuestion==""){
           this.showAuto=false
           this.filteredList=this.list
         }
         else{
      this.getAnswer() 
         }   
    },
}
    
}
</script>
<style scoped>
.flex-container-browse {
   display: flex;
  flex-wrap:wrap;
  width:fit-content;
  margin-left:15%;
  margin-top:15px; 
}
.auto-box{
  margin-top:10px;
    background-color:white;
   
    border-radius: 10px;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);  
    margin-bottom:10px;
    margin-left:5%;
    position: absolute;
}
i{
  margin-right:10px;
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
.search-header{
  width:85%;
  border-radius: 10px;
  border-width: thin;
  padding:10px;
  margin-top:10px;
  margin-bottom:0px;
  margin-left:5%;

}
.header-icon{
  color:rgba(35, 35, 46, 0.70);
  font-size:20px;
  margin:10px;
}
.header-icon:hover{
  color:rgba(35, 35, 46, 1);
}
.sort-box{
  margin-top:20px;
  position:absolute;
  width:200px;
  height:fit-content;
  border-style: solid;
  right:40px;
  background-color: whitesmoke;

    border-width: thin;
    padding:4px;
    cursor: pointer;
}
.filter-box{
  display: flex;
  flex-direction: column;
  margin-top:20px;
  position:absolute;
  width:200px;
  height:fit-content;
  border-style: solid;
  right:40px;
  background-color: whitesmoke;

    border-width: thin;
    padding:4px;
    cursor: pointer;
}
.apply-button{
  width:100%;
  border-style: none;
  color:white;
  background-color: rgba(35, 35, 46, 0.90);
   cursor: pointer;
   margin-top:10px;
}
.apply-button:hover{
  background-color: rgba(35, 35, 46, 1);
 

}

@media only screen and (max-width: 600px){
    .auto-box{
        margin:0px;
        margin-top:5px;
        margin-bottom:10px;
        margin-left:10px;
    }
    .search-header{
        margin:5px;
    }
    .flex-container-browse{
        margin:0px;
        width:99%;
         margin-bottom: 80px;
    }
}

</style>