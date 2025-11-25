<script setup>
import { ref, computed } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { useRoute } from 'vue-router'
import { formatDate } from '@/util/dateUtil'
import { messageApi } from '@/api/messageApi'

//获取消息详情ID
const route = useRoute();
const routeValue = computed(() => route.params.id);

//获取API接口
const messageDetail = ref({});
//文章接口
const messageIndexApi = async() => {
      if(routeValue.value < 1){
            return;
      }

      const getMessageDetail = await messageApi.getMessageDetail({
            messageId: routeValue.value,
      });
      messageDetail.value = getMessageDetail.data;
}

//加载接口
messageIndexApi();
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="/Message" class="default-msg"><font-awesome-icon icon="fa-solid fa-reply" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;文章列表</div>
                  <div class="content-body">
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="标题" label-position="right">
                                    <el-input :value="messageDetail.title" disabled/>
                              </el-form-item>
                              <el-form-item label="发送人" label-position="right">
                                    <el-input :value="messageDetail.userName" disabled/>
                              </el-form-item>
                              <el-form-item label="发送时间" label-position="right">
                                    <el-input :value="formatDate(messageDetail.addTime)" disabled/>
                              </el-form-item>
                              <el-form-item label="内容" label-position="right">
                                    <el-input :value="messageDetail.content" type="textarea" :rows="8" disabled/>
                              </el-form-item>
                        </el-form>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>