<template>
  <div class="max-w-md mx-auto px-4 py-16 text-center">
    <div class="bg-white rounded-lg shadow-sm border p-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">登录回调处理中</h1>
      <p class="text-gray-600 mb-4">请稍候，正在完成认证流程...</p>
      <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const error = auth.error

onMounted(async () => {
  await auth.completeLogin()
  if (auth.isAuthenticated) {
    router.replace('/')
  }
})
</script>

