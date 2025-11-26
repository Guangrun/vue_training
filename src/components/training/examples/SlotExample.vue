<template>
  <div class="space-y-6">
    <!-- 默认插槽示例 -->
    <div class="bg-white border rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900 mb-4">{{ $t('pages.components.examples.slot.defaultTitle') }}</h3>
      <Card>
        <h4 class="text-lg font-semibold text-gray-800">{{ $t('pages.components.examples.slot.cardTitle') }}</h4>
        <p class="text-gray-600">{{ $t('pages.components.examples.slot.defaultContent') }}</p>
      </Card>
    </div>

    <!-- 具名插槽示例 -->
    <div class="bg-white border rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900 mb-4">{{ $t('pages.components.examples.slot.namedTitle') }}</h3>
      <Layout>
        <template #header>
          <div class="bg-blue-100 p-3 rounded">
            <h4 class="text-blue-800 font-medium">{{ $t('pages.components.examples.slot.namedHeader') }}</h4>
          </div>
        </template>
        
        <template #default>
          <div class="bg-gray-50 p-3 rounded">
            <p class="text-gray-700">{{ $t('pages.components.examples.slot.namedBody') }}</p>
          </div>
        </template>
        
        <template #footer>
          <div class="bg-green-100 p-3 rounded">
            <p class="text-green-800 text-sm">{{ $t('pages.components.examples.slot.namedFooter') }}</p>
          </div>
        </template>
      </Layout>
    </div>

    <!-- 作用域插槽示例 -->
    <div class="bg-white border rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900 mb-4">{{ $t('pages.components.examples.slot.scopedTitle') }}</h3>
      <UserList :users="users">
        <template #default="{ user, index }">
          <div class="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
            <span class="font-medium">{{ user.name }}</span>
            <span class="text-sm text-gray-600">#{{ index + 1 }}</span>
          </div>
        </template>
      </UserList>
    </div>

    <!-- 动态插槽示例 -->
    <div class="bg-white border rounded-lg p-4">
      <h3 class="text-lg font-medium text-gray-900 mb-4">{{ $t('pages.components.examples.slot.dynamicTitle') }}</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('pages.components.examples.slot.selectLabel') }}</label>
        <select
          v-model="selectedSlot"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="header">{{ $t('pages.components.examples.slot.options.header') }}</option>
          <option value="content">{{ $t('pages.components.examples.slot.options.content') }}</option>
          <option value="sidebar">{{ $t('pages.components.examples.slot.options.sidebar') }}</option>
        </select>
      </div>
      <DynamicLayout :slot-name="selectedSlot">
        <template #[selectedSlot]>
          <div class="bg-purple-100 p-3 rounded text-purple-800">
            {{ $t('pages.components.examples.slot.dynamicContent', { slot: selectedSlot }) }}
          </div>
        </template>
      </DynamicLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'
import Layout from './Layout.vue'
import UserList from './UserList.vue'
import DynamicLayout from './DynamicLayout.vue'

const users = ref([
  { id: 1, name: '张三', email: 'zhang@example.com' },
  { id: 2, name: '李四', email: 'li@example.com' },
  { id: 3, name: '王五', email: 'wang@example.com' }
])

const selectedSlot = ref('header')
</script>
