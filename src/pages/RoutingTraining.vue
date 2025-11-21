<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('pages.router.title') }}</h1>
      <p class="text-gray-600">{{ $t('pages.router.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- 基础路由操作 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.router.basic.title') }}</h2>
        <BasicRouting />
      </div>

      <!-- 动态路由 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.router.dynamic.title') }}</h2>
        <DynamicRouting />
      </div>
    </div>

    <!-- 嵌套路由 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.router.nested.title') }}</h2>
      <NestedRouting />
    </div>

    <!-- 导航守卫 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.router.guards.title') }}</h2>
      <NavigationGuards />
    </div>

    <!-- 程序化导航 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.router.programmatic.title') }}</h2>
      <ProgrammaticNavigation />
    </div>

    <!-- 页面设计与资源 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('pages.router.design.title') }}</h2>
      <p class="text-gray-600 mb-4">{{ $t('pages.router.design.description') }}</p>
      <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
        <li>{{ $t('pages.router.design.points.structure') }}</li>
        <li>{{ $t('pages.router.design.points.naming') }}</li>
        <li>{{ $t('pages.router.design.points.lazy') }}</li>
        <li>{{ $t('pages.router.design.points.guards') }}</li>
        <li>{{ $t('pages.router.design.points.meta') }}</li>
      </ul>
      <div class="mt-4 space-x-3">
        <a href="https://router.vuejs.org/" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.router.design.links.routerDocs') }}</a>
        <a href="https://router.vuejs.org/guide/advanced/navigation-guards.html" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.router.design.links.guardsDocs') }}</a>
        <a href="https://router.vuejs.org/guide/advanced/meta.html" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.router.design.links.metaDocs') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicRouting from '@/components/training/routing/BasicRouting.vue'
import DynamicRouting from '@/components/training/routing/DynamicRouting.vue'
import NestedRouting from '@/components/training/routing/NestedRouting.vue'
import NavigationGuards from '@/components/training/routing/NavigationGuards.vue'
import ProgrammaticNavigation from '@/components/training/routing/ProgrammaticNavigation.vue'
</script>
