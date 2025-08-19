<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const title = ref('');
const category = ref('');
const status = ref('');
const sort = ref(0);
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
                  <div class="content-title"><List />&nbsp;网站配置</div>
                  <div class="content-body">
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="文章标题" label-position="right">
                                    <el-input v-model="title"/>
                              </el-form-item>
                              <el-form-item label="文章分类" label-position="right">
                                    <el-select v-model="category" placeholder="文章分类">
                                          <el-option value="1" label="文章分类1"/>
                                          <el-option value="2" label="文章分类2"/>
                                          <el-option value="3" label="文章分类3"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option value="1" label="启用"/>
                                          <el-option value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="排序" label-position="right">
                                    <el-input-number v-model="sort" :min="0" :max="999"/>
                              </el-form-item>
                              <el-form-item label="内容" label-position="right">
                                    <ckeditor 
                                          v-if="editor && config"
                                          v-model="content"
                                          :editor="editor"
                                          :config="config"
                                    />
                              </el-form-item>
                        </el-form>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>