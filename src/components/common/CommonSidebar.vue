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
                        <router-link to="/" replace>
                              <Odometer /><span>仪表盘</span>
                        </router-link>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" active-class="active-link">
                              <Document /><span>文章管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child">
                              <li><router-link to="/"><span>文章列表</span><DArrowRight /></router-link></li>
                              <li><router-link to="/"><span>文章分类列表</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" active-class="active-link">
                              <Reading /><span>单页管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child">
                              <li><router-link to="/"><span>关于我</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" active-class="active-link">
                              <Message /><span>信息管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child">
                              <li><router-link to="/"><span>我的新消息</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" active-class="active-link">
                              <User /><span>会员管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child">
                              <li><router-link to="/"><span>会员列表</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" active-class="active-link">
                              <Postcard /><span>管理员管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child">
                              <li><router-link to="/"><span>管理员列表</span><DArrowRight /></router-link></li>
                              <li><router-link to="/"><span>管理员群组列表</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
                  <li>
                        <router-link to="/" class="sl-name" active-class="active-link">
                              <Setting /><span>系统管理</span><ArrowRight />
                        </router-link>
                        <ul class="sl-child">
                              <li><router-link to="/"><span>网站设置</span><DArrowRight /></router-link></li>
                        </ul>
                  </li>
            </ul>
      </div>
</template>

<style scoped>
</style>