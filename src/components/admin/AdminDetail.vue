<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const account = ref('');
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const status = ref('');
const adminGroupId = ref('');
const description = ref('');
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
                  <div class="content-title"><List />&nbsp;管理员列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-row>
                                    <el-col :span="8">
                                          <el-form-item label="添加时间">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后编辑时间">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后登录时间">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                              </el-row>
                              <div style="clear:both;"></div>
                        </div>
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="账号" label-position="right">
                                    <el-input v-model="account"/>
                              </el-form-item>
                              <el-form-item label="名称" label-position="right">
                                    <el-input v-model="name"/>
                              </el-form-item>
                              <el-form-item label="密码" label-position="right">
                                    <el-input v-model="password" type="password" show-password/>
                              </el-form-item>
                              <el-form-item label="确认密码" label-position="right">
                                    <el-input v-model="confirmPassword" type="password" show-password/>
                              </el-form-item>
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option value="1" label="启用"/>
                                          <el-option value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="所属群组" label-position="right">
                                    <el-select v-model="adminGroupId" placeholder="所属群组">
                                          <el-option value="1" label="所属群组1"/>
                                          <el-option value="2" label="所属群组2"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="简介" label-position="right">
                                    <el-input v-model="description" type="textarea" :rows="8"/>
                              </el-form-item>
                        </el-form>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>