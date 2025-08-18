<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const title = ref('');
const name = ref('');
const content = ref('');
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="/" class="info-msg"><Plus /></router-link>
                  <router-link to="#" class="danger-msg"><Delete /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><List />&nbsp;文章列表</div>
                  <div class="content-body">
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="标题" label-position="right">
                                    <el-input v-model="title" disabled/>
                              </el-form-item>
                              <el-form-item label="发送人" label-position="right">
                                    <el-input v-model="name" disabled/>
                              </el-form-item>
                              <el-form-item label="发送时间" label-position="right">
                                    <el-input v-model="addTime" disabled/>
                              </el-form-item>
                              <el-form-item label="内容" label-position="right">
                                    <el-input v-model="content" type="textarea" :rows="8" disabled/>
                              </el-form-item>
                        </el-form>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>