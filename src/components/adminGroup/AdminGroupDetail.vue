<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const name = ref('');
const status = ref('');
const description = ref('');
const view_power = ref([]);
const edit_power = ref([]);
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
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;管理员群组详情</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-row>
                                    <el-col :span="8">
                                          <el-form-item label="创建时间">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后编辑">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                              </el-row>
                              <div style="clear:both;"></div>
                        </div>
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="群组名称" label-position="right">
                                    <el-input v-model="name"/>
                              </el-form-item>
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option value="1" label="启用"/>
                                          <el-option value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="简介" label-position="right">
                                    <el-input v-model="description" type="textarea" :rows="8"/>
                              </el-form-item>
                              <el-form-item label="查看权限" label-position="right">
                                    <el-checkbox-group v-model="view_power">
                                          <el-checkbox value="1" name="view_power">查看权限1</el-checkbox>
                                          <el-checkbox value="2" name="view_power">查看权限2</el-checkbox>
                                          <el-checkbox value="3" name="view_power">查看权限3</el-checkbox>
                                    </el-checkbox-group>
                              </el-form-item>
                              <el-form-item label="编辑权限" label-position="right">
                                    <el-checkbox-group v-model="edit_power">
                                          <el-checkbox value="1" name="edit_power">编辑权限1</el-checkbox>
                                          <el-checkbox value="2" name="edit_power">编辑权限2</el-checkbox>
                                          <el-checkbox value="3" name="edit_power">编辑权限3</el-checkbox>
                                    </el-checkbox-group>
                              </el-form-item>
                        </el-form>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>