<template>
<div style="background-color:white; width:96%; margin-left:30px;" > 
    <section class="grid-box">
        <article class="flex-box">
            <img :src="joblist.thumbnail" class="thumbnail">
            <div>
             <img :src="joblist.avatar" class="user-avatar" ><router-link :to="'/user/'+joblist.user_id"><span class="user-name">{{joblist.user_name}}</span></router-link>
             <input type="submit" value="Request Job" class="review-button" style="margin-left:20px;" @click="hireFreelancer()">
            </div>
        </article>
        <article class="job-content">
            <h1> {{joblist.name}}</h1>
             <h3> Location: {{joblist.location}} </h3>
            <h3> About </h3>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
        </article>
    </section>
    <section class="user-reviews">
        <div>
    <h1 style="width:fit-content; float:left">Customer Review </h1> <span style="color:grey;">({{reviewList.length}})</span> 
    <div class="rating-square" :style="average >= 4 ?' background-color:rgb(13, 220, 13);':average==3 ?'background-color:orange':'background-color:red'"> <summary >{{average.toString().slice(0,1)}}</summary></div>
        </div>
    </section>
    <div >
     <input type="Submit" value="Write a review" @click="showReview=!showReview" class="review-button" >
      <form class="review-form" v-show="showReview">
        <label>Title </label>
        <input v-model="review.title"/>
        <label> Review Content </label>
        <textarea rows="10" cols="50" maxlength="250" v-model="review.content"> </textarea>
        <label> Rating </label>
        <select name="rating" id="rating" v-model="review.score" >
           <option value=1>Horrible</option>
           <option value=2>Bad</option>
           <option value=3>avarage</option>
           <option value=4>Good</option>
           <option value=5>Awesome</option>
        </select>
        
        <input type="submit" value="Post" @click.prevent="sendReview()"/>
    </form>
    </div>
    <section class="reviews">
            <Review :list="reviewList" />
           
            
    </section>
    </div>
</template>
<script>
import ajaxR from '../ajax'
import Review from  '../components/review-item'
export default {
        components:{
            Review,
        },

    mounted(){
        document.body.style.background = "whitesmoke"
        this.getJob()
        this.getReview()
        this.addView()

    },
    data(){
        return{
            joblist:[],
            showReview:false,
            review:
                {
                 job_id:this.$route.params.id,
                title:'',
                content:'',
                score:'',
                } ,
                reviewList:[],
                average:'',
        }
    },
    methods:{
        getJob(){
            ajaxR.get('/api/jobProfile/'+this.$route.params.id).then(response=>{
                this.joblist=response.data[0]
                if(!this.joblist){
                    this.$router.push('/404')
                }
            
            })   
        },
         hireFreelancer(hire){
             this.$router.push('/gig/'+this.$route.params.id)

        },
 
        sendReview(){
           ajaxR.post('/api/review',this.review).then(response=>{
               alert(response.data)
           }).catch(e=>{
               alert(e+" you cannot post a review here")
           })
           this.getReview()
        },
        getReview(){
            ajaxR.get('/api/review/'+this.$route.params.id).then(response=>{
             this.reviewList=response.data;
             this.average = this.reviewList.reduce(function (accumulator, currentValue){
           return accumulator + currentValue.score
        },0)/this.reviewList.length
        this.average = this.average
        if(!this.average){
            this.average=5;
        }
       })
       
        },
        addView(){
            ajaxR.put('/api/view/'+this.$route.params.id)
        }
    }
    
}
</script>
<style scoped>

.reviews{
    display: flex;
    flex-direction: column;
    margin-left:3%;
   background-color: white;
   padding:10px;
   margin-top:10px;
   width:82%;

}
select{
    width:fit-content;
    background-color: transparent;
    margin-bottom:10px;
    color:white;
    border-style:none;
    background-color: gray;
    padding:6px;
    font-size: 15px;
}
.review-form{
    display:flex;
    flex-direction: column;
    width:40%;
    margin-left:3%;
    background-color: white;
    margin-bottom:20px;
    padding:10px;
}
.review-form >label{
    font-weight: bold;
    font-size:15px;
    margin-bottom:10px;
    margin-top:10px;
}
.review-form >input{
    border-radius:10px;
    padding:8px;

}
.review-form >input[type=submit]{
   color:white;
   background-color: rgba(0, 0, 0, 0.5);
   font-size:20px;
   width:100px;

}
.review-button{
    border-style:none;
    background-color: rgba(0, 0, 0, 0.8);
    margin-left:3%;
    color:white;
    height:fit-content;
    padding:15px;
    cursor: pointer;

}
.review-button:hover{
    background-color: rgba(0, 0, 0, 1);

}

.review-form >input[type=submit]:hover{

   background-color: rgba(0, 0, 0, 1);

}
.grid-box{
    display: grid;
    grid-gap:50px;
    grid-template-columns: 40% 60%;
   width:80%;
    padding:20px;
    margin-left:3%;
}
.user-reviews{
    margin-left:3%;
    background-color: white;
     width:83%;
     display: flex;

}
.rating-square{
    display: flex;
    height:60px;
    width:60px;
    background-color:rgb(13, 220, 13);
    border-style:solid;
   border-radius: 10px;
    color: white;
    float:left;
    align-items: center;
    justify-content: center;
    font-size:30px;
    margin-left: auto;
    margin-top:15px;
}
.flex-box{
    display:flex;
    flex-direction: column;
}
.thumbnail{
    max-height: 700px;
    max-width: 700px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    
}
.user-avatar{
    margin-top:10px;
    max-height: 70px;
    max-width:70px;
    border-radius: 50%;
}
.user-name{
    color:grey;
    font-size:16px;
}
h1{
    
    font-size: 30px;
    margin-right:20px;
}
h3{
    color:grey;
}
.job-content{
    padding:15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    background-color: white;
}
@media only screen and (max-width: 600px){
    .grid-box{
        display:flex;
        flex-direction: column;
        width: 95%;
        margin:5px;
        padding:0px;
        
    }
    .user-reviews{
        margin-bottom:60px;
  
    }
    .review-form{
        width:90%;
    }
    .reviews{
        margin-bottom:90px;
        width:90%;
    }
    .user-reviews{
        width:95%;

    }

    
   
}
</style>