<template>

 <div v-for="(item,index) in list " :key='index' class="item-body">
      <section style="display:flex;">
      <div class="user-avatar">   
      <img :src="item.avatar" >
      <span> {{item.name}} </span>
      </div>
      <h3>{{item.title}}</h3>
       <summary class="rating-square" :style="item.score >= 4 ?' background-color:rgb(13, 220, 13);':item.score==3 ?'background-color:orange':'background-color:red'">{{item.score}}</summary>
       </section>
      <article class="main-content">
          <p>{{item.content}}</p>
      </article>
 </div>
 
  
</template>
<script>
export default {
    props:{
        list:{type:Array}
    }
    
}
</script>
<style scoped>
.item-body{
    padding:10px;
    border-bottom:solid;
    border-width: thin;
    margin-bottom: 20px;;
}
h3{
    margin-left:18px;
    
}
p{
    
    margin:0px;
    margin-top:10px;
    margin-left: 15px;
}

.main-content{
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

}
.user-avatar{
   display: flex;
   flex-direction: column;

  
}
.user-avatar > img{
    width:60px;
    height:60px;
    border-radius: 7px;
}
.user-avatar >span{
    color:grey;
    font-style: italic;
}
.rating-square{
    display: flex;
    height:60px;
    width:60px;
    background-color:rgb(13, 220, 13);
    color: white;
    align-items: center;
    justify-content: center;
    font-size:30px;
    margin-left: auto;
    margin-bottom:10px;
   
  
}

</style>