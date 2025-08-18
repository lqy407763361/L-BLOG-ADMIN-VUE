<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const searchName = ref('');
const searchStatus = ref('');
const clickSearch = () =>{
      alert(123);
}
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
                  <div class="content-title"><List />&nbsp;会员列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-form :model="form" label-position="top">
                                    <el-row>
                                          <el-col :span="8">
                                                <el-form-item label="会员账号">
                                                      <el-input v-model="searchName" maxlength="20" show-word-limit="true" placeholder="会员账号"/>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                                <el-form-item label="状态">
                                                      <el-select v-model="searchStatus" placeholder="状态">
                                                            <el-option value="" label="全部"/>
                                                            <el-option value="1" label="启用"/>
                                                            <el-option value="2" label="禁用"/>
                                                      </el-select>
                                                </el-form-item>
                                          </el-col>
                                    </el-row>
                                    <el-button type="primary" @click="clickSearch"><Search />&nbsp;搜索</el-button>
                              </el-form>
                        </div>
                        <table class="table table-bordered table-hover">
                              <thead>
                                    <tr>
                                          <td align="center"><input type="checkbox" name="check_all"></td>
                                          <td align="left"><span>会员账号</span></td>
                                          <td align="left"><span>状态</span>&nbsp;&nbsp;<CaretTop /></td>
                                          <td align="left"><span>注册时间</span>&nbsp;&nbsp;<CaretTop /></td>
                                          <td align="left"><span>最后登录时间</span>&nbsp;&nbsp;<CaretTop /></td>
                                          <td align="right">操作</td>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                          <td align="center"><input type="checkbox" name="check_one[]" value=""></td>
                                          <td align="left">会员账号1</td>
                                          <td align="left"><span style="color:green;">启用</span></td>
                                          <td align="left">2025-08-11</td>
                                          <td align="left">2025-08-11</td>
                                          <td align="right"><router-link to="/user/1"><Edit /></router-link></td>
                                    </tr>
                                    <tr>
                                          <td align="center"><input type="checkbox" name="check_one[]" value=""></td>
                                          <td align="left">会员账号2</td>
                                          <td align="left"><span style="color:red;">禁用</span></td>
                                          <td align="left">2025-08-11</td>
                                          <td align="left">2025-08-11</td>
                                          <td align="right"><router-link to=""><Edit /></router-link></td>
                                    </tr>
                                    <tr><td align="center" colspan="6" class="table-no-data">正在加载数据...</td></tr>
                              </tbody>
                        </table>
                        <div class="page">
                              <ul>
                                    <li class="active"><span>1</span></li>
                                    <li><router-link to="">2</router-link></li>
                                    <li><router-link to="">3</router-link></li>
                              </ul>
                        </div>
                        <div style="clear:both;"></div>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>