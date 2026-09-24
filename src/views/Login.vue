<template>
 <div class="w-full max-w-md mx-auto mt-10 p-8 bg-slate-900 rounded-md shadow-md my-20">
    <h2 class="text-2xl font-bold text-white">Connection</h2>
    <p class="text-gray-300">Please enter your credentials to log in.</p>
    <form @submit.prevent="handleLogin" class="mt-4 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-300">E-mail:</label>
        <input type="text" v-model="email" class="w-full px-3 py-2 rounded-md bg-slate-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300">Password:</label>
        <input type="password" v-model="password" class="w-full px-3 py-2 rounded-md bg-slate-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <button type="submit" class="w-full text-sm flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
    </form>
</div> 
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/auth'
const email = ref('isaiamohamed21@gmail.com')
const password = ref('admin')

const auth = useAuthStore()
const { user } = storeToRefs(auth)
const router = useRouter()
const loading = ref(false)



onMounted(() => {
    if(user.value)
    {
        router.push('/')
    }
})

const handleLogin = async () => {
    // Handle login logic here
    loading.value = true
    try {
        await auth.login({
            email: email.value,
            password: password.value,
        })
        loading.value = false
        router.push('/')

    } catch (error) {
        loading.value = false
        console.log(error?.response);
        
    }
}


</script>

<style>

</style>