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
    <TaskList :tasks="tasks" @deletetask="removeTask" @updatedtask="newTaskUpdated"/>
    
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
  tasks.value = newTasks
  localStorage.setItem('tasks', JSON.stringify(newTasks))
}
const create = () => 
  {
    if(title.value === "")
    {
      error.value = 'The title field is required'
      return;
    } 
    
    tasks.value.push({
      id: Date.now(),
      title: title.value,
      description: '',
      priority: '',
      completed: false
    })
    
    // tasks.value = JSON.parse(localStorage.getItem('tasks'))
    localStorage.setItem('tasks', JSON.stringify(tasks.value))

    title.value = null
    error.value = null

}

const newTaskUpdated = (task) => {
    try {
      const taskToUpdate = tasks.value.find((item) => item.id === task.id);
      if (!taskToUpdate) {
        console.log("Task not found.");
        return;
      }

      taskToUpdate.title = task.title;
      taskToUpdate.description = task.description;
      taskToUpdate.priority = task.priority;
      taskToUpdate.completed = task.completed;

      localStorage.setItem("tasks", JSON.stringify(tasks.value));

      console.log('updated: ', tasks.value);
      
  } catch (error) {
    console.log('error: ', error);
    
      console.log(error);
  }
}
</script>
