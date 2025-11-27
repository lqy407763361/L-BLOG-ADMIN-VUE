<script setup>
import { ref } from 'vue'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { formatDate } from '@/util/dateUtil'
import { pageTotal } from '@/util/pageTotal'
import { messageApi } from '@/api/messageApi'

//搜索
const searchTitle = ref('');
const searchUserName = ref('');
const searchIsRead = ref('');
const searchParams = ref({});
const clickSearch = () => {
      const params = {
            title: searchTitle.value,
            userName: searchUserName.value,
            isRead: searchIsRead.value,
      }
      searchParams.value = params;
      messageIndexApi(params);
}

//分页
const changePage = (page) => {
      const params = {
            page: page,
            title: searchParams.value.title,
            userName: searchParams.value.categoryId,
            isRead: searchParams.value.isRead,
      }
      messageIndexApi(params);
} 

//全选
const selectMessageId = ref([]);
const checkAll = (e) => {
      selectMessageId.value = e.target.checked ? messageList.value.list.map(item => item.id) : [];
}

//删除信息
const deleteMessage = async() => {
      if(selectMessageId.value.length == 0){
            alert("请选择要删除的信息！");
            return;
      }
      if(confirm("确定要删除选中的信息吗？")){
            try{
                  await messageApi.deleteMessage({
                        id: selectMessageId.value
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
const messageList = ref({});
//信息接口
const messageIndexApi = async(params={}) => {
      const getMessageList = await messageApi.getMessageList({
            page: params.page,
            title: params.title,
            userName: params.userName,
            isRead: params.isRead
      });
      messageList.value = getMessageList.data;
}
//加载接口
messageIndexApi();
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />
            <div class="operation-bar">
                  <router-link to="#" class="danger-msg" @click.prevent="deleteMessage"><font-awesome-icon icon="fa-solid fa-trash-can" /></router-link>
            </div>
            <div style="clear:both;"></div>
            <div class="content-box">
                  <div class="content-title"><font-awesome-icon icon="fa-solid fa-list" />&nbsp;信息列表</div>
                  <div class="content-body">
                        <div class="content-search">
                              <el-form :model="form" label-position="top">
                                    <el-row>
                                          <el-col :span="8">
                                                <el-form-item label="标题">
                                                      <el-input v-model="searchTitle" maxlength="20" show-word-limit="true" placeholder="标题"/>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                                <el-form-item label="发送人">
                                                      <el-input v-model="searchUserName" maxlength="20" show-word-limit="true" placeholder="发送人"/>
                                                </el-form-item>
                                          </el-col>
                                          <el-col :span="8">
                                                <el-form-item label="状态">
                                                      <el-select v-model="searchIsRead" placeholder="状态">
                                                            <el-option value="" label="全部"/>
                                                            <el-option value="1" label="已读"/>
                                                            <el-option value="2" label="未读"/>
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
                                          <td align="left"><span>标题</span></td>
                                          <td align="left">发送人</td>
                                          <td align="left"><span>状态</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="left"><span>时间</span>&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-caret-up" /></td>
                                          <td align="right">操作</td>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr v-for="message in messageList.list" 
                                          :key="message.id">
                                          <td align="center"><input type="checkbox" :value="message.id" v-model="selectMessageId"></td>
                                          <td align="left">{{ message.title }}</td>
                                          <td align="left">{{ message.userName }}</td>
                                          <td align="left"><span v-if="message.isRead == 1" style="color:green;">已读</span><span v-else style="color:red;">未读</span></td>
                                          <td align="left">{{ formatDate(message.addTime) }}</td>
                                          <td align="right"><router-link :to="`/message/${ message.id }`"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></router-link></td>
                                    </tr>
                                    <tr v-if="!messageList.list || messageList.list.length == 0"><td align="center" colspan="6" class="table-no-data">暂无数据...</td></tr>
                              </tbody>
                        </table>
                        <div class="page" v-if="pageTotal(messageList.total, messageList.size)>1">
                              <ul>
                                    <li v-for="page in pageTotal(messageList.total, messageList.size)" 
                                          :key="page"
                                          :class="{active: page==messageList.startPage}">
                                          <span v-if="page==messageList.startPage">{{ page }}</span>
                                          <router-link v-else :to="{path: '/message', query:{page: page}}" @click.prevent="changePage(page)">{{ page }}</router-link>
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