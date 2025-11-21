<template>
  <div class="border border-gray-200 rounded-lg p-4">
    <slot :name="slotName"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  slotName: string
}

defineProps<Props>()
</script>