<script setup>
import { ref } from 'vue';

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
</script>

<template>
      <div class="sidebar">
            <div class="sidebar-title">
                  <ul>
                        <li><h2>管理员名称</h2></li>
                        <li><small>管理员群组名称</small></li>
                  </ul>
            </div>
            <ul class="sidebar-list">
                  <li>
                        <router-link to="/" replace>
                              <Odometer /><span>仪表盘</span>
                        </router-link>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('article')">
                              <Document /><span>文章管理</span><ArrowRight :class="{'rotate':menuStatus.article}" />
                        </div>
                        <transition name="sidebar">
                        <ul class="sl-child" v-show="menuStatus.article">
                              <li><router-link to="/article"><span>文章列表</span><DArrowRight /></router-link></li>
                              <li><router-link to="/articleCategory"><span>文章分类列表</span><DArrowRight /></router-link></li>
                        </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('page')">
                              <Reading /><span>单页管理</span><ArrowRight :class="{'rotate':menuStatus.page}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.page">
                                    <li><router-link to="/about"><span>关于我</span><DArrowRight /></router-link></li>
                              </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('message')">
                              <Message /><span>信息管理</span><ArrowRight :class="{'rotate':menuStatus.message}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.message">
                                    <li><router-link to="/message"><span>我的新消息</span><DArrowRight /></router-link></li>
                              </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('user')">
                              <User /><span>会员管理</span><ArrowRight :class="{'rotate':menuStatus.user}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.user">
                                    <li><router-link to="/user"><span>会员列表</span><DArrowRight /></router-link></li>
                              </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('admin')">
                              <Postcard /><span>管理员管理</span><ArrowRight :class="{'rotate':menuStatus.admin}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.admin">
                                    <li><router-link to="/admin"><span>管理员列表</span><DArrowRight /></router-link></li>
                                    <li><router-link to="/adminGroup"><span>管理员群组列表</span><DArrowRight /></router-link></li>
                              </ul>
                        </transition>
                  </li>
                  <li>
                        <div class="sl-name" @click="toggleSidebarMenu('system')">
                              <Setting /><span>系统管理</span><ArrowRight :class="{'rotate':menuStatus.system}" />
                        </div>
                        <transition name="sidebar">
                              <ul class="sl-child" v-show="menuStatus.system">
                                    <li><router-link to="/SiteConfig"><span>网站设置</span><DArrowRight /></router-link></li>
                              </ul>
                        </transition>
                  </li>
            </ul>
      </div>
</template>

<style scoped>
</style>