<script setup>
import { ref } from 'vue'
import useECharts from '@/assets/js/useECharts.js'
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue'
import { articleApi } from '@/api/articleApi'
import { messageApi } from '@/api/messageApi'
import { userApi } from '@/api/userApi'
import { adminApi } from '@/api/adminApi'
import { formatDate } from '@/util/dateUtil'
import { dateRangeApi } from '@/api/dateRangeApi'

//获取API接口
const articleTotal = ref(0);
const messageTotal = ref(0);
const userTotal = ref(0);
const adminTotal = ref(0);
const adminDetail = ref('');
const lastWeekVisitsList = ref({});
const indexPageApi = async() => {
      //获取文章数量
      const getArticleTotal = await articleApi.getArticleTotal();
      articleTotal.value = getArticleTotal.data;
      //获取消息数量
      const getMessageTotal = await messageApi.getMessageTotal();
      messageTotal.value = getMessageTotal.data;
      //获取用户数量
      const getUserTotal = await userApi.getUserTotal();
      userTotal.value = getUserTotal.data;
      //获取管理员数量
      const getAdminTotal = await adminApi.getAdminTotal();
      adminTotal.value = getAdminTotal.data;
      //获取管理员详情
      const getAdminDetail = await adminApi.getAdminDetail();
      adminDetail.value = getAdminDetail.data;
      //获取最近一周的访问人次列表
      const getLastWeekVisitsList = await dateRangeApi.getLastWeekVisitsList();
      lastWeekVisitsList.value = getLastWeekVisitsList.data;
}
indexPageApi();

//图表配置
const echartsData = ref({
      title: {},
      tooltip: {},
      xAxis: {
            data: lastWeekVisitsList.value.weekList
      },
      yAxis: {},
      series: [{
            name: '访问人数',
            type: 'bar',
            data: lastWeekVisitsList.value.visitList,
            itemStyle: {  
                  normal:{color:'#ab78ba'}  
            }  
      }]
});
const { chartBody } = useECharts(echartsData);
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />

            <div class="statistics-number">
                  <div class="preview">
                        <div class="title">文章数量</div>
                        <div class="body"><font-awesome-icon icon="fa-solid fa-newspaper" class="preview-icon"/><span>{{ articleTotal }}</span></div>
                        <div class="move"><a href="">查看更多</a></div>
                  </div>
                  <div class="preview">
                        <div class="title">消息数量</div>
                        <div class="body"><font-awesome-icon icon="fa-solid fa-envelope" class="preview-icon"/><span>{{ messageTotal }}</span></div>
                        <div class="move"><a href="">查看更多</a></div>
                  </div>
                  <div class="preview">
                        <div class="title">会员数量</div>
                        <div class="body"><font-awesome-icon icon="fa-solid fa-user" class="preview-icon"/><span>{{ userTotal }}</span></div>
                        <div class="move"><a href="">查看更多</a></div>
                  </div>
                  <div class="preview">
                        <div class="title">管理员数量</div>
                        <div class="body"><font-awesome-icon icon="fa-solid fa-id-card" class="preview-icon"/><span>{{ adminTotal }}</span></div>
                        <div class="move"><a href="">查看更多</a></div>
                  </div>
            </div>
            <div style="clear:both;"></div>
            <div class="index-panel-box">
                  <div class="index-panel">
                        <div class="panel-title">我的后台</div>	
                        <div class="panel-body">
                              <ul>
                                    <li>您好，{{ adminDetail.name }}</li>
                                    <li>所属角色：{{ adminDetail.groupName }}</li>
                              </ul>
                              <ul>
                                    <li>您上次登录时间为：{{ formatDate(adminDetail.prevLoginTime) }}</li>
                                    <li>IP地址：{{ adminDetail.prevLoginIp }}</li>
                              </ul>
                              <ul>
                                    <li>您本次登录时间为：{{ formatDate(adminDetail.lastLoginTime) }}</li>
                                    <li>IP地址：{{ adminDetail.lastLoginIp }}</li>
                              </ul>
                        </div>
                  </div>
            </div>
            <div class="chart-box">
                  <div class="chart">
                        <div class="chart-title">最近一周来访人数</div>	
                        <div class="chart-body" ref="chartBody"></div>
                  </div>
            </div>
            <div style="clear:both;"></div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>