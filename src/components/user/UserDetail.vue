<script setup>
import { ref, computed } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { useRoute } from 'vue-router'
import { formatDate } from '@/util/dateUtil'
import { userApi } from '@/api/userApi'

const name = ref('');
const status = ref('');
const registerType = ref('');
const registerIp = ref('');
const visitIp = ref('');
const registerTypeName = computed(() => {
      const map = {
            '1': '网页注册',
      }

      return map[registerType.value] || '未知';
});

//获取用户ID
const route = useRoute();
const routeValue = computed(() => route.params.id);

//提交表单
const saveUser = async() => {
      try{
            const formData = {
                  userId: routeValue.value,
                  status: status.value,
            }
            formData.id = routeValue.value;
            await userApi.editUser(formData);
            alert("提交成功！");
            location.reload();
      }catch(error){
            if(error.response.status == 500){
                  alert("提交失败！");
            }
      }
};

//获取API接口
const userDetail = ref({});
//用户接口
const userIndexApi = async() => {
      const getUserDetailByAdmin = await userApi.getUserDetailByAdmin({
            userId: routeValue.value,
      });
      userDetail.value = getUserDetailByAdmin.data;
      name.value = userDetail.value.name || '';
      status.value = userDetail.value.status || '';
      registerType.value = userDetail.value.registerType || '';
      registerIp.value = userDetail.value.registerIp || '';
      visitIp.value = userDetail.value.visitIp || '';
}

//加载接口
userIndexApi();
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="info-msg" @click.prevent="saveUser"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-pencil" />&nbsp;会员详情</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-row>
                                    <el-col :span="8">
                                          <el-form-item label="注册时间">
                                                <el-input disabled :value="userDetail.addTime ? formatDate(userDetail.addTime) : ''"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="最后登录时间">
                                                <el-input disabled :value="userDetail.visitTime ? formatDate(userDetail.visitTime) : ''"/>
                                          </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                          <el-form-item label="编辑时间">
                                                <el-input disabled :value="userDetail.editTime ? formatDate(userDetail.editTime) : ''"/>
                                          </el-form-item>
                                    </el-col>
                              </el-row>
                              <div style="clear:both;"></div>
                        </div>
                        <el-form :model="form" label-position="auto" class="content-form">
                              <el-form-item label="会员账号" label-position="right">
                                    <el-input v-model="name" disabled/>
                              </el-form-item>
                              <el-form-item label="状态" label-position="right">
                                    <el-select v-model="status" placeholder="状态">
                                          <el-option value="1" label="启用"/>
                                          <el-option value="2" label="禁用"/>
                                    </el-select>
                              </el-form-item>
                              <el-form-item label="注册方式" label-position="right">
                                    <el-input v-model="registerTypeName" disabled/>
                              </el-form-item>
                              <el-form-item label="注册地IP" label-position="right">
                                    <el-input v-model="registerIp" disabled/>
                              </el-form-item>
                              <el-form-item label="最后登录IP" label-position="right">
                                    <el-input v-model="visitIp" disabled/>
                              </el-form-item>
                        </el-form>
                  </div>
            </div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>