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
                  <router-link to="/" class="info-msg"><Plus /></router-link>
                  <router-link to="#" class="danger-msg"><Delete /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><List />&nbsp;文章列表</div>
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
                                    <el-button type="primary" @click="clickSearch"><Search />&nbsp;搜索</el-button>
                              </el-form>
                        </div>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>