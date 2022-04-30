<template>
<button onclick="window.print()">Print Receipt</button>
<div class="flex-box" v-if="view" id="print"> 
<div class="receipt-body">
<h1> Transaction #RGH0095433 <img src="https://i.imgur.com/AjUqJlK.png" width="100" height="100" /></h1>
<div class="status">
<time> Date: {{receipt[0].date}} </time>
<span > Status: <span :style="receipt[0].status=='cancelled'?'color:tomato':'color:green'">{{receipt[0].status.toUpperCase()}}</span> </span>
</div>
<span><b>Buyer:</b> {{receipt[0].bname}} </span>
<span><b>Seller:</b> {{receipt[0].sname}} </span>
<span><b>Job:</b> {{receipt[0].name}}</span>
<div class="main-content">
 <span><b>Request:</b> {{receipt[0].request}}</span>

</div>
 <span style="text-align:right"><b>Price:</b> Ksh:{{receipt[0].price}}</span>
<div class="footer">
  <h2> Thank You for shopping with  </h2>
  <h2>Generic Company</h2>
</div>

</div>
</div>
</template>
<script>
import ajaxR from '../ajax'
export default {
  mounted(){
    document.body.style.background = "whitesmoke"
    this.getReceipt()
  },
  data(){
    return{
      receipt:[],
      view:false,
    }

  },
  methods:{
    getReceipt(){
    ajaxR.get('/api/receipt/'+this.$route.params.id).then(response=>{
     this.receipt=response.data
      this.view=true;
      console.log(this.receipt.bname)
    }).catch(e=>{
      alert(e+' Insufficient Permissions')
    })
 
    }
  }

    
}
</script>
<style scoped>
.flex-box{
  display: flex;
  width: 100%;
  justify-content: center;
  padding:10px;
}
.receipt-body{
  display: flex;
  flex-direction: column;
  width:fit-content;
  border-style: solid;
  border-width: thin;
  padding:10px;
  background-color: white;
  
}
h1{
  
  text-decoration: underline;
}
h2{
  text-align: center;
}
time{
  margin-right:30px;
}
.status{
   font-size:17px;
  font-weight: bold;
  margin-bottom: 20px;
  border-bottom: solid;
  border-width: thin;
}
span{
  margin-bottom: 10px;;
}
.footer{
  color: grey;
  
}
button{
  border-style: none;
  text-decoration: underline;
  font-size:30px;
  font-weight:bold;
  color:rgba(0,0,0,0.6)
}
button:hover{
  color:rgba(0,0,0,1);
  cursor: pointer;
}
.main-content{
width:440px;
word-break: break-all;
margin-bottom: 30px;;
 
}
</style>