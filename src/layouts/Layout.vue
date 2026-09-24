<template>
  <div class="bg-gray-800 min-h-screen flex flex-col">
    <nav class="container mx-auto flex items-center justify-between">
      <div class="text-white font-bold text-lg">
        Todo App
      </div>
      <div>
        <router-link v-for="item in menus" :key="item.name" :to="item.path" class="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{ item.name }}</router-link>
        <router-link v-if="!user" to="/login" class="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
      </div>
    </nav>

    <div class="flex-1">
      <router-view/>
    </div>

    <footer>
        <div class="bg-gray-900 text-white p-4 text-center">
            &copy; 2024 My App. All rights reserved.
        </div>
    </footer>
  </div>
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const auth = useAuthStore()

const { user } = storeToRefs(auth)

const menus = computed(() => {
  const basic_menus = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]

  return basic_menus

})

</script>

<style>

</style>