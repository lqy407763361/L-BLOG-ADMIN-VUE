<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { formatDate } from '@/util/dateUtil'
import { pageTotal } from '@/util/pageTotal'
import { adminGroupApi } from '@/api/adminGroupApi'

//搜索
const searchName = ref('');
const searchStatus = ref('');
const searchParams = ref({});
const clickSearch = () =>{
      const params = {
            name: searchName.value,
            status: searchStatus.value,
      }
      searchParams.value = params;
      adminGroupIndexApi(params);
}

//分页
const changePage = (page) => {
      const params = {
            page: page,
            name: searchParams.value.name,
            groupId: searchParams.value.groupId,
            status: searchParams.value.status,
      }
      adminGroupIndexApi(params);
}

//全选
const selectAdminGroupId = ref([]);
const checkAll = (e) => {
      selectAdminGroupId.value = e.target.checked ? adminGroupList.value.list.map(item => item.id) : [];
}

//删除文章
const deleteAdminGroup = async() => {
      if(selectAdminGroupId.value.length == 0){
            alert("请选择要删除的管理员群组！");
            return;
      }
      if(confirm("确定要删除选中的管理员群组吗？")){
            try{
                  await adminGroupApi.deleteAdminGroup({
                        id: selectAdminGroupId.value
                  });
                  window.location.reload();
            }catch(error){
                  if(error.response.status == 500){
                        alert("删除失败！");
                  }
            }
      }
}

//获取API接口
const adminGroupList = ref({});
//管理员群组接口
const adminGroupIndexApi = async(params={}) => {
      const getAdminGroupList = await adminGroupApi.getAdminGroupList({
            page: params.page,
            name: params.name,
            status: params.status
      });
      adminGroupList.value = getAdminGroupList.data;
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
                  <router-link to="/adminGroup/add" class="info-msg"><font-awesome-icon icon="fa-solid fa-plus" /></router-link>
                  <router-link to="#" class="danger-msg" @click.prevent="deleteAdminGroup"><font-awesome-icon icon="fa-solid fa-trash-can" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-list" />&nbsp;管理员群组列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-form :model="form" label-position="top">
                                    <el-row>
                                          <el-col :span="8">
                                                <el-form-item label="群组名称">
                                                      <el-input v-model="searchName" maxlength="20" show-word-limit="true" placeholder="群组名称"/>
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
                                          <td align="left"><span>群组名称</span></td>
                                          <td align="left"><span>状态</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="left"><span>创建时间</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="right">操作</td>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr v-for="adminGroup in adminGroupList.list"
                                          :key="adminGroup.id">
                                          <td align="center"><input type="checkbox" :value="adminGroup.id" v-model="selectAdminGroupId"></td>
                                          <td align="left">{{ adminGroup.name }}</td>
                                          <td align="left"><span v-if="adminGroup.status == 1" style="color:green;">启用</span><span v-else style="color:red;">禁用</span></td>
                                          <td align="left">{{ formatDate(adminGroup.addTime) }}</td>
                                          <td align="right"><router-link :to="`/adminGroup/${adminGroup.id}`"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
                                    </tr>
                                    <tr v-if="!adminGroupList.list || adminGroupList.list.length == 0"><td align="center" colspan="6" class="table-no-data">暂无数据...</td></tr>
                              </tbody>
                        </table>
                        <div class="page" v-if="pageTotal(adminGroupList.total, adminGroupList.size)>1">
                              <ul>
                                    <li v-for="page in pageTotal(adminGroupList.total, adminGroupList.size)"
                                          :key="page"
                                          :class="{active: page==adminGroupList.startPage}">
                                          <span v-if="page==adminGroupList.startPage">{{ page }}</span>
                                          <router-link v-else :to="{path: '/adminGroup', query:{page: page}}" @click.prevent="changePage(page)">{{ page }}</router-link>
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