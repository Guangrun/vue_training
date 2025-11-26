<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">{{ $t('pages.testing.performanceDemo.title') }}</h3>
      <p class="text-sm text-blue-800">{{ $t('pages.testing.performanceDemo.desc') }}</p>
    </div>

    <div class="bg-white border rounded-lg p-6 space-y-4">
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.testing.performanceDemo.countLabel') }}</label>
          <input v-model.number="count" type="number" min="100" max="20000" class="w-full px-3 py-2 border rounded-md" />
        </div>
        <label class="inline-flex items-center space-x-2 text-sm text-gray-700">
          <input type="checkbox" v-model="optimized" class="rounded" />
          <span>{{ $t('pages.testing.performanceDemo.optimizedToggle') }}</span>
        </label>
      </div>

      <div class="flex flex-wrap gap-3">
        <button @click="run" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{{ $t('pages.testing.performanceDemo.startRender') }}</button>
        <button @click="clear" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">{{ $t('pages.testing.performanceDemo.clearList') }}</button>
      </div>

      <div class="text-sm text-gray-700">{{ $t('pages.testing.performanceDemo.duration') }}<span class="font-semibold">{{ duration }}ms</span></div>
    </div>

    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-3">{{ $t('pages.testing.performanceDemo.listTitle') }}</h4>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h5 class="font-medium text-gray-900 mb-2">{{ $t('pages.testing.performanceDemo.currentRender') }}</h5>
          <div class="max-h-64 overflow-auto border rounded">
            <ul>
              <li v-for="item in list" :key="item.id" class="px-3 py-2 text-sm text-gray-800 border-b">{{ item.text }}</li>
            </ul>
          </div>
        </div>
        <div>
          <h5 class="font-medium text-gray-900 mb-2">{{ $t('pages.testing.performanceDemo.optimizedSnapshot') }}</h5>
          <div class="max-h-64 overflow-auto border rounded">
            <ul>
              <li v-for="o in optimizedSnapshot" :key="o.id" class="px-3 py-2 text-sm text-gray-800 border-b">{{ o.text }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const count = ref(1000)
const optimized = ref(false)
const duration = ref(0)
const list = ref<Array<{ id: number; text: string }>>([])
const base = computed(() => Array.from({ length: count.value }, (_, i) => ({ id: i + 1, text: `Item #${i + 1}` })))
const optimizedSnapshot = ref<Array<{ id: number; text: string }>>([])

const run = async () => {
  const start = performance.now()
  if (!optimized.value) {
    list.value = base.value
  } else {
    const chunk = 1000
    list.value = []
    for (let i = 0; i < base.value.length; i += chunk) {
      const slice = base.value.slice(i, i + chunk)
      list.value = list.value.concat(slice)
      await new Promise(r => setTimeout(r))
    }
    optimizedSnapshot.value = base.value
  }
  duration.value = Math.round(performance.now() - start)
}

const clear = () => {
  list.value = []
  optimizedSnapshot.value = []
  duration.value = 0
}
</script>
