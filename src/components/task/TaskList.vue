<template>
  <ul class="flex flex-col gap-2" v-if="tasks.length">
    <!-- Taskdone -->
    <div class="p-3 border border-gray-700 rounded-md">
        <h2 class="text-lg text-white mb-2">Done ({{ done }})</h2>
        <div class="" v-if="done">
        <li v-for="task in tasks" :key="task.id">
            <div class="w-full flex justify-between py-3 px-3 bg-slate-900 text-white rounded-md mb-1">
              <div class="cursor-pointer flex gap-2 items-center">
                <CircleCheck :size="18"/> 
                <p>{{ task.title }} <span class="text-xs px-4 py-1 rounded-full text-white" :class="task.completed ? 'bg-green-700' : 'bg-amber-400'">{{ task.completed ? "Done" : "Progress" }}</span> </p>
              </div>
              <div class="flex gap-2">
                <button class="text-xs bg-green-700 hover:bg-green-500 text-white rounded-md p-2 cursor-pointer"> <Pen :size="14"/> </button>
                <button @click="remove(task.id)" class="text-xs bg-red-700 hover:bg-red-500 text-white rounded-md p-2 cursor-pointer"><Trash :size="14"/></button>
              </div>
            </div>
        </li>
      </div>
      <p class="text-white text-center text-sm" v-else>No task done yet.</p>
    </div>


    <!-- Task in progress -->
    <div class="p-3 border border-gray-700 rounded-md">
        <h2 class="text-lg text-white mb-2">In Progress ({{ inprogress }})</h2>
        <li v-for="task in tasks" :key="task.id" class="">
            <div class="w-full flex justify-between py-3 px-3 bg-slate-900 text-white rounded-md mb-1" v-if="!task.completed">
                <div class="cursor-pointer flex gap-2 items-center">
                <Circle :size="18"/> 
                <p>{{ task.title }} <span class="text-xs px-4 py-1 rounded-full text-white" :class="task.completed ? 'bg-green-700' : 'bg-amber-400'">{{ task.completed ? "Done" : "Progress" }}</span> </p>
                </div>
                <div class="flex gap-2">
                <button class="text-xs bg-green-700 hover:bg-green-500 text-white rounded-md p-2 cursor-pointer"> <Pen :size="14"/> </button>
                <button @click="remove(task.id)" class="text-xs bg-red-700 hover:bg-red-500 text-white rounded-md p-2 cursor-pointer"><Trash :size="14"/></button>
                </div>
            </div>
            <p class="text-white text-center" v-else>No task in progress yet.</p>
        </li>
    </div>
  </ul>
  <p class="text-center text-white" v-else>No task found.</p>
</template>

<script setup>
import { Circle, CircleCheck, Trash, Pen } from '@lucide/vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tasks: { Type: Array, required: true },
})
const emit = defineEmits(['deletetask'])

const done = props.tasks.filter((task) => task.completed).length
const inprogress = props.tasks.filter((task) => !task.completed).length

const remove = (id) => {
  emit('deletetask', id)
}

</script>

<style>

</style>