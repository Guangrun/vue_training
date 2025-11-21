<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('pages.components.title') }}</h1>
      <p class="text-gray-600">{{ $t('pages.components.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- 基础组件示例 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.components.basicExamples.title') }}</h2>
        
        <!-- 计数器组件 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-800 mb-3">{{ $t('pages.components.basicExamples.counter.title') }}</h3>
          <CounterExample />
        </div>

        <!-- 输入框组件 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-800 mb-3">{{ $t('pages.components.basicExamples.input.title') }}</h3>
          <InputExample />
        </div>
      </div>

      <!-- 高级组件示例 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.components.advancedExamples.title') }}</h2>
        
        <!-- 搜索组件 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-800 mb-3">{{ $t('pages.components.advancedExamples.search.title') }}</h3>
          <SearchExample />
        </div>

        <!-- 表单组件 -->
        <div class="mb-6">
          <h3 class="text-lg font-medium text-gray-800 mb-3">{{ $t('pages.components.advancedExamples.form.title') }}</h3>
          <FormExample />
        </div>
      </div>
    </div>

    <!-- 组件通信示例 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.components.communication.title') }}</h2>
      <ParentChildCommunication />
    </div>

    <!-- 插槽示例 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.components.slot.title') }}</h2>
      <SlotExample />
    </div>

    <!-- 页面设计与资源 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('pages.components.design.title') }}</h2>
      <p class="text-gray-600 mb-4">{{ $t('pages.components.design.description') }}</p>
      <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
        <li>{{ $t('pages.components.design.points.atomic') }}</li>
        <li>{{ $t('pages.components.design.points.propsEmits') }}</li>
        <li>{{ $t('pages.components.design.points.slots') }}</li>
        <li>{{ $t('pages.components.design.points.composition') }}</li>
        <li>{{ $t('pages.components.design.points.a11y') }}</li>
      </ul>
      <div class="mt-4 space-x-3">
        <a href="https://vuejs.org/style-guide/" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.components.design.links.vueStyleGuide') }}</a>
        <a href="https://vuejs.org/guide/" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.components.design.links.vueDocs') }}</a>
        <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.components.design.links.a11yWcag') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CounterExample from '@/components/training/examples/CounterExample.vue'
import InputExample from '@/components/training/examples/InputExample.vue'
import SearchExample from '@/components/training/examples/SearchExample.vue'
import FormExample from '@/components/training/examples/FormExample.vue'
import ParentChildCommunication from '@/components/training/examples/ParentChildCommunication.vue'
import SlotExample from '@/components/training/examples/SlotExample.vue'
</script>
