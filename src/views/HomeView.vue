<template>
  <div class="home">
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
    <TaskList :tasks="filters" @deletetask="removeTask"/>
    
  </div>
</template>

<script setup>
// @ is an alias to /src
import TaskList from '@/components/task/TaskList.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useAuthStore from '@/stores/auth'
const auth = useAuthStore()
const { user } = storeToRefs(auth)
const router = useRouter()

onMounted(() => {
    if(!user.value)
    {
        router.push('/login')
    }
})

const tasks = ref(JSON.parse(localStorage.getItem('tasks'))) || ref([])
const type = ref('all')
const title = ref(null)
const error = ref(null)

const removeTask = (taskToRemove) => 
{
  const newTasks = tasks.value.filter((task) => task.id != taskToRemove)
  localStorage.setItem('tasks', JSON.stringify(newTasks))
  tasks.value = JSON.parse(localStorage.getItem('tasks'))
}
const create = () => 
  {
    if(!title.value)
    {
      this.error = 'The title field is required'
      return;
    } 
    
    tasks.value.push({
      id: Date(),
      title: title.value,
      description: '',
      priority: '',
      completed: false
    })
    
    localStorage.setItem('tasks', JSON.stringify(tasks.value))

    title.value = null
    error.value = null
}

const filters = computed(() => {
    if(type.value == 'completed')
    {
        return tasks.value.filter((task) => task.completed) 
    } else if(type.value == 'progress')
    {
      return tasks.value.filter((task) => !task.completed)   
    } else {
      return tasks.value
    }
})
</script>
