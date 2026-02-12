<script setup>
import { useHead } from '@vueuse/head'
import { ref, onMounted, watch } from 'vue'
import router from '@/router'
import { authStore } from '@/util/authUtil'
import { getCurrentTimestamp } from '@/util/dateUtil'
import { siteConfigApi } from '@/api/siteConfigApi'
import { messageApi } from '@/api/messageApi'
import { userApi } from '@/api/userApi'
import { adminApi } from '@/api/adminApi'

//获取API接口
const messageTotal = ref(0);
const newMessageTotal = ref(0);
const userTotal = ref(0);
const newUserTotal = ref(0);
const siteConfigDetail = ref({});
const authStoreInstance = authStore();

const commonHeaderApi = async () => {
      //获取消息数量
      const getMessageTotal = await messageApi.getMessageTotal();
      messageTotal.value = getMessageTotal.data;
      //获取新消息数量
      const getNewMessageTotal = await messageApi.getMessageTotal({
            isRead: 2
      });
      newMessageTotal.value = getNewMessageTotal.data;

      //获取用户数量
      const getUserTotal = await userApi.getUserTotal();
      userTotal.value = getUserTotal.data;
      //获取新用户数量(注册时间小于等于7天)
      const getNewUserTotal = await userApi.getUserTotal({
            addTime: getCurrentTimestamp()-604800
      });
      newUserTotal.value = getNewUserTotal.data;

      //获取网站配置
      const getSiteConfigDetail = await siteConfigApi.getSiteConfigDetail();
      siteConfigDetail.value = getSiteConfigDetail.data;
}

//消息提醒
const dropdownMenuStatus = ref(true);
const changeDropdownMenu = () =>{
      dropdownMenuStatus.value = !dropdownMenuStatus.value;
}

//退出登录
const adminLoginOut = () =>{
      adminApi.adminLoginOut();
      authStoreInstance.clearAuth();
      router.push('/login');
}

//组件加载完成后再加载接口
onMounted(async () =>{
      //加载接口
      await commonHeaderApi();
});

//监听路由变化，设置网站配置信息
watch(siteConfigDetail, (newVal) => {
      useHead({
            title: newVal.metaTitle || 'L-BLOG-ADMIN',
            meta: [
                  {
                        name: 'description',
                        content: newVal.metaDescription || 'L-BLOG后台管理系统'
                  },
                  {
                        name: 'keywords',
                        content: newVal.metaKeywords  || 'L-BLOG后台管理系统'
                  }
            ]
      });
}, {deep: true});
</script>

<template>
      <header>
            <h1><router-link to="/">{{ siteConfigDetail?.siteTitle || 'L-BLOG' }}</router-link></h1>
            <ul class="nav">
                  <li class="dropdown" @click="changeDropdownMenu"><a><span class="danger-msg">{{ newMessageTotal+newUserTotal }}</span><font-awesome-icon icon="fa-solid fa-bell" class="header-icon"/></a>
                        <ul class="dropdown-menu" :class="{'fade': dropdownMenuStatus}">
                              <li class="dropdown-header">消息</li>
                              <li><router-link to="/message">新消息 <span class="warning-msg">{{ newMessageTotal }}</span></router-link></li>
                              <li><router-link to="/message">所有消息 <span class="info-msg">{{ messageTotal }}</span></router-link></li>
                              <li class="divider"></li>
                              <li class="dropdown-header">会员</li>
                              <li><router-link to="/user">新会员 <span class="warning-msg">{{ newUserTotal }}</span></router-link></li>
                              <li><router-link to="/user">注册会员 <span class="info-msg">{{ userTotal }}</span></router-link></li>
                        </ul>
                  </li>
                  <li><router-link to="/"><font-awesome-icon icon="fa-solid fa-house" class="header-icon"/></router-link></li>
                  <li><a @click="adminLoginOut">退出登录&nbsp;<font-awesome-icon icon="fa-solid fa-right-from-bracket" class="header-icon"/></a></li>
            </ul>
            <div style="clear:both;"></div>
      </header>
</template>

<style scoped>
</style>