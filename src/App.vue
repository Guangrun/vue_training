<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">{{ $t('app.title') }}</h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/" 
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-blue-600': $route.path === '/' }"
            >
              {{ $t('nav.home') }}
            </router-link>
            <router-link 
              to="/training" 
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-blue-600': $route.path === '/training' }"
            >
              {{ $t('nav.training') }}
            </router-link>
            <router-link 
              to="/tasks" 
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-blue-600': $route.path === '/tasks' }"
            >
              {{ $t('nav.tasks') }}
            </router-link>

            <div class="flex items-center">
              <label class="text-sm text-gray-600 mr-2">{{ $t('nav.language') }}</label>
              <select v-model="currentLocale" @change="onLocaleChange" class="border px-2 py-1 rounded text-sm">
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <button
              v-if="!isAuthenticated"
              @click="goLogin"
              class="ml-4 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              登录
            </button>
            <button
              v-else
              @click="logout"
              class="ml-4 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              退出
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from './i18n'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const { locale } = useI18n()
const currentLocale = ref(locale.value)

const onLocaleChange = () => {
  setLocale(currentLocale.value)
}

const router = useRouter()
const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)
const goLogin = () => router.push('/login')
const logout = () => auth.logout()
</script>
