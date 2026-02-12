<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import router from '@/router'
import { authStore } from '@/util/authUtil'
import { formatDate } from '@/util/dateUtil'
import { pageTotal } from '@/util/pageTotalUtil'
import { articleCategoryApi } from '@/api/articleCategoryApi'

//搜索
const searchName = ref('');
const searchStatus = ref('');
const searchParams = ref({});
const clickSearch = () => {
      const params = {
            name: searchName.value,
            status: searchStatus.value,
      }
      searchParams.value = params;
      articleCategoryIndexApi(params);
}

//分页
const changePage = (page) => {
      const params = {
            page: page,
            name: searchParams.value.name,
            categoryId: searchParams.value.categoryId,
            status: searchParams.value.status,
      }
      articleCategoryIndexApi(params);
}

//全选
const selectArticleCategoryId = ref([]);
const checkAll = (e) => {
      selectArticleCategoryId.value = e.target.checked ? articleCategoryList.value.list.map(item => item.id) : [];
}

//删除文章
const deleteArticleCategory = async () => {
      if(selectArticleCategoryId.value.length == 0){
            ElMessage.success('请选择要删除的文章分类！');
            return;
      }
      if(confirm("确定要删除选中的文章分类吗？")){
            try{
                  await articleCategoryApi.deleteArticleCategory({
                        id: selectArticleCategoryId.value
                  });
                  window.location.reload();
            }catch(error){
                  if(error.response.status == 500){
                        ElMessage.success('删除失败！');
                  }
            }
      }
}

//获取API接口
const articleCategoryList = ref({});
const authStoreInstance = authStore();
//文章分类接口
const articleCategoryIndexApi = async (params={}) => {
      const getArticleCategoryList = await articleCategoryApi.getArticleCategoryList({
            page: params.page,
            name: params.name,
            status: params.status
      });
      articleCategoryList.value = getArticleCategoryList.data;
}

//组件加载完成后再加载接口
onMounted(async () =>{
      //判断是否登录
      if(!authStoreInstance.isLoggedIn()){
            router.push('/login');
      }

      //加载接口
      await articleCategoryIndexApi();
});
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="/articleCategory/add" class="info-msg"><font-awesome-icon icon="fa-solid fa-plus" /></router-link>
                  <router-link to="#" class="danger-msg" @click.prevent="deleteArticleCategory"><font-awesome-icon icon="fa-solid fa-trash-can" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-list" />&nbsp;文章分类列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-form :model="form" label-position="top">
                                    <el-row>
                                          <el-col :span="8">
                                                <el-form-item label="文章分类名称">
                                                      <el-input v-model="searchName" maxlength="20" show-word-limit="true" placeholder="文章标题"/>
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
                                          <td align="left"><span>文章类型名称</span></td>
                                          <td align="left"><span>状态</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="left"><span>时间</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="right">操作</td>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr v-for="articleCategory in articleCategoryList.list"
                                          :key="articleCategory.id">
                                          <td align="center"><input type="checkbox" :value="articleCategory.id" v-model="selectArticleCategoryId"></td>
                                          <td align="left">{{ articleCategory.name }}</td>
                                          <td align="left"><span v-if="articleCategory.status == 1" style="color:green;">启用</span><span v-else style="color:red;">禁用</span></td>
                                          <td align="left">{{ formatDate(articleCategory.addTime) }}</td>
                                          <td align="right"><router-link :to="`/articleCategory/${articleCategory.id}`"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
                                    </tr>
                                    <tr v-if="!articleCategoryList.list || articleCategoryList.list.length == 0"><td align="center" colspan="6" class="table-no-data">暂无数据...</td></tr>
                              </tbody>
                        </table>
                        <div class="page" v-if="pageTotal(articleCategoryList.total, articleCategoryList.size)>1">
                              <ul>
                                    <li v-for="page in pageTotal(articleCategoryList.total, articleCategoryList.size)"
                                          :key="page"
                                          :class="{active: page==articleCategoryList.startPage}">
                                          <span v-if="page==articleCategoryList.startPage">{{ page }}</span>
                                          <router-link v-else :to="{path: '/articleCategory', query:{page: page}}" @click.prevent="changePage(page)">{{ page }}</router-link>
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