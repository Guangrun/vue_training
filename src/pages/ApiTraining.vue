<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('pages.api.title') }}</h1>
      <p class="text-gray-600">{{ $t('pages.api.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- HTTP客户端 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.api.httpClient.title') }}</h2>
        <HttpClientExample />
      </div>

      <!-- 错误处理 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.api.errorHandling.title') }}</h2>
        <ErrorHandlingExample />
      </div>
    </div>

    <!-- 数据缓存 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.api.caching.title') }}</h2>
      <DataCachingExample />
    </div>

    <!-- 表单处理 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.api.formHandling.title') }}</h2>
      <FormHandlingExample />
    </div>

    <!-- 文件上传 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.api.fileUpload.title') }}</h2>
      <FileUploadExample />
    </div>

    <!-- 页面设计与资源 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('pages.api.design.title') }}</h2>
      <p class="text-gray-600 mb-4">{{ $t('pages.api.design.description') }}</p>
      <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
        <li>{{ $t('pages.api.design.points.abstraction') }}</li>
        <li>{{ $t('pages.api.design.points.errors') }}</li>
        <li>{{ $t('pages.api.design.points.caching') }}</li>
        <li>{{ $t('pages.api.design.points.schema') }}</li>
        <li>{{ $t('pages.api.design.points.security') }}</li>
      </ul>
      <div class="mt-4 space-x-3">
        <a href="https://developer.mozilla.org/docs/Web/API/Fetch_API" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.api.design.links.fetchDocs') }}</a>
        <a href="https://github.com/microsoft/api-guidelines" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.api.design.links.restGuide') }}</a>
        <a href="https://developer.mozilla.org/docs/Web/HTTP/Caching" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.api.design.links.httpCaching') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HttpClientExample from '@/components/training/api/HttpClientExample.vue'
import ErrorHandlingExample from '@/components/training/api/ErrorHandlingExample.vue'
import DataCachingExample from '@/components/training/api/DataCachingExample.vue'
import FormHandlingExample from '@/components/training/api/FormHandlingExample.vue'
import FileUploadExample from '@/components/training/api/FileUploadExample.vue'
</script>
