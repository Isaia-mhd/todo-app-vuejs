<template>
  <div class="w-full max-w-6xl mx-auto">
    <div class="flex justify-between items-center gap-2 mb-3">
      <div class="flex items-center gap-2">
        <button @click="toggleModalCreate" class="flex items-center gap-2 bg-blue-500 rounded-md px-3 py-2 text-white cursor-pointer hover:bg-blue-600"><Plus /><span>Add</span></button>
        <button @click="finish" :disabled="!selected.length" class="flex items-center gap-2 bg-blue-500 rounded-md px-3 py-2 text-white cursor-pointer hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"><Check /><span>Finish ({{ selected.length   }})</span></button>
        <button @click="destroy" :disabled="!selected.length" class="flex items-center gap-2 bg-blue-500 rounded-md px-3 py-2 text-white cursor-pointer hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed"><Check /><span>Delete ({{ selected.length   }})</span></button>
        <form class="flex gap-2">
          <select v-model="priority" class="w-xs text-white bg-slate-800 text-sm p-3 rounded-md border border-gray-600">
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </form>
      </div>
    </div>

    <!-- Success message -->
    <div class="w-full border-1 border-slate-600 bg-slate-700 text-green-500 rounded-md py-2 px-3 text-left mb-6" v-if="sucessMessage">
      <p>{{ sucessMessage }}</p>
    </div>

    <TaskList ref="childRef" :filter="priority" @selected="taskSelect"/>

    <CreateModal v-if="showModalCreate" @closemodal="toggleModalCreate"/>
    
  </div>
</template>

<script setup>
// @ is an alias to /src
import TaskList from '@/components/TaskList.vue'
import CreateModal from '@/components/CreateModal.vue'
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useAuthStore from '@/stores/auth'
import { Plus, Check } from '@lucide/vue'
import useTaskStore from '@/stores/task'
const auth = useAuthStore()
const taskStore = useTaskStore()
const { sucessMessage } = storeToRefs(taskStore)

const { user } = storeToRefs(auth)

const router = useRouter()

onMounted(() => {
    if(!user.value)
    {
        router.push('/login')
    }
})

const priority = ref('')

const showModalCreate = ref(false)

const toggleModalCreate = () => {
  showModalCreate.value = !showModalCreate.value
} 

const selected = ref([])
const taskSelect = (selectedTasks) =>
{
  selected.value = selectedTasks
}
const childRef = ref(null)
const finish = () => 
{
  
  try {
    taskStore.finishMany(selected.value)
    selected.value = []

    // call the fn provided by child component (TaskList)
    childRef.value.clearSelectedTasks()
  } catch (error) {
    console.log("Error finishing");
    
  }
  
}

const destroy = () => {
  try {
    taskStore.deleteMany(selected.value)
    selected.value = []
  } catch (error) {
    console.log("Error destroying");
    
  }
  
}

</script>
