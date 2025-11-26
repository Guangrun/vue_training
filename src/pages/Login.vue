<template>
  <div class="max-w-md mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-sm border p-6 space-y-4">
      <h1 class="text-2xl font-bold text-gray-900">{{ $t('pages.login.title') }}</h1>
      <p class="text-gray-600 text-sm">{{ $t('pages.login.desc') }}</p>
      <ul class="text-sm text-gray-700 list-disc pl-5">
        <li>{{ $t('pages.login.vars.issuer') }}</li>
        <li>{{ $t('pages.login.vars.clientId') }}</li>
        <li>{{ $t('pages.login.vars.redirect') }}</li>
        <li>{{ $t('pages.login.vars.logoutRedirect') }}</li>
        <li>{{ $t('pages.login.vars.scopes') }}</li>
      </ul>
      <div class="flex space-x-3">
        <button @click="login" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{{ $t('pages.login.actions.loginOidc') }}</button>
        <button v-if="isAuthenticated" @click="logout" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">{{ $t('pages.login.actions.logout') }}</button>
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
