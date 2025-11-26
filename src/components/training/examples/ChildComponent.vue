<template>
  <div class="bg-white border border-gray-200 p-4 rounded-lg">
    <h4 class="text-lg font-medium text-gray-900 mb-4">{{ $t('pages.components.examples.child.title') }}</h4>
    
    <div class="space-y-4">
      <div class="text-sm text-gray-600">
        <p>{{ $t('pages.components.examples.child.receivedMessage') }} {{ message }}</p>
        <p>{{ $t('pages.components.examples.child.receivedCount') }} {{ count }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.components.examples.child.replyLabel') }}</label>
        <input
          v-model="responseMessage"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
      </div>

      <div class="flex space-x-3">
        <button
          @click="sendResponse"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          {{ $t('pages.components.examples.child.replyButton') }}
        </button>
        <button
          @click="updateCount"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          {{ $t('pages.components.examples.child.updateCount') }}
        </button>
      </div>

      <div class="text-sm text-gray-600">
        <p>{{ $t('pages.components.examples.child.localCountLabel') }} {{ localCount }}</p>
      </div>

      <button
        @click="incrementLocal"
        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        {{ $t('pages.components.examples.child.increaseLocal') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

interface Props {
  message: string
  count: number
}

interface Emits {
  (e: 'response', message: string): void
  (e: 'count-update', count: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const responseMessage = ref(t('pages.components.examples.child.defaultReply') as string)
const localCount = ref(0)

const sendResponse = () => {
  emit('response', responseMessage.value)
}

const updateCount = () => {
  const newCount = props.count + 1
  emit('count-update', newCount)
}

const incrementLocal = () => {
  localCount.value++
}
</script>
