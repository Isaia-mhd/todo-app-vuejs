<template>
  <div class="w-full max-w-6xl mx-auto">
    <div class="flex justify-between items-center gap-2 mb-3">
      <form @submit.prevent="create" class="flex gap-2">
        <input v-model="title" class="w-sm text-white text-sm p-2 rounded-md border border-gray-400" type="text" placeholder="Learn something...">
        <button type="submit" class="p-2 text-xs text-white bg-green-700 rounded-md cursor-pointer">Create</button>
      </form>
      <form class="flex gap-2">
        <select v-model="type" class="w-xs text-white bg-slate-800 text-sm p-2 rounded-md border border-gray-400">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="progress">In progress</option>
        </select>
      </form>
    </div>
    <p v-if="error" class="text-red-500 text-sm mb-6">{{ error }}</p>
    <TaskList :tasks="tasks"/>
    
  </div>
</template>

<script setup>
// @ is an alias to /src
import TaskList from '@/components/task/TaskList.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useAuthStore from '@/stores/auth'
import useTaskStore from '@/stores/task'
const auth = useAuthStore()
const taskStore = useTaskStore()

const { user } = storeToRefs(auth)
const { tasks } = storeToRefs(taskStore)
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

const create = () => 
  {
    try {
      if(!title.value)
      {
        error.value = 'The title field is required'
        return;
      } 
      
      taskStore.create({
        id: Date.now(),
        title: title.value,
        description: '',
        priority: '',
        completed: false
      })

      title.value = null
      error.value = null

    } catch (error) {
      console.log('error creating: ', error);
    }

}
</script>
