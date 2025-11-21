import { createI18n } from 'vue-i18n'

const saved = localStorage.getItem('locale')
const browser = navigator.language?.toLowerCase() || 'zh'
const defaultLocale = saved || (browser.startsWith('zh') ? 'zh' : browser.startsWith('fr') ? 'fr' : 'en')

const messages = {
  zh: {
    app: {
      title: 'Vue.js 技能增强'
    },
    nav: {
      home: '首页',
      training: '培训模块',
      tasks: '任务管理',
      language: '语言'
    },
    training: {
      title: '培训模块',
      subtitle: '选择你想要学习的Vue.js技能模块',
      statusCompleted: '已完成',
      statusNotStarted: '未开始',
      start: '开始学习',
      completed: '已完成',
      modules: {
        components: { title: '组件化开发基础', desc: '学习Vue 3组件化开发，掌握Props、Emits、插槽等核心概念', duration: '2小时' },
        composition: { title: 'Composition API', desc: '深入理解Composition API，掌握ref、reactive、computed等核心API', duration: '3小时' },
        'state-management': { title: '状态管理', desc: '使用Pinia进行状态管理，学习模块化状态设计和类型安全', duration: '2.5小时' },
        routing: { title: '路由和导航', desc: '掌握Vue Router的高级特性，实现复杂的导航和权限控制', duration: '2小时' },
        'api-integration': { title: 'API集成', desc: '学习HTTP客户端封装、错误处理和数据缓存策略', duration: '3小时' },
        testing: { title: '测试和调试', desc: '掌握单元测试、组件测试和端到端测试的编写技巧', duration: '2.5小时' }
      }
    },
    home: {
      hero: {
        title: 'Vue.js 技能增强训练',
        subtitle: '通过实际项目提升你的Vue.js开发技能',
        ctaStart: '开始培训',
        ctaViewProjects: '查看项目'
      },
      features: {
        components: { title: '组件化开发', desc: '学习Vue 3 Composition API，掌握组件化开发思想和最佳实践。' },
        state: { title: '状态管理', desc: '使用Pinia进行状态管理，学习模块化状态设计和类型安全。' },
        router: { title: '路由导航', desc: '掌握Vue Router的高级特性，实现复杂的导航和权限控制。' },
        api: { title: 'API集成', desc: '学习HTTP客户端封装、错误处理和数据缓存策略。' },
        testing: { title: '测试调试', desc: '掌握单元测试、组件测试和端到端测试的编写技巧。' },
        best: { title: '最佳实践', desc: '学习Vue.js性能优化、代码分割和TypeScript高级类型。' }
      },
      highlights: {
        title: '项目特色',
        stepByStep: { title: '循序渐进', desc: '从基础概念到高级特性，每个模块都有清晰的学习路径和实践任务。' },
        practice: { title: '实战导向', desc: '通过构建真实的任务管理系统，将理论知识转化为实际开发能力。' },
        modernStack: { title: '现代技术栈', desc: '使用Vue 3、TypeScript、Pinia等现代技术，紧跟行业发展趋势。' },
        best: { title2: '最佳实践', desc2: '遵循Vue.js官方推荐的最佳实践，编写高质量、可维护的代码。' }
      }
    },
    pages: {
      api: {
        title: 'API集成和数据处理培训',
        subtitle: '学习HTTP客户端封装、错误处理和数据缓存策略',
        httpClient: { title: 'HTTP客户端' },
        errorHandling: { title: '错误处理' },
        caching: { title: '数据缓存策略' },
        formHandling: { title: '表单处理和验证' },
        fileUpload: { title: '文件上传' },
        design: {
          title: '页面设计与最佳实践',
          description: '稳定的 API 层抽象与一致的错误模型，有助于提升可维护性。',
          points: {
            abstraction: '封装 HTTP 客户端，统一请求、超时与重试策略',
            errors: '定义统一的错误结构并在 UI 层友好展示',
            caching: '为列表与详情设计缓存与失效策略',
            schema: '在前端校验请求/响应数据结构与边界',
            security: '避免泄露敏感信息，遵循最小权限原则'
          },
          links: {
            fetchDocs: 'MDN Fetch 文档',
            restGuide: 'REST 设计指南（Microsoft）',
            httpCaching: 'HTTP 缓存（MDN）'
          }
        }
      },
      testing: {
        title: '测试和调试技能培训',
        subtitle: '学习Vue.js组件测试、调试技巧和性能优化',
        unit: { title: '单元测试' },
        component: { title: '组件测试' },
        debug: { title: '调试技巧' },
        performance: { title: '性能测试和优化' },
        design: {
          title: '页面设计与最佳实践',
          description: '测试关注行为与用户路径，调试关注定位与复现场景。',
          points: {
            pyramid: '建立单元/组件/E2E 测试金字塔结构',
            behavior: '优先测试行为与结果而不是实现细节',
            selectors: '使用 data-testid 选择器，减少对样式的耦合',
            mocks: '隔离外部依赖，使用模拟与桩件',
            perf: '对关键路径做性能基准与持续监控'
          },
          links: {
            vueTestUtils: 'Vue Test Utils',
            vitestDocs: 'Vitest 文档',
            testingLibrary: 'Testing Library 指南'
          }
        }
      },
      components: {
        title: '组件化开发培训',
        subtitle: '学习Vue 3组件化开发的核心概念和最佳实践',
        basicExamples: { title: '基础组件示例', counter: { title: '计数器组件' }, input: { title: '输入框组件' } },
        advancedExamples: { title: '高级组件示例', search: { title: '搜索组件' }, form: { title: '表单验证组件' } },
        communication: { title: '组件通信示例' },
        slot: { title: '插槽示例' },
        design: {
          title: '页面设计与最佳实践',
          description: '可组合、可复用、可测试的组件设计，来源于清晰的边界。',
          points: {
            atomic: '优先原子化组件，组合形成复杂 UI',
            propsEmits: '收敛输入（props）与输出（emits），保持单向数据流',
            slots: '用插槽提升可扩展性与可定制性',
            composition: '复用逻辑用 Composables（useXxx），避免重复',
            a11y: '遵循可访问性（a11y）实践，保证键盘可用与语义化'
          },
          links: {
            vueStyleGuide: 'Vue 风格指南',
            vueDocs: 'Vue 官方文档',
            a11yWcag: 'WCAG（Web 内容无障碍指南）'
          }
        }
      },
      router: {
        title: '路由和导航培训',
        subtitle: '学习Vue Router的高级特性和导航守卫',
        basic: { title: '基础路由操作' },
        dynamic: { title: '动态路由' },
        nested: { title: '嵌套路由示例' },
        guards: { title: '导航守卫' },
        programmatic: { title: '程序化导航' },
        design: {
          title: '页面设计与最佳实践',
          description: '合理设计路由层级、命名与守卫，有助于提升可维护性与可读性。',
          points: {
            structure: '根据功能与布局设计路由层级与嵌套结构',
            naming: '为路由命名（name）以提升可读性与可导航性',
            lazy: '使用路由级按需加载与代码分割提升性能',
            guards: '将认证与权限逻辑集中在导航守卫中并保持纯粹',
            meta: '用 meta 管理标题、权限等元信息，避免散落在组件中'
          },
          links: {
            routerDocs: 'Vue Router 文档',
            guardsDocs: '导航守卫指南',
            metaDocs: '路由元信息'
          }
        }
      },
      state: {
        title: '状态管理培训',
        subtitle: '学习使用Pinia进行Vue.js应用的状态管理',
        basic: { title: '基础状态管理' },
        gettersActions: { title: 'Getters和Actions' },
        modules: { title: '模块化状态管理' },
        persistence: { title: '状态持久化' },
        design: {
          title: '页面设计与最佳实践',
          description: '清晰的 Store 边界与类型约束，让状态管理更可控。',
          points: {
            boundaries: '按业务域划分 Store，保持单一职责',
            typing: '为 State、Getters、Actions 添加类型定义',
            purity: '保持 Getters 纯函数，避免副作用',
            async: '将异步与副作用统一收敛到 Actions',
            persistence: '谨慎持久化，明确存储键与失效策略'
          },
          links: {
            piniaDocs: 'Pinia 文档',
            vueReactivity: 'Vue 响应式系统',
            statePatterns: '状态管理设计模式'
          }
        }
      },
      tasks: {
        title: '任务管理系统',
        subtitle: '通过构建实际项目来学习Vue.js高级技能',
        metrics: { total: '总任务数', inProgress: '进行中', completed: '已完成', overdue: '已逾期' },
        list: { title: '任务列表', add: '添加任务', empty: '暂无任务，点击上方按钮添加新任务' },
        modal: { addTitle: '添加新任务', titleLabel: '任务标题', descLabel: '任务描述', dueLabel: '截止日期', cancel: '取消', confirm: '添加' }
      },
      taskDetail: {
        title: '任务详情',
        back: '返回',
        list: '任务列表',
        status: { completed: '已完成', inProgress: '进行中' },
        meta: { createdAt: '创建时间:', dueDate: '截止日期:', id: '任务ID:', status: '状态:' },
        actions: { markIncomplete: '标记为未完成', markComplete: '标记为已完成', delete: '删除任务' },
        notFound: { title: '任务未找到', desc: '任务ID为 {id} 的任务不存在', backToList: '返回任务列表' }
      },
      notFound: {
        title: '页面未找到',
        desc: '抱歉，您访问的页面不存在或已被移动。',
        back: '返回上一页',
        home: '返回首页',
        currentPathLabel: '当前路径:'
      }
    },
    admin: {
      layout: { title: '管理后台', logout: '退出登录' },
      sidebar: { dashboard: '仪表板', users: '用户管理', settings: '系统设置' },
      settings: {
        title: '系统设置',
        basic: { title: '基本设置', siteTitle: '网站标题', siteTitleValue: 'Vue.js 技能增强', siteDesc: '网站描述', siteDescValue: '通过实际项目提升Vue.js开发技能' },
        advanced: { title: '高级设置', debug: { title: '启用调试模式', desc: '显示详细的调试信息' }, cache: { title: '启用缓存', desc: '提高应用性能' } },
        actions: { reset: '重置', save: '保存设置' }
      },
      users: { title: '用户管理', actions: { add: '添加用户' }, table: { name: '姓名', email: '邮箱', status: '状态', actions: '操作', active: '活跃', edit: '编辑', delete: '删除' } },
      dashboard: { title: '管理仪表板', cards: { totalUsers: '总用户数', activeUsers: '活跃用户', visitsToday: '今日访问' }, recent: { title: '最近活动', login: '用户登录', minutes2: '2分钟前', createTask: '新任务创建', minutes5: '5分钟前', dataUpdate: '数据更新', minutes10: '10分钟前' } }
    }
  },
  en: {
    app: {
      title: 'Vue.js Skill Enhancement'
    },
    nav: {
      home: 'Home',
      training: 'Training',
      tasks: 'Tasks',
      language: 'Language'
    },
    training: {
      title: 'Training Modules',
      subtitle: 'Choose the Vue.js skills you want to learn',
      statusCompleted: 'Completed',
      statusNotStarted: 'Not Started',
      start: 'Start Learning',
      completed: 'Completed',
      modules: {
        components: { title: 'Component Basics', desc: 'Props, emits, and slots core concepts', duration: '2h' },
        composition: { title: 'Composition API', desc: 'ref, reactive, computed and core APIs', duration: '3h' },
        'state-management': { title: 'State Management', desc: 'Pinia with modular and type-safe design', duration: '2.5h' },
        routing: { title: 'Routing & Navigation', desc: 'Advanced router features and access control', duration: '2h' },
        'api-integration': { title: 'API Integration', desc: 'HTTP client, error handling, caching', duration: '3h' },
        testing: { title: 'Testing & Debugging', desc: 'Unit, component and E2E testing', duration: '2.5h' }
      }
    },
    home: {
      hero: {
        title: 'Vue.js Skill Enhancement Training',
        subtitle: 'Improve your Vue.js skills through real projects',
        ctaStart: 'Start Training',
        ctaViewProjects: 'View Projects'
      },
      features: {
        components: { title: 'Component Development', desc: 'Learn Vue 3 Composition API and best practices.' },
        state: { title: 'State Management', desc: 'Use Pinia with modular and type-safe design.' },
        router: { title: 'Routing', desc: 'Master advanced Vue Router features and access control.' },
        api: { title: 'API Integration', desc: 'HTTP client wrapper, error handling, caching strategies.' },
        testing: { title: 'Testing & Debugging', desc: 'Unit, component, and end-to-end testing.' },
        best: { title: 'Best Practices', desc: 'Performance, code splitting, advanced TypeScript.' }
      },
      highlights: {
        title: 'Highlights',
        stepByStep: { title: 'Step by Step', desc: 'Clear learning path and practice tasks.' },
        practice: { title: 'Practical', desc: 'Build a real task system to apply theory.' },
        modernStack: { title: 'Modern Stack', desc: 'Vue 3, TypeScript, Pinia, aligned with industry.' },
        best: { title2: 'Best Practices', desc2: 'Follow official recommendations for maintainable code.' }
      }
    },
    pages: {
      api: {
        title: 'API Integration & Data Processing',
        subtitle: 'Learn HTTP client wrapper, error handling and caching',
        httpClient: { title: 'HTTP Client' },
        errorHandling: { title: 'Error Handling' },
        caching: { title: 'Caching Strategies' },
        formHandling: { title: 'Form Handling & Validation' },
        fileUpload: { title: 'File Upload' },
        design: {
          title: 'Page Design & Best Practices',
          description: 'Stable API abstraction and consistent error model improve maintainability.',
          points: {
            abstraction: 'Wrap HTTP client with unified timeout/retry strategy',
            errors: 'Define a consistent error shape and show friendly UI messages',
            caching: 'Design cache and invalidation for lists and details',
            schema: 'Validate request/response schema and boundaries on client',
            security: 'Avoid leaking sensitive data and follow least privilege'
          },
          links: {
            fetchDocs: 'MDN Fetch',
            restGuide: 'REST Design Guidelines (Microsoft)',
            httpCaching: 'HTTP Caching (MDN)'
          }
        }
      },
      testing: {
        title: 'Testing & Debugging Training',
        subtitle: 'Component testing, debugging tips and performance',
        unit: { title: 'Unit Testing' },
        component: { title: 'Component Testing' },
        debug: { title: 'Debugging Tips' },
        performance: { title: 'Performance & Optimization' },
        design: {
          title: 'Page Design & Best Practices',
          description: 'Tests focus on behavior; debugging focuses on reproduction paths.',
          points: {
            pyramid: 'Establish unit/component/E2E testing pyramid',
            behavior: 'Test user-visible behavior, not implementation details',
            selectors: 'Use data-testid selectors to decouple from styles',
            mocks: 'Isolate external deps with mocks and stubs',
            perf: 'Benchmark critical paths and monitor performance'
          },
          links: {
            vueTestUtils: 'Vue Test Utils',
            vitestDocs: 'Vitest Docs',
            testingLibrary: 'Testing Library Principles'
          }
        }
      },
      components: {
        title: 'Component Development Training',
        subtitle: 'Core concepts and best practices of Vue 3 components',
        basicExamples: { title: 'Basic Examples', counter: { title: 'Counter Component' }, input: { title: 'Input Component' } },
        advancedExamples: { title: 'Advanced Examples', search: { title: 'Search Component' }, form: { title: 'Form Validation Component' } },
        communication: { title: 'Component Communication' },
        slot: { title: 'Slot Examples' },
        design: {
          title: 'Page Design & Best Practices',
          description: 'Composable, reusable and testable components come from clear boundaries.',
          points: {
            atomic: 'Prefer atomic components and compose complex UI',
            propsEmits: 'Constrain inputs (props) and outputs (emits); keep one-way data flow',
            slots: 'Use slots for extensibility and customization',
            composition: 'Extract reusable logic into composables (useXxx)',
            a11y: 'Follow accessibility (a11y) practices; keyboard and semantics'
          },
          links: {
            vueStyleGuide: 'Vue Style Guide',
            vueDocs: 'Vue Docs',
            a11yWcag: 'WCAG (Web Content Accessibility Guidelines)'
          }
        }
      },
      router: {
        title: 'Routing & Navigation Training',
        subtitle: 'Advanced Vue Router features and guards',
        basic: { title: 'Basic Routing' },
        dynamic: { title: 'Dynamic Routing' },
        nested: { title: 'Nested Routing' },
        guards: { title: 'Navigation Guards' },
        programmatic: { title: 'Programmatic Navigation' },
        design: {
          title: 'Page Design & Best Practices',
          description: 'Design route hierarchy, naming and guards to improve maintainability.',
          points: {
            structure: 'Design route hierarchy and nesting by feature/layout',
            naming: 'Use route names for readability and navigation',
            lazy: 'Apply lazy-loading and code-splitting for performance',
            guards: 'Centralize auth/permission in guards and keep them pure',
            meta: 'Manage title/permission in meta instead of scattering in components'
          },
          links: {
            routerDocs: 'Vue Router Docs',
            guardsDocs: 'Navigation Guards Guide',
            metaDocs: 'Route Meta'
          }
        }
      },
      state: {
        title: 'State Management Training',
        subtitle: 'Using Pinia for Vue.js state management',
        basic: { title: 'Basic State Management' },
        gettersActions: { title: 'Getters & Actions' },
        modules: { title: 'Modular State' },
        persistence: { title: 'State Persistence' },
        design: {
          title: 'Page Design & Best Practices',
          description: 'Clear store boundaries and types make state manageable.',
          points: {
            boundaries: 'Split stores by business domain, keep single responsibility',
            typing: 'Type state, getters and actions thoroughly',
            purity: 'Keep getters pure and side-effect free',
            async: 'Centralize async and side-effects in actions',
            persistence: 'Persist cautiously with clear keys and invalidation'
          },
          links: {
            piniaDocs: 'Pinia Docs',
            vueReactivity: 'Vue Reactivity',
            statePatterns: 'State Management Patterns'
          }
        }
      },
      tasks: {
        title: 'Task Management System',
        subtitle: 'Learn advanced Vue.js skills via practical projects',
        metrics: { total: 'Total', inProgress: 'In Progress', completed: 'Completed', overdue: 'Overdue' },
        list: { title: 'Task List', add: 'Add Task', empty: 'No tasks yet, click above to add one' },
        modal: { addTitle: 'Add New Task', titleLabel: 'Title', descLabel: 'Description', dueLabel: 'Due Date', cancel: 'Cancel', confirm: 'Add' }
      },
      taskDetail: {
        title: 'Task Detail',
        back: 'Back',
        list: 'Task List',
        status: { completed: 'Completed', inProgress: 'In Progress' },
        meta: { createdAt: 'Created At:', dueDate: 'Due Date:', id: 'Task ID:', status: 'Status:' },
        actions: { markIncomplete: 'Mark Incomplete', markComplete: 'Mark Complete', delete: 'Delete Task' },
        notFound: { title: 'Task Not Found', desc: 'Task with ID {id} does not exist', backToList: 'Back to Task List' }
      },
      notFound: {
        title: 'Page Not Found',
        desc: 'Sorry, the page you visited does not exist or has been moved.',
        back: 'Go Back',
        home: 'Go Home',
        currentPathLabel: 'Current Path:'
      }
    },
    admin: {
      layout: { title: 'Admin Panel', logout: 'Log Out' },
      sidebar: { dashboard: 'Dashboard', users: 'Users', settings: 'Settings' },
      settings: {
        title: 'System Settings',
        basic: { title: 'Basic Settings', siteTitle: 'Site Title', siteTitleValue: 'Vue.js Skill Enhancement', siteDesc: 'Site Description', siteDescValue: 'Improve Vue.js skills with real projects' },
        advanced: { title: 'Advanced Settings', debug: { title: 'Enable Debug Mode', desc: 'Show detailed debug information' }, cache: { title: 'Enable Caching', desc: 'Improve app performance' } },
        actions: { reset: 'Reset', save: 'Save Settings' }
      },
      users: { title: 'User Management', actions: { add: 'Add User' }, table: { name: 'Name', email: 'Email', status: 'Status', actions: 'Actions', active: 'Active', edit: 'Edit', delete: 'Delete' } },
      dashboard: { title: 'Admin Dashboard', cards: { totalUsers: 'Total Users', activeUsers: 'Active Users', visitsToday: 'Visits Today' }, recent: { title: 'Recent Activity', login: 'User Login', minutes2: '2 minutes ago', createTask: 'Task Created', minutes5: '5 minutes ago', dataUpdate: 'Data Updated', minutes10: '10 minutes ago' } }
    }
  },
  fr: {
    app: {
      title: 'Amélioration des compétences Vue.js'
    },
    nav: {
      home: 'Accueil',
      training: 'Formation',
      tasks: 'Tâches',
      language: 'Langue'
    },
    training: {
      title: 'Modules de formation',
      subtitle: 'Choisissez les compétences Vue.js à apprendre',
      statusCompleted: 'Terminé',
      statusNotStarted: 'Non commencé',
      start: 'Commencer',
      completed: 'Terminé',
      modules: {
        components: { title: 'Bases des composants', desc: 'Props, emits et slots — concepts clés', duration: '2 h' },
        composition: { title: 'Composition API', desc: 'ref, reactive, computed et APIs clés', duration: '3 h' },
        'state-management': { title: 'Gestion d’état', desc: 'Pinia avec conception modulaire et typée', duration: '2,5 h' },
        routing: { title: 'Routage & navigation', desc: 'Fonctionnalités avancées et contrôle d’accès', duration: '2 h' },
        'api-integration': { title: 'Intégration API', desc: 'Client HTTP, erreurs, cache', duration: '3 h' },
        testing: { title: 'Tests & débogage', desc: 'Tests unitaires, composants et E2E', duration: '2,5 h' }
      }
    },
    home: {
      hero: {
        title: 'Formation d’amélioration des compétences Vue.js',
        subtitle: 'Améliorez vos compétences Vue.js via des projets réels',
        ctaStart: 'Commencer la formation',
        ctaViewProjects: 'Voir les projets'
      },
      features: {
        components: { title: 'Développement de composants', desc: 'Apprendre Composition API et les bonnes pratiques.' },
        state: { title: 'Gestion d’état', desc: 'Utiliser Pinia avec conception modulaire et typée.' },
        router: { title: 'Routage', desc: 'Maîtriser les fonctionnalités avancées et le contrôle d’accès.' },
        api: { title: 'Intégration API', desc: 'Client HTTP, gestion d’erreurs, mise en cache.' },
        testing: { title: 'Tests & Débogage', desc: 'Tests unitaires, composants et bout-en-bout.' },
        best: { title: 'Bonnes pratiques', desc: 'Performance, découpage de code, TypeScript avancé.' }
      },
      highlights: {
        title: 'Points forts',
        stepByStep: { title: 'Étape par étape', desc: 'Parcours clair et tâches pratiques.' },
        practice: { title: 'Pratique', desc: 'Construire un système de tâches réel pour appliquer la théorie.' },
        modernStack: { title: 'Stack moderne', desc: 'Vue 3, TypeScript, Pinia, aligné avec l’industrie.' },
        best: { title2: 'Bonnes pratiques', desc2: 'Suivre les recommandations officielles pour un code maintenable.' }
      }
    },
    pages: {
      api: {
        title: 'Formation intégration API et traitement des données',
        subtitle: 'Client HTTP, gestion des erreurs et mise en cache',
        httpClient: { title: 'Client HTTP' },
        errorHandling: { title: 'Gestion des erreurs' },
        caching: { title: 'Stratégies de cache' },
        formHandling: { title: 'Formulaires et validation' },
        fileUpload: { title: 'Téléversement de fichiers' },
        design: {
          title: 'Conception de page et bonnes pratiques',
          description: 'Abstraction API stable et modèle d’erreur cohérent améliorent la maintenabilité.',
          points: {
            abstraction: 'Envelopper le client HTTP avec délais/relances unifiés',
            errors: 'Définir une forme d’erreur cohérente et afficher des messages conviviaux',
            caching: 'Concevoir cache et invalidation pour listes et détails',
            schema: 'Valider schémas requête/réponse côté client',
            security: 'Éviter les fuites et respecter le moindre privilège'
          },
          links: {
            fetchDocs: 'MDN Fetch',
            restGuide: 'Lignes directrices REST (Microsoft)',
            httpCaching: 'Cache HTTP (MDN)'
          }
        }
      },
      testing: {
        title: 'Formation tests et débogage',
        subtitle: 'Tests de composants, astuces de débogage et performance',
        unit: { title: 'Tests unitaires' },
        component: { title: 'Tests de composants' },
        debug: { title: 'Astuces de débogage' },
        performance: { title: 'Performance et optimisation' }
      },
      components: {
        title: 'Formation développement de composants',
        subtitle: 'Concepts clés et bonnes pratiques des composants Vue 3',
        basicExamples: { title: 'Exemples de base', counter: { title: 'Composant compteur' }, input: { title: 'Composant saisie' } },
        advancedExamples: { title: 'Exemples avancés', search: { title: 'Composant recherche' }, form: { title: 'Composant validation de formulaire' } },
        communication: { title: 'Communication entre composants' },
        slot: { title: 'Exemples de slots' }
      },
      router: {
        title: 'Formation routage et navigation',
        subtitle: 'Fonctionnalités avancées de Vue Router et gardes',
        basic: { title: 'Routage de base' },
        dynamic: { title: 'Routage dynamique' },
        nested: { title: 'Routage imbriqué' },
        guards: { title: 'Gardes de navigation' },
        programmatic: { title: 'Navigation programmatique' }
      },
      state: {
        title: 'Formation gestion d’état',
        subtitle: 'Utiliser Pinia pour la gestion d’état Vue.js',
        basic: { title: 'Gestion d’état de base' },
        gettersActions: { title: 'Getters et Actions' },
        modules: { title: 'État modulaire' },
        persistence: { title: 'Persistance de l’état' }
      },
      tasks: {
        title: 'Système de gestion des tâches',
        subtitle: 'Apprendre Vue.js avancé via des projets pratiques',
        metrics: { total: 'Total', inProgress: 'En cours', completed: 'Terminé', overdue: 'En retard' },
        list: { title: 'Liste des tâches', add: 'Ajouter une tâche', empty: 'Aucune tâche pour le moment, cliquez ci-dessus pour en ajouter une' },
        modal: { addTitle: 'Ajouter une nouvelle tâche', titleLabel: 'Titre', descLabel: 'Description', dueLabel: 'Date d’échéance', cancel: 'Annuler', confirm: 'Ajouter' }
      },
      taskDetail: {
        title: 'Détails de la tâche',
        back: 'Retour',
        list: 'Liste des tâches',
        status: { completed: 'Terminé', inProgress: 'En cours' },
        meta: { createdAt: 'Créé le :', dueDate: 'Échéance :', id: 'ID de tâche :', status: 'Statut :' },
        actions: { markIncomplete: 'Marquer comme non terminé', markComplete: 'Marquer comme terminé', delete: 'Supprimer la tâche' },
        notFound: { title: 'Tâche introuvable', desc: 'La tâche avec l’ID {id} n’existe pas', backToList: 'Retour à la liste des tâches' }
      },
      notFound: {
        title: 'Page introuvable',
        desc: 'Désolé, la page que vous avez visitée n’existe pas ou a été déplacée.',
        back: 'Retour',
        home: 'Accueil',
        currentPathLabel: 'Chemin actuel :'
      }
    },
    admin: {
      layout: { title: 'Panneau d’administration', logout: 'Se déconnecter' },
      sidebar: { dashboard: 'Tableau de bord', users: 'Utilisateurs', settings: 'Paramètres' },
      settings: {
        title: 'Paramètres du système',
        basic: { title: 'Paramètres de base', siteTitle: 'Titre du site', siteTitleValue: 'Amélioration des compétences Vue.js', siteDesc: 'Description du site', siteDescValue: 'Améliorer les compétences Vue.js via des projets réels' },
        advanced: { title: 'Paramètres avancés', debug: { title: 'Activer le mode debug', desc: 'Afficher des informations détaillées' }, cache: { title: 'Activer le cache', desc: 'Améliorer les performances' } },
        actions: { reset: 'Réinitialiser', save: 'Enregistrer' }
      },
      users: { title: 'Gestion des utilisateurs', actions: { add: 'Ajouter un utilisateur' }, table: { name: 'Nom', email: 'E-mail', status: 'Statut', actions: 'Actions', active: 'Actif', edit: 'Éditer', delete: 'Supprimer' } },
      dashboard: { title: 'Tableau de bord admin', cards: { totalUsers: 'Nombre total d’utilisateurs', activeUsers: 'Utilisateurs actifs', visitsToday: 'Visites aujourd’hui' }, recent: { title: 'Activité récente', login: 'Connexion utilisateur', minutes2: 'Il y a 2 minutes', createTask: 'Tâche créée', minutes5: 'Il y a 5 minutes', dataUpdate: 'Données mises à jour', minutes10: 'Il y a 10 minutes' } }
    }
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages
})

export const setLocale = (loc: string) => {
  i18n.global.locale.value = loc
  localStorage.setItem('locale', loc)
}
