<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.components.examples.input.basic.label') }}</label>
      <input
        v-model="basicInput"
        type="text"
        :placeholder="$t('pages.components.examples.input.basic.placeholder')"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <p class="text-sm text-gray-600 mt-1">{{ $t('pages.components.examples.input.basic.valueLabel') }} {{ basicInput }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.components.examples.input.validated.label') }}</label>
      <input
        v-model="validatedInput"
        type="email"
        :placeholder="$t('pages.components.examples.input.validated.placeholder')"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
        :class="emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
      >
      <p v-if="emailError" class="text-sm text-red-600 mt-1">{{ emailError }}</p>
      <p v-else-if="validatedInput" class="text-sm text-green-600 mt-1">{{ $t('pages.components.examples.input.validated.ok') }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.components.examples.input.textarea.label') }}</label>
      <textarea
        v-model="textareaInput"
        rows="3"
        :placeholder="$t('pages.components.examples.input.textarea.placeholder')"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <p class="text-sm text-gray-600 mt-1">{{ $t('pages.components.examples.input.textarea.countLabel') }} {{ textareaInput.length }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('pages.components.examples.input.select.label') }}</label>
      <select
        v-model="selectedOption"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{{ $t('pages.components.examples.input.select.placeholder') }}</option>
        <option value="option1">{{ $t('pages.components.examples.input.select.options.one') }}</option>
        <option value="option2">{{ $t('pages.components.examples.input.select.options.two') }}</option>
        <option value="option3">{{ $t('pages.components.examples.input.select.options.three') }}</option>
      </select>
      <p class="text-sm text-gray-600 mt-1">{{ $t('pages.components.examples.input.select.selectedLabel') }} {{ selectedOption || $t('pages.components.examples.input.select.none') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const basicInput = ref('')
const validatedInput = ref('')
const textareaInput = ref('')
const selectedOption = ref('')

const emailError = computed(() => {
  if (!validatedInput.value) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(validatedInput.value) ? '' : (t('pages.components.examples.input.errors.emailInvalid') as string)
})
</script>
