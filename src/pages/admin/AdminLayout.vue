<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('admin.layout.title') }}</h1>
      <button @click="logout" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
        {{ $t('admin.layout.logout') }}
      </button>
    </div>
    
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- 侧边栏导航 -->
      <div class="lg:w-64">
        <nav class="bg-white border rounded-lg p-4">
          <ul class="space-y-2">
            <li>
              <router-link
                to="/admin"
                class="block px-4 py-2 text-sm font-medium rounded-md transition-colors"
                :class="$route.path === '/admin' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'"
              >
                📊 {{ $t('admin.sidebar.dashboard') }}
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/users"
                class="block px-4 py-2 text-sm font-medium rounded-md transition-colors"
                :class="$route.path === '/admin/users' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'"
              >
                👥 {{ $t('admin.sidebar.users') }}
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/settings"
                class="block px-4 py-2 text-sm font-medium rounded-md transition-colors"
                :class="$route.path === '/admin/settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'"
              >
                ⚙️ {{ $t('admin.sidebar.settings') }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      
      <!-- 主要内容区域 -->
      <div class="flex-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()

const logout = () => {
  auth.logout()
}
</script>
