<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import CommonFooter from '@/components/common/CommonFooter.vue'
import router from '@/router'
import { adminApi } from '@/api/adminApi'
import { siteConfigApi } from '@/api/siteConfigApi'

const account = ref('');
const password = ref('');
const captchaCode = ref('');
const captchaImage = ref('');
const siteConfigDetail = ref({});

//获取验证码
const refreshCaptcha = async() =>{
      const generateCaptcha = await adminApi.generateCaptcha();
      captchaImage.value = 'data:image/png;base64,' + generateCaptcha.data;
      captchaCode.value = '';
}

//提交表单
const login = async() => {
      try{
            const formData = {
                  account: account.value,
                  password: password.value,
                  captchaCode: captchaCode.value,
            }
            await adminApi.adminLogin(formData);
            ElMessage.success('登录成功！');
            router.push('/index');
      }catch(error){
            if(error.response.status == 500){
                  ElMessage.error(error.response.data.message);
            }else{
                  ElMessage.error("登录失败！");
            }
            await refreshCaptcha();
      }
};

const commonLoginApi = async() => {
      //获取网站配置
      const getSiteConfigDetail = await siteConfigApi.getSiteConfigDetail();
      siteConfigDetail.value = getSiteConfigDetail.data;

      //获取验证码
      await refreshCaptcha();
}
commonLoginApi();
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