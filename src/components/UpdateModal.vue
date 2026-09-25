<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-lg rounded-lg bg-slate-800 p-6 shadow-xl">
      <h2 class="mb-4 text-lg font-bold text-white">Update Task</h2>

      <form @submit.prevent="updateTask">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-white">
            Title
          </label>

          <input
            id="title"
            v-model="title"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
          />
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
            v-model="description"
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
            v-model="priority"
            class="mt-1 block w-full bg-slate-800 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-white"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="mb-4 flex items-center gap-2">
          <input
            id="completed"
            v-model="completed"
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
            @click="$emit('close')"
            
            class="text-xs cursor-pointer rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="text-xs cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useAuthStore from "@/stores/auth";
import { ref, defineProps, defineEmits } from "vue";

const emit = defineEmits(['taskUpdated']);

const props = defineProps({
  task: { type: Object, required: true },
});

const title = ref(props.task.title);
const description = ref(props.task.description);
const priority = ref(props.task.priority);
const completed = ref(props.task.completed);

const updateTask = () => {
    emit('taskUpdated', {
        id: props.task.id,
        title: title.value,
        description: description.value,
        priority: priority.value,
        completed: completed.value
    });
};
</script>