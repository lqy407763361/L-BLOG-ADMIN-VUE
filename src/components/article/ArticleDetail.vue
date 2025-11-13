<script setup>
import { ref, onMounted, computed } from 'vue'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import useCKEditor from '@/assets/js/useCKEditor.js'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { formatCurrentDate } from '@/util/dateUtil'
import { articleApi } from '@/api/articleApi'
import { articleCategoryApi } from '@/api/articleCategoryApi'

const title = ref('');
const categoryId = ref('');
const status = ref('');
const sortOrder = ref(0);
const content = ref('');
const editor = ref(useCKEditor.editor);
const config = ref(null);

//判断提交属性
const route = useRoute();
const routeValue = computed(() => route.params.id);

//提交表单
const saveArticle = async() => {
      try{
            const formData = {
                  title: title.value,
                  categoryId: categoryId.value,
                  status: status.value,
                  sortOrder: sortOrder.value,
                  content: content.value,
            }
            if(routeValue.value == 'add'){
                  await articleApi.addArticle(formData);
                  router.push('/article');
            }else{
                  await articleApi.editArticle(formData);
                  location.reload();
            }
      }catch(error){
            if(error.response.status == 500){
                  alert("提交失败！");
            }
      }
};

//获取API接口
const articleDetail = ref({});
const articleCategoryList = ref({});
//文章接口
const articleIndexApi = async() => {
      const getArticleDetail = await articleApi.getArticleDetail({
            articleId: routeValue.value,
      });
      articleDetail.value = getArticleDetail.data;
      title.value = articleDetail.value.title || '';
      categoryId.value = articleDetail.value.categoryId || '';
      status.value = articleDetail.value.status || '';
      sortOrder.value = articleDetail.value.sortOrder || 0;
      content.value = articleDetail.value.content || '';
}
//文章分类接口
const articleCategoryIndexApi = async() => {
      const getArticleCategoryList = await articleCategoryApi.getArticleCategoryList();
      articleCategoryList.value = getArticleCategoryList.data;
}

//组件加载完成后再加载接口
onMounted(() =>{
      // 加载CKEditor配置
      config.value = useCKEditor.config();

      //加载接口
      articleIndexApi();
      articleCategoryIndexApi();
});
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="info-msg" @click.prevent="saveArticle"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;文章列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-row>
                                    <el-col :span="8">
                                          <el-form-item label="发布时间">
                                                <el-input disabled :value="formatCurrentDate()"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后编辑">
                                                <el-input disabled value="2025-08-14"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="阅读量">
                                                <el-input disabled value="77"/>
                                          </el-form-item>
                                    </el-col>
                              </el-row>
                              <div style="clear:both;"></div>
                        </div>
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="文章标题" label-position="right">
                                    <el-input v-model="title"/>
                              </el-form-item>
                              <el-form-item label="文章分类" label-position="right">
                                    <el-select v-model="categoryId" placeholder="文章分类">
                                          <el-option v-for="articleCategory in articleCategoryList.list"
                                                :key="articleCategory.id" 
                                                :value="articleCategory.id" 
                                                :label="articleCategory.name"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option value="1" label="启用"/>
                                          <el-option value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="排序" label-position="right">
                                    <el-input-number v-model="sortOrder" :min="0" :max="999"/>
                              </el-form-item>
                              <el-form-item label="内容" label-position="right">
                                    <ckeditor 
                                          v-if="editor && config"
                                          v-model="content"
                                          :editor="editor"
                                          :config="config"
                                    />
                              </el-form-item>
                        </el-form>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>