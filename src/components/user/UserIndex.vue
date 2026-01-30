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
import { userApi } from '@/api/userApi'

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
      userIndexApi(params);
}

//分页
const changePage = (page) => {
      const params = {
            page: page,
            name: searchParams.value.name,
            status: searchParams.value.status,
      }
      userIndexApi(params);
}

//全选
const selectUserId = ref([]);
const checkAll = (e) => {
      selectUserId.value = e.target.checked ? userList.value.list.map(item => item.id) : [];
}

//删除用户
const deleteUser = async () => {
      if(selectUserId.value.length == 0){
            ElMessage.error('请选择要删除的用户！');
            return;
      }
      if(confirm("确定要删除选中的用户吗？")){
            try{
                  await userApi.deleteUser({
                        id: selectUserId.value
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
const userList = ref({});
const authStoreInstance = authStore();

//文章接口
const userIndexApi = async (params={}) => {
      const getUserList = await userApi.getUserList({
            page: params.page,
            name: params.name,
            status: params.status
      });
      userList.value = getUserList.data;
}

//组件加载完成后再加载接口
onMounted(async () =>{
      //判断是否登录
      if(!authStoreInstance.isLoggedIn()){
            router.push('/login');
      }

      //加载接口
      await userIndexApi();
});
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="danger-msg" @click.prevent="deleteUser"><font-awesome-icon icon="fa-solid fa-trash-can" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-list" />&nbsp;会员列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-form :model="form" label-position="top">
                                    <el-row>
                                          <el-col :span="8">
                                                <el-form-item label="会员账号">
                                                      <el-input v-model="searchName" maxlength="20" show-word-limit="true" placeholder="会员账号"/>
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
                                    <el-button type="primary" @click="clickSearch"><Search />&nbsp;搜索</el-button>
                              </el-form>
                        </div>
                        <table class="table table-bordered table-hover">
                              <thead>
                                    <tr>
                                          <td align="center"><input type="checkbox" @change="checkAll"></td>
                                          <td align="left"><span>会员账号</span></td>
                                          <td align="left"><span>状态</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="left"><span>注册时间</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="left"><span>最后登录时间</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="right">操作</td>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr v-for="user in userList.list" 
                                          :key="user.id">
                                          <td align="center"><input type="checkbox" :value="user.id" v-model="selectUserId"></td>
                                          <td align="left">{{ user.name }}</td>
                                          <td align="left"><span v-if="user.status == 1" style="color:green;">启用</span><span v-else style="color:red;">禁用</span></td>
                                          <td align="left">{{ formatDate(user.addTime) }}</td>
                                          <td align="left">{{ formatDate(user.visitTime) }}</td>
                                          <td align="right"><router-link :to="`/user/${ user.id }`"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
                                    </tr>
                                    <tr v-if="!userList.list || userList.list.length == 0"><td align="center" colspan="6" class="table-no-data">暂无数据...</td></tr>
                              </tbody>
                        </table>
                        <div class="page" v-if="pageTotal(userList.total, userList.size)>1">
                              <ul>
                                    <li v-for="page in pageTotal(userList.total, userList.size)" 
                                          :key="page"
                                          :class="{active: page==userList.startPage}">
                                          <span v-if="page==userList.startPage">{{ page }}</span>
                                          <router-link v-else :to="{path: '/user', query:{page: page}}" @click.prevent="changePage(page)">{{ page }}</router-link>
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