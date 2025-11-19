<script setup>
import { ref, computed } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { formatCurrentDate, formatDate } from '@/util/dateUtil'
import { articleCategoryApi } from '@/api/articleCategoryApi'

const name = ref('');
const status = ref('');
const sortOrder = ref(0);
const description = ref('');

//判断提交模式为新增还是编辑
const route = useRoute();
const routeValue = computed(() => route.params.id);

//提交表单
const saveArticleCategory = async() => {
      try{
            const formData = {
                  name: name.value,
                  status: status.value,
                  sortOrder: sortOrder.value,
                  description: description.value,
            }
            if(routeValue.value == 'add'){
                  await articleCategoryApi.addArticleCategory(formData);
                  alert("提交成功！");
                  router.push('/articleCategory');
            }else{
                  formData.id = routeValue.value;
                  await articleCategoryApi.editArticleCategory(formData);
                  alert("提交成功！");
                  location.reload();
            }
      }catch(error){
            if(error.response.status == 500){
                  alert("提交失败！");
            }
      }
};

//获取API接口
const articleCategoryDetail = ref({});
//文章分类接口
const articleCategoryIndexApi = async() => {
      if(routeValue.value == 'add'){
            return;
      }

      const getArticleCategoryDetail = await articleCategoryApi.getArticleCategoryDetail({
            articleCategoryId: routeValue.value,
      });
      articleCategoryDetail.value = getArticleCategoryDetail.data;
      name.value = articleCategoryDetail.value.name || '';
      status.value = articleCategoryDetail.value.status || '';
      sortOrder.value = articleCategoryDetail.value.sortOrder || 0;
      description.value = articleCategoryDetail.value.description || '';
}

//加载接口
articleCategoryIndexApi();
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="info-msg" @click.prevent="saveArticleCategory"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;文章分类列表</div>
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
                                                <el-input disabled :value="articleCategoryDetail.editTime ? formatDate(articleCategoryDetail.editTime) : ''"/>
                                          </el-form-item>
                                    </el-col>
                              </el-row>
                              <div style="clear:both;"></div>
                        </div>
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="文章分类名称" label-position="right">
                                    <el-input v-model="name"/>
                              </el-form-item>
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option :value="1" label="启用"/>
                                          <el-option :value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="排序" label-position="right">
                                    <el-input-number v-model="sortOrder" :min="0" :max="999"/>
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