<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'

const searchTitle = ref('');
const searchCategory = ref('');
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
                  <router-link to="/" class="info-msg"><font-awesome-icon icon="fa-solid fa-plus" /></router-link>
                  <router-link to="#" class="danger-msg"><font-awesome-icon icon="fa-solid fa-trash-can" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-list" />&nbsp;文章列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-form :model="form" label-position="top">
                                    <el-row>
                                          <el-col :span="8">
                                                <el-form-item label="文章标题">
                                                      <el-input v-model="searchTitle" maxlength="20" show-word-limit="true" placeholder="文章标题"/>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                                <el-form-item label="文章分类">
                                                      <el-select v-model="searchCategory" placeholder="文章分类">
                                                            <el-option value="" label="全部"/>
                                                            <el-option value="1" label="文章分类1"/>
                                                            <el-option value="2" label="文章分类2"/>
                                                            <el-option value="3" label="文章分类3"/>
                                                      </el-select>
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
                                    <el-button type="primary" @click="clickSearch"><font-awesome-icon icon="fa-solid fa-magnifying-glass" />&nbsp;搜索</el-button>
                              </el-form>
                        </div>
                        <table class="table table-bordered table-hover">
                              <thead>
                                    <tr>
                                          <td align="center"><input type="checkbox" name="check_all"></td>
                                          <td align="left"><span>文章标题</span></td>
                                          <td align="left">文章类型</td>
                                          <td align="left"><span>状态</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="left"><span>时间</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="right">操作</td>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr>
                                          <td align="center"><input type="checkbox" name="check_one[]" value=""></td>
                                          <td align="left">文章标题1</td>
                                          <td align="left">文章分类1</td>
                                          <td align="left"><span style="color:green;">启用</span></td>
                                          <td align="left">2025-08-11</td>
                                          <td align="right"><router-link to="/article/1"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
                                    </tr>
                                    <tr>
                                          <td align="center"><input type="checkbox" name="check_one[]" value=""></td>
                                          <td align="left">文章标题2</td>
                                          <td align="left">文章分类2</td>
                                          <td align="left"><span style="color:red;">禁用</span></td>
                                          <td align="left">2025-08-11</td>
                                          <td align="right"><router-link to=""><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
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