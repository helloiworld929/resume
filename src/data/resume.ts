const demoUrls = {
  yuyue: import.meta.env.VITE_YUYUE_DEMO_URL || 'http://139.196.9.188:8088/',
  notifyflow: import.meta.env.VITE_NOTIFYFLOW_DEMO_URL || 'http://139.196.9.188:8089/tasks',
}

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export type Project = {
  slug: string
  name: string
  period: string
  role: string
  summary: string
  stack: string[]
  highlights: string[]
  proofPoints: { value: string; label: string }[]
  overview: string
  responsibilities: string[]
  deployment: {
    method: string
    status: string
    build: string
    services: { name: string; image: string; purpose: string }[]
  }
  architecture?: {
    description: string
    steps: { name: string; detail: string }[]
    retry: { name: string; detail: string }[]
  }
  screenshots: { src: string; alt: string; caption: string }[]
  tradeoffs: { question: string; decision: string; reason: string; validation: string }[]
  links: { label: string; href: string; kind: 'demo' | 'repo'; placeholder?: boolean }[]
}

export const resume = {
  name: '王之彦',
  title: 'Java 后端开发工程师 · 2027 届校招',
  availability: '2027 届 · 准大四 · 校招求职中',
  email: '1092011470@qq.com',
  phone: '18834521810',
  socials: [{ label: 'GitHub', href: 'https://github.com/helloiworld929' }],
  education: {
    school: '山西大学',
    degree: '软件工程 · 本科',
    period: '2023.09 - 2027.06（预计）',
    badge: '双一流',
    ranking: '绩点排名：前 20%',
    courses: '数据结构与算法、数据库系统、操作系统、计算机组成原理',
  },
  summary: '软件工程本科在读，目前准大四，关注后端系统的业务建模、单库并发一致性与异步消息可靠性。能够使用 Java / Spring Boot 完成从接口设计、数据存储到容器部署的完整闭环，也具备 Vue 前端页面构建与联调经验。',
  skills: [
    { group: 'Java / Spring', level: '熟悉', items: 'REST API、事务管理、拦截器鉴权、参数校验与全局异常处理' },
    { group: 'Spring Cloud', level: '了解', items: '微服务注册发现、配置中心、网关等基本概念' },
    { group: 'MySQL / MyBatis', level: '熟悉', items: '表结构与索引设计、JOIN 查询、动态 SQL、分页查询' },
    { group: 'RabbitMQ', level: '熟悉', items: '消息发布与消费、手动 ACK、Publisher Confirm / Return、TTL 延迟重试与死信队列' },
    { group: 'Redis', level: '使用过', items: 'setIfAbsent 限频、TTL 过期与验证码一次性校验' },
    { group: 'Docker', level: '使用过', items: 'Spring Boot、MySQL、Redis 多服务编排、健康检查与数据卷' },
    { group: '前端', level: '使用过', items: 'HTML、CSS、JavaScript、Vue.js；个人网站基于 Vue 3 + TypeScript 构建' },
  ],
  projects: [
    {
      slug: 'yuyue-badminton',
      name: '羽悦羽毛球场地预约系统',
      period: '2025.08 - 2025.09',
      role: '个人项目 · Java 全栈',
      summary: '面向校内师生的羽毛球场地预约与运营系统，核心覆盖认证、场地查询、预约、取消、核销及管理端，并扩展活动和论坛功能。',
      stack: ['Spring Boot', 'MyBatis', 'MySQL', 'Redis', 'JavaScript', 'Docker Compose'],
      highlights: ['预约、取消、核销与爽约状态闭环', '悲观锁串行化场地容量检查', '条件状态更新避免重复流转', '定时扫描超时预约自动流转爽约'],
      proofPoints: [
        { value: 'SELECT FOR UPDATE', label: '同一场地容量串行检查' },
        { value: '条件状态更新', label: '避免重复取消、核销与爽约' },
        { value: '定时爽约', label: '超时未核销自动流转' },
        { value: '3 个服务', label: 'Docker Compose 统一编排' },
      ],
      overview: '项目面向校内羽毛球场地运营，Spring Boot 同时提供 REST 接口和静态页面。用户可完成手机号注册、场地预约与核销、活动报名及论坛交流，管理员负责场地、预约、活动、用户和内容管理。核心预约链路由本人独立完成，并负责后续功能的需求拆解、接口调整、方案判断、结果验收与迭代优化。',
      responsibilities: [
        '独立完成认证、场地查询、预约、取消、核销及管理端核心链路，并扩展活动报名与论坛功能。',
        '事务内使用 SELECT FOR UPDATE 锁定用户与场地记录，串行化预约限制与容量检查，避免场地超售。',
        '取消、核销、爽约使用带原状态条件的更新，状态变化时更新失败，不覆盖新的业务状态。',
        '@Scheduled 每 5 分钟扫描开始时间已过 30 分钟仍未核销的预约并自动流转为爽约；条件更新兜底幂等，重复扫描或与取消并发时仅流转一次。',
      ],
      deployment: {
        method: 'Docker Compose',
        status: '已完成本地 Docker Compose 部署验证',
        build: 'Maven + Eclipse Temurin 11 多阶段镜像构建',
        services: [
          { name: 'App', image: '自构建 Spring Boot 镜像', purpose: '提供 REST 接口与静态页面，映射 8080 端口' },
          { name: 'MySQL', image: 'mysql:8.0', purpose: '持久化业务数据，通过健康检查后启动应用' },
          { name: 'Redis', image: 'redis:7-alpine', purpose: '验证码限频与过期，启用 AOF 持久化' },
        ],
      },
      screenshots: [
        { src: publicAsset('projects/yuyue/reservation-overview.png'), alt: '场地预约与余量查询页面', caption: '场地余量查询：展示满员、可预约、锁定和维护等状态' },
        { src: publicAsset('projects/yuyue/reservation-confirm.png'), alt: '预约确认弹窗', caption: '预约确认：核对场地、日期、时段与已预约球友' },
        { src: publicAsset('projects/yuyue/reservation-records.png'), alt: '个人预约记录页面', caption: '预约记录：查看状态、核销码并取消未核销预约' },
        { src: publicAsset('projects/yuyue/activity-list.png'), alt: '羽毛球活动列表页面', caption: '活动报名：浏览近期活动并进入报名流程' },
        { src: publicAsset('projects/yuyue/forum-list.png'), alt: '论坛讨论列表页面', caption: '论坛交流：分类、搜索、图文帖子与回复数据展示' },
        { src: publicAsset('projects/yuyue/admin-verification.png'), alt: '管理端预约核销成功页面', caption: '管理端核销：输入核销码并反馈预约状态变更结果' },
      ],
      tradeoffs: [
        { question: '并发预约如何避免场地超售？', decision: '事务内按“用户行 → 场地行”固定顺序执行 SELECT FOR UPDATE', reason: '串行化同一用户的预约限制与同一场地的容量检查，固定加锁顺序也降低死锁风险。', validation: '同一场地的后续预约事务需要等待锁释放，获得锁后重新统计有效预约人数。' },
        { question: '如何保证预约状态只流转一次？', decision: '使用带原状态条件的数据库更新', reason: '取消、核销和定时爽约都要求记录仍处于 unverified，避免多个请求或任务重复执行副作用。', validation: '查询与更新之间即使发生状态变化，条件更新也会失败并提示刷新，避免覆盖新的业务状态。' },
        { question: '固定玩家字段为什么需要重构？', decision: '将 img1～img4、gender1～gender4 重构为 players 列表', reason: '固定槽位让每个场地携带大量重复字段，修改人数上限或玩家信息时需要同步调整前后端模型。', validation: '重构后场地只保留基础信息，已预约用户通过集合返回，调整容量不再需要扩展固定字段。' },
      ],
      links: [
        { label: '在线演示', href: demoUrls.yuyue, kind: 'demo' },
        { label: '代码仓库', href: 'https://github.com/helloiworld929/badminton-reservation', kind: 'repo' },
      ],
    },
    {
      slug: 'notifyflow',
      name: 'NotifyFlow 异步批量通知平台',
      period: '2026.07 - 2026.08',
      role: '个人项目 · Java 后端',
      summary: '基于 RabbitMQ 的异步批量邮件通知平台，将批量任务拆分为独立发送记录，持久化处理进度，并提供延迟重试、最终死信与失败记录手动重发。',
      stack: ['Java 21', 'Spring Boot', 'RabbitMQ', 'Spring Data JPA', 'MySQL', 'MailHog', 'Docker Compose'],
      highlights: ['批量任务按收件人拆分', '手动 ACK 与发布结果检查', 'TTL 延迟重试与最终死信', '成功幂等短路与失败重发'],
      proofPoints: [
        { value: '100 / 100', label: '批量接收人异步发送验收成功' },
        { value: '2 个 Consumer', label: '共同消费同一任务的消息' },
        { value: '最多 3 次', label: '失败重试后进入死信队列' },
        { value: '16 项测试', label: '0 failures / 0 errors' },
      ],
      overview: '基于 RabbitMQ 的异步批量邮件通知平台。创建批量任务后，系统为每位接收人生成独立发送记录，并在数据库事务提交后发布 recordId；消费者读取数据库中的权威状态，完成邮件发送、状态更新和任务进度聚合。项目通过 Docker Compose 完成 App、MySQL、RabbitMQ 与 MailHog 的交付和端到端验收。',
      responsibilities: [
        '设计「通知任务—发送记录」模型，每位接收人生成独立消息，失败不阻塞整批；持久化进度、成功/失败数与重试次数。',
        '数据库事务提交后发布 recordId；消费者以数据库为状态权威，完成邮件发送、记录更新与进度聚合。',
        '手动 ACK 控制确认时机；重试/死信消息经 Publisher Confirm 与 mandatory Return 校验后确认原消息。',
        'TTL 重试队列延迟重投，最多 3 次后记录最终失败并进入死信队列，支持失败记录手动重发。',
        'Docker Compose 端到端验收覆盖 100 个接收人、2 个 Consumer 并发消费与 SUCCESS 幂等短路；16 项测试 0 failures、0 errors。',
      ],
      deployment: {
        method: 'Docker Compose',
        status: '已完成 Docker Compose 端到端验收',
        build: 'Maven + Eclipse Temurin 21 多阶段镜像构建；Compose 编排应用及全部依赖服务',
        services: [
          { name: 'App', image: '自构建 Spring Boot 镜像', purpose: '提供任务管理页面、REST 接口和 RabbitMQ 消费者' },
          { name: 'MySQL', image: 'mysql:8.4', purpose: '持久化任务、发送记录、重试次数与最终状态' },
          { name: 'RabbitMQ', image: 'rabbitmq:4.1-management', purpose: '承载主队列、TTL 重试队列和死信队列' },
          { name: 'MailHog', image: 'mailhog/mailhog:v1.0.1', purpose: '在本地接收并核销测试邮件' },
        ],
      },
      architecture: {
        description: '每条消息只传递 recordId，消费者在处理时读取数据库状态。失败消息先进入 TTL 重试队列，延迟后自动回到主队列；达到尝试上限后进入死信队列。',
        steps: [
          { name: '创建任务', detail: '保存 task 与每位接收人的 record' },
          { name: '事务提交', detail: 'AFTER_COMMIT 发布 recordId' },
          { name: '主队列', detail: 'notify.email.queue' },
          { name: '消费者', detail: '读取状态并调用邮件服务' },
          { name: 'MailHog', detail: '接收成功邮件' },
        ],
        retry: [
          { name: '发送失败', detail: '记录 retryCount 与原因' },
          { name: '重试队列', detail: 'TTL 1 秒后回到主队列' },
          { name: '最终死信', detail: '第 3 次失败进入 dead queue' },
        ],
      },
      screenshots: [],
      tradeoffs: [
        { question: '为什么消息只携带 recordId？', decision: '以 notification_record 作为发送状态的权威来源', reason: '缩小消息体，并让消费者在重投时获取最新状态、重试次数和任务内容，避免消息快照与数据库状态长期分叉。', validation: '重复投递 SUCCESS 记录时消费者直接短路，MailHog 邮件数量、成功计数和 sentAt 均保持不变。' },
        { question: '何时确认原始消息？', decision: '后续重试或死信消息完成发布结果检查后再执行手动 ACK', reason: '若先 ACK 再发布，发布失败会同时失去原消息和后续消息；Confirm 检查 Broker 是否接收，mandatory Return 检查消息是否可路由。', validation: '出现 NACK、超时或消息被退回时关闭消费 Channel，让未确认的原消息由 RabbitMQ 恢复并重新投递。' },
        { question: '系统能否保证 exactly-once？', decision: 'V1 明确采用 at-least-once，并记录一致性边界', reason: '当前未实现 Outbox，数据库提交后到首次消息发布前仍存在崩溃窗口；邮件又是数据库事务外部副作用。', validation: '验收覆盖成功记录重复投递短路，同时在 README 和验收报告中保留可能出现 PENDING 孤立记录或重复邮件的限制。' },
      ],
      links: [
        { label: '在线演示', href: demoUrls.notifyflow, kind: 'demo' },
        { label: '代码仓库', href: 'https://github.com/helloiworld929/notifyflow', kind: 'repo' },
      ],
    },
  ] satisfies Project[],
  awards: [
    { name: '蓝桥杯全国软件和信息技术专业人才大赛', detail: 'C/C++ B 组 · 全国三等奖', year: '2025.06' },
    { name: '中国高校计算机大赛团体程序设计天梯赛', detail: '省级三等奖', year: '2025' },
    { name: '“互联网+”大学生创新创业大赛', detail: '校级优秀奖 · 项目负责人', year: '2025' },
    { name: '大学英语四级（CET-4）', detail: '英语能力证书', year: '已通过' },
  ],
}

export function getProject(slug: string) {
  return resume.projects.find((project) => project.slug === slug)
}
