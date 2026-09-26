<template>
  <ul class="flex flex-col gap-2">
    <!-- Task in progress -->
    <div class="p-3 border border-gray-700 rounded-md">
        <h2 class="text-lg text-white mb-2">In Progress ({{ tasksFiltered.length }})</h2>
        <div v-if="tasksFiltered.length > 0">
          <li v-for="task in tasksFiltered" :key="task.id" class="">
              <div class="w-full flex justify-between py-3 px-3 bg-slate-900 text-white rounded-md mb-1">
                  <div class="cursor-pointer flex gap-2 items-center">
                  <Circle :size="18" @click="toggleSelectTask(task.id)" v-if="!selectedTasks.includes(task.id)"/>
                  <CircleCheck :size="18" @click="toggleSelectTask(task.id)" v-if="selectedTasks.includes(task.id)"/>
                  <p>{{ task.title }} <span class="text-xs px-4 py-1 rounded-full text-white" :class="task.priority === 'low' ? 'bg-blue-400' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-red-500' ">{{ task.priority }}</span> </p>
                  </div>
                  <div class="flex gap-2">
                  <button @click="update(task)" class="text-xs bg-green-700 hover:bg-green-500 text-white rounded-md p-2 cursor-pointer"> <Pen :size="14"/> </button>
                  <button @click="remove(task)" class="text-xs bg-red-700 hover:bg-red-500 text-white rounded-md p-2 cursor-pointer"><Trash :size="14"/></button>
                  </div>
              </div>
          </li>
        </div>
        <p class="text-white text-center" v-else>No task in progress yet.</p>
    </div>
    
    <!-- Taskdone -->
    <div class="p-3 border border-gray-700 rounded-md">
        <h2 class="text-lg text-white mb-2">Done ({{ taskDones.length }})</h2>
        <div v-if="taskDones.length > 0">
          <li v-for="task in taskDones" :key="task.id">
              <div class="w-full flex justify-between py-3 px-3 bg-slate-900 text-white rounded-md mb-1">
                <div class="cursor-pointer flex gap-2 items-center">
                  <CircleCheck :size="18" color="green"/> 
                  <p>{{ task.title }}</p>
                </div>
                <div class="flex gap-2">
                  <button @click="update(task)" class="text-xs bg-green-700 hover:bg-green-500 text-white rounded-md p-2 cursor-pointer"> <Pen :size="14"/> </button>
                  <button @click="remove(task)" class="text-xs bg-red-700 hover:bg-red-500 text-white rounded-md p-2 cursor-pointer"><Trash :size="14"/></button>
                </div>
              </div>
          </li>
        </div>
        <p class="text-white text-center text-sm" v-else>No task done yet.</p>
    </div>
  </ul>
  

  <UpdateModal v-if="showModalUpdate" :task="taskToUpdate" @close="toggleModalUpdate"/>
</template>

<script setup>
import { Circle, CircleCheck, Trash, Pen } from '@lucide/vue'
import { ref, defineProps, watch, computed, defineEmits } from 'vue'
import UpdateModal from '@/components/UpdateModal.vue'
import useTaskStore from '@/stores/task'
import { storeToRefs } from 'pinia'

const props = defineProps({
  filter: { type: String }
})
const emit = defineEmits(['selected'])

const taskStore = useTaskStore()
const { taskDones, taskInprogress } = storeToRefs(taskStore)


const tasksFiltered = computed(() => {
  if(props.filter === '')
  {
    return taskInprogress.value
  }
  return taskInprogress.value.filter((task) => task.priority == props.filter)
})

const remove = (task) => {
  try {
    taskStore.delete(task)
  } catch (error) {
    console.log('error deleting: ', error);
    
  }
}

const showModalUpdate = ref(false)

const toggleModalUpdate = () => {
  showModalUpdate.value = !showModalUpdate.value
}

const taskToUpdate = ref(null)
const update = (task) => {
  showModalUpdate.value = true
  taskToUpdate.value = task
}

const selectedTasks = ref([])

const toggleSelectTask = (taskId) => {
  if(selectedTasks.value.includes(taskId))
  {
    selectedTasks.value = selectedTasks.value.filter(id => id != taskId)

  } else{
    selectedTasks.value.push(taskId)
  }

  emit('selected', selectedTasks.value)
}

// clear the selected when user is doing a filter
watch(
  () => props.filter, 
  (newVal) => {
  selectedTasks.value = []
  emit('selected', selectedTasks.value)
})

</script>

<style>

</style>