<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { authStore } from '@/util/authUtil'
import { formatCurrentDate, formatDate } from '@/util/dateUtil'
import { adminApi } from '@/api/adminApi'
import { adminGroupApi } from '@/api/adminGroupApi'

const account = ref('');
const name = ref('');
const password = ref('');
const confirmPassword = ref('');
const status = ref('');
const groupId = ref('');
const description = ref('');

//判断提交属性为新增还是编辑
const route = useRoute();
const routeValue = computed(() => route.params.id);

//提交表单
const saveAdmin = async () => {
      if((password.value != "") || (confirmPassword.value != "")){
            if(password.value != confirmPassword.value){
                  ElMessage.error('密码不一致！');
                  return false;
            } 
      }
      if(account.value == ""){
            ElMessage.error('账号不能为空！');
            return false;
      }
      if(name.value == ""){
            ElMessage.error('名称不能为空！');
            return false;
      }
      if(groupId.value == ""){
            ElMessage.error('管理员群组不能为空！');
            return false;
      }


      try{
            const formData = {
                  account: account.value,
                  name: name.value,
                  password: password.value,
                  status: status.value,
                  groupId: groupId.value,
                  description: description.value,
            }
            if(routeValue.value == 'add'){
                  //添加时密码必填
                  if(password.value == ""){
                        ElMessage.error('密码不能为空！');
                        return false;
                  }

                  await adminApi.addAdmin(formData);
                  ElMessage.success('提交成功！');
                  router.push('/admin');
            }else{
                  formData.id = routeValue.value;
                  await adminApi.editAdminByAdmin(formData);
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
const adminDetail = ref({});
const adminGroupList = ref({});
const authStoreInstance = authStore();
//管理员接口
const adminIndexApi = async () => {
      if(routeValue.value == 'add'){
            return;
      }
      
      const getAdminDetail = await adminApi.getAdminDetailByAdmin({
            adminId: routeValue.value,
      });
      adminDetail.value = getAdminDetail.data;
      account.value = adminDetail.value.account || '';
      name.value = adminDetail.value.name || '';
      password.value = adminDetail.value.password || '';
      status.value = adminDetail.value.status || '';
      groupId.value = adminDetail.value.groupId || '';
      description.value = adminDetail.value.description || '';
}
//管理员群组接口
const adminGroupIndexApi = async () => {
      const getAdminGroupList = await adminGroupApi.getAdminGroupList();
      adminGroupList.value = getAdminGroupList.data;
}

//组件加载完成后再加载接口
onMounted(async () =>{
      //判断是否登录
      if(!authStoreInstance.isLoggedIn()){
            router.push('/login');
      }

      //加载接口
      await adminIndexApi();
      await adminGroupIndexApi();
});
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="info-msg" @click.prevent="saveAdmin"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;管理员列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-row>
                                    <el-col :span="8">
                                          <el-form-item label="添加时间">
                                                <el-input disabled :value="adminDetail.addTime ? formatDate(adminDetail.addTime) : formatCurrentDate()"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后编辑时间">
                                                <el-input disabled :value="adminDetail.editTime ? formatDate(adminDetail.editTime) : ''"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后登录时间">
                                                <el-input disabled :value="adminDetail.lastLoginTime ? formatDate(adminDetail.lastLoginTime) : ''"/>
                                          </el-form-item>
                                    </el-col>
                              </el-row>
                              <div style="clear:both;"></div>
                        </div>
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="账号" label-position="right">
                                    <el-input v-model="account"/>
                              </el-form-item>
                              <el-form-item label="名称" label-position="right">
                                    <el-input v-model="name"/>
                              </el-form-item>
                              <el-form-item label="密码" label-position="right">
                                    <el-input v-model="password" type="password" show-password autocomplete="new-password"/>
                              </el-form-item>
                              <el-form-item label="确认密码" label-position="right">
                                    <el-input v-model="confirmPassword" type="password" show-password/>
                              </el-form-item>
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option :value="1" label="启用"/>
                                          <el-option :value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="所属群组" label-position="right">
                                    <el-select v-model="groupId" placeholder="管理员群组">
                                          <el-option v-for="adminGroup in adminGroupList.list"
                                                :key="adminGroup.id" 
                                                :value="adminGroup.id" 
                                                :label="adminGroup.name"/>
                                    </el-select>
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