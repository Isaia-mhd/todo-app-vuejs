<template>
 <div class="w-full max-w-md mx-auto mt-10 p-8 bg-slate-900 rounded-md shadow-md my-20">
    <h2 class="text-2xl font-bold text-white">Create account</h2>
    <p class="text-gray-300">Please enter your infos to create an account.</p>
    <form @submit.prevent="handleRegister" class="mt-4 space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-300">Name:</label>
        <input type="text" v-model="name" class="w-full px-3 py-2 rounded-md bg-slate-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
        <span class="text-red-500 text-sm" v-if="errors.name">{{ errors.name }}</span>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300">E-mail:</label>
        <input type="text" v-model="email" class="w-full px-3 py-2 rounded-md bg-slate-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
        <span class="text-red-500 text-sm" v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300">Password:</label>
        <input type="password" v-model="password" class="w-full px-3 py-2 rounded-md bg-slate-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
        <span class="text-red-500 text-sm" v-if="errors.password">{{ errors.password }}</span>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-300">Confirm Password:</label>
        <input type="password" v-model="passwordConfirmation" class="w-full px-3 py-2 rounded-md bg-slate-800 text-gray-300 placeholder:text-gray-500 border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
        <span class="text-red-500 text-sm" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</span>
      </div>
      <button type="submit" class="w-full text-sm flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" :disabled="loading">{{ loading ? 'Creating acount...' : 'Create account' }}</button>
    </form>
</div> 
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useAuthStore from '@/stores/auth'
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')


const auth = useAuthStore()
const { user } = storeToRefs(auth)
const router = useRouter()
const loading = ref(false)

const errors = ref({
    name: null,
    email: null,
    password: null,
    password_confirmation: null
})

onMounted(() => {
    if(user.value)
    {
        router.push('/')
    }
})

const handleRegister = async () => {
    loading.value = true
    
    if(!name.value || !email.value || !password.value || !passwordConfirmation.value)
    {
        errors.value.name = !name.value ? 'The name field is required' : null
        errors.value.email = !email.value ? 'The email field is required' : null
        errors.value.password = !password.value ? 'The password field is required' : null
        errors.value.password_confirmation = !passwordConfirmation.value ? 'The password confirmation field is required' : null
        loading.value = false
        return;
    }

    try {
        await auth.register({
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value
        })
        loading.value = false
        router.push('/login')

    } catch (error) {
        loading.value = false
        console.log(error?.response.data);
        
        
    }
}

</script>
