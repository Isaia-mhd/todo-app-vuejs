<template>
  <ul class="flex flex-col gap-2">
    <li v-for="task in tasks" :key="task.id" class="w-full flex justify-between py-3 px-3 bg-slate-900 text-white rounded-md">
        <div class="cursor-pointer flex gap-2 items-center">
          <Circle :size="18"/> 
          <p>{{ task.title }} <span class="text-xs px-4 py-1 rounded-full text-white" :class="task.completed ? 'bg-green-700' : 'bg-amber-400'">{{ task.completed ? "Done" : "Progress" }}</span> </p>
        </div>
        <div class="flex gap-2">
          <button class="text-xs bg-green-700 hover:bg-green-500 text-white rounded-md p-2 cursor-pointer"> <Pen :size="14"/> </button>
          <button @click="remove(task.id)" class="text-xs bg-red-700 hover:bg-red-500 text-white rounded-md p-2 cursor-pointer"><Trash :size="14"/></button>
        </div>
    </li>
  </ul>
</template>

<script>
import { Circle, CircleCheck, Trash, Pen } from '@lucide/vue'
export default {
    props: ['tasks'],
    components: { Circle, CircleCheck, Trash, Pen },
    methods: {
      remove(id)
      {
        this.$emit('deletetask', id)
      }
    }
}
</script>

<style>

</style>