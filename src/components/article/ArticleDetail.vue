<script setup>
import { ref, onMounted } from 'vue'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import useCKEditor from '@/assets/js/useCKEditor.js'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const title = ref('');
const category = ref('');
const status = ref('');
const sort = ref(0);
const content = ref('');
const editor = ref(useCKEditor.editor);
const config = ref(null);
onMounted(() =>{
      // 加载CKEditor配置
      config.value = useCKEditor.config();
})
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="/" class="info-msg"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;文章列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-row>
                                    <el-col :span="8">
                                          <el-form-item label="发布时间">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后编辑">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="阅读量">
                                                <el-input disabled value="77"/>
                                          </el-form-item>
                                    </el-col>
                              </el-row>
                              <div style="clear:both;"></div>
                        </div>
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