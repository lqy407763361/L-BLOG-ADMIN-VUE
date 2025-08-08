import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/components/index/IndexPage.vue'
import ArticleIndex from '@/components/article/ArticleIndex.vue'
import CommonNotFound from '@/components/common/CommonNotFound.vue'

const routes = [
    { 
        path: '/', 
        name: 'Index', 
        component: IndexPage,
    },
    { 
        path: '/article', 
        name: 'Article', 
        component: ArticleIndex,
    },
    { 
        path: '/:pathMatch(.*)*',
        name: 'CommonNotFound',  
        component: CommonNotFound,
    },
]

const router = createRouter({
    history: createWebHistory (),
    routes,
})

export default router