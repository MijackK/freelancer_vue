<template>
<div class="reverser">
<table>
 <tr>
   <th>Date</th>
    <th>Name</th>
    <th>Price</th>
    <th>Status</th>
    <th>Receipt</th>
  </tr>
<tr v-for="(item,index) in list" :key='index'>
  <td style="font-weight:bold">{{item.date}}  </td>
<td><router-link :to="'/job/'+item.job_id"> {{item.name}}</router-link></td>
<td>Ksh {{item.price}} </td>
<td :style="item.status=='cancelled'?'color:red':'color:green'"> {{item.user_id == user ?'Buy':'Sell'}} ({{item.status}})</td>
<td> <router-link :to="'/receipt/'+item.id">View</router-link></td>

</tr>  
</table>
</div>
</template>
<script>
export default {
       props:{
        list:{type:Array},
        user:{type:Number},
    },
}
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {background-color: #f2f2f2;}
a{ color:black}

</style>