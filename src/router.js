import {createRouter,createWebHistory} from 'vue-router';
import Home from './view/home.vue';
import About from './view/about.vue';
import Cat from './view/cats.vue'
import LandingPage from './view/landingPage'
import Browse from './view/browse'
import NotFound from'./view/notFound'
import Profile from './view/profile'
import Message from './view/messages'
import Notifications from './view/user-notification'
import buyJob from './view/buy-job'
import  jobProfile from './view/job-profile'
import jobReceipt from './view/job-receipt'
import userProfile from './view/user-profile'
import CategorySearch from './view/category-search'
import BrowseSearch from './view/browse-search'



const routes =[
    {
        path: '/',
        name: 'landingpage',
        component: LandingPage,
    },
    
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true}
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: { requiresAuth: true }
    },
    {
        path: '/cat',
        name: 'cat',
        component: Cat,
        meta: { requiresAuth: true }
    },
    {
        path: '/browse',
        name: 'browse',
        component: Browse,
        meta: { requiresAuth: true }
       
    },
    {
        path: '/:pathMatch(.*)*',
        name:'NotFound',
        component: NotFound,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        children:[
          
            {
                path:'Message',
                component:Message
            },
            
        ],
        meta: { requiresAuth: true }
    },
    {
        path: '/message',
        name: 'message',
        component: Message,
        meta: { requiresAuth: true }
    },
    {
        path: '/notification',
        name: 'notification',
        component: Notifications,
        meta: { requiresAuth: true }
    },
    {
        path: '/gig/:id',
        name: 'buygig',
        component: buyJob,
        meta: { requiresAuth: true }
    },
    {
        path: '/job/:id',
        name: 'jobProfile',
        component: jobProfile,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/:id',
        name: 'userProfile',
        component: userProfile,
        meta: { requiresAuth: true }
    },
    {
        path: '/receipt/:id',
        name: 'receipt',
        component: jobReceipt,
        meta: { requiresAuth: true }
    },
    {
        path: '/category/:id',
        name: 'category',
        component: CategorySearch,
        meta: { requiresAuth: true }
    },
    {
        path: '/search/:id',
        name: 'search',
        component: BrowseSearch,
        meta: { requiresAuth: true }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes

})

router.beforeEach((to, from) => {
    const dt= new Date();
    const dt1 = new Date(localStorage.auth)
    if(to.meta.requiresAuth){
        if(dt1 < dt || !localStorage.auth ){
            router.push('/')
        }else{
            return true
        }
    }else{
        return true
    }
        
    
  })
export default router;


