<template>
<h1>Add a cat:</h1> 
<input v-model='newCat'>
<button @click='addCat'>Cats!</button>
<div v-for="(cats,index) in list" :key='index'>
  {{cats}}
  <button @click='deleteCat(index)'>bye</button>
</div>
</template>

<script>
export default {
   emits: ['setNotify'],
    data(){
        return{
              list:[],
               newCat:null,
        }
    },


    mounted(){
        
        if (localStorage.cats){
            console.log('it exists')
            this.list =JSON.parse(localStorage.getItem('cats'));
        }
        else{
            console.log('it doesnt exist, lets set it')
            localStorage.setItem('cats','') 
        }
    },
    methods:{
    addCat(){
      if(!this.newCat){
        return;
      }
      this.list.push(this.newCat)
      this.newCat=''
      this.saveCats()
    },
    deleteCat(x){
      this.list.splice(x, 1);
      this.saveCats();
    },
    saveCats(){
      const parsed = JSON.stringify(this.list);
      localStorage.setItem('cats', parsed)

    },
    }  
}
</script>