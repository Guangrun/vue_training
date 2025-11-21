<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('training.title') }}</h1>
      <p class="text-gray-600">{{ $t('training.subtitle') }}</p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TrainingCard
        v-for="module in trainingModules"
        :key="module.id"
        :module="module"
        @start="startModule"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TrainingCard from '@/components/training/TrainingCard.vue'

interface TrainingModule {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  completed: boolean
  icon: string
}

const trainingModules = ref<TrainingModule[]>([
  {
    id: 'components',
    title: '组件化开发基础',
    description: '学习Vue 3组件化开发，掌握Props、Emits、插槽等核心概念',
    difficulty: 'beginner',
    duration: '2小时',
    completed: false,
    icon: '🧩'
  },
  {
    id: 'composition',
    title: 'Composition API',
    description: '深入理解Composition API，掌握ref、reactive、computed等核心API',
    difficulty: 'intermediate',
    duration: '3小时',
    completed: false,
    icon: '⚡'
  },
  {
    id: 'state-management',
    title: '状态管理',
    description: '使用Pinia进行状态管理，学习模块化状态设计和类型安全',
    difficulty: 'intermediate',
    duration: '2.5小时',
    completed: false,
    icon: '🗃️'
  },
  {
    id: 'routing',
    title: '路由和导航',
    description: '掌握Vue Router的高级特性，实现复杂的导航和权限控制',
    difficulty: 'intermediate',
    duration: '2小时',
    completed: false,
    icon: '🧭'
  },
  {
    id: 'api-integration',
    title: 'API集成',
    description: '学习HTTP客户端封装、错误处理和数据缓存策略',
    difficulty: 'advanced',
    duration: '3小时',
    completed: false,
    icon: '🌐'
  },
  {
    id: 'testing',
    title: '测试和调试',
    description: '掌握单元测试、组件测试和端到端测试的编写技巧',
    difficulty: 'advanced',
    duration: '2.5小时',
    completed: false,
    icon: '🧪'
  }
])

const router = useRouter()

const moduleRouteMap: Record<string, string> = {
  components: '/training/components',
  composition: '/training/components',
  'state-management': '/training/state',
  routing: '/training/routing',
  'api-integration': '/training/api',
  testing: '/training/testing'
}

const startModule = (moduleId: string) => {
  const path = moduleRouteMap[moduleId]
  if (path) {
    router.push(path)
  } else {
    console.warn(`未找到模块的路由: ${moduleId}`)
  }
}
</script>
