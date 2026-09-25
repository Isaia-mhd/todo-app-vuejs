import { defineStore } from "pinia";

const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }),
    actions: {
        create(newTask)
        {
            try {
                this.tasks.push(newTask)
                localStorage.setItem('tasks', JSON.stringify(this.tasks))
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
                localStorage.setItem('tasks', JSON.stringify(newTasks))
            } catch (error) {
                throw error
            }
        }
    }
})

export default useTaskStore