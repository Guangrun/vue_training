<template>
  <div class="max-w-md mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-sm border p-6 space-y-4">
      <h1 class="text-2xl font-bold text-gray-900">登录</h1>
      <p class="text-gray-600 text-sm">使用 OpenID 登录。本页面使用环境变量进行配置。</p>
      <ul class="text-sm text-gray-700 list-disc pl-5">
        <li>VITE_OIDC_ISSUER</li>
        <li>VITE_OIDC_CLIENT_ID</li>
        <li>VITE_OIDC_REDIRECT_URI（指向本应用回调地址）</li>
        <li>VITE_OIDC_LOGOUT_REDIRECT_URI（可选）</li>
        <li>VITE_OIDC_SCOPES（默认 openid profile email）</li>
      </ul>
      <div class="flex space-x-3">
        <button @click="login" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">使用 OpenID 登录</button>
        <button v-if="isAuthenticated" @click="logout" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">退出</button>
      </div>
      <div v-if="error" class="text-sm text-red-600">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { isAuthenticated, error } = storeToRefs(auth)

const login = () => auth.login()
const logout = () => auth.logout()
</script>

