<template>
  <div class="space-y-2">
    <div 
      v-for="(user, index) in users" 
      :key="user.id"
    >
      <slot :user="user" :index="index"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
}

interface Props {
  users: User[]
}

defineProps<Props>()
</script>