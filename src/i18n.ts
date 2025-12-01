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
      language: '语言',
      login: '登录',
      logout: '退出'
    },
    training: {
      title: '培训模块',
      subtitle: '选择你想要学习的Vue.js技能模块',
      statusCompleted: '已完成',
      statusNotStarted: '未开始',
      start: '开始学习',
      completed: '已完成',
      difficulty: { beginner: '初级', intermediate: '中级', advanced: '高级' },
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
      login: {
        title: '登录',
        desc: '使用 OpenID 登录。本页面使用环境变量进行配置。',
        vars: {
          issuer: 'VITE_OIDC_ISSUER',
          clientId: 'VITE_OIDC_CLIENT_ID',
          redirect: 'VITE_OIDC_REDIRECT_URI（指向本应用回调地址）',
          logoutRedirect: 'VITE_OIDC_LOGOUT_REDIRECT_URI（可选）',
          scopes: 'VITE_OIDC_SCOPES（默认 openid profile email）'
        },
        actions: { loginOidc: '使用 OpenID 登录', logout: '退出' }
      },
      authCallback: {
        title: '登录回调处理中',
        desc: '请稍候，正在完成认证流程...'
      },
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
        unit: {
          title: '单元测试',
          desc: '学习如何编写和运行Vue.js组件的单元测试',
          calculator: { title: '计算器组件（测试示例）', labelA: '数字 A', labelB: '数字 B', resultLabel: '结果:' },
          actions: { reset: '重置' },
          cases: { title: '测试用例示例', passed: { title: '通过的测试' }, edge: { title: '边界情况测试' } },
          codeSample: { title: '测试代码示例' },
          runner: { title: '测试运行器', runStatus: { running: '运行中...', ready: '运行测试' }, clearResults: '清除结果', results: { title: '测试结果', passed: '通过:', failed: '失败:' } }
        },
        componentDemo: {
          title: '组件测试演示',
          desc: '演示如何测试 props、emits、交互与可访问性',
          testedTitle: '被测组件',
          interactionsTitle: '交互区域',
          labelInput: '按钮标签',
          disableToggle: '禁用按钮',
          simulateClick: '模拟点击',
          reset: '重置',
          eventsTitle: '事件日志',
          noEvents: '暂无事件',
          clicks: '点击次数：'
        },
        debugDemo: {
          title: '调试技巧演示',
          desc: '演示日志、错误捕获与断点思路',
          logInfo: '打印信息',
          logWarn: '打印警告',
          triggerError: '触发错误',
          errorCaptureTitle: '错误捕获演示',
          childErrorButton: '子组件触发错误',
          logsTitle: '调试日志',
          noLogs: '暂无日志',
          clearLogs: '清除日志'
        },
        performanceDemo: {
          title: '性能测试与优化演示',
          desc: '渲染压力测试与简单优化对比',
          countLabel: '渲染条目数',
          optimizedToggle: '启用优化模式',
          startRender: '开始渲染',
          clearList: '清除列表',
          duration: '渲染耗时：',
          listTitle: '列表',
          currentRender: '当前渲染',
          optimizedSnapshot: '优化结果快照'
        },
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
        dynamic: {
          title: '动态路由演示',
          desc: '点击下面的任务项查看动态路由效果',
          tasks: { title: '任务列表', status: { completed: '已完成', inProgress: '进行中' }, manualTitle: '手动输入任务ID', inputPlaceholder: '输入任务ID', go: '跳转' },
          help: { title: '动态路由说明', items: { param: '路径 /task/:id 中的 :id 是动态参数', getParam: '在组件中可以通过 $route.params.id 获取参数', props: '也可以将参数作为 props 传递给组件', multi: '动态路由支持多个参数，如 /user/:userId/post/:postId' } },
          info: { title: '当前路由参数', taskId: '任务ID:', fullPath: '完整路径:' }
        },
        nested: { title: '嵌套路由示例' },
        guards: { title: '导航守卫' },
        programmatic: {
          title: '程序化导航',
          desc: '使用编程方式进行页面跳转',
          basic: { title: '基本导航', toHome: '跳转到首页', toTasks: '跳转到任务', toTraining: '跳转到培训', back: '返回上一页' },
          params: { title: '带参数的导航', taskIdPlaceholder: '任务ID', viewTask: '查看任务', queryPlaceholder: '查询参数', search: '搜索' },
          advanced: { title: '高级导航', replace: '替换当前历史记录', withQuery: '带查询参数' },
          history: { title: '导航历史操作', forward: '前进', back: '后退', goToStep3: '跳转到第3步' },
          help: { title: '程序化导航说明', items: { push: '添加新的历史记录', replace: '替换当前历史记录', back: '返回上一页', go: '在历史记录中前进/后退指定步数' } },
          info: { title: '当前导航历史', currentPath: '当前路径:', historyLength: '历史记录数:', canBack: '可以后退:', canForward: '可以前进:' }
        },
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
        basic: {
          title: '基础状态管理',
          counterTitle: '计数器状态',
          double: '双倍:',
          triple: '三倍:',
          info: { title: '状态信息', labels: { storeId: 'Store名称:', name: '计数器名称:', count: '当前值:', double: '双倍值:' } },
          counter: { reset: '重置' },
          advanced: { toggle: '显示/隐藏 高级功能', title: '高级状态操作', amountPlaceholder: '自定义数值', increment: '增加', namePlaceholder: '自定义名称', updateName: '更新名称' }
        },
        gettersActions: {
          title: 'Getters和Actions',
          totals: { title: '用户总数' },
          avgAge: { title: '平均年龄' },
          current: { title: '当前用户', labels: { name: '姓名:', email: '邮箱:', age: '年龄:' } },
          form: { namePlaceholder: '姓名', emailPlaceholder: '邮箱', agePlaceholder: '年龄' },
          actions: { add: '添加用户' },
          list: { title: '用户列表', ageSuffix: '岁', delete: '删除' },
          logs: { title: '操作日志', addUser: '添加用户: ', deleteUser: '删除用户: ' }
        },
        modules: { title: '模块化状态管理' },
        module: {
          counter: { title: '计数器模块', controlTitle: '控制计数器', reset: '重置' },
          user: { title: '用户模块', ageSuffix: '岁', controlTitle: '控制用户', add: '添加用户', delete: '删除用户' },
          cross: { title: '跨模块交互', counterAffectsUsers: '计数器值影响用户数量', userCountLabel: '个用户', userAgeAffectsCounter: '用户平均年龄影响计数器' },
          logs: { title: '模块间通信日志', counterChanged: '计数器变化: {old} → {new}', autoAddUser: '自动添加用户: {name}', userCountChanged: '用户数量变化: {old} → {new}' },
          advanced: { toggle: '显示/隐藏 高级功能', title: '高级模块化功能', incrementLabel: '计数器增量', apply: '应用', ageLabel: '用户年龄', add: '添加' },
          sampleNames: { zhKids: ['小明','小红','小刚','小丽','小华'], zhAdults: ['张三','李四','王五','赵六','钱七'], generic: ['新用户','测试用户','示例用户'] }
        },
        persistence: {
          title: '主题设置',
          currentThemeLabel: '当前主题:',
          theme: { dark: '深色', light: '浅色' },
          toggle: '切换主题',
          reset: '重置主题',
          preview: { title: '主题预览区域', desc: '这是一个主题预览区域，会随主题变化而改变外观。', checkbox: '示例复选框', primaryButton: '主要按钮', secondaryButton: '次要按钮' },
          colors: { title: '颜色设置', primaryLabel: '主色调:', apply: '应用' },
          info: {
            title: '持久化信息', autoSave: '主题设置会自动保存到本地存储', persist: '刷新页面后设置会保留', storageKeysLabel: '当前存储的键值:', clearStorage: '清除存储', toggleStorageInfo: '显示/隐藏 存储信息', detailsTitle: '存储详情',
            details: { darkMode: '深色模式:', primaryColor: '主色调:', storageState: '存储状态:', stored: '已存储', notStored: '未存储' }
          },
          alert: { cleared: '主题存储已清除，刷新页面后将恢复默认设置' }
        },
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
      language: 'Language',
      login: 'Login',
      logout: 'Logout'
    },
    common: { yes: 'Yes', no: 'No' },
    training: {
      title: 'Training Modules',
      subtitle: 'Choose the Vue.js skills you want to learn',
      statusCompleted: 'Completed',
      statusNotStarted: 'Not Started',
      start: 'Start Learning',
      completed: 'Completed',
      difficulty: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
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
      },
      repo: {
        title: 'GitHub Repository',
        linkLabel: 'Open Repository',
        windowsTitle: 'Windows (PowerShell)',
        macosTitle: 'macOS (zsh)'
      }
    },
    pages: {
      login: {
        title: 'Login',
        desc: 'Sign in with OpenID. This page uses environment variables for configuration.',
        vars: {
          issuer: 'VITE_OIDC_ISSUER',
          clientId: 'VITE_OIDC_CLIENT_ID',
          redirect: 'VITE_OIDC_REDIRECT_URI (callback URL)',
          logoutRedirect: 'VITE_OIDC_LOGOUT_REDIRECT_URI (optional)',
          scopes: 'VITE_OIDC_SCOPES (default: openid profile email)'
        },
        actions: { loginOidc: 'Login with OpenID', logout: 'Logout' }
      },
      authCallback: {
        title: 'Completing login...',
        desc: 'Please wait while we finish the authentication flow.'
      },
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
        unit: {
          title: 'Unit Testing',
          desc: 'Learn how to write and run unit tests for Vue components',
          calculator: { title: 'Calculator Component (Testing Demo)', labelA: 'Number A', labelB: 'Number B', resultLabel: 'Result:' },
          actions: { reset: 'Reset' },
          cases: { title: 'Example Test Cases', passed: { title: 'Passing Tests' }, edge: { title: 'Edge Case Tests' } },
          codeSample: { title: 'Test Code Sample' },
          runner: { title: 'Test Runner', runStatus: { running: 'Running...', ready: 'Run Tests' }, clearResults: 'Clear Results', results: { title: 'Results', passed: 'Passed:', failed: 'Failed:' } }
        },
        componentDemo: {
          title: 'Component Testing Demo',
          desc: 'Test props, emits, interactions and accessibility',
          testedTitle: 'Tested Component',
          interactionsTitle: 'Interaction Area',
          labelInput: 'Button label',
          disableToggle: 'Disable button',
          simulateClick: 'Simulate Click',
          reset: 'Reset',
          eventsTitle: 'Event Logs',
          noEvents: 'No events',
          clicks: 'Clicks: '
        },
        debugDemo: {
          title: 'Debugging Demo',
          desc: 'Logs, error capture and debugging approach',
          logInfo: 'Log Info',
          logWarn: 'Log Warn',
          triggerError: 'Trigger Error',
          errorCaptureTitle: 'Error Capture Demo',
          childErrorButton: 'Child triggers error',
          logsTitle: 'Debug Logs',
          noLogs: 'No logs',
          clearLogs: 'Clear Logs'
        },
        performanceDemo: {
          title: 'Performance & Optimization Demo',
          desc: 'Render stress test and simple optimization comparison',
          countLabel: 'Items to render',
          optimizedToggle: 'Enable optimization',
          startRender: 'Start Render',
          clearList: 'Clear List',
          duration: 'Duration: ',
          listTitle: 'List',
          currentRender: 'Current Render',
          optimizedSnapshot: 'Optimized Snapshot'
        },
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
        },
        examples: {
          form: {
            labels: { username: 'Username', email: 'Email', age: 'Age' },
            buttons: { submit: 'Submit', submitting: 'Submitting...', reset: 'Reset' },
            submittedTitle: 'Submitted Data:',
            alerts: { submitSuccess: 'Form submitted successfully!' },
            errors: {
              usernameRequired: 'Username is required',
              usernameMinLen: 'Username must be at least 3 characters',
              emailRequired: 'Email is required',
              emailInvalid: 'Please enter a valid email address',
              ageRequired: 'Age is required',
              ageRange: 'Age must be between 1 and 120'
            }
          },
          input: {
            basic: { label: 'Basic Input', placeholder: 'Enter text...', valueLabel: 'Value:' },
            validated: { label: 'Validated Input', placeholder: 'Enter email...', ok: 'Email looks good' },
            textarea: { label: 'Textarea', placeholder: 'Enter multi-line text...', countLabel: 'Characters:' },
            select: {
              label: 'Select', placeholder: 'Please choose...', options: { one: 'Option 1', two: 'Option 2', three: 'Option 3' }, none: 'None',
              selectedLabel: 'Selected:'
            },
            errors: { emailInvalid: 'Please enter a valid email address' }
          },
          search: {
            placeholder: 'Search...',
            statusLabel: 'Status:',
            resultsLabel: 'Results:',
            noResults: 'No results found',
            state: { searching: 'Searching...', done: 'Done', waiting: 'Waiting' },
            mock: { resultSuffix: 'Result' }
          },
          parentChild: {
            parentTitle: 'Parent Component',
            sendLabel: 'Send message to child',
            receivedMessage: 'Message from child:',
            childCountLabel: 'Child count:',
            sendButton: 'Send to child',
            none: 'None',
            defaultMessageToChild: 'Hello, child!'
          },
          child: {
            title: 'Child Component',
            receivedMessage: 'Message from parent:',
            receivedCount: 'Count from parent:',
            replyLabel: 'Reply to parent',
            replyButton: 'Reply to parent',
            updateCount: 'Update count',
            localCountLabel: 'Local state - Local count:',
            increaseLocal: 'Increase local count',
            defaultReply: 'Hello, parent!'
          },
          slot: {
            defaultTitle: 'Default Slot',
            cardTitle: 'Card Title',
            defaultContent: 'This content is inserted via the default slot.',
            namedTitle: 'Named Slots',
            namedHeader: 'Header Content',
            namedBody: 'Main Content Area',
            namedFooter: 'Footer Content',
            scopedTitle: 'Scoped Slot',
            dynamicTitle: 'Dynamic Slot',
            selectLabel: 'Choose slot position',
            options: { header: 'Header', content: 'Content', sidebar: 'Sidebar' },
            dynamicContent: 'Content inserted into the {slot} slot'
          }
        }
      },
      router: {
        title: 'Routing & Navigation Training',
        subtitle: 'Advanced Vue Router features and guards',
        basic: { title: 'Basic Routing' },
        dynamic: {
          title: 'Dynamic Routing Demo',
          desc: 'Click tasks below to see dynamic routes',
          tasks: { title: 'Task List', status: { completed: 'Completed', inProgress: 'In Progress' }, manualTitle: 'Enter Task ID', inputPlaceholder: 'Task ID', go: 'Go' },
          help: { title: 'Dynamic Routing Notes', items: { param: 'Path /task/:id has :id as a dynamic param', getParam: 'Access via $route.params.id', props: 'Pass as props to components', multi: 'Support multiple params: /user/:userId/post/:postId' } },
          info: { title: 'Current Route Params', taskId: 'Task ID:', fullPath: 'Full Path:' }
        },
        nested: { title: 'Nested Routing' },
        guards: { title: 'Navigation Guards' },
        programmatic: {
          title: 'Programmatic Navigation',
          desc: 'Navigate via code',
          basic: { title: 'Basic Navigation', toHome: 'Go to Home', toTasks: 'Go to Tasks', toTraining: 'Go to Training', back: 'Go Back' },
          params: { title: 'Navigation with Params', taskIdPlaceholder: 'Task ID', viewTask: 'View Task', queryPlaceholder: 'Query', search: 'Search' },
          advanced: { title: 'Advanced Navigation', replace: 'Replace current history', withQuery: 'With query params' },
          history: { title: 'History Operations', forward: 'Forward', back: 'Back', goToStep3: 'Go to step 3' },
          help: { title: 'Programmatic Navigation Notes', items: { push: 'Add new history entry', replace: 'Replace current entry', back: 'Go back one step', go: 'Move N steps in history' } },
          info: { title: 'Current Navigation Info', currentPath: 'Current Path:', historyLength: 'History Length:', canBack: 'Can Back:', canForward: 'Can Forward:' }
        },
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
        basic: {
          title: 'Basic State Management',
          counterTitle: 'Counter State',
          double: 'Double:',
          triple: 'Triple:',
          info: { title: 'State Info', labels: { storeId: 'Store ID:', name: 'Counter Name:', count: 'Current:', double: 'Double:' } },
          counter: { reset: 'Reset' },
          advanced: { toggle: 'Show/Hide Advanced', title: 'Advanced Actions', amountPlaceholder: 'Custom amount', increment: 'Increment', namePlaceholder: 'Custom name', updateName: 'Update name' }
        },
        gettersActions: {
          title: 'Getters & Actions',
          totals: { title: 'Total Users' },
          avgAge: { title: 'Average Age' },
          current: { title: 'Current User', labels: { name: 'Name:', email: 'Email:', age: 'Age:' } },
          form: { namePlaceholder: 'Name', emailPlaceholder: 'Email', agePlaceholder: 'Age' },
          actions: { add: 'Add User' },
          list: { title: 'User List', ageSuffix: 'y', delete: 'Delete' },
          logs: { title: 'Operation Logs', addUser: 'Add User: ', deleteUser: 'Delete User: ' }
        },
        modules: { title: 'Modular State' },
        module: {
          counter: { title: 'Counter Module', controlTitle: 'Control Counter', reset: 'Reset' },
          user: { title: 'User Module', ageSuffix: 'y', controlTitle: 'Control Users', add: 'Add User', delete: 'Delete User' },
          cross: { title: 'Cross-module Interaction', counterAffectsUsers: 'Counter affects user count', userCountLabel: 'users', userAgeAffectsCounter: 'Average age affects counter' },
          logs: { title: 'Cross-module Logs', counterChanged: 'Counter changed: {old} → {new}', autoAddUser: 'Auto add user: {name}', userCountChanged: 'User count changed: {old} → {new}' },
          advanced: { toggle: 'Show/Hide Advanced', title: 'Advanced Modular Features', incrementLabel: 'Counter Increment', apply: 'Apply', ageLabel: 'User Age', add: 'Add' },
          sampleNames: { zhKids: ['Xiao Ming','Xiao Hong','Xiao Gang','Xiao Li','Xiao Hua'], zhAdults: ['Zhang San','Li Si','Wang Wu','Zhao Liu','Qian Qi'], generic: ['New User','Test User','Sample User'] }
        },
        persistence: {
          title: 'Theme Settings',
          currentThemeLabel: 'Current Theme:',
          theme: { dark: 'Dark', light: 'Light' },
          toggle: 'Toggle Theme',
          reset: 'Reset Theme',
          preview: { title: 'Theme Preview', desc: 'Preview area changes with theme.', checkbox: 'Sample Checkbox', primaryButton: 'Primary Button', secondaryButton: 'Secondary Button' },
          colors: { title: 'Color Settings', primaryLabel: 'Primary Color:', apply: 'Apply' },
          info: {
            title: 'Persistence Info', autoSave: 'Theme settings are saved to local storage', persist: 'Settings persist after refresh', storageKeysLabel: 'Stored keys:', clearStorage: 'Clear Storage', toggleStorageInfo: 'Show/Hide Storage Info', detailsTitle: 'Storage Details',
            details: { darkMode: 'Dark Mode:', primaryColor: 'Primary Color:', storageState: 'Storage State:', stored: 'Stored', notStored: 'Not Stored' }
          },
          alert: { cleared: 'Theme storage cleared. Defaults restored after refresh.' }
        },
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
      language: 'Langue',
      login: 'Se connecter',
      logout: 'Se déconnecter'
    },
    common: { yes: 'Oui', no: 'Non' },
    training: {
      title: 'Modules de formation',
      subtitle: 'Choisissez les compétences Vue.js à apprendre',
      statusCompleted: 'Terminé',
      statusNotStarted: 'Non commencé',
      start: 'Commencer',
      completed: 'Terminé',
      difficulty: { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' },
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
      login: {
        title: 'Connexion',
        desc: 'Se connecter avec OpenID. Cette page utilise des variables d’environnement.',
        vars: {
          issuer: 'VITE_OIDC_ISSUER',
          clientId: 'VITE_OIDC_CLIENT_ID',
          redirect: 'VITE_OIDC_REDIRECT_URI (URL de rappel)',
          logoutRedirect: 'VITE_OIDC_LOGOUT_REDIRECT_URI (optionnel)',
          scopes: 'VITE_OIDC_SCOPES (par défaut : openid profile email)'
        },
        actions: { loginOidc: 'Se connecter avec OpenID', logout: 'Se déconnecter' }
      },
      authCallback: {
        title: 'Finalisation de la connexion...',
        desc: 'Veuillez patienter pendant la fin du flux d’authentification.'
      },
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
        unit: {
          title: 'Tests unitaires',
          desc: 'Apprendre à écrire et exécuter des tests unitaires pour les composants Vue',
          calculator: { title: 'Composant calculatrice (démo de test)', labelA: 'Nombre A', labelB: 'Nombre B', resultLabel: 'Résultat :' },
          actions: { reset: 'Réinitialiser' },
          cases: { title: 'Exemples de cas de test', passed: { title: 'Tests réussis' }, edge: { title: 'Tests de cas limites' } },
          codeSample: { title: 'Exemple de code de test' },
          runner: { title: 'Exécuteur de tests', runStatus: { running: 'En cours...', ready: 'Lancer les tests' }, clearResults: 'Effacer les résultats', results: { title: 'Résultats', passed: 'Réussis :', failed: 'Échoués :' } }
        },
        componentDemo: {
          title: 'Démo de test de composant',
          desc: 'Tester props, emits, interactions et accessibilité',
          testedTitle: 'Composant testé',
          interactionsTitle: 'Zone d’interaction',
          labelInput: 'Libellé du bouton',
          disableToggle: 'Désactiver le bouton',
          simulateClick: 'Simuler le clic',
          reset: 'Réinitialiser',
          eventsTitle: 'Journal des événements',
          noEvents: 'Aucun événement',
          clicks: 'Clics : '
        },
        debugDemo: {
          title: 'Démo de débogage',
          desc: 'Journaux, capture d’erreurs et approche de débogage',
          logInfo: 'Journal Info',
          logWarn: 'Journal Avertissement',
          triggerError: 'Déclencher une erreur',
          errorCaptureTitle: 'Démo de capture d’erreur',
          childErrorButton: 'L’enfant déclenche une erreur',
          logsTitle: 'Journaux de débogage',
          noLogs: 'Aucun journal',
          clearLogs: 'Effacer les journaux'
        },
        performanceDemo: {
          title: 'Démo de performance et optimisation',
          desc: 'Test de contrainte de rendu et comparaison d’optimisation',
          countLabel: 'Nombre d’éléments',
          optimizedToggle: 'Activer l’optimisation',
          startRender: 'Commencer le rendu',
          clearList: 'Effacer la liste',
          duration: 'Durée : ',
          listTitle: 'Liste',
          currentRender: 'Rendu actuel',
          optimizedSnapshot: 'Instantané optimisé'
        },
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
        slot: { title: 'Exemples de slots' },
        examples: {
          form: {
            labels: { username: 'Nom d’utilisateur', email: 'E-mail', age: 'Âge' },
            buttons: { submit: 'Envoyer', submitting: 'Envoi...', reset: 'Réinitialiser' },
            submittedTitle: 'Données envoyées :',
            alerts: { submitSuccess: 'Formulaire envoyé avec succès !' },
            errors: {
              usernameRequired: 'Le nom d’utilisateur est requis',
              usernameMinLen: 'Le nom d’utilisateur doit comporter au moins 3 caractères',
              emailRequired: 'L’e-mail est requis',
              emailInvalid: 'Veuillez saisir une adresse e-mail valide',
              ageRequired: 'L’âge est requis',
              ageRange: 'L’âge doit être entre 1 et 120'
            }
          },
          input: {
            basic: { label: 'Saisie basique', placeholder: 'Saisir du texte...', valueLabel: 'Valeur :' },
            validated: { label: 'Saisie validée', placeholder: 'Saisir l’e-mail...', ok: 'L’e-mail semble correct' },
            textarea: { label: 'Zone de texte', placeholder: 'Saisir un texte multi-lignes...', countLabel: 'Caractères :' },
            select: {
              label: 'Sélecteur', placeholder: 'Veuillez choisir...', options: { one: 'Option 1', two: 'Option 2', three: 'Option 3' }, none: 'Aucun',
              selectedLabel: 'Sélectionné :'
            },
            errors: { emailInvalid: 'Veuillez saisir une adresse e-mail valide' }
          },
          search: {
            placeholder: 'Rechercher...',
            statusLabel: 'Statut :',
            resultsLabel: 'Résultats :',
            noResults: 'Aucun résultat trouvé',
            state: { searching: 'Recherche...', done: 'Terminé', waiting: 'En attente' },
            mock: { resultSuffix: 'Résultat' }
          },
          parentChild: {
            parentTitle: 'Composant parent',
            sendLabel: 'Envoyer un message au composant enfant',
            receivedMessage: 'Message reçu de l’enfant :',
            childCountLabel: 'Compteur enfant :',
            sendButton: 'Envoyer à l’enfant',
            none: 'Aucun',
            defaultMessageToChild: 'Bonjour, enfant !'
          },
          child: {
            title: 'Composant enfant',
            receivedMessage: 'Message reçu du parent :',
            receivedCount: 'Compteur reçu du parent :',
            replyLabel: 'Répondre au parent',
            replyButton: 'Répondre au parent',
            updateCount: 'Mettre à jour le compteur',
            localCountLabel: 'État local - Compteur local :',
            increaseLocal: 'Augmenter le compteur local',
            defaultReply: 'Bonjour, parent !'
          },
          slot: {
            defaultTitle: 'Slot par défaut',
            cardTitle: 'Titre de la carte',
            defaultContent: 'Contenu inséré via le slot par défaut.',
            namedTitle: 'Slots nommés',
            namedHeader: 'Contenu d’en-tête',
            namedBody: 'Zone de contenu principal',
            namedFooter: 'Contenu de pied de page',
            scopedTitle: 'Slot à portée',
            dynamicTitle: 'Slot dynamique',
            selectLabel: 'Choisir la position du slot',
            options: { header: 'En-tête', content: 'Contenu', sidebar: 'Barre latérale' },
            dynamicContent: 'Contenu inséré dans le slot {slot}'
          }
        }
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
