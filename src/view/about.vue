<template>
<input type="submit" value="refund" @click="getRefund()">
<input type="submit" value="transfer funds" @click="sendMoney()">
</template>
<script>
import axios from 'axios';
export default {
    mounted(){  
      this.basicAuth=btoa(`${ this.PAYPAL_CLIENT }:${ this.PAYPAL_SECRET }`)
      this.config={headers:{
      Accept:        `application/json`,
      Authorization: `Basic ${ this.basicAuth }`
    }}
        
    },
data(){
  return{
    PAYPAL_CLIENT:"AUNi2WnHMVDjX9AErxvB8hWpgHgZ_DFZlgQcZZDNvcmYWpuCckQcM19SeL528RrtbCHVYTkC32PHR8gq",
    PAYPAL_SECRET:"EKhhR5KG-xeAdfmxnQ4hXHRvqKTghbXRkhA-4e5MSBuclMt3Gpg-Hb5sGxfpu3xWy9lMvFdO-faJvmPB",
    PAYPAL_OAUTH_API:'https://api-m.sandbox.paypal.com/v1/oauth2/token/',
    PAYPAL_PAYMENTS_API:'https://api-m.sandbox.paypal.com/v2/payments/captures/',
    PAYPAL_ORDER_API:'https://api-m.sandbox.paypal.com/v2/checkout/orders/',
    basicAuth:'',
    auth:'',
    config:'',
    data:'grant_type=client_credentials',
    product: {
            price: 919.20,
            description: "leg lamp from that one movie",
            img: "./assets/lamp.jpg",
      }

  } 
},

methods:{
  getRefund(){
    axios.post(this.PAYPAL_OAUTH_API,this.data,this.config).then(response=>{
      this.auth=response.data
      console.log(response)
      axios.post(this.PAYPAL_PAYMENTS_API +'7LX77062FY805800C'+'/refund',{body: JSON.stringify({

    amount: {
      currency_code: 'USD',
      value:this.product.price.toPrecision(2)
    }

  })},{ headers:{Accept:`application/json`, Authorization: `Bearer ${ this.auth.access_token }`}})
    }).then(response=>{
      console.log(response)
    })


  },
  
}
}
</script>
<style scoped>
#myChart{
  max-width:400px;
  max-height: 400px;
}

</style>
