<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('pages.testing.title') }}</h1>
      <p class="text-gray-600">{{ $t('pages.testing.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- 单元测试 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.testing.unit.title') }}</h2>
        <UnitTestingExample />
      </div>

      <!-- 组件测试 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.testing.component.title') }}</h2>
        <ComponentTestingExample />
      </div>
    </div>

    <!-- 调试技巧 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.testing.debug.title') }}</h2>
      <DebuggingExample />
    </div>

    <!-- 性能测试 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.testing.performance.title') }}</h2>
      <PerformanceTestingExample />
    </div>

    <!-- 页面设计与资源 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('pages.testing.design.title') }}</h2>
      <p class="text-gray-600 mb-4">{{ $t('pages.testing.design.description') }}</p>
      <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
        <li>{{ $t('pages.testing.design.points.pyramid') }}</li>
        <li>{{ $t('pages.testing.design.points.behavior') }}</li>
        <li>{{ $t('pages.testing.design.points.selectors') }}</li>
        <li>{{ $t('pages.testing.design.points.mocks') }}</li>
        <li>{{ $t('pages.testing.design.points.perf') }}</li>
      </ul>
      <div class="mt-4 space-x-3">
        <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.testing.design.links.vueTestUtils') }}</a>
        <a href="https://vitest.dev/" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.testing.design.links.vitestDocs') }}</a>
        <a href="https://testing-library.com/docs/guiding-principles" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.testing.design.links.testingLibrary') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UnitTestingExample from '@/components/training/testing/UnitTestingExample.vue'
import ComponentTestingExample from '@/components/training/testing/ComponentTestingExample.vue'
import DebuggingExample from '@/components/training/testing/DebuggingExample.vue'
import PerformanceTestingExample from '@/components/training/testing/PerformanceTestingExample.vue'
</script>
