<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { resume } from './data/resume'

const route = useRoute()
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-inner">
        <RouterLink to="/" class="wordmark" aria-label="返回首页">王之彦<span> · </span>简历</RouterLink>
        <nav class="site-nav" aria-label="主导航">
          <RouterLink to="/#about" :class="{ active: route.path === '/' && route.hash === '#about' }">关于我</RouterLink>
          <RouterLink to="/#education">教育</RouterLink>
          <RouterLink to="/#projects">项目</RouterLink>
          <RouterLink to="/#contact">联系</RouterLink>
        </nav>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }} {{ resume.name }}</span>
      <span>持续学习，持续交付。</span>
    </footer>
  </div>
</template>
