<template>
  <div class="home">
    <h2>Tasks</h2>
    <TaskList :tasks="tasks" />
    
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
    }
  }
}
</script>
