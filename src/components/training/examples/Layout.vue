<template>
  <div class="space-y-4">
    <header v-if="$slots.header" class="border-b pb-4">
      <slot name="header"></slot>
    </header>
    
    <main v-if="$slots.default" class="py-4">
      <slot></slot>
    </main>
    
    <footer v-if="$slots.footer" class="border-t pt-4">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
// 布局组件，使用具名插槽
</script>