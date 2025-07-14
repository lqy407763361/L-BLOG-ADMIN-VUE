<script setup>
</script>

<template>
      <header>
            <h1><a href="">L-BLOG</a></h1>
            <ul class="nav">
                  <li class="dropdown"><a><span class="danger-msg"></span><i class="fa fa-bell"></i></a>
                        <ul id="dropdown-menu">
                              <li class="dropdown-header">消息</li>
                              <li><a href="">新消息 <span class="warning-msg"></span></a></li>
                              <li><a href="">所有消息 <span class="info-msg"></span></a></li>
                              <li class="divider"></li>
                              <li class="dropdown-header">会员</li>
                              <li><a href="">新会员 <span class="warning-msg"></span></a></li>
                              <li><a href="">注册会员 <span class="info-msg"></span></a></li>
                        </ul>
                  </li>
                  <li><a href="" target="_blank"><i class="fa fa-home"></i></a></li>
                  <li><a href="">退出登录&nbsp;<i class="fa fa-sign-out"></i></a></li>
            </ul>
            <div style="clear:both;"></div>
      </header>



      <div class="sidebar">
            <div class="sidebar-title">
                  <ul>
                        <li><h2>管理员名称</h2></li>
                        <li><i class="fa fa-user"></i><small>管理员群组名称</small></li>
                  </ul>
            </div>
            <ul class="sidebar-list">
                  <li><a href=""><i class="fa fa-dashboard"></i><span>仪表盘</span></a></li>
                  <li id="sidebar-show"><a class="sl-name-down"><i class="fa fa-files-o"></i><span>文章管理</span></a>
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



      <div class="content">
            <h2>L-BLOG</h2>
            <ul class="breadcrumb">
                  <li><a href="">L-BLOG</a></li>
                  <li><a href="">后台管理系统</a></li>
            </ul>

            <div class="statistics-number">
                  <div class="preview">
                        <div class="title">文章数量</div>
                        <div class="body"><i class="fa fa-book"></i><span>99</span></div>
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
      </div>



      <div class="footer"><a href="">L-BLOG</a> 2017-2025 Powered by L-WEB</div>
      <input type="hidden" value="author:lqy407763361|project:L-WEB/L-BLOG">
      <!--msg-popup-->
      <!-- <div id="msg-popup">
            <div class="msg-frame">
                  <div class="msg-popup-title">提示信息</div>
                  <div class="msg-popup-content"></div>
                  <div class="msg-popup-button">
                        <a>知道了</a>
                  </div>
            </div>
      </div> -->
      <!--msg-confirm-->
      <!-- <div id="msg-confirm">
            <div class="msg-frame">
                  <div class="msg-confirm-title">提示信息</div>
                  <div class="msg-confirm-content">操作后不可恢复！</div>
                  <div class="msg-confirm-button">
                        <p id="confirm-button"><a>确认</a></p>
                        <p id="cancel-button"><a>取消</a></p>
                  </div>
            </div>
      </div> -->
      <!--loading-->
      <!-- <img src="" class="loading-image fade"> -->
</template>

<style scoped>
</style>