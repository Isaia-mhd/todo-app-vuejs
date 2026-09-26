<template>
  <div class="bg-gray-800 min-h-screen flex flex-col">
    <nav class="w-full max-w-6xl container mx-auto flex items-center justify-between">
      <div class="text-white font-bold text-lg">
        Todo App
      </div>
      <div class="flex items-center gap-2">
        <router-link v-for="item in menus" :key="item.name" :to="item.path" class="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium">{{ item.name }}</router-link>
        <router-link v-if="!user" to="/login" class="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
        <router-link v-if="!user" to="/register" class="text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
        <LogOut v-if="user" class="text-red-500 cursor-pointer" :size="18" @click="logout"/>
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
import { useRouter } from 'vue-router'
import { LogOut } from '@lucide/vue'
const auth = useAuthStore()
const router = useRouter()

const { user } = storeToRefs(auth)

const menus = computed(() => {
  const basic_menus = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]

  return basic_menus

})

const logout = async () => {
  try {
    await auth.logout()

    router.push('/login')

  } catch (error) {
    console.error('Logout error:', error)
  }
}

</script>

<style>

</style>