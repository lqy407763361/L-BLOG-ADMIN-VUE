<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { adminApi } from '@/api/adminApi'

const adminDetail = ref('');
const route = useRoute();
const menuStatus = ref({
      article: false,
      page: false,
      message: false,
      user: false,
      admin: false,
      system: false
});
const toggleSidebarMenu = (menuType) => {
      Object.keys(menuStatus.value).forEach(key => {
            menuStatus.value[key] = (key==menuType) ? !menuStatus.value[menuType] : false;
      });
};

const indexPageApi = async () => {
      //获取管理员详情
      const getAdminDetail = await adminApi.getAdminDetail();
      adminDetail.value = getAdminDetail.data;
}

//组件加载完成后再加载接口
onMounted(async () =>{
      //加载接口
      await indexPageApi();
});

//监听路由变化，设置menuStatus下拉菜单状态
watch(() => route.path, (newPath) => {
      //先关闭所有菜单
      Object.keys(menuStatus.value).forEach(key => {
            menuStatus.value[key] = false;
      });

      //根据路由打开对应菜单
      if(newPath.includes('/article')){
            menuStatus.value.article = true;
      }else if(newPath.includes('/page')){
            menuStatus.value.page = true;
      }else if(newPath.includes('/message')){
            menuStatus.value.message = true;
      }else if(newPath.includes('/user')){
            menuStatus.value.user = true;
      }else if(newPath.includes('/admin')){
            menuStatus.value.admin = true;
      }else if(newPath.includes('/system')){
            menuStatus.value.system = true;
      }
}, {immediate: true});
</script>

<template>
      <div class="sidebar">
            <div class="sidebar-title">
                  <ul>
                        <li><h2>{{ adminDetail.name }}</h2></li>
                        <li><small>{{ adminDetail.groupName }}</small></li>
                  </ul>
            </div>
            <ul class="sidebar-list">
                  <li>
                        <router-link to="/" replace>
                              <font-awesome-icon icon="fa-solid fa-gauge" /><span>仪表盘</span>
                        </router-link>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('article')">
                              <font-awesome-icon icon="fa-solid fa-newspaper" /><span>文章管理</span><font-awesome-icon icon="fa-solid fa-angle-right" :class="{'rotate':menuStatus.article}" />
                        </div>
                        <transition name="sidebar">
                        <ul class="sl-child" v-show="menuStatus.article">
                              <li><router-link to="/article"><span>文章列表</span><font-awesome-icon icon="fa-solid fa-angles-right" /></router-link></li>
                              <li><router-link to="/articleCategory"><span>文章分类列表</span><font-awesome-icon icon="fa-solid fa-angles-right" /></router-link></li>
                        </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('page')">
                              <font-awesome-icon icon="fa-solid fa-file-lines" /><span>单页管理</span><font-awesome-icon icon="fa-solid fa-angle-right" :class="{'rotate':menuStatus.page}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.page">
                                    <li><router-link to="/about"><span>关于我</span><font-awesome-icon icon="fa-solid fa-angles-right" /></router-link></li>
                              </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('message')">
                              <font-awesome-icon icon="fa-solid fa-envelope" /><span>信息管理</span><font-awesome-icon icon="fa-solid fa-angle-right" :class="{'rotate':menuStatus.message}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.message">
                                    <li><router-link to="/message"><span>我的新消息</span><font-awesome-icon icon="fa-solid fa-angles-right" /></router-link></li>
                              </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('user')">
                              <font-awesome-icon icon="fa-solid fa-user" /><span>会员管理</span><font-awesome-icon icon="fa-solid fa-angle-right" :class="{'rotate':menuStatus.user}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.user">
                                    <li><router-link to="/user"><span>会员列表</span><font-awesome-icon icon="fa-solid fa-angles-right" /></router-link></li>
                              </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('admin')">
                              <font-awesome-icon icon="fa-solid fa-id-card" /><span>管理员管理</span><font-awesome-icon icon="fa-solid fa-angle-right" :class="{'rotate':menuStatus.admin}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.admin">
                                    <li><router-link to="/admin"><span>管理员列表</span><font-awesome-icon icon="fa-solid fa-angles-right" /></router-link></li>
                                    <li><router-link to="/adminGroup"><span>管理员群组列表</span><font-awesome-icon icon="fa-solid fa-angles-right" /></router-link></li>
                              </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('system')">
                              <font-awesome-icon icon="fa-solid fa-gear" /><span>系统管理</span><font-awesome-icon icon="fa-solid fa-angle-right" :class="{'rotate':menuStatus.system}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.system">
                                    <li><router-link to="/SiteConfig"><span>网站设置</span><font-awesome-icon icon="fa-solid fa-angles-right" /></router-link></li>
                              </ul>
                        </transition>
                  </li>
            </ul>
      </div>
</template>

<style scoped>
</style>