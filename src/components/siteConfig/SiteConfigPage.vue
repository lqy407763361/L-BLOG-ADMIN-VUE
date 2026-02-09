<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import useCKEditor from '@/assets/js/useCKEditor.js'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import router from '@/router'
import { authStore } from '@/util/authUtil'
import { siteConfigApi } from '@/api/siteConfigApi'

const formTab = ref('seo');
const metaTitle = ref('');
const metaDescription = ref('');
const metaKeywords = ref('');
const siteTitle = ref('');
const siteListLimit = ref(1);
const adminListLimit = ref(1);
const logoImageUrl = ref('');
const logoImageFullUrl = ref('');
const systemMaintenance = ref(1);
const siteLoginMaxNumber = ref('');
const adminLoginMaxNumber = ref('');
const siteSessionExpire = ref('');
const adminSessionExpire = ref('');
const errorLog = ref('');
const siteConfig = ref('');
const editor = ref(useCKEditor.editor);
const config = ref(null);

//提交表单
const saveSiteConfig = async () => {
      try{
            const formData = {
                  metaTitle: metaTitle.value,
                  metaDescription: metaDescription.value,
                  metaKeywords: metaKeywords.value,
                  siteTitle: siteTitle.value,
                  siteListLimit: siteListLimit.value,
                  adminListLimit: adminListLimit.value,
                  siteConfig: siteConfig.value,
                  systemMaintenance: systemMaintenance.value,
                  siteLoginMaxNumber: siteLoginMaxNumber.value,
                  adminLoginMaxNumber: adminLoginMaxNumber.value,
                  siteSessionExpire: siteSessionExpire.value,
                  adminSessionExpire: adminSessionExpire.value,
                  errorLog: errorLog.value,
            }
            await siteConfigApi.editSiteConfig(formData);
            ElMessage.success("提交成功！");
            location.reload();
      }catch(error){
            if(error.response.status == 500){
                  ElMessage.error(error.response.data.message);
            }else{
                  ElMessage.error("提交失败！");
            }
      }
}

//获取API接口
const siteConfigDetail = ref({});
const authStoreInstance = authStore();

//配置接口
const siteConfigIndexApi = async () => {
      const getSiteConfigDetail = await siteConfigApi.getSiteConfigDetail();
      siteConfigDetail.value = getSiteConfigDetail.data;
      metaTitle.value = siteConfigDetail.value.metaTitle || '';
      metaDescription.value = siteConfigDetail.value.metaDescription || '';
      metaKeywords.value = siteConfigDetail.value.metaKeywords || '';
      siteTitle.value = siteConfigDetail.value.siteTitle || '';
      siteListLimit.value = siteConfigDetail.value.siteListLimit || '';
      adminListLimit.value = siteConfigDetail.value.adminListLimit || '';
      logoImageUrl.value = siteConfigDetail.value.logoImageUrl || '';
      logoImageFullUrl.value = siteConfigDetail.value.logoImageFullUrl || '';
      siteConfig.value = siteConfigDetail.value.siteConfig || '';
      systemMaintenance.value = siteConfigDetail.value.systemMaintenance || '';
      siteLoginMaxNumber.value = siteConfigDetail.value.siteLoginMaxNumber || '';
      adminLoginMaxNumber.value = siteConfigDetail.value.adminLoginMaxNumber || '';
      siteSessionExpire.value = siteConfigDetail.value.siteSessionExpire || '';
      adminSessionExpire.value = siteConfigDetail.value.adminSessionExpire || '';
      errorLog.value = siteConfigDetail.value.errorLog || '';
}

//上传图片
const uploadLogoImage = async(options) => {
      try{
            const res = await siteConfigApi.uploadLogoImage(options.file);   
            options.onSuccess(res.data);
      }catch(error){
            options.onError(error);
      }
}
const handleAvatarSuccess = (response, uploadFile) => {
      logoImageUrl.value = URL.createObjectURL(uploadFile.raw);
}
const beforeAvatarUpload = (rawFile) => {
      const allowType = ["image/jpeg", "image/png"];
      const allowSize = 2;
      if(!allowType.includes(rawFile.type)){
            ElMessage.error('文件格式不符！')
            return false;
      }
      if(rawFile.size > (allowSize*1024*1024)){
            ElMessage.error('文件大小不符！')
            return false;
      }
      return true;
}

//组件加载完成后再加载接口
onMounted(async () =>{
      //判断是否登录
      if(!authStoreInstance.isLoggedIn()){
            router.push('/login');
      }

      //加载CKEditor配置
      config.value = useCKEditor.config();

      //加载接口
      await siteConfigIndexApi();
});
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="info-msg" @click.prevent="saveSiteConfig"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></router-link>
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
                                          <el-form-item label="LOGO" label-position="right">
                                                <el-upload
                                                      class="logo-image-upload"
                                                      action=""
                                                      :http-request="uploadLogoImage"
                                                      :show-file-list="true"
                                                      :on-success="handleAvatarSuccess"
                                                      :before-upload="beforeAvatarUpload"
                                                >
                                                      <img v-if="logoImageUrl" :src="logoImageFullUrl" class="logo-image" />
                                                      <font-awesome-icon v-else icon="fa-solid fa-plus" />
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
                                                <el-switch v-model="systemMaintenance" :inactive-value="0" :active-value="1" inactive-text="关闭" active-text="开启"/>
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
                                                <el-input v-model="errorLog" type="textarea" :rows="12" disabled/>
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