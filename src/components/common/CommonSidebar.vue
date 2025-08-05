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
const toggleSidebarMenu = (status) => {
      menuStatus.value[status] = !menuStatus.value[status];
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
                        <router-link to="/" class="sl-name" @click="toggleSidebarMenu('article')">
                              <Document /><span>文章管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child" v-show="menuStatus.article">
                              <li><router-link to="/"><span>文章列表</span><DArrowRight /></router-link></li>
                              <li><router-link to="/"><span>文章分类列表</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" @click="toggleSidebarMenu('page')">
                              <Reading /><span>单页管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child" v-show="menuStatus.page">
                              <li><router-link to="/"><span>关于我</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" @click="toggleSidebarMenu('message')">
                              <Message /><span>信息管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child" v-show="menuStatus.message">
                              <li><router-link to="/"><span>我的新消息</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" @click="toggleSidebarMenu('user')">
                              <User /><span>会员管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child" v-show="menuStatus.user">
                              <li><router-link to="/"><span>会员列表</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" @click="toggleSidebarMenu('admin')">
                              <Postcard /><span>管理员管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child" v-show="menuStatus.admin">
                              <li><router-link to="/"><span>管理员列表</span><DArrowRight /></router-link></li>
                              <li><router-link to="/"><span>管理员群组列表</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" @click="toggleSidebarMenu('system')">
                              <Setting /><span>系统管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child" v-show="menuStatus.system">
                              <li><router-link to="/"><span>网站设置</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
            </ul>
      </div>
</template>

<style scoped>
</style>