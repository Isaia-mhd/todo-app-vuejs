<template>
  <div class="w-full max-w-6xl mx-auto">
    <div class="flex justify-between items-center gap-2 mb-3">
      <div class="flex items-center gap-2">
        <button @click="toggleModalCreate" class="flex items-center gap-2 bg-blue-500 rounded-md px-3 py-2 text-white cursor-pointer hover:bg-blue-600"><Plus /><span>Add</span></button>
        
        <form class="flex gap-2">
          <select v-model="type" class="w-xs text-white bg-slate-800 text-sm p-2 rounded-md border border-gray-400">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="progress">In progress</option>
          </select>
        </form>
      </div>
    </div>
    <p v-if="error" class="text-red-500 text-sm mb-6">{{ error }}</p>
    <TaskList />

    <CreateModal v-if="showModalCreate" @closemodal="toggleModalCreate"/>
    
  </div>
</template>

<script setup>
// @ is an alias to /src
import TaskList from '@/components/TaskList.vue'
import CreateModal from '@/components/CreateModal.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useAuthStore from '@/stores/auth'
import { Plus } from '@lucide/vue'
const auth = useAuthStore()

const { user } = storeToRefs(auth)

const router = useRouter()

onMounted(() => {
    if(!user.value)
    {
        router.push('/login')
    }
})

const type = ref('all')
const title = ref(null)
const error = ref(null)

const showModalCreate = ref(false)

const toggleModalCreate = () => {
  showModalCreate.value = !showModalCreate.value
} 

</script>
