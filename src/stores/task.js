import { defineStore } from "pinia";

const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
        sucessMessage: null,
        filter: '' 
    }),
    actions: {
        create(newTask)
        {
            try {
                this.tasks.push({
                    id: Date.now(),
                    title: newTask.title,
                    description: newTask.description,
                    priority: newTask.priority,
                    completed: newTask.completed
                })
                localStorage.setItem('tasks', JSON.stringify(this.tasks))
                this.sucessMessage = 'Task added successfully.'
            } catch (error) {
                throw error
            }
            
        },
        update(task)
        {
            try {
                const taskToUpdate = this.tasks.find((item) => item.id === task.id);
                if (!taskToUpdate) {
                    console.log("Task not found.");
                    return;
                }

                taskToUpdate.title = task.title;
                taskToUpdate.description = task.description;
                taskToUpdate.priority = task.priority;
                taskToUpdate.completed = task.completed;
                
                this.sucessMessage = 'Task updated successfully.'
                localStorage.setItem("tasks", JSON.stringify(this.tasks));

            } catch (error) {
               throw error
            }
        },
        delete(taskToRemove)
        {
            try {
                const newTasks = this.tasks.filter((task) => task.id != taskToRemove.id)
                this.tasks = newTasks
                this.sucessMessage = 'Task deleted successfully.'
                localStorage.setItem('tasks', JSON.stringify(newTasks))
            } catch (error) {
                throw error
            }
        },
        deleteMany(selected)
        {
            try {
                this.tasks = this.tasks.filter(task => !selected.includes(task.id))
                localStorage.setItem('tasks', JSON.stringify(this.tasks))
                this.sucessMessage = selected.length + " " + "task(s) deleted successfully."
                
            } catch (error) {
                throw error
            }
        }
    },
    getters: {
        taskDones: (state) => state.tasks.filter((task) => task.completed),
        taskInprogress: (state) => state.tasks.filter((task) => !task.completed),
     }
})

export default useTaskStore