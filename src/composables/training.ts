import { ref, reactive, computed, watch, onMounted } from 'vue'

// 基础响应式数据
export function useBasicReactivity() {
  const count = ref(0)
  const message = reactive({
    text: 'Hello Vue 3!',
    timestamp: new Date()
  })

  const doubleCount = computed(() => count.value * 2)

  const increment = () => {
    count.value++
  }

  const updateMessage = (newText: string) => {
    message.text = newText
    message.timestamp = new Date()
  }

  return {
    count,
    message,
    doubleCount,
    increment,
    updateMessage
  }
}

// 生命周期钩子示例
export function useLifecycle() {
  const isMounted = ref(false)
  const data = ref<string[]>([])

  onMounted(() => {
    console.log('组件已挂载')
    isMounted.value = true
    // 模拟数据加载
    setTimeout(() => {
      data.value = ['Vue 3', 'Composition API', 'TypeScript']
    }, 1000)
  })

  return {
    isMounted,
    data
  }
}

// Watch监听示例
export function useWatchers() {
  const searchQuery = ref('')
  const searchResults = ref<string[]>([])
  const isSearching = ref(false)

  // 监听搜索查询
  watch(searchQuery, async (newQuery) => {
    if (!newQuery) {
      searchResults.value = []
      return
    }

    isSearching.value = true
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    
    searchResults.value = [
      `${newQuery} - 结果1`,
      `${newQuery} - 结果2`,
      `${newQuery} - 结果3`
    ]
    isSearching.value = false
  })

  return {
    searchQuery,
    searchResults,
    isSearching
  }
}

// 表单处理
export function useForm<T extends Record<string, any>>(initialValues: T) {
  const form = reactive<T>({ ...initialValues })
  const errors = reactive<Record<keyof T, string>>({} as Record<keyof T, string>)
  const isSubmitting = ref(false)

  const validate = (validators: Partial<Record<keyof T, (value: any) => string>>) => {
    let isValid = true
    
    Object.keys(validators).forEach(key => {
      const validator = validators[key as keyof T]
      if (validator) {
        const error = validator(form[key as keyof T])
        errors[key as keyof T] = error || ''
        if (error) isValid = false
      }
    })

    return isValid
  }

  const reset = () => {
    Object.assign(form, initialValues)
    Object.keys(errors).forEach(key => {
      errors[key as keyof T] = ''
    })
  }

  return {
    form,
    errors,
    isSubmitting,
    validate,
    reset
  }
}

// 本地存储
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return data
}

// 计时器
export function useTimer() {
  const seconds = ref(0)
  const isRunning = ref(false)
  let interval: number | null = null

  const start = () => {
    if (isRunning.value) return
    
    isRunning.value = true
    interval = window.setInterval(() => {
      seconds.value++
    }, 1000)
  }

  const stop = () => {
    isRunning.value = false
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  const reset = () => {
    stop()
    seconds.value = 0
  }

  const formatTime = computed(() => {
    const mins = Math.floor(seconds.value / 60)
    const secs = seconds.value % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  })

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
    formatTime
  }
}