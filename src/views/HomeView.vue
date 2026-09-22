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

<script>
// @ is an alias to /src
import TaskList from '@/components/task/TaskList.vue'

export default {
  name: 'HomeView',
  components: { TaskList },
  data()
  {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      type: 'all',
      title: '',
      error: null
    }
  },
  methods: {
    removeTask(taskToRemove)
    {
      const tasks = this.tasks.filter((task) => task.id != taskToRemove)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      this.tasks = JSON.parse(localStorage.getItem('tasks'))
    },
    create()
    {
      if(!this.title)
      {
        this.error = 'The title field is required'
        return;
      } 
      
      this.tasks.push({
        id: Date(),
        title: this.title,
        description: '',
        priority: '',
        completed: false
      })
      
      localStorage.setItem('tasks', JSON.stringify(this.tasks))

      this.title = ''
      this.error = null
    }
  },
  computed: {
    filters()
    {
      if(this.type && this.type == 'completed')
      {
         return this.tasks.filter((task) => task.completed) 
      } else if(this.type && this.type == 'progress')
      {
        return this.tasks.filter((task) => !task.completed)   
      } else {
        return this.tasks
      }
    }
  }

}
</script>
