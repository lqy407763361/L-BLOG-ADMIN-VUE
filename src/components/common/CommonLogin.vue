<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import CommonFooter from '@/components/common/CommonFooter.vue'

const account = ref('');
const password = ref('');
const captcha = ref('');
const login = () => {
      ElMessage.error('警告信息！');
}
</script>

<template>
      <header>
            <h1>L-BLOG</h1>
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
                                          <el-input v-model="captcha"/>
                                    </el-col>
                                    <el-col :span="8">
                                          <img src="" alt="" style="width:100px;height:34px;">
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