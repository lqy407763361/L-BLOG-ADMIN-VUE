import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/components/index/IndexPage.vue'
import ArticleIndex from '@/components/article/ArticleIndex.vue'
import ArticleDetail from '@/components/article/ArticleDetail.vue'
import ArticleCategoryIndex from '@/components/articleCategory/ArticleCategoryIndex.vue'
import ArticleCategoryDetail from '@/components/articleCategory/ArticleCategoryDetail.vue'
import AboutPage from '@/components/about/AboutPage.vue'
import MessageIndex from '@/components/message/MessageIndex.vue'
import MessageDetail from '@/components/message/MessageDetail.vue'
import UserIndex from '@/components/user/UserIndex.vue'
import UserDetail from '@/components/user/UserDetail.vue'
import AdminIndex from '@/components/admin/AdminIndex.vue'
import AdminDetail from '@/components/admin/AdminDetail.vue'
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
        path: '/article/:id', 
        name: 'ArticleDetail', 
        component: ArticleDetail,
    },
    { 
        path: '/articleCategory', 
        name: 'ArticleCategory', 
        component: ArticleCategoryIndex,
    },
    { 
        path: '/articleCategory/:id', 
        name: 'ArticleCategoryDetail', 
        component: ArticleCategoryDetail,
    },
    { 
        path: '/about', 
        name: 'About', 
        component: AboutPage,
    },
    { 
        path: '/message', 
        name: 'Message', 
        component: MessageIndex,
    },
    { 
        path: '/message/:id', 
        name: 'MessageDetail', 
        component: MessageDetail,
    },
    { 
        path: '/user', 
        name: 'UserIndex', 
        component: UserIndex,
    },
    { 
        path: '/user/:id', 
        name: 'UserDetail', 
        component: UserDetail,
    },
    { 
        path: '/admin', 
        name: 'AdminIndex', 
        component: AdminIndex,
    },
    { 
        path: '/admin/:id', 
        name: 'AdminDetail', 
        component: AdminDetail,
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