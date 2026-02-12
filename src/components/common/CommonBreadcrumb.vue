<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfigApi } from '@/api/siteConfigApi'
import powerList from '@/config/powerConfig'

//根据当前路由匹配名称
const route = useRoute();
const currentPageName = computed(() => {
      const match = powerList.find(item => route.path.includes(item.value));
      
      return match?.name || '后台管理系统';
});

//获取API接口
const siteConfigDetail = ref({});
const commonBreadcrumbApi = async () => {
      //获取网站配置
      const getSiteConfigDetail = await siteConfigApi.getSiteConfigDetail();
      siteConfigDetail.value = getSiteConfigDetail.data;
}

commonBreadcrumbApi();
</script>

<template>
      <h2>{{ siteConfigDetail?.siteTitle || 'L-BLOG' }}</h2>
      <ul class="breadcrumb">
            <li><router-link to="/">{{ siteConfigDetail?.siteTitle || 'L-BLOG' }}</router-link></li>
            <li><span>{{ currentPageName }}</span></li>
      </ul>
</template>

<style scoped>
</style>