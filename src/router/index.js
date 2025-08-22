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
import AdminGroupIndex from '@/components/adminGroup/AdminGroupIndex.vue'
import AdminGroupDetail from '@/components/adminGroup/AdminGroupDetail.vue'
import SiteConfigPage from '@/components/siteConfig/SiteConfigPage.vue'
import CommonLogin from '@/components/common/CommonLogin.vue'
import CommonNotFound from '@/components/common/CommonNotFound.vue'

const routes = [
    { 
        path: '/', 
        name: 'IndexPage', 
        component: IndexPage,
    },
    { 
        path: '/article', 
        name: 'ArticleIndex', 
        component: ArticleIndex,
    },
    { 
        path: '/article/:id', 
        name: 'ArticleDetail', 
        component: ArticleDetail,
        props: true
    },
    { 
        path: '/articleCategory', 
        name: 'ArticleCategoryIndex', 
        component: ArticleCategoryIndex,
    },
    { 
        path: '/articleCategory/:id', 
        name: 'ArticleCategoryDetail', 
        component: ArticleCategoryDetail,
        props: true
    },
    { 
        path: '/about', 
        name: 'AboutPage', 
        component: AboutPage,
    },
    { 
        path: '/message', 
        name: 'MessageIndex', 
        component: MessageIndex,
    },
    { 
        path: '/message/:id', 
        name: 'MessageDetail', 
        component: MessageDetail,
        props: true
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
        props: true
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
        props: true
    },
    { 
        path: '/adminGroup', 
        name: 'AdminGroupIndex', 
        component: AdminGroupIndex,
    },
    { 
        path: '/adminGroup/:id', 
        name: 'AdminGroupDetail', 
        component: AdminGroupDetail,
    },
    { 
        path: '/SiteConfig', 
        name: 'SiteConfigPage', 
        component: SiteConfigPage,
    },
    { 
        path: '/login', 
        name: 'CommonLogin', 
        component: CommonLogin,
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