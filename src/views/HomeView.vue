<script setup lang="ts">
import { useRouter } from 'vue-router'
import { resume } from '../data/resume'

const router = useRouter()

function openProject(slug: string, event: MouseEvent | KeyboardEvent) {
  if (event.target instanceof Element && event.target.closest('a, button')) return
  router.push(`/projects/${slug}`)
}
</script>

<template>
  <div class="home-page">
    <section id="about" class="hero section-wrap">
      <div class="hero-copy">
        <p class="eyebrow">个人履历 · PERSONAL PROFILE</p>
        <h1>{{ resume.name }}<span class="name-mark">.</span></h1>
        <p class="hero-title">{{ resume.title }} <span class="hero-title-note">· 具备前端联调与完整交付能力</span></p>
        <p class="hero-summary">{{ resume.summary }}</p>
        <div class="hero-actions">
          <RouterLink class="button button-primary" to="/#projects">查看项目 <span aria-hidden="true">↓</span></RouterLink>
          <a class="button button-quiet" :href="`mailto:${resume.email}`">联系我 <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <aside class="hero-meta" aria-label="基本信息">
        <div class="status-line"><span class="status-dot"></span>{{ resume.availability }}</div>
        <dl>
          <div><dt>教育</dt><dd>{{ resume.education.school }} · {{ resume.education.degree }}</dd></div>
          <div><dt>邮箱</dt><dd><a :href="`mailto:${resume.email}`">{{ resume.email }}</a></dd></div>
        </dl>
        <div class="hero-awards">
          <div class="hero-awards-heading"><span>竞赛荣誉与证书</span><small>RECOGNITION</small></div>
          <div v-for="award in resume.awards" :key="award.name" class="hero-award-row">
            <div><strong>{{ award.name }}</strong><span>{{ award.detail }}</span></div>
            <time>{{ award.year }}</time>
          </div>
        </div>
      </aside>
    </section>

    <section id="projects" class="section-wrap content-section project-section">
      <div class="section-heading section-heading-inline"><div><p class="eyebrow">01 · SELECTED WORK</p><h2>代表项目</h2></div><span class="section-count">{{ String(resume.projects.length).padStart(2, '0') }} 个项目</span></div>
      <div class="project-list">
        <article
          v-for="project in resume.projects"
          :key="project.slug"
          class="project-card"
          role="link"
          tabindex="0"
          :aria-label="`查看${project.name}详情`"
          @click="openProject(project.slug, $event)"
          @keydown.enter="openProject(project.slug, $event)"
        >
          <div class="project-visual"><div class="visual-top"><span></span><span></span><span></span><b>关键实现</b></div><div class="project-proof"><div v-for="highlight in project.highlights" :key="highlight"><strong>{{ highlight }}</strong></div></div></div>
          <div class="project-card-content"><div class="project-card-top"><span class="project-period">{{ project.period }}</span><span class="project-role">{{ project.role }}</span></div><div class="deployment-status"><span class="status-dot"></span>{{ project.deployment.status }}</div><h3>{{ project.name }}</h3><p>{{ project.summary }}</p><div class="project-metrics"><span v-for="item in project.proofPoints" :key="item.label"><strong>{{ item.value }}</strong>{{ item.label }}</span></div><div class="tag-list"><span v-for="tag in project.stack" :key="tag">{{ tag }}</span></div><div class="project-actions"><RouterLink class="text-link" :to="`/projects/${project.slug}`">查看项目详情 <span aria-hidden="true">↗</span></RouterLink><a v-for="link in project.links" :key="link.href" class="project-link" :class="{ placeholder: link.placeholder }" :href="link.href" target="_blank" rel="noreferrer">{{ link.label }} <span aria-hidden="true">↗</span></a></div></div>
        </article>
      </div>
    </section>

    <section class="section-wrap content-section skills-section">
      <div class="section-heading"><p class="eyebrow">02 · TOOLKIT</p><h2>技术能力</h2></div>
      <div class="skills-list">
        <article v-for="skill in resume.skills" :key="skill.group" class="skill-row"><h3>{{ skill.group }} <span class="skill-level">{{ skill.level }}</span></h3><p>{{ skill.items }}</p></article>
      </div>
    </section>

    <section id="education" class="section-wrap content-section">
      <div class="section-heading"><p class="eyebrow">03 · BACKGROUND</p><h2>教育背景</h2></div>
      <div class="education-row">
        <div><h3>{{ resume.education.school }} <span class="school-badge">{{ resume.education.badge }}</span></h3><p>{{ resume.education.degree }}</p></div>
        <div class="education-period">{{ resume.education.period }}<strong>{{ resume.education.ranking }}</strong></div>
        <div class="education-details"><p><strong>核心课程</strong> {{ resume.education.courses }}</p></div>
      </div>
    </section>

    <section id="contact" class="contact-band"><div class="section-wrap contact-inner"><div><p class="eyebrow">2027 CAMPUS RECRUITMENT</p><h2>正在寻找 Java 后端校招机会。</h2><div v-if="resume.socials.length" class="social-links"><a v-for="social in resume.socials" :key="social.href" :href="social.href" target="_blank" rel="noreferrer">{{ social.label }} <span aria-hidden="true">↗</span></a></div></div><a class="contact-email" :href="`mailto:${resume.email}`">{{ resume.email }} <span aria-hidden="true">↗</span></a></div></section>
  </div>
</template>
