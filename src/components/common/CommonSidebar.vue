<script setup>
</script>

<template>
      <div class="sidebar">
            <div class="sidebar-title">
                  <ul>
                        <li><h2>管理员名称</h2></li>
                        <li><i class="fa fa-user"></i><small>管理员群组名称</small></li>
                  </ul>
            </div>
            <ul class="sidebar-list">
                  <li><a href=""><i class="fa fa-dashboard"></i><span>仪表盘</span></a></li>
                  <li id="sidebar-show">
                        <a class="sl-name-down"><i class="fa fa-files-o"></i><span>文章管理</span></a>
                        <ArrowRight class="ArrowRight" style="color:#fff;width:12px;height:12px;"/>
                        <ul class="sidebar-list-child">
                              <li><a href=""><span>文章列表</span></a></li>
                              <li><a href=""><span>文章分类列表</span></a></li>
                        </ul>
                  </li>
                  <li><a class="sl-name"><i class="fa fa-envelope"></i><span>单页管理</span></a>
                        <ul class="sidebar-list-child">
                              <li><a href=""><span>关于我</span></a></li>
                        </ul>
                  </li>
                  <li><a class="sl-name"><i class="fa fa-envelope"></i><span>信息管理</span></a>
                        <ul class="sidebar-list-child">
                              <li><a href=""><span>我的新消息</span></a></li>
                        </ul>
                  </li>
                  <li><a class="sl-name"><i class="fa fa-user"></i><span>会员管理</span></a>
                        <ul class="sidebar-list-child">
                              <li><a href=""><span>会员列表</span></a></li>
                        </ul>
                  </li>
                  <li><a class="sl-name"><i class="fa fa-vcard"></i><span>管理员管理</span></a>
                        <ul class="sidebar-list-child">
                              <li><a href=""><span>管理员列表</span></a></li>
                              <li><a href=""><span>管理员群组列表</span></a></li>
                        </ul>
                  </li>
                  <li><a class="sl-name"><i class="fa fa-cogs"></i><span>系统管理</span></a>
                        <ul class="sidebar-list-child">
                              <li><a href=""><span>网站设置</span></a></li>
                        </ul>
                  </li>
            </ul>
      </div>
</template>

<style scoped>
</style>