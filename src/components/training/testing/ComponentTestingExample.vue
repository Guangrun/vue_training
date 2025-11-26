<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">{{ $t('pages.testing.componentDemo.title') }}</h3>
      <p class="text-sm text-blue-800">{{ $t('pages.testing.componentDemo.desc') }}</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6 space-y-4">
        <h4 class="text-lg font-medium text-gray-900">{{ $t('pages.testing.componentDemo.testedTitle') }}</h4>
        <TestButton
          ref="buttonRef"
          :label="label"
          :disabled="disabled"
          @clicked="onClicked"
        />
        <div class="text-sm text-gray-600">{{ $t('pages.testing.componentDemo.clicks') }}<span class="font-semibold text-gray-900">{{ clickCount }}</span></div>
      </div>

      <div class="bg-white border rounded-lg p-6 space-y-4">
        <h4 class="text-lg font-medium text-gray-900">{{ $t('pages.testing.componentDemo.interactionsTitle') }}</h4>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.testing.componentDemo.labelInput') }}</label>
            <input v-model="label" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="请输入标签">
          </div>
          <label class="inline-flex items-center space-x-2 text-sm text-gray-700">
            <input type="checkbox" v-model="disabled" class="rounded">
            <span>{{ $t('pages.testing.componentDemo.disableToggle') }}</span>
          </label>
          <div class="flex space-x-3">
            <button @click="simulateClick" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{{ $t('pages.testing.componentDemo.simulateClick') }}</button>
            <button @click="reset" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">{{ $t('pages.testing.componentDemo.reset') }}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-3">{{ $t('pages.testing.componentDemo.eventsTitle') }}</h4>
      <div v-if="events.length === 0" class="text-gray-500 text-sm">{{ $t('pages.testing.componentDemo.noEvents') }}</div>
      <div v-else class="space-y-1 max-h-60 overflow-y-auto">
        <div v-for="(e, i) in events" :key="i" class="text-sm text-gray-800">
          <span class="font-mono text-gray-500">{{ e.time }}</span>
          <span class="mx-2">•</span>
          <span class="font-medium">{{ e.type }}</span>
          <span class="mx-2">—</span>
          <span>{{ e.detail }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, h } from 'vue'

const buttonRef = ref<any>(null)
const label = ref('测试按钮')
const disabled = ref(false)
const clickCount = ref(0)
const events = ref<Array<{ time: string; type: string; detail: string }>>([])

const onClicked = (payload: { x: number; y: number }) => {
  clickCount.value++
  events.value.unshift({ time: new Date().toLocaleTimeString(), type: 'clicked', detail: `x=${payload.x}, y=${payload.y}` })
}

const simulateClick = () => {
  if (buttonRef.value) buttonRef.value.trigger()
}

const reset = () => {
  label.value = '测试按钮'
  disabled.value = false
  clickCount.value = 0
  events.value = []
}

const TestButton = defineComponent({
  name: 'TestButton',
  props: {
    label: { type: String, default: '按钮' },
    disabled: { type: Boolean, default: false }
  },
  emits: ['clicked'],
  setup(props, { emit, expose }) {
    const onClick = (e: MouseEvent) => {
      if (props.disabled) return
      emit('clicked', { x: e.clientX, y: e.clientY })
    }
    const trigger = () => emit('clicked', { x: -1, y: -1 })
    expose({ trigger })
    return () => h(
      'button',
      {
        role: 'button',
        'aria-disabled': props.disabled,
        disabled: props.disabled,
        class: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50',
        onClick
      },
      props.label
    )
  }
})
</script>
