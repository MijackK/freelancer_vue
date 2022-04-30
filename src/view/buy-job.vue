<template>

<div class="progress-bar">
    <li  :style="tracker==1?'color:green':'color:grey'"> <span :style="tracker==1?'background-color:black':'background-color:grey'" class="progress-number">1</span>Enter Requirments </li>
     <li  :style="tracker==2?'color:green;':'color:grey;'"><span :style="tracker==2?'background-color:black':'background-color:grey'" class="progress-number">2</span> Payment </li>
</div>

<form v-show="tracker==1">
    <h2>Hey There, what exactly are you looking for? </h2>
    <span class="info-extra"> Please be specific of what you want, include the date in which you would like the job to be completed</span>
    <span class="info-extra"> Note by default all jobs have a maximum time period of 5 days </span>
    <label> Requirments </label>
    <textarea v-model="requirments"> </textarea>
    <span v-if="showError" class="error-message"> Must be at minimum 255 characters </span>
    <input class="request-button" type="submit" value="Submit Requirements"  @click.prevent="orderValidation()"> 


</form>
<div v-show="tracker==2" id="paypal-button-container" class="payment">

</div>
    
</template>

<script>
import ajaxR from '../ajax.js'

export default {
     emits: ['setNotify'],
     mounted(){
          document.body.style.background = "white"
          this.getPrice()
          paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price.toPrecision(4)
                  }
                }
              ]
            });
          },
         onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.data;
          this.hireFreelancer()
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
          
}).render('#paypal-button-container');
        
         

     },
    data(){
        return{
           showError:false,
            jobId:this.$route.params.id,
            requirments:'',
            tracker:1,
            product: {
            price: 777.77,
            description: "leg lamp from that one movie",
            img: "./assets/lamp.jpg",
      }
            
           
        }
    },

    methods:{
hireFreelancer(){
    ajaxR.post('/api/order',{'id':this.jobId,'requirments':this.requirments}).then(response=>{
        alert(response.data)
      }).catch(error=>{
        alert(error)
      })
       this.$router.push('/browse')
       
    },
    orderValidation(){
      if(this.requirments.length <10){
        this.showError=true
        return 0
      }
         ajaxR.post('/api/validattions',{'id':this.jobId}).then(response=>{
        console.log(response.data)
        this.tracker=2
      }).catch(error=>{
        alert('This is your job or you already have an active order')
        this.$router.push('/browse')
      })
      
    },
    getPrice(){
        var change=0.0091910909
        ajaxR.get('/api/price/'+this.$route.params.id).then(response=>{
            this.product.price=response.data.price * change
        })

    }
    }
}
</script>
<style scoped>
.payment{
    margin-top:100px;
    display: flex;
    justify-content: center;

 
}
form{
    display: flex;
    flex-direction: column;
    margin-left:10%;
    float: left;
    width:50%;
    
}
label{
  
    margin-bottom: 10px;;
}
.info-extra{
    color: grey;
    font-style: italic;
    margin-bottom: 5px;
   
}
textarea{
    height:200px;

}
.request-button{
    margin-top:10px;
    width:50%;
    color: white;
    background-color: black;
    border-style: none;
    padding:10px;
    font-size: 14px;
    cursor: pointer;
}
.request-button:hover{
    background-color: rgba(0,0,0,0.9);
}
.progress-bar{
    display:flex;
    margin-left: 10%;
   padding:20px;
    font-size:25px;
}
li{
    list-style-type: none;
    margin-right:40px;


}
.progress-number{
    background-color: black;
    border-radius: 50%;
    font-size:20px;
    color:white;
   padding-right:7px;
   padding-left:7px;
   margin-right:3px;

}


</style>