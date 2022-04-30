<template>


<Modal :item="job" :modal="modal" @close-modal="modal=false" @add-job="addJob" 
 ref="modal"/>
  <label for="navbar" class="humberger-icon"> <i class="fas fa-bars" ></i></label>
<div class="home-header">

  <div >  
 <input placeholder="Search here.." class="search-bar" >
 <i class="fas fa-sort header-icon"></i>
 <i class="fas fa-filter header-icon"></i>
  </div>
</div>
<div class="grid-box">
  <section>
<input type="checkbox" id="navbar" >
<nav class="home-nav" v-show="showNav || true">
  <ul>
    <label for="navbar"><i class="fas fa-times close-button" > </i></label>
      <li :class="currentView=='dashboard'?'home-nav-item-active': 'home-nav-item'" @click="currentView='dashboard'">
      <router-link to="/home" class="home-nav-link">
          <p >Dashboard</p>
        </router-link> 
    </li>
    <li :class="currentView=='jobs'?'home-nav-item-active': 'home-nav-item'" @click="currentView='jobs'">
      <router-link to="/home" class="home-nav-link">
          <p >Jobs</p>
        </router-link> 
    </li>
    <li :class="currentView=='requests'?'home-nav-item-active': 'home-nav-item'" @click="currentView='requests' ">
       <router-link to="/home" class="home-nav-link">
          <p >Requests</p>
        </router-link> 
    </li>
    <li :class="currentView=='orders'?'home-nav-item-active': 'home-nav-item'" @click="currentView='orders'"> 
       <router-link to="/home" class="home-nav-link">
          <p >Orders</p>
        </router-link> 
    </li>
    <li :class="currentView=='hired'?'home-nav-item-active': 'home-nav-item'" @click="currentView='hired'"> 
       <router-link to="/home" class="home-nav-link">
          <p >Hired</p>
        </router-link> 
    </li>
    <li :class="currentView=='transactions'?'home-nav-item-active': 'home-nav-item'" @click="currentView='transactions'"> 
      <router-link to="/home" class="home-nav-link">
          <p >Transactions</p>
        </router-link> 
    </li>
  </ul>
</nav>
<aside class="current-orders scroller">
  <h4>Current Orders</h4>
  <Order :list="acceptedList"
/>

</aside>
  </section>
<section class=" side-content scroller" v-if="currentView != 'dashboard'">
<JobItem v-if="currentView=='jobs' || currentView=='hired'" 
@delete-job="deleteJob" :list="currentView=='jobs'? jobList : hiredList " :selectedNav="currentView"
 @open-job-form="modal=true" @update-job="updateJob"/>
<Order  v-if="currentView=='requests' || currentView=='orders'" 
:list="currentView=='requests' ?requestList: acceptedList"
:orderType='currentView' @handle-request="handleRequest"/>

<Transaction v-if="currentView=='transactions'" :list="transactionList" :user="currentUser"/>

 </section>
  
 <div v-show="currentView=='dashboard'" class="the-dashboard scroller">

<section class="home-content" >
  <article style="background-color:#23232e;" class="" > 
    <h3>Jobs Posts: </h3>
    <div>{{jobList.length}}</div>
  </article>
  <article style="background-color:#115173"  >
    <h3>Orders Completed: </h3>
    <div>{{ordersList.filter(ordersList => ordersList.status=="completed").length}}</div>
  </article>
  <article style="background-color:#053F5E" >
    <h3>Income Earned: </h3>
    <div ><i class="fas fa-dollar-sign"></i>{{ income }}</div>
    </article>
  <article :style="average >= 4 ?'background-color:#023000':average==3 ?'background-color:#C6DE41':'background-color:#C70039'"  > 
    <h3 style="margin-bottom:0px;">Reviews Score: </h3>
    <span>{{count}}</span>
    <div>{{average.toString().slice(0,1)}}</div>
    </article>
  
</section>

  <div class="pie-box">
    <div >
      <h4> Jobs by income </h4>
      <canvas id="myChart" ></canvas>
    </div>
    <div style="margin-left:auto">
       <h4> Jobs by views </h4>
       <canvas id="myChart1" ></canvas> 
    </div>
    </div>
    <figure>
      <h3>Jobs by Reveiw score </h3>
      <canvas id="myChart2" ></canvas> 
    </figure>
 </div>

</div>


</template>
<script>
import JobItem from '../components/userjob-item.vue'
import Order from '../components/order-item.vue'
import ajaxR from '../ajax'
import Modal from'../components/modal'
import Transaction from '../components/transaction-item'

export default {
    components:{
        JobItem,
        Order,
        Modal,
        Transaction
    }, 
     emits: ['setNotify'],
    data(){
        return{
                     number: 0,
    tweenedNumber: 0,
  
          currentView:"dashboard",
          average:5,
            showAddTask:false,
             jobList:[], 
             ordersList:[], 
             hiredList:[],
              requestList:[],
              acceptedList:[],
              transactionList:[],
              currentUser:'',
              income:0,
              count:0,
              showNav:true,
              length,
            job:{
              name:'',
              description:'',
              price:null,
              category:'',
              thumbnail:'',
            },
            userid:null,
            modal:false, 
            categories:[],
            months:['Proffesional Martial arts'],
            chartIncome:[200010],
            cartViews:[],
        }
    },
     mounted(){
       document.body.style.background = "whitesmoke"
      this.getUser();
      this.getJob()
      this.getOrder()
      this.getHired()
      this.getTransaction()
      this.myReviews()
      this.piechart('myChart','pie',this.categories,this.chartIncome) 
       this.piechart('myChart1','doughnut',this.categories,[51]) 
       this.piechart('myChart2','bar',this.months,[this.average,3]) 
      
    },

    methods:{
        piechart(id,chartT,dlabel,income){
    
var ctx = document.getElementById(id);
var myChart = new Chart(ctx, {
    type: chartT,
    data: {
        labels: dlabel,
   title: {
                display: true,
                text: 'my chart',
            },
  datasets: [{
    label: '',
    data: income,
    backgroundColor: [
       '#23232e',
        '#115173',
        '#053F5E',
      '#022C43',
    
    ],
    hoverOffset: 4
        }]
    },
  
});

  },
   

      getUser(){
           ajaxR.get('/api/user').then(response=>{
             this.currentUser=response.data
             console.log(this.currentUser)
           })
      },
     
    addJob(){
      this.modal=false
      console.log(this.job)
      ajaxR.post('/api/job',this.job).then(response=>{
        //console.log(response)
      }).catch(error=>{
        console.log(error)
      })
      
      this.getJob()
      this.job.name=''
      this.job.description=''
      this.job.price=null
      this.job.category=''
      this.job.thumbanail=''
      
    },
    getJob(){
      ajaxR.get('/api/job').then(response=>{
        this.jobList=response.data
        this.categories.push(response.data[0].name)
          this.months.push(response.data[0].name)
            
          console.log(this.months )
          console.log(this.chartViews)
          
        
        
      })
    },
    getOrder(){
       ajaxR.get('/api/order').then(response=>{
        this.ordersList=response.data
         this.requestList=this.ordersList.filter(ordersList => ordersList.status=="pending")
          this.acceptedList=this.ordersList.filter(ordersList => ordersList.status=="accepted")
      })
     

    },
    getHired(){
      ajaxR.get('/api/hired').then(response=>{
        this.hiredList=response.data
      })

    },
     getTransaction(){
      var income
      ajaxR.get('/api/transaction').then(response=>{
        this.transactionList=response.data.reverse()
        income=this.transactionList.filter(transactionList => transactionList.status=="completed" && transactionList.seller_id == this.currentUser )
        this.income = income.reduce(function (accumulator, currentValue){
           return accumulator + currentValue.price
        },0)
       
      })

    },
    updateJob(update){

      var updatecontent={'name':update[0].name,'description':update[0].description,'price':update[0].price,'job':update[1]}

      ajaxR.put('/api/job',updatecontent).then(response=>{
        
        alert('job updated')
      }).catch(error=>{
        console.log(error)
      })
       this.getJob()

    },
    deleteJob(id){
      ajaxR.delete('/api/job/'+id).then(response=>{
        this.getJob()
       alert('deleted')
      })
      
    },
    handleRequest(status){
      ajaxR.put('/api/request',status).then(response=>{
        alert(status.status)
          this.getOrder()
      })
    },
       myReviews(){
       ajaxR.get('api/myReview').then(response=>{
        this.reviews=response.data
           this.average = response.data.reduce(function (accumulator, currentValue){
           return accumulator + currentValue.score
        },0)/response.data.length
        this.count=response.data.length
        console.log(this.count +'works here')
      })
      

    },
  
  }  
}
</script>
<style scoped>
.the-dashboard{
  background-color: white;
  border-style: solid;
  border-width: thin;
  overflow: scroll;
  max-height:720px;
  width: 100%;
}
span{
  margin:0px;
  font-size: 13px;
  

}
.pie-box{
  display:flex;  width:90%; background-color:white
}
.pie-box h4{
  text-align: center;
}


h4{
  font-size: 19px;

}

article > div{
  font-size: 30px;
  text-align: center;
}
.grid-box{
  display:grid;
  grid-gap: 50px;
  grid-template-columns: 20% 70%;
  margin-top:30px;
  margin-left:5%;
  width:92%;
 justify-content: center; 
}
.home-content{
  display: flex;
  justify-content: center;
  color:white;

}

.home-content > article{
  border-style: none;
  margin:10px;
  padding:10px;
  background-color: white;
  height: fit-content;
  width:250px;
  border-radius: 7px;;
 
 
  
}

  
.home-nav{

  border-style: solid;
  border-width: thin;
  border-radius: 10px;
  height:fit-content;
  background-color: rgba(35, 35, 46, 0.98);
  width:100%;
  overflow: hidden;
 


}
.home-nav-item{
  list-style-type: none;
  width:100%;
   margin-bottom:5px;
   color:rgba(182,182,182,0.9);
 
}
.home-nav-item:hover{
  background-color: rgba(35, 35, 46, 1);
  border-radius:10px;
  
}
.home-nav-item-active {
  list-style-type: none;
  width:100%;
   background-color: rgba(35, 35, 46, 1);
  border-radius:10px;
 margin-bottom:5px;
 color:white

 
}

.home-nav-link{
 text-decoration: none;
 color:rgba(182,182,182,0.8);
}
.home-nav-link:hover{
  color:white

}

.home-nav-link >p{
  margin:0px;
  margin-left:1.2rem;
  font-size: 17px;
  padding:19px;
}

.current-orders{
  border-style:solid;
  border-width: thin;
  margin-top:20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  overflow: scroll;
  
   height:300px;
}
.current-orders > h4{
  margin:5px;
}
.side-content{
  height:740px;
  background-color: white;
  
}

.search-bar{
   grid-column: 1 / 3;
  
  width:90%;
  border-radius: 10px;
  border-width: thin;
  padding:10px;
  margin-top:10px;

}
.home-header{
  display: flex;
 margin-left:3%;
 align-items: flex-end;
flex-direction: column;
}
.home-header >div{
  width:71%;
}
.header-icon{
  color:rgba(35, 35, 46, 0.70);
  font-size:20px;
  margin:10px;
}
.header-icon:hover{
  color:rgba(35, 35, 46, 1);
}
ul{
  padding:0px;
  margin: 0px;;
  
}
.humberger-icon{
  display:none;
}
.close-button{
  color: grey;
  font-size:30px;
  margin-left:95%;
  margin-bottom:10px;
  display: none;
  
}
.close-button:hover{
  color: white;
 
}
input[type=checkbox]{
  display:none;
 
}
#myChart{
     width:490px;
 height: 450px;
 margin-left:15px
}
#myChart1{
    width:490px;
 height: 450px;
 margin-left:auto;

}
#myChart2{
  width:500px;
 height: 500px;
}

@media only screen and (max-width: 600px) {
  .home-content{
    flex-direction: column;
  }
  .home-content > article{
    width:93%;
  }
  .pie-box{
    flex-direction: column;
  }
  .the-dashboard{
    overflow: none;
  }

.current-orders{
  display:none;
}
.home-nav {
 height: 91%;
 width:95%;
 padding:10px;
  top:0;
  position:fixed;
 display: none;
 
}

input[type=checkbox]:checked + .home-nav{
  display: block;

}

.grid-box{
  display:grid;
  grid-gap: 20px;
  grid-template-columns: 100%;
margin:0px;
  width:100%;
 justify-content: center; 
}
.home-header{
  width: 90%;
}
.home-header >div{
  display: flex;
  width:100%;
   
}
.humberger-icon{
  display:flex;
  font-size: 30px;
 margin-left: 15px;


}
.close-button{
  display: block;
}
.side-content{
  width:100%;
}


}



</style>