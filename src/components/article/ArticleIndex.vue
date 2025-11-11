<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { articleApi } from '@/api/articleApi'
import { articleCategoryApi } from '@/api/articleCategoryApi'
import { formatDate } from '@/util/dateUtil'
import { pageTotal } from '@/util/pageTotal'

//搜索
const searchTitle = ref('');
const searchCategory = ref('');
const searchStatus = ref('');
const searchParams = ref({});
const clickSearch = () => {
      const params = {
            title: searchTitle.value,
            categoryId: searchCategory.value,
            status: searchStatus.value,
      }
      searchParams.value = params;
      articleIndexApi(params);
}

//分页
const changePage = (page) => {
      const params = {
            page: page,
            title: searchParams.value.title,
            categoryId: searchParams.value.categoryId,
            status: searchParams.value.status,
      }
      articleIndexApi(params);
}

//全选
const selectArticleId = ref([]);
const checkAll = (e) => {
      selectArticleId.value = e.target.checked ? articleList.value.list.map(item => item.id) : [];
}

//删除文章
const deleteArticle = async() => {
      if(selectArticleId.value.length == 0){
            alert("请选择要删除的文章！");
            return;
      }
      console.log(777);
      console.log(selectArticleId.value);
      if(confirm("确定要删除选中的文章吗？")){
            await articleApi.deleteArticle({id: selectArticleId});
            selectArticleId.value = [];
            articleIndexApi();
      }
}

//获取API接口
const articleList = ref({});
const articleCategoryList = ref({});
//文章接口
const articleIndexApi = async(params={}) => {
      const getArticleList = await articleApi.getArticleList({
            page: params.page,
            title: params.title,
            categoryId: params.categoryId,
            status: params.status
      });
      articleList.value = getArticleList.data;
}
//文章分类接口
const articleCategoryIndexApi = async() => {
      const getArticleCategoryList = await articleCategoryApi.getArticleCategoryList();
      articleCategoryList.value = getArticleCategoryList.data;
}
articleIndexApi();
articleCategoryIndexApi();
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="/" class="info-msg"><font-awesome-icon icon="fa-solid fa-plus" /></router-link>
                  <router-link to="#" class="danger-msg" @click.prevent="deleteArticle"><font-awesome-icon icon="fa-solid fa-trash-can" /></router-link>
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
                                                            <el-option v-for="articleCategory in articleCategoryList.list" 
                                                                  :key="articleCategory.id" 
                                                                  :value="articleCategory.id" 
                                                                  :label="articleCategory.name"/>
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
                                          <td align="center"><input type="checkbox" @change="checkAll"></td>
                                          <td align="left"><span>文章标题</span></td>
                                          <td align="left">文章类型</td>
                                          <td align="left"><span>状态</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="left"><span>时间</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="right">操作</td>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr v-for="article in articleList.list" 
                                          :key="article.id">
                                          <td align="center"><input type="checkbox" :value="article.id" v-model="selectArticleId"></td>
                                          <td align="left">{{ article.title }}</td>
                                          <td align="left">{{ article.categoryName }}</td>
                                          <td align="left"><span v-if="article.status == 1" style="color:green;">启用</span><span v-else style="color:red;">禁用</span></td>
                                          <td align="left">{{ formatDate(article.addTime) }}</td>
                                          <td align="right"><router-link :to="`/article/${ article.id }`"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
                                    </tr>
                                    <tr v-if="!articleList.list || articleList.list.length == 0"><td align="center" colspan="6" class="table-no-data">暂无数据...</td></tr>
                              </tbody>
                        </table>
                        <div class="page" v-if="pageTotal(articleList.total, articleList.size)>1">
                              <ul>
                                    <li v-for="page in pageTotal(articleList.total, articleList.size)" 
                                          :key="page"
                                          :class="{active: page==articleList.startPage}">
                                          <span v-if="page==articleList.startPage">{{ page }}</span>
                                          <router-link v-else :to="{path: '/article', query:{page: page}}" @click.prevent="changePage(page)">{{ page }}</router-link>
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