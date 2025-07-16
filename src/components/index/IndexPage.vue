<script setup>
import CommonHeader from '@/components/common/CommonHeader.vue'
import CommonSidebar from '@/components/common/CommonSidebar.vue'
import CommonBreadcrumb from '@/components/common/CommonBreadcrumb.vue'
import CommonFooter from '@/components/common/CommonFooter.vue';
</script>

<template>
      <CommonHeader />
      <CommonSidebar />

      <div class="content">
            <CommonBreadcrumb />

            <div class="statistics-number">
                  <div class="preview">
                        <div class="title">文章数量</div>
                        <div class="body"><Document class="preview-icon"/><span>99</span></div>
                        <div class="move"><a href="">查看更多</a></div>
                  </div>
                  <div class="preview">
                        <div class="title">消息数量</div>
                        <div class="body"><i class="fa fa-envelope"></i><span>99</span></div>
                        <div class="move"><a href="">查看更多</a></div>
                  </div>
                  <div class="preview">
                        <div class="title">会员数量</div>
                        <div class="body"><i class="fa fa-user"></i><span>99</span></div>
                        <div class="move"><a href="">查看更多</a></div>
                  </div>
                  <div class="preview">
                        <div class="title">管理员数量</div>
                        <div class="body"><i class="fa fa-vcard"></i><span>99</span></div>
                        <div class="move"><a href="">查看更多</a></div>
                  </div>
            </div>
            <div style="clear:both;"></div>
            <div class="index-panel-box">
                  <div class="index-panel">
                        <div class="panel-title">我的后台</div>	
                        <div id="panel-body">
                              <ul>
                                    <li>您好，管理员名称</li>
                                    <li>所属角色：管理员群组</li>
                              </ul>
                              <ul>
                                    <li>您上次登录时间为：2025-07-14</li>
                                    <li>IP地址：127.0.0.1</li>
                              </ul>
                              <ul>
                                    <li>您本次登录时间为：2025-07-14</li>
                                    <li>IP地址：127.0.0.1</li>
                              </ul>
                        </div>
                  </div>
            </div>
            <div class="chart-box">
                  <div class="chart">
                        <div class="chart-title">最近一周来访人数</div>	
                        <div id="cart-body"></div>
                  </div>
            </div>
            <div style="clear:both;"></div>
            <CommonFooter />
      </div>
</template>

<style scoped>
</style>