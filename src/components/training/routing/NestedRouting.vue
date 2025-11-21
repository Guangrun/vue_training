<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">嵌套路由演示</h3>
      <p class="text-sm text-blue-800">点击下面的链接查看嵌套路由效果</p>
    </div>

    <div class="bg-white border rounded-lg">
      <div class="border-b bg-gray-50">
        <div class="flex space-x-1 p-2">
          <router-link
            to="/admin"
            class="px-4 py-2 text-sm font-medium rounded-md transition-colors"
            :class="$route.path === '/admin' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'"
          >
            仪表板
          </router-link>
          <router-link
            to="/admin/users"
            class="px-4 py-2 text-sm font-medium rounded-md transition-colors"
            :class="$route.path === '/admin/users' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'"
          >
            用户管理
          </router-link>
          <router-link
            to="/admin/settings"
            class="px-4 py-2 text-sm font-medium rounded-md transition-colors"
            :class="$route.path === '/admin/settings' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'"
          >
            系统设置
          </router-link>
        </div>
      </div>
      
      <div class="p-6">
        <router-view />
      </div>
    </div>

    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-medium text-green-900 mb-2">嵌套路由说明</h4>
      <ul class="text-sm text-green-800 space-y-1">
        <li>• 嵌套路由允许在父路由的组件中渲染子路由</li>
        <li>• 子路由的路径会继承父路由的路径</li>
        <li>• 使用 &lt;router-view /&gt; 渲染子路由组件</li>
        <li>• 适合构建具有层级结构的页面</li>
      </ul>
    </div>

    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">当前嵌套路由信息</h4>
      <div class="text-sm text-yellow-800 space-y-1">
        <p>完整路径: {{ $route.path }}</p>
        <p>路由名称: {{ $route.name }}</p>
        <p>父路由: /admin</p>
        <p>子路由: {{ $route.path.replace('/admin', '') || '/' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 嵌套路由示例组件
</script>