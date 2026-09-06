<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getProject } from '../data/resume'

const route = useRoute()
const project = computed(() => getProject(String(route.params.slug)))
const demoLink = computed(() => project.value?.links.find((link) => link.kind === 'demo' && !link.placeholder))
</script>

<template>
  <div v-if="project" class="project-detail page-wrap">
    <RouterLink to="/#projects" class="back-link"><span aria-hidden="true">←</span> 返回项目列表</RouterLink>

    <section class="detail-hero">
      <p class="eyebrow">SELECTED PROJECT · {{ project.period }}</p>
      <h1>{{ project.name }}</h1>
      <p class="detail-role">{{ project.role }}</p>
      <p class="detail-summary">{{ project.summary }}</p>
      <div class="tag-list tag-list-large"><span v-for="tag in project.stack" :key="tag">{{ tag }}</span></div>
    </section>

    <section v-if="project.screenshots.length" class="screenshot-section">
      <div class="section-heading section-heading-inline">
        <div><p class="eyebrow">PRODUCT SCREENS</p><h2>系统界面</h2></div>
        <span class="section-count">{{ project.screenshots.length }} 张实机截图</span>
      </div>
      <div class="screenshot-grid">
        <figure v-for="screenshot in project.screenshots" :key="screenshot.src">
          <a :href="screenshot.src" target="_blank" rel="noreferrer"><img :src="screenshot.src" :alt="screenshot.alt" loading="lazy"></a>
          <figcaption>{{ screenshot.caption }}</figcaption>
        </figure>
      </div>
    </section>

    <section v-if="demoLink" class="live-preview">
      <div class="section-heading section-heading-inline">
        <div><p class="eyebrow">LIVE DEMO</p><h2>项目实机预览</h2></div>
      </div>
      <a class="demo-launch" :href="demoLink.href" target="_blank" rel="noreferrer">
        <span class="demo-launch-main">
          <strong>在新窗口打开演示</strong>
          <small>{{ demoLink.href }}</small>
        </span>
        <span class="demo-launch-arrow" aria-hidden="true">↗</span>
      </a>
      <p class="preview-note">演示部署在独立服务器，点击按钮在新标签页打开完整项目。</p>
    </section>

    <section v-if="project.architecture" class="architecture-section">
      <div class="section-heading">
        <p class="eyebrow">MESSAGE FLOW</p>
        <div><h2>异步消息链路</h2><p>{{ project.architecture.description }}</p></div>
      </div>
      <div class="flow-track" aria-label="主消息链路">
        <template v-for="(step, index) in project.architecture.steps" :key="step.name">
          <article><span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ step.name }}</strong><p>{{ step.detail }}</p></article>
          <span v-if="index < project.architecture.steps.length - 1" class="flow-arrow" aria-hidden="true">→</span>
        </template>
      </div>
      <div class="retry-track">
        <span class="retry-label">失败分支</span>
        <template v-for="(step, index) in project.architecture.retry" :key="step.name">
          <article><strong>{{ step.name }}</strong><p>{{ step.detail }}</p></article>
          <span v-if="index < project.architecture.retry.length - 1" class="flow-arrow" aria-hidden="true">→</span>
        </template>
      </div>
    </section>

    <div class="detail-grid">
      <aside class="detail-aside">
        <div class="detail-stat"><span>项目类型</span><strong>个人项目</strong></div>
        <div class="detail-stat"><span>部署方式</span><strong>{{ project.deployment.method }}</strong></div>
        <div class="detail-stat"><span>运行状态</span><strong>{{ project.deployment.status }}</strong></div>
        <div v-if="project.links.length" class="detail-links"><a v-for="link in project.links" :key="link.href" :class="{ placeholder: link.placeholder }" :href="link.href" target="_blank" rel="noreferrer">{{ link.label }} <span aria-hidden="true">↗</span></a></div>
      </aside>

      <div class="detail-content">
        <section>
          <p class="eyebrow">BACKGROUND & ROLE</p>
          <h2>项目背景与个人职责</h2>
          <p>{{ project.overview }}</p>
          <ul class="detail-list"><li v-for="item in project.responsibilities" :key="item">{{ item }}</li></ul>
        </section>

        <section>
          <p class="eyebrow">DEPLOYMENT</p>
          <h2>容器化交付</h2>
          <p>{{ project.deployment.build }}</p>
          <div class="deployment-grid"><article v-for="service in project.deployment.services" :key="service.name"><span>{{ service.name }}</span><strong>{{ service.image }}</strong><p>{{ service.purpose }}</p></article></div>
        </section>
      </div>
    </div>
  </div>

  <div v-else class="not-found page-wrap">
    <p class="eyebrow">404 · PROJECT NOT FOUND</p>
    <h1>这个项目暂时不存在。</h1>
    <RouterLink class="text-link" to="/">返回首页 <span aria-hidden="true">↗</span></RouterLink>
  </div>
</template>
