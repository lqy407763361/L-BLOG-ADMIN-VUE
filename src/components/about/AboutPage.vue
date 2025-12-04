<script setup>
import { ref, onMounted } from 'vue'
import { Ckeditor } from '@ckeditor/ckeditor5-vue'
import useCKEditor from '@/assets/js/useCKEditor.js'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { aboutApi } from '@/api/aboutApi'

const status = ref('');
const content = ref('');
const editor = ref(useCKEditor.editor);
const config = ref(null);

//提交表单
const saveAbout = async() => {
      try{
            const formData = {
                  status: status.value,
                  content: content.value,
            }
            console.log(formData);
            await aboutApi.editAbout(formData);
            alert("提交成功！");
            location.reload();
      }catch(error){
            if(error.response.status == 500){
                  alert("提交失败！");
            }
      }
};

//获取API接口
const aboutDetail = ref({});
//文章接口
const aboutIndexApi = async() => {
      const getAboutDetail = await aboutApi.getAboutDetail();
      aboutDetail.value = getAboutDetail.data;
      status.value = aboutDetail.value.status || '';
      content.value = aboutDetail.value.content || '';
}

//组件加载完成后再加载接口
onMounted(() =>{
      //加载CKEditor配置
      config.value = useCKEditor.config();

      //加载接口
      aboutIndexApi();
})
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="info-msg" @click.prevent="saveAbout"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;关于我</div>
                  <div class="content-body">
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option :value="1" label="启用"/>
                                          <el-option :value="2" label="禁用"/>
                                    </el-select>
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