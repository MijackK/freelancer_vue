<template>

 <div class="modal " v-show="modal"> 
    <form class="scroller">
    <i class="fas fa-times" @click="$emit('closeModal')"></i>
    <h1> Job Form </h1>
    <label>Name</label>
    <input v-model='item.name' />
    <label>Description </label>
    <textarea rows="10" cols="50" maxlength="250" v-model='item.description' style=" float: left;width: 75%; margin-top: 6px; height:200px" />
     <label>Price </label>
    <input type="number" v-model='item.price' min="0" />
       <label>category </label>
         <select name="category" id="category" v-model='item.category' >
           <option value=9>Web Development</option>
           <option value=10>Animation</option>
           <option value=11>Cleaning</option>
           <option value=12>Logo Design</option>
           <option value=13>Game Development</option>
             <option value=14>Training</option>
           <option value=15>Repair</option>
           <option value=16>Machine Learning</option>
           <option value=17>Machine Learning</option>
           <option value=18>Other</option>
        </select>
         <label>Location </label>
       <input v-model='item.name' />
        <label>Thumbnail</label>
    <input v-model='item.thumbnail' />
        
    <input type='submit' value="Submit" @click.prevent="$emit('addJob')"  >
    </form>
</div>

</template>
<script>
export default {
    props:{
        modal:{
            type:Boolean,
            default:false
        },
        item:{
            name:"",
            description:'',
            price:'',
            category:'',
            thumbnail:'',
        }
    }   
}
</script>
<style scoped>

textarea{
    font-family:'Open Sans';
    font-size: 15px;
}
.modal{
position:fixed;
display: flex;
justify-content: center;
width:100%;
height:100%;
background-color: rgba(0, 0, 0, 0.9);
top:0;
bottom:0;
right:0;
bottom:0;  
font-family: 'Dekko';
animation:fade 1s;
}
.modal >form{
     display:flex;
     flex-direction: column;
       background-color: rgba(35, 35, 46, 0.90);
     padding:15px;
     height:608px;
     justify-content: center;
     margin-top:5%;
     border-radius: 5px;;
     color:rgba(182,182,182,1);
     
    
}
form >input[type=checkbox]{
    margin-right:96.4%;
}

i{
    display: flex;
    font-size: 25px;
    justify-content: flex-end;
    opacity:0.60;
    border-bottom:solid;
    border-width: thin;
    width: 100%;
    margin-bottom:10px;
       
}
i:hover{
    opacity: 1; 
}
h1{
    margin:5px;

}
label{
    margin-top:5px;
    margin-bottom:5px;
    font-size:20px;
}
input[type=submit]{
    margin-top:10px;
    border-radius: 0px;
    border-style: none;
    font-size:20px;
    cursor: pointer;
    margin-top:16px;
 
}
input[type=submit]:hover{
    background-color: rgba(255, 255, 255, 0.5);
}

</style>