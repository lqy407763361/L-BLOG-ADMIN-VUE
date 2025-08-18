<script setup>
import { ref, onMounted } from 'vue'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import useCKEditor from '@/assets/js/useCKEditor.js'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const status = ref('');
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
                  <router-link to="/" class="info-msg"><Plus /></router-link>
                  <router-link to="#" class="danger-msg"><Delete /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><List />&nbsp;关于我</div>
                  <div class="content-body">
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option value="1" label="启用"/>
                                          <el-option value="2" label="禁用"/>
                                    </el-select>
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