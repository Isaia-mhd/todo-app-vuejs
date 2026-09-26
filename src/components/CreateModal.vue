<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="$emit('closemodal')"
  >
    <div class="w-full max-w-lg rounded-lg bg-slate-800 p-6 shadow-xl">
      <h2 class="mb-4 text-lg font-bold text-white">Add new Task</h2>

      <form @submit.prevent="addTask">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-white">
            Title
          </label>

          <input
            id="title"
            v-model="task.title"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
          />
          <p v-if="error.title" class="text-red-500 text-sm mb-6">{{ error.title }}</p>
        </div>

        <div class="mb-4">
          <label
            for="description"
            class="block text-sm font-medium text-white"
          >
            Description
          </label>

          <textarea
            id="description"
            v-model="task.description"
            rows="4"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
          ></textarea>
        </div>

        <div class="mb-4">
          <label for="priority" class="block text-sm font-medium text-white">
            Priority
          </label>

          <select
            id="priority"
            v-model="task.priority"
            class="mt-1 block w-full bg-slate-800 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <p v-if="error.priority" class="text-red-500 text-sm mb-6">{{ error.priority }}</p>
        </div>

        <div class="mb-4 flex items-center gap-2">
          <input
            id="completed"
            v-model="task.completed"
            type="checkbox"
            class="rounded border-gray-300"
          />

          <label for="completed" class="text-sm font-medium text-white">
            Completed
          </label>
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="$emit('closemodal')"
            
            class="text-xs cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="text-xs cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useAuthStore from "@/stores/auth";
import { ref, reactive, defineProps, defineEmits } from "vue";
import useTaskStore from '@/stores/task'

const taskStore = useTaskStore()
const emit = defineEmits(['closemodal'])

const error = ref({
    title: null,
    priority: null,
});

const task = ref({
    title: '',
    description: '',
    priority: '',
    completed: false
})


const addTask = () => {
    try {
        error.value.title = null
        error.value.priority = null

        if(!task.value.title)
        {
            error.value.title = 'The title field is required'
        }
        if(!task.value.priority)
        {
            error.value.priority = 'The priority field is required'
        }
        if(error.value.title || error.value.priority)
        {
            return;
        }

        taskStore.create(task.value)
        task.value.title = ''
        task.value.description = ''
        task.value.priority = ''
        task.value.completed = false
        emit('closemodal')
        
    } catch (err) {
      console.log('error creating: ', err);
    }
};
</script>