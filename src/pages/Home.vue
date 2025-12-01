<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {{ $t('home.hero.title') }}
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        {{ $t('home.hero.subtitle') }}
      </p>
      <div class="flex justify-center space-x-4">
        <router-link 
          to="/training" 
          class="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {{ $t('home.hero.ctaStart') }}
        </router-link>
        <router-link 
          to="/tasks" 
          class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          {{ $t('home.hero.ctaViewProjects') }}
        </router-link>
      </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.features.components.title') }}</h3>
        <p class="text-gray-600">{{ $t('home.features.components.desc') }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.features.state.title') }}</h3>
        <p class="text-gray-600">{{ $t('home.features.state.desc') }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.features.router.title') }}</h3>
        <p class="text-gray-600">{{ $t('home.features.router.desc') }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.features.api.title') }}</h3>
        <p class="text-gray-600">{{ $t('home.features.api.desc') }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.features.testing.title') }}</h3>
        <p class="text-gray-600">{{ $t('home.features.testing.desc') }}</p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.features.best.title') }}</h3>
        <p class="text-gray-600">{{ $t('home.features.best.desc') }}</p>
      </div>
    </div>

    <div class="bg-white p-8 rounded-lg shadow-sm border">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('home.highlights.title') }}</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.highlights.stepByStep.title') }}</h3>
          <p class="text-gray-600 mb-4">{{ $t('home.highlights.stepByStep.desc') }}</p>
          
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.highlights.practice.title') }}</h3>
          <p class="text-gray-600">{{ $t('home.highlights.practice.desc') }}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.highlights.modernStack.title') }}</h3>
          <p class="text-gray-600 mb-4">{{ $t('home.highlights.modernStack.desc') }}</p>
          
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.highlights.best.title2') }}</h3>
          <p class="text-gray-600">{{ $t('home.highlights.best.desc2') }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white p-8 rounded-lg shadow-sm border mt-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('home.repo.title') }}</h2>
      <div class="flex items-center space-x-3 mb-4">
        <a href="https://github.com/Guangrun/vue_training" target="_blank" rel="noopener" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {{ $t('home.repo.linkLabel') }}
        </a>
        <span class="text-gray-500">https://github.com/Guangrun/vue_training</span>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-gray-50 border rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.repo.windowsTitle') }}</h3>
          <pre class="text-sm bg-white border rounded p-3 overflow-x-auto"><code>git clone https://github.com/Guangrun/vue_training.git
cd vue_training
npm install
npm run dev</code></pre>
        </div>
        <div class="bg-gray-50 border rounded-lg p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $t('home.repo.macosTitle') }}</h3>
          <pre class="text-sm bg-white border rounded p-3 overflow-x-auto"><code>git clone https://github.com/Guangrun/vue_training.git
cd vue_training
npm install
npm run dev</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 首页组件
</script>
