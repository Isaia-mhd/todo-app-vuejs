<template>
  <div class="home">
    <div class="flex justify-between items-center gap-2 mb-3">
      <form @submit.prevent="create" class="flex gap-2">
        <input v-model="title" class="w-sm text-white text-sm p-2 rounded-md border border-gray-400" type="text" placeholder="Learn something...">
        <button type="submit" class="p-2 text-xs text-white bg-green-700 rounded-md cursor-pointer">Create</button>
      </form>
      <form class="flex gap-2">
        <select v-model="type" class="w-xs text-white bg-slate-800 text-sm p-2 rounded-md border border-gray-400">
          <option value="completed">Completed</option>
          <option value="progress">In progress</option>
        </select>
        <button @click="clear" class="p-2 text-xs text-white bg-green-700 rounded-md cursor-pointer">Clear</button>
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
      tasks: [
        {
          id: 1,
          title: "Learn Vue basics",
          description: "Learn ref, v-model, v-for and v-if",
          completed: false,
          priority: "high",
        },
        {
          id: 2,
          title: "Create Todo List",
          description: "Build a simple todo list with Vue",
          completed: false,
          priority: "high",
        },
        {
          id: 3,
          title: "Practice computed properties",
          description: "Create filtered and calculated values",
          completed: true,
          priority: "medium",
        },
        {
          id: 4,
          title: "Learn Vue components",
          description: "Create reusable Vue components",
          completed: false,
          priority: "medium",
        },
        {
          id: 5,
          title: "Build a weather app",
          description: "Consume a weather API with Vue",
          completed: false,
          priority: "low",
        },
        {
          id: 6,
          title: "Learn Vue Router",
          description: "Create multiple pages with Vue Router",
          completed: false,
          priority: "high",
        },
        {
          id: 7,
          title: "Learn Pinia",
          description: "Practice global state management",
          completed: false,
          priority: "medium",
        },
      ],
      type: null,
      title: '',
      error: null
    }
  },
  methods: {
    clear()
    {
      this.type = null
    },
    removeTask(taskToRemove)
    {
      this.tasks = this.tasks.filter((task) => task.id != taskToRemove)
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
