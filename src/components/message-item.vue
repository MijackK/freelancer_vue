<template>
<div v-for="(item,index) in selectedMessages" :key='index' :class="item.from==currentUser ?'sent-message':'recieved-message'" >
<div>{{item.text}} <date>{{item.date}}</date></div>
</div>
    
</template>
<script>
export default {
  props:{
    selectedMessages:{tyep:Array},
    currentUser:{type:String},

  },
    data(){
        return{
           
        }
    }
    
}
</script>
<style scoped>

.sent-message  {
  background-color: transparent;
  justify-content: flex-end;
  display:flex;
  overflow: hidden;
  overflow-wrap: break-word;
  
  
}
.sent-message > div{
  background-color: rgb(9, 70, 131);
  color: white;
  width: 400px;
  margin: 10px;
  text-align: left;
  line-height: auto;
  font-size:16px;
  padding:8px;
  border-radius:10px;
  margin-right:20px;
  font-family: "Times New Roman", Times, serif;
  

}
.recieved-message {
  background-color: transparent;
  justify-content: flex-start;
  display:flex;
  overflow: hidden;
  overflow-wrap: break-word;

}
.recieved-message > div{
  background-color: rgba(0, 0, 0, 0.7);
  width: 400px;;
  color: white;
  width: 400px;
  margin: 10px;
  text-align: left;
  line-height: auto;
  font-size:16px;
  padding:10px;
  border-radius:10px;
   margin-left:15px;;
   font-family: "Times New Roman", Times, serif;

}
date{
  font-size: 11px;
  font-style: italic;
}
@media only screen and (max-width: 600px){
  .sent-message > div{
    width:100%;
    margin-right:30px;
  }
  .recieved-message > div{
    width:100%;
    margin-left:30px;
  }


}

</style>