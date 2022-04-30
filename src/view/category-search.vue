<template>
<h1>Category </h1>
<div class="flex-container-browse ">
    <Item :list='list' @hire-freelancer="hireFreelancer"  />
</div>
    
</template>
<script>
import ajaxR from '../ajax.js'
import Item from '../components/jobcard-item.vue'
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
             list:[],
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
        this.list=this.list.filter(list=>list.category_id==this.$route.params.id)
        console.log(this.list)
      })
      
    },
     hireFreelancer(hire){
    this.$router.push('/gig/'+hire.id)

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
  padding:10px;
   
}


</style>