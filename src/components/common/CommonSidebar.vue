<script setup>
// import { ref } from 'vue';

// 下拉导航列表
// const slNameStatus = ref(true);
const slNameHandleClick = (event) =>{
      const slNameClass = event.target.closest('.sl-name');
      if(slNameClass){
            console.log('点击的项目:', slNameClass.textContent)
      }
}
</script>

<template>
      <div class="sidebar">
            <div class="sidebar-title">
                  <ul>
                        <li><h2>管理员名称</h2></li>
                        <li><small>管理员群组名称</small></li>
                  </ul>
            </div>
            <ul class="sidebar-list" @click="slNameHandleClick">
                  <li>
                        <a href="/" class="aa">
                              <Odometer /><span>仪表盘</span>
                              <font-awesome-icon icon="fa-solid fa-angle-right" />
                        </a>
                  </li>
                  <li>
                        <a class="sl-name">
                              <Document /><span>文章管理</span><ArrowRight />
                        </a>
                        <ul class="sl-child">
                              <li><a href=""><span>文章列表</span><DArrowRight /></a></li>
                              <li><a href=""><span>文章分类列表</span><DArrowRight /></a></li>
                        </ul>
                  </li>
                  <li>
                        <a class="sl-name">
                              <Reading /><span>单页管理</span><ArrowRight />
                        </a>
                        <ul class="sl-child">
                              <li><a href=""><span>关于我</span><DArrowRight /></a></li>
                        </ul>
                  </li>
                  <li>
                        <a class="sl-name">
                              <Message /><span>信息管理</span><ArrowRight />
                        </a>
                        <ul class="sl-child">
                              <li><a href=""><span>我的新消息</span><DArrowRight /></a></li>
                        </ul>
                  </li>
                  <li>
                        <a class="sl-name">
                              <User /><span>会员管理</span><ArrowRight />
                        </a>
                        <ul class="sl-child">
                              <li><a href=""><span>会员列表</span><DArrowRight /></a></li>
                        </ul>
                  </li>
                  <li>
                        <a class="sl-name">
                              <Postcard /><span>管理员管理</span><ArrowRight />
                        </a>
                        <ul class="sl-child">
                              <li><a href=""><span>管理员列表</span><DArrowRight /></a></li>
                              <li><a href=""><span>管理员群组列表</span><DArrowRight /></a></li>
                        </ul>
                  </li>
                  <li>
                        <a class="sl-name">
                              <Setting /><span>系统管理</span><ArrowRight />
                        </a>
                        <ul class="sl-child">
                              <li><a href=""><span>网站设置</span><DArrowRight /></a></li>
                        </ul>
                  </li>
            </ul>
      </div>
</template>

<style scoped>
</style>