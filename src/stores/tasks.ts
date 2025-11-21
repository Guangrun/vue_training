import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
  priority: 'low' | 'medium' | 'high'
  category?: string
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([
    {
      id: 1,
      title: '学习Vue 3 Composition API',
      description: '掌握ref、reactive、computed等核心概念',
      completed: true,
      dueDate: '2024-01-15',
      createdAt: '2024-01-10',
      priority: 'high',
      category: '学习'
    },
    {
      id: 2,
      title: '实现任务管理功能',
      description: '创建一个完整的任务管理系统',
      completed: false,
      dueDate: '2024-01-20',
      createdAt: '2024-01-12',
      priority: 'medium',
      category: '项目'
    },
    {
      id: 3,
      title: '学习Pinia状态管理',
      description: '使用Pinia管理应用状态',
      completed: false,
      dueDate: '2024-01-25',
      createdAt: '2024-01-14',
      priority: 'medium',
      category: '学习'
    }
  ])

  const filter = ref<'all' | 'completed' | 'pending' | 'overdue'>('all')
  const searchQuery = ref('')

  const filteredTasks = computed(() => {
    let result = tasks.value

    // 应用搜索过滤
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      )
    }

    // 应用状态过滤
    switch (filter.value) {
      case 'completed':
        result = result.filter(task => task.completed)
        break
      case 'pending':
        result = result.filter(task => !task.completed)
        break
      case 'overdue':
        result = result.filter(task => {
          if (!task.dueDate || task.completed) return false
          return new Date(task.dueDate) < new Date()
        })
        break
    }

    return result
  })

  const stats = computed(() => {
    const total = tasks.value.length
    const completed = tasks.value.filter(task => task.completed).length
    const pending = total - completed
    const overdue = tasks.value.filter(task => {
      if (!task.dueDate || task.completed) return false
      return new Date(task.dueDate) < new Date()
    }).length

    return {
      total,
      completed,
      pending,
      overdue
    }
  })

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    tasks.value.push(newTask)
  }

  const updateTask = (id: number, updates: Partial<Task>) => {
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  const toggleTask = (id: number) => {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  const setFilter = (newFilter: typeof filter.value) => {
    filter.value = newFilter
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    tasks,
    filter,
    searchQuery,
    filteredTasks,
    stats,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    setSearchQuery
  }
})