<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { formatDate } from '@/util/dateUtil'
import { pageTotal } from '@/util/pageTotal'
import { adminApi } from '@/api/adminApi'
import { adminGroupApi } from '@/api/adminGroupApi'

//搜索
const searchName = ref('');
const searchGroup = ref('');
const searchStatus = ref('');
const searchParams = ref({});
const clickSearch = () =>{
      const params = {
            name: searchName.value,
            groupId: searchGroup.value,
            status: searchStatus.value,
      }
      searchParams.value = params;
      adminIndexApi(params);
}

//分页
const changePage = (page) => {
      const params = {
            page: page,
            name: searchName.value,
            groupId: searchGroup.value,
            status: searchStatus.value,
      }
      adminIndexApi(params);
}

//全选
const selectAdminId = ref([]);
const checkAll = (e) => {
      selectAdminId.value = e.target.checked ? adminList.value.list.map(item => item.id) : [];
}

//删除管理员
const deleteAdmin = async() => {
      if(selectAdminId.value.length == 0){
            ElMessage.error('请选择要删除的管理员！');
            return;
      }
      if(confirm("确定要删除选中的管理员吗？")){
            try{
                  await adminApi.deleteAdmin({
                        id: selectAdminId.value
                  });
                  window.location.reload();
            }catch(error){
                  if(error.response.status == 500){
                        ElMessage.error('删除失败！');
                  }
            }
      }
}

//获取API接口
const adminList = ref({});
const adminGroupList = ref({});
//管理员接口
const adminIndexApi = async(params={}) => {
      const getAdminList = await adminApi.getAdminList({
            page: params.page,
            name: params.name,
            groupId: params.groupId,
            status: params.status
      });
      adminList.value = getAdminList.data;
}
//管理员群组接口
const adminGroupIndexApi = async() => {
      const getAdminGroupList = await adminGroupApi.getAdminGroupList();
      adminGroupList.value = getAdminGroupList.data;
}
//加载接口
adminIndexApi();
adminGroupIndexApi();
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="/admin/add" class="info-msg"><font-awesome-icon icon="fa-solid fa-plus" /></router-link>
                  <router-link to="#" class="danger-msg" @click.prevent="deleteAdmin"><font-awesome-icon icon="fa-solid fa-trash-can" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-list" />&nbsp;管理员列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-form :model="form" label-position="top">
                                    <el-row>
                                          <el-col :span="8">
                                                <el-form-item label="管理员名称">
                                                      <el-input v-model="searchName" maxlength="20" show-word-limit="true" placeholder="管理员名称"/>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                                <el-form-item label="管理员群组">
                                                      <el-select v-model="searchGroup" placeholder="管理员群组">
                                                            <el-option value="" label="全部"/>
                                                            <el-option v-for="adminGroup in adminGroupList.list" 
                                                                  :key="adminGroup.id" 
                                                                  :value="adminGroup.id" 
                                                                  :label="adminGroup.name"/>
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
                                          <td align="left"><span>账号</span></td>
                                          <td align="left">名称</td>
                                          <td align="left">群组名称</td>
                                          <td align="left"><span>状态</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="left"><span>创建时间</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="right">操作</td>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr v-for="admin in adminList.list" 
                                          :key="admin.id">
                                          <td align="center"><input type="checkbox" :value="admin.id" v-model="selectAdminId"></td>
                                          <td align="left">{{ admin.account }}</td>
                                          <td align="left">{{ admin.name }}</td>
                                          <td align="left">{{ admin.groupName }}</td>
                                          <td align="left"><span v-if="admin.status == 1" style="color:green;">启用</span><span v-else style="color:red;">禁用</span></td>
                                          <td align="left">{{ formatDate(admin.addTime) }}</td>
                                          <td align="right"><router-link :to="`/admin/${ admin.id }`"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
                                    </tr>
                                    <tr v-if="!adminList.list || adminList.list.length == 0"><td align="center" colspan="6" class="table-no-data">暂无数据...</td></tr>
                              </tbody>
                        </table>
                        <div class="page" v-if="pageTotal(adminList.total, adminList.size)>1">
                              <ul>
                                    <li v-for="page in pageTotal(adminList.total, adminList.size)" 
                                          :key="page"
                                          :class="{active: page==adminList.startPage}">
                                          <span v-if="page==adminList.startPage">{{ page }}</span>
                                          <router-link v-else :to="{path: '/admin', query:{page: page}}" @click.prevent="changePage(page)">{{ page }}</router-link>
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