<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 bg-blue-50 rounded-lg">
        <h4 class="text-sm font-medium text-blue-900 mb-2">{{ $t('pages.state.module.counter.title') }}</h4>
        <div class="text-2xl font-bold text-blue-600">{{ counter.count }}</div>
        <div class="text-sm text-blue-700">{{ counter.doubleCount }}</div>
      </div>
      
      <div class="p-4 bg-green-50 rounded-lg">
        <h4 class="text-sm font-medium text-green-900 mb-2">{{ $t('pages.state.module.user.title') }}</h4>
        <div class="text-2xl font-bold text-green-600">{{ userStore.userCount }}</div>
        <div class="text-sm text-green-700">{{ userStore.averageAge }}{{ $t('pages.state.module.user.ageSuffix') }}</div>
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-3">{{ $t('pages.state.module.cross.title') }}</h4>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">{{ $t('pages.state.module.cross.counterAffectsUsers') }}</span>
          <span class="text-sm font-medium" :class="userCountBasedOnCounter > 0 ? 'text-green-600' : 'text-gray-400'">
            {{ userCountBasedOnCounter }} {{ $t('pages.state.module.cross.userCountLabel') }}
          </span>
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">{{ $t('pages.state.module.cross.userAgeAffectsCounter') }}</span>
          <span class="text-sm font-medium text-blue-600">
            +{{ counterBonus }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-3">
        <h5 class="font-medium text-gray-900">{{ $t('pages.state.module.counter.controlTitle') }}</h5>
        <div class="flex space-x-2">
          <button
            @click="counter.increment"
            class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            +1
          </button>
          <button
            @click="counter.decrement"
            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            -1
          </button>
          <button
            @click="counter.reset"
            class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            {{ $t('pages.state.module.counter.reset') }}
          </button>
        </div>
      </div>
      
      <div class="space-y-3">
        <h5 class="font-medium text-gray-900">{{ $t('pages.state.module.user.controlTitle') }}</h5>
        <div class="flex space-x-2">
          <button
            @click="addRandomUser"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            {{ $t('pages.state.module.user.add') }}
          </button>
          <button
            @click="removeLastUser"
            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            {{ $t('pages.state.module.user.delete') }}
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h5 class="font-medium text-yellow-900 mb-2">{{ $t('pages.state.module.logs.title') }}</h5>
      <div class="text-sm text-yellow-800 space-y-1 max-h-32 overflow-y-auto">
        <p v-for="(log, index) in communicationLogs" :key="index" class="text-xs">
          {{ log }}
        </p>
      </div>
    </div>

    <div class="text-center">
      <button
        @click="showAdvanced = !showAdvanced"
        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        {{ $t('pages.state.module.advanced.toggle') }}
      </button>
    </div>

    <div v-if="showAdvanced" class="p-4 bg-purple-50 rounded-lg space-y-4">
      <h5 class="font-medium text-purple-900">{{ $t('pages.state.module.advanced.title') }}</h5>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.state.module.advanced.incrementLabel') }}</label>
          <div class="flex space-x-2">
            <input
              v-model.number="customIncrement"
              type="number"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
            <button
              @click="counter.incrementBy(customIncrement)"
              class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            >
              {{ $t('pages.state.module.advanced.apply') }}
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.state.module.advanced.ageLabel') }}</label>
          <div class="flex space-x-2">
            <input
              v-model.number="customAge"
              type="number"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
            <button
              @click="addUserWithAge"
              class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            >
              {{ $t('pages.state.module.advanced.add') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCounterStore, useUserStore } from '@/stores/training'

const counter = useCounterStore()
const userStore = useUserStore()
const communicationLogs = ref<string[]>([])
const showAdvanced = ref(false)
const customIncrement = ref(5)
const customAge = ref(25)

// 计算属性：基于计数器的用户数量
const userCountBasedOnCounter = computed(() => {
  return Math.floor(counter.count / 10)
})

// 计算属性：基于用户平均年龄的计数器奖励
const counterBonus = computed(() => {
  const avgAge = userStore.averageAge
  return avgAge > 30 ? 2 : 0
})

// 监听计数器变化
watch(() => counter.count, (newCount, oldCount) => {
  communicationLogs.value.push(t('pages.state.module.logs.counterChanged', { old: oldCount, new: newCount }) as string)
  
  // 每增加10个计数，添加一个用户
  if (newCount % 10 === 0 && newCount > oldCount) {
    const userNames = [
      t('pages.state.module.sampleNames.zhKids[0]') as string,
      t('pages.state.module.sampleNames.zhKids[1]') as string,
      t('pages.state.module.sampleNames.zhKids[2]') as string,
      t('pages.state.module.sampleNames.zhKids[3]') as string,
      t('pages.state.module.sampleNames.zhKids[4]') as string
    ]
    const randomName = userNames[Math.floor(Math.random() * userNames.length)]
    userStore.addUser({
      name: randomName,
      email: `${randomName.toLowerCase()}@example.com`,
      age: 20 + Math.floor(Math.random() * 20)
    })
    communicationLogs.value.push(t('pages.state.module.logs.autoAddUser', { name: randomName }) as string)
  }
})

// 监听用户变化
watch(() => userStore.users.length, (newLength, oldLength) => {
  if (newLength !== oldLength) {
    communicationLogs.value.push(t('pages.state.module.logs.userCountChanged', { old: oldLength, new: newLength }) as string)
  }
})

const addRandomUser = () => {
  const names = [
    t('pages.state.module.sampleNames.zhAdults[0]') as string,
    t('pages.state.module.sampleNames.zhAdults[1]') as string,
    t('pages.state.module.sampleNames.zhAdults[2]') as string,
    t('pages.state.module.sampleNames.zhAdults[3]') as string,
    t('pages.state.module.sampleNames.zhAdults[4]') as string
  ]
  const randomName = names[Math.floor(Math.random() * names.length)]
  userStore.addUser({
    name: randomName,
    email: `${randomName.toLowerCase()}@example.com`,
    age: 20 + Math.floor(Math.random() * 30)
  })
}

const removeLastUser = () => {
  if (userStore.users.length > 0) {
    const lastUser = userStore.users[userStore.users.length - 1]
    userStore.removeUser(lastUser.id)
  }
}

const addUserWithAge = () => {
  const names = [
    t('pages.state.module.sampleNames.generic[0]') as string,
    t('pages.state.module.sampleNames.generic[1]') as string,
    t('pages.state.module.sampleNames.generic[2]') as string
  ]
  const randomName = names[Math.floor(Math.random() * names.length)]
  userStore.addUser({
    name: randomName,
    email: `${randomName.toLowerCase()}@example.com`,
    age: customAge.value
  })
}
</script>
const { t } = useI18n()
