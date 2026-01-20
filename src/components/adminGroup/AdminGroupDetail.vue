<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import powerList from "@/config/powerConfig";
import router from '@/router'
import { useRoute } from 'vue-router'
import { formatCurrentDate, formatDate } from '@/util/dateUtil'
import { adminGroupApi } from '@/api/adminGroupApi'

const name = ref('');
const status = ref('');
const description = ref('');
const viewPower = ref([]);
const editPower = ref([]);

//判断提交模式为新增还是编辑
const route = useRoute();
const routeValue = computed(() => route.params.id);

//提交表单
const saveAdminGroup = async() => {
      try{
            const formData = {
                  name: name.value,
                  status: status.value,
                  description: description.value,
                  viewPower: viewPower.value.join(","),
                  editPower: editPower.value.join(","),
            }
            if(routeValue.value == 'add'){
                  await adminGroupApi.addAdminGroup(formData);
                  ElMessage.success('提交成功！');
                  router.push('/adminGroup');
            }else{
                  formData.id = routeValue.value;
                  await adminGroupApi.editAdminGroup(formData);
                  ElMessage.success('提交成功！');
                  location.reload();
            }
      }catch(error){
            if(error.response.status == 500){
                  ElMessage.error(error.response.data.message);
            }else{
                  ElMessage.error("提交失败！");
            }
      }
};

//获取API接口
const adminGroupDetail = ref({});
//文章分类接口
const adminGroupIndexApi = async() => {
      if(routeValue.value == 'add'){
            return;
      }

      const getAdminGroupDetail = await adminGroupApi.getAdminGroupDetail({
            adminGroupId: routeValue.value,
      });
      adminGroupDetail.value = getAdminGroupDetail.data;
      name.value = adminGroupDetail.value.name || '';
      status.value = adminGroupDetail.value.status || '';
      description.value = adminGroupDetail.value.description || '';
      viewPower.value = adminGroupDetail.value.viewPower ? adminGroupDetail.value.viewPower.split(",") : [];
      editPower.value = adminGroupDetail.value.editPower ? adminGroupDetail.value.editPower.split(",") : [];
}

//加载接口
adminGroupIndexApi();
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="info-msg" @click.prevent="saveAdminGroup"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;管理员群组详情</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-row>
                                    <el-col :span="8">
                                          <el-form-item label="创建时间">
                                                <el-input disabled :value="formatCurrentDate()"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后编辑">
                                                <el-input disabled :value="adminGroupDetail.editTime ? formatDate(adminGroupDetail.editTime) : ''"/>
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
                                          <el-option :value="1" label="启用"/>
                                          <el-option :value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="简介" label-position="right">
                                    <el-input v-model="description" type="textarea" :rows="8"/>
                              </el-form-item>
                              <el-form-item label="查看权限" label-position="right">
                                    <el-checkbox-group v-model="viewPower">
                                          <el-checkbox v-for="power in powerList"
                                                :key="power.value"
                                                :label="power.value">
                                                {{ power.name }}
                                          </el-checkbox>
                                    </el-checkbox-group>
                              </el-form-item>
                              <el-form-item label="编辑权限" label-position="right">
                                    <el-checkbox-group v-model="editPower">
                                          <el-checkbox v-for="power in powerList"
                                                :key="power.value"
                                                :label="power.value">
                                                {{ power.name }}
                                          </el-checkbox>
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