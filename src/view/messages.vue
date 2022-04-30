<template>

<div class="flex-box">
<div class="conversation-box ">
<h3>Conversation</h3> 

<conversationItem :conversations="conversations"  @get-messages="getMessages"
:inputTo="inputTo" :currentUser=" currentUser[0]" />

</div>

<div class="message-input">
      <h2 >{{inputTo[0]}}</h2>
<div class="message-box scroller">
  
   <messageItem :selectedMessages="messages" :currentUser=" currentUser[0]" />
   
</div>

<input  placeholder="Type Something.." class="input-bar"  v-model="inputMessage" @keyup.enter="sendMessage"/>

</div>
<div>
    
</div>
</div>


</template>
<script>
import conversationItem from '../components/conversation-item'
import messageItem from '../components/message-item'
import ajaxR from '../ajax'
export default {
     emits: ['setNotify'],
    components:{
        conversationItem,
        messageItem,
    },
    mounted(){
        document.body.style.background = "whitesmoke"
        this.databaseMessages()
        this.messageSocket()
    },
    data(){
        return{
            conversations:[],
            messages:[],
            inputMessage:'',
            inputTo:[],
            conversationInfo:[],
            currentUser:[],
            checkIfnew:true,
            dummyDatabase:[
                
            ],

        }
    },
    methods:{
    messageSocket(){
        ajaxR.get('/api/user').then(response=>{
        window.Echo.private("message." +response.data).
        listen('Messages', (e)=>{
            console.log(e)
          this.notify=true
          this.$toast.show(`New message from <span style="color:yellow">${e.message.name}</span>`)
          this.$emit('setNotify')
          this.databaseMessages()

        })
      })
      
    },

        getMessages(name){
            
            var selectedMessages
            selectedMessages=this.dummyDatabase.filter(dummyDatabase =>dummyDatabase.to==name[0] 
            && dummyDatabase.from==this.currentUser[0] || dummyDatabase.from==name[0] && dummyDatabase.to==this.currentUser[0])
            this.messages=selectedMessages
            this.inputTo=name
            
        },
        getConversations(){
            this.conversations=[]
            var conversation=[]
            var placeholder
            
            for (let i = 0; i < this.dummyDatabase.length; i++) {
                
               if(conversation.indexOf(this.dummyDatabase[i].from)== -1 && conversation.indexOf(this.dummyDatabase[i].to)== -1){
                 if(this.dummyDatabase[i].from ==this.currentUser[0]){
                     conversation.push(this.dummyDatabase[i].to)
                      placeholder =this.dummyDatabase.filter(dummyDatabase =>dummyDatabase.to==this.dummyDatabase[i].to  && dummyDatabase.from==this.currentUser[0] || dummyDatabase.from== this.dummyDatabase[i].to && dummyDatabase.to== this.currentUser[0] )
                     
                      this.conversations.push(placeholder[placeholder.length-1])
        
                 }
                 else{
                conversation.push(this.dummyDatabase[i].from)
                 placeholder =this.dummyDatabase.filter(dummyDatabase =>dummyDatabase.to==this.dummyDatabase[i].from  && dummyDatabase.from==this.currentUser[0] || dummyDatabase.from== this.dummyDatabase[i].from && dummyDatabase.to==this.currentUser[0] )
                 this.conversations.push(placeholder[placeholder.length-1])
              
                 }
               }
            
        
            } 
           
        }, 
       sendMessage(){
           var send={text:this.inputMessage,to:this.currentUser[1]==this.inputTo[1]?this.inputTo[2]:this.inputTo[1]}
           ajaxR.post('api/messages',send).then(response=>{
              
           })
           this.databaseMessages()
           this.inputMessage=''
           
           console.log(this.inputTo)
       },
       databaseMessages(){
           ajaxR.get('api/messages').then(response=>{
               this.dummyDatabase=response.data[0]
               this.currentUser[0]=response.data[1]
               this.currentUser[1]=response.data[2]
               console.log(this.currentUser)
               
               if(this.checkIfnew){
              this.getConversations()
               this.getMessages(this.currentUser[0]==this.conversations[0].to?[this.conversations[0].from,this.conversations[0].idFrom,this.conversations[0].idTo]:[this.conversations[0].to,this.conversations[0].idTo,this.conversations[0].idFrom])
               }
               else{
                   this.getConversations()
                   this.getMessages(this.inputTo)
               }
               this.checkIfnew=false
           }).catch(e=>{
               console.log(e)
           })
       }
     
     
      
    }
    
}
</script>
<style scoped>
h2{
text-align: center;
margin:0px;
background-color: white;

}
h3{
    
    margin:0px;
    padding:5px;
    text-align: left;
    

}
.flex-box{
     display:flex;
     height: 900px;
     margin-top:0px;
    margin-left:10%;
}
.flex-box >div{
      margin: 10px;
}

.conversation-box{
  width:25%;
  height: 100%;
  float: left;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5); 
    
}

.message-box{
    width:100%;
    float: left;  
    background-image: url("https://img.freepik.com/free-photo/design-space-paper-textured-background_53876-42312.jpg?size=626&ext=jpg");
    background-size: cover;
    background-repeat: no-repeat;
    border-width: thin;
    overflow: scroll;
    height: 94.3%;
     
}
.input-bar{
    width:98%;
    margin:0px;
    padding:9.5px;
    border: 1px solid #ccc;
    background-color: white;
    text-decoration: none;
    
  
}
.message-input{
flex-direction: column;
width:60%;
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5); 


}
.scroller {

  overflow-y: scroll;
  scrollbar-color: grey transparent;
  scrollbar-width: thin;

}

.sticky {
  position: fixed;
  width: 51%;
  
}
@media only screen and (max-width: 600px) {
  .flex-box{
     
      border-style: none;
      margin-left:0px;
      margin-top:0px;  
  }
  .conversation-box{
    width:15%;
    flex-direction: column;
    display:flex;
   border-radius: 5px;;
    height: 86%; 

  }
  .message-input{
      width:100vh; 
      height: 86%;  
  }
  .message-box{
       height:100%;
       border-style: solid;
      
       
  }
  .input-bar{
      width:95%;
      margin:0px;
    
      
  }
 h3{
     
     visibility: hidden;
 }
 h2{
    width:100%;
     border-left:solid;
     border-width:thin;
     border-bottom: none;
 }
 .header-style{
  display: none; 

}

    
}


</style>