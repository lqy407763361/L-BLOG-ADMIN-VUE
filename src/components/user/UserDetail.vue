<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const name = ref('');
const status = ref('');
const registerTypeName = ref('');
const registerIp = ref('');
const lastLoginIp = ref('');
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
                  <div class="content-title"><List />&nbsp;会员详情</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-row>
                                    <el-col :span="8">
                                          <el-form-item label="注册时间">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后登录时间">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="编辑时间">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                              </el-row>
                              <div style="clear:both;"></div>
                        </div>
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="会员账号" label-position="right">
                                    <el-input v-model="name" disabled/>
                              </el-form-item>
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option value="1" label="启用"/>
                                          <el-option value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="注册方式" label-position="right">
                                    <el-input v-model="registerTypeName" disabled/>
                              </el-form-item>
                              <el-form-item label="注册地IP" label-position="right">
                                    <el-input v-model="registerIp" disabled/>
                              </el-form-item>
                              <el-form-item label="最后登录IP" label-position="right">
                                    <el-input v-model="lastLoginIp" disabled/>
                              </el-form-item>
                        </el-form>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>