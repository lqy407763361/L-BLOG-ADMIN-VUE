<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import useCKEditor from '@/assets/js/useCKEditor.js'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const formTab = ref('seo');
const metaTitle = ref('');
const metaDescription = ref('');
const metaKeywords = ref('');
const siteTitle = ref('');
const siteListLimit = ref(1);
const adminListLimit = ref(1);
const imageUrl = ref('');
const siteConfig = ref('');
const systemMaintenance = ref('');
const siteSessionExpire = ref('');
const adminSessionExpire = ref('');
const siteLoginMaxNumber = ref('');
const adminLoginMaxNumber = ref('');
const editor = ref(useCKEditor.editor);
const config = ref(null);

// 上传图片
const handleAvatarSuccess = (response, uploadFile) => {
      imageUrl.value = URL.createObjectURL(uploadFile.raw);
};
const beforeAvatarUpload = (rawFile) => {
      if (rawFile.type !== 'image/jpeg') {
            ElMessage.error('文件格式不符！')
            return false;
      }else if(rawFile.size / 1024 / 1024 > 2){
            ElMessage.error('文件大小不符！')
            return false;
      }
      return true;
}

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
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;网站配置</div>
                  <div class="content-body">
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-tabs v-model="formTab" type="card">
                                    <el-tab-pane label="SEO" name="seo">
                                          <el-form-item label="Meta标题" label-position="right">
                                                <el-input v-model="metaTitle"/>
                                          </el-form-item>
                                          <el-form-item label="Meta描述" label-position="right">
                                                <el-input v-model="metaDescription" type="textarea" :rows="6"/>
                                          </el-form-item>
                                          <el-form-item label="Meta关键词" label-position="right">
                                                <el-input v-model="metaKeywords" type="textarea" :rows="6"/>
                                          </el-form-item>
                                    </el-tab-pane>
                                    <el-tab-pane label="常规" name="general">
                                          <el-form-item label="网站标题" label-position="right">
                                                <el-input v-model="siteTitle"/>
                                          </el-form-item>
                                          <el-form-item label="网站列表页展示数量" label-position="right">
                                                <el-input v-model="siteListLimit"/>
                                          </el-form-item>
                                          <el-form-item label="后台列表页展示数量" label-position="right">
                                                <el-input v-model="adminListLimit"/>
                                          </el-form-item>
                                          <el-form-item label="后台列表页展示数量" label-position="right">
                                                <el-input v-model="adminListLimit"/>
                                          </el-form-item>
                                          <el-form-item label="LOGO" label-position="right">
                                                <el-upload
                                                      class="logo-image-upload"
                                                      action=""
                                                      :show-file-list="false"
                                                      :on-success="handleAvatarSuccess"
                                                      :before-upload="beforeAvatarUpload"
                                                >
                                                      <img v-if="imageUrl" :src="imageUrl" class="logo-image" />
                                                      <font-awesome-icon icon="fa-solid fa-plus" />
                                                </el-upload>
                                          </el-form-item>
                                          <el-form-item label="网站底部配置信息" label-position="right">
                                                <ckeditor 
                                                v-if="editor && config"
                                                v-model="siteConfig"
                                                :editor="editor"
                                                :config="config"
                                                />
                                          </el-form-item>
                                    </el-tab-pane>
                                    <el-tab-pane label="服务" name="service">
                                          <el-form-item label="系统维护模式" label-position="right">
                                                <el-switch v-model="systemMaintenance" inactive-text="关闭" active-text="开启"/>
                                          </el-form-item>
                                          <el-form-item label="网站最大登录次数" label-position="right">
                                                <el-input v-model="siteLoginMaxNumber"/>
                                          </el-form-item>
                                          <el-form-item label="后台最大登录次数" label-position="right">
                                                <el-input v-model="adminLoginMaxNumber"/>
                                          </el-form-item>
                                          <el-form-item label="网站登录会话周期" label-position="right">
                                                <el-input v-model="siteSessionExpire" placeholder="以秒为单位"/>
                                          </el-form-item>
                                          <el-form-item label="后台登录会话周期" label-position="right">
                                                <el-input v-model="adminSessionExpire" placeholder="以秒为单位"/>
                                          </el-form-item>
                                    </el-tab-pane>
                                    <el-tab-pane label="日志" name="log">
                                          <el-form-item label="错误日志" label-position="right">
                                                <el-input v-model="metaKeywords" type="textarea" :rows="12" disabled/>
                                          </el-form-item>
                                    </el-tab-pane>
                              </el-tabs>
                        </el-form>   
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>