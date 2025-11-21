import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 基础计数器Store
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Vue 3')
  
  const doubleCount = computed(() => count.value * 2)
  const tripleCount = computed(() => count.value * 3)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function incrementBy(amount: number) {
    count.value += amount
  }
  
  function reset() {
    count.value = 0
  }
  
  return {
    count,
    name,
    doubleCount,
    tripleCount,
    increment,
    decrement,
    incrementBy,
    reset
  }
})

// 用户Store
export const useUserStore = defineStore('user', () => {
  const users = ref([
    { id: 1, name: '张三', email: 'zhang@example.com', age: 25 },
    { id: 2, name: '李四', email: 'li@example.com', age: 30 },
    { id: 3, name: '王五', email: 'wang@example.com', age: 35 }
  ])
  
  const currentUser = ref(users.value[0])
  
  const userCount = computed(() => users.value.length)
  const averageAge = computed(() => {
    if (users.value.length === 0) return 0
    const totalAge = users.value.reduce((sum, user) => sum + user.age, 0)
    return Math.round(totalAge / users.value.length)
  })
  
  function addUser(user: { name: string; email: string; age: number }) {
    const newUser = {
      id: Math.max(...users.value.map(u => u.id)) + 1,
      ...user
    }
    users.value.push(newUser)
  }
  
  function removeUser(id: number) {
    const index = users.value.findIndex(user => user.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }
  
  function updateUser(id: number, updates: Partial<{ name: string; email: string; age: number }>) {
    const user = users.value.find(user => user.id === id)
    if (user) {
      Object.assign(user, updates)
    }
  }
  
  function setCurrentUser(userId: number) {
    const user = users.value.find(user => user.id === userId)
    if (user) {
      currentUser.value = user
    }
  }
  
  return {
    users,
    currentUser,
    userCount,
    averageAge,
    addUser,
    removeUser,
    updateUser,
    setCurrentUser
  }
})

// 主题Store（用于演示状态持久化）
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)
  const primaryColor = ref('#3b82f6')
  
  const themeClass = computed(() => ({
    'bg-white text-gray-900': !isDark.value,
    'bg-gray-900 text-white': isDark.value
  }))
  
  function toggleTheme() {
    isDark.value = !isDark.value
  }
  
  function setPrimaryColor(color: string) {
    primaryColor.value = color
  }
  
  return {
    isDark,
    primaryColor,
    themeClass,
    toggleTheme,
    setPrimaryColor
  }
})