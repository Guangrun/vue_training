<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">当前路由信息</h3>
      <div class="text-sm text-blue-800 space-y-1">
        <p>路径: {{ $route.path }}</p>
        <p>名称: {{ $route.name }}</p>
        <p>查询参数: {{ JSON.stringify($route.query) }}</p>
        <p>参数: {{ JSON.stringify($route.params) }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">声明式导航</h4>
      
      <div class="grid gap-2">
        <router-link 
          to="/" 
          class="block p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 border-blue-300': $route.path === '/' }"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium">首页</span>
            <span class="text-sm text-gray-500">/</span>
          </div>
        </router-link>

        <router-link 
          to="/training" 
          class="block p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 border-blue-300': $route.path === '/training' }"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium">培训模块</span>
            <span class="text-sm text-gray-500">/training</span>
          </div>
        </router-link>

        <router-link 
          to="/tasks" 
          class="block p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 border-blue-300': $route.path === '/tasks' }"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium">任务管理</span>
            <span class="text-sm text-gray-500">/tasks</span>
          </div>
        </router-link>

        <router-link 
          to="/training/components" 
          class="block p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors"
          :class="{ 'bg-blue-50 border-blue-300': $route.path === '/training/components' }"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium">组件培训</span>
            <span class="text-sm text-gray-500">/training/components</span>
          </div>
        </router-link>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">带查询参数的导航</h4>
      
      <div class="flex flex-wrap gap-2">
        <router-link 
          :to="{ path: '/tasks', query: { filter: 'completed' } }"
          class="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
        >
          已完成任务
        </router-link>

        <router-link 
          :to="{ path: '/tasks', query: { filter: 'pending' } }"
          class="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
        >
          待处理任务
        </router-link>

        <router-link 
          :to="{ path: '/tasks', query: { sort: 'date' } }"
          class="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
        >
          按日期排序
        </router-link>
      </div>

      <div class="p-3 bg-gray-50 rounded-md">
        <p class="text-sm text-gray-600">当前查询参数:</p>
        <pre class="text-xs text-gray-800 mt-1">{{ JSON.stringify($route.query, null, 2) }}</pre>
      </div>
    </div>

    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-medium text-green-900 mb-2">导航提示</h4>
      <ul class="text-sm text-green-800 space-y-1">
        <li>• 点击上面的链接查看不同的导航效果</li>
        <li>• 注意观察URL的变化和当前路由的激活状态</li>
        <li>• 查询参数可以在URL中看到，如 ?filter=completed</li>
        <li>• 使用浏览器的后退/前进按钮测试导航历史</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// 基础路由操作组件
</script>