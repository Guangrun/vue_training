<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('admin.users.title') }}</h2>
    
    <div class="mb-4">
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        {{ $t('admin.users.actions.add') }}
      </button>
    </div>
    
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('admin.users.table.name') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('admin.users.table.email') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('admin.users.table.status') }}
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('admin.users.table.actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ user.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ user.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {{ $t('admin.users.table.active') }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="text-blue-600 hover:text-blue-900 mr-3">{{ $t('admin.users.table.edit') }}</button>
              <button class="text-red-600 hover:text-red-900">{{ $t('admin.users.table.delete') }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const users = [
  { id: 1, name: '张三', email: 'zhang@example.com', status: 'active' },
  { id: 2, name: '李四', email: 'li@example.com', status: 'active' },
  { id: 3, name: '王五', email: 'wang@example.com', status: 'active' },
  { id: 4, name: '赵六', email: 'zhao@example.com', status: 'active' },
]
</script>
