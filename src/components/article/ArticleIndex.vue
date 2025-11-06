<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { articleApi } from '@/api/articleApi'
import { formatDate } from '@/util/dateUtil'
import { pageTotal } from '@/util/pageTotal'

const searchTitle = ref('');
const searchCategory = ref('');
const searchStatus = ref('');
const clickSearch = () =>{
      alert(123);
}

//获取API接口
const articleList = ref({});
const indexPageApi = async() => {
      //获取文章列表
      const getArticleList = await articleApi.getArticleList({
            startPage: 1,
            size: 1
      });
      articleList.value = getArticleList.data;
}
indexPageApi();
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
                                    <tr v-for="(article) in articleList.list" :key="article.id">
                                          <td align="center"><input type="checkbox" name="check_one[]" value="{{ article.id }}"></td>
                                          <td align="left">{{ article.title }}</td>
                                          <td align="left">{{ article.categoryName }}</td>
                                          <td align="left"><span v-if="article.status == 1" style="color:green;">启用</span><span v-else style="color:red;">禁用</span></td>
                                          <td align="left">{{ formatDate(article.addTime) }}</td>
                                          <td align="right"><router-link :to="`/article/${ article.id }`"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
                                    </tr>
                                    <tr v-if="!articleList.list || articleList.list.length == 0"><td align="center" colspan="6" class="table-no-data">正在加载数据...</td></tr>
                              </tbody>
                        </table>
                        <div class="page">
                              <ul>
                                    <li v-for="page in pageTotal(articleList.total, articleList.size)" 
                                          :key="page"
                                          :class="{ active: page==articleList.startPage}">
                                          <span v-if="page==articleList.startPage">{{ page }}</span>
                                          <router-link v-else :to="`/article?page=${ page }`">{{ page }}</router-link>
                                    </li>
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