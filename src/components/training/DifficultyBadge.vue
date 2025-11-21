<template>
  <span 
    class="px-2 py-1 text-xs font-medium rounded-full"
    :class="badgeClass"
  >
    {{ difficultyText }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  level: 'beginner' | 'intermediate' | 'advanced'
}

const props = defineProps<Props>()

const { t } = useI18n()

const difficultyText = computed(() => {
  const texts = {
    beginner: t('training.difficulty.beginner') as string,
    intermediate: t('training.difficulty.intermediate') as string,
    advanced: t('training.difficulty.advanced') as string
  }
  return texts[props.level]
})

const badgeClass = computed(() => {
  const classes = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }
  return classes[props.level]
})
</script>
