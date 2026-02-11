<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import JSEncrypt from 'jsencrypt'
import CommonFooter from '@/components/common/CommonFooter.vue'
import router from '@/router'
import { authStore } from '@/util/authUtil'
import { adminApi } from '@/api/adminApi'
import { captchaApi } from '@/api/captchaApi'
import { siteConfigApi } from '@/api/siteConfigApi'

const account = ref('');
const password = ref('');
const captchaCode = ref('');
const captchaImage = ref('');
const siteConfigDetail = ref({});
const adminRsaPublicKey = ref('');
const authStoreInstance = authStore();

//获取验证码
const refreshCaptcha = async () =>{
      const generateCaptcha = await captchaApi.generateCaptcha();
      captchaImage.value = 'data:image/png;base64,' + generateCaptcha.data;
      captchaCode.value = '';
}

//RSA加密密码
const encryptPassword = (password, rsaPublicKey) => {
      const encryptData = new JSEncrypt();
      encryptData.setPublicKey(rsaPublicKey);

      return encryptData.encrypt(password);
}

//提交表单
const login = async () => {
      if((!account.value.trim()) || (!password.value.trim()) || (!captchaCode.value.trim())){
            ElMessage.error('请填写完整！');

            return false;
      }

      try{
            const formData = {
                  account: account.value,
                  password: encryptPassword(password.value, adminRsaPublicKey.value),
                  captchaCode: captchaCode.value,
            }
            const authToken = await adminApi.adminLogin(formData);
            authStoreInstance.setAuth({
                  accessToken: authToken.data.accessToken,
                  refreshToken: authToken.data.refreshToken,
            });
            ElMessage.success('登录成功！');
            router.push('/');
      }catch(error){
            if(error.response.status == 500){
                  ElMessage.error(error.response.data.message);
            }else{
                  ElMessage.error("登录失败！");
            }
            await refreshCaptcha();
      }
}

const commonLoginApi = async () => {
      //获取网站配置
      const getSiteConfigDetail = await siteConfigApi.getSiteConfigDetail();
      siteConfigDetail.value = getSiteConfigDetail.data;

      //获取RSA公钥
      const getAdminRsaPublicKey = await adminApi.getAdminRsaPublicKey();
      adminRsaPublicKey.value = getAdminRsaPublicKey.data;
}

//组件加载完成后再加载接口
onMounted(async () =>{
      //判断是否登录
      if(authStoreInstance.isLoggedIn()){
            router.push('/');
      }

      //加载接口
      await commonLoginApi();
      await refreshCaptcha();
});
</script>

<template>
      <header>
            <h1>{{ siteConfigDetail?.siteTitle || 'L-BLOG' }}</h1>
      </header>
      <div class="login-content">
            <div class="login-box">
                  <div class="login-title">
                        <i class="fa fa-lock"></i>&nbsp;&nbsp;<span>请输入您的登录信息</span>
                  </div>
                  <el-form :model="form" label-position="auto" class="login-form">
                        <el-form-item label="账号" label-position="top">
                              <el-input v-model="account"/>
                        </el-form-item>
                        <el-form-item label="密码" label-position="top">
                              <el-input v-model="password" type="password" show-password autocomplete="new-password"/>
                        </el-form-item>
                        <el-form-item label="验证码" label-position="top">
                              <el-row :gutter="30">
                                    <el-col :span="16">
                                          <el-input v-model="captchaCode"/>
                                    </el-col>
                                    <el-col :span="8">
                                          <a @click="refreshCaptcha"><img :src="captchaImage" alt="" style="width:100px;height:34px;"></a>
                                    </el-col>
                              </el-row>
                        </el-form-item>
                        <el-button type="primary" @click="login">登录</el-button>
                  </el-form>
            </div>
      </div>
      <CommonFooter />
</template>

<style scoped>
</style>