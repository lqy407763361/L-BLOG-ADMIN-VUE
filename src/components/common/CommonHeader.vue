<script setup>
import { useHead } from '@vueuse/head'
import { ref } from 'vue'

// SEO
useHead({
      'title': 'L-BLOG-ADMIN',
      'meta': [{
            name: 'L-BLOG-ADMIN',
            content: 'L-BLOG后台管理系统'
      }]
});

// 消息提醒
const dropdownMenuStatus = ref(true);
const changeDropdownMenu = () =>{
      dropdownMenuStatus.value = !dropdownMenuStatus.value;
}
</script>

<template>
      <header>
            <h1><a href="/">L-BLOG</a></h1>
            <ul class="nav">
                  <li class="dropdown" @click="changeDropdownMenu"><a><span class="danger-msg">99</span><font-awesome-icon icon="fa-solid fa-bell" class="header-icon"/></a>
                        <ul class="dropdown-menu" :class="{'fade': dropdownMenuStatus}">
                              <li class="dropdown-header">消息</li>
                              <li><a href="">新消息 <span class="warning-msg">99</span></a></li>
                              <li><a href="">所有消息 <span class="info-msg">99</span></a></li>
                              <li class="divider"></li>
                              <li class="dropdown-header">会员</li>
                              <li><a href="">新会员 <span class="warning-msg">99</span></a></li>
                              <li><a href="">注册会员 <span class="info-msg">99</span></a></li>
                        </ul>
                  </li>
                  <li><a href="" target="_blank"><font-awesome-icon icon="fa-solid fa-house" class="header-icon"/></a></li>
                  <li><a href="">退出登录&nbsp;<font-awesome-icon icon="fa-solid fa-right-from-bracket" class="header-icon"/></a></li>
            </ul>
            <div style="clear:both;"></div>
      </header>
</template>

<style scoped>
</style>