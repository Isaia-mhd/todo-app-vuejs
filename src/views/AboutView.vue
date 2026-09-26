<template>
  <div class="min-h-screen bg-gray-900 text-white px-6 py-12">
    <div class="max-w-4xl mx-auto">

      <!-- Hero -->
      <section class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">
          About Todo App
        </h1>

        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          A simple and modern task management application built to practice
          Vue.js and modern frontend development.
        </p>
      </section>

      <!-- Features -->
      <section class="grid md:grid-cols-3 gap-6 mb-12">

        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-3">
            Task Management
          </h2>

          <p class="text-gray-400">
            Create, update, delete and complete your tasks easily.
          </p>
        </div>

        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-3">
            Task Filtering
          </h2>

          <p class="text-gray-400">
            Filter tasks by their priority and completion status.
          </p>
        </div>

        <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 class="text-xl font-semibold mb-3">
            Local Persistence
          </h2>

          <p class="text-gray-400">
            Your tasks are stored locally in the browser using localStorage.
          </p>
        </div>

      </section>

      <!-- Technologies -->
      <section class="bg-gray-800 border border-gray-700 rounded-xl p-8 mb-12">
        <h2 class="text-2xl font-bold mb-6">
          Technologies
        </h2>

        <div class="flex flex-wrap gap-3">
          <span class="px-4 py-2 rounded-full bg-green-600/20 text-green-400">
            Vue.js
          </span>

          <span class="px-4 py-2 rounded-full bg-blue-600/20 text-blue-400">
            Pinia
          </span>

          <span class="px-4 py-2 rounded-full bg-cyan-600/20 text-cyan-400">
            Tailwind CSS
          </span>

          <span class="px-4 py-2 rounded-full bg-yellow-600/20 text-yellow-400">
            JavaScript
          </span>

          <span class="px-4 py-2 rounded-full bg-purple-600/20 text-purple-400">
            Vue Router
          </span>

          <span class="px-4 py-2 rounded-full bg-orange-600/20 text-orange-400">
            localStorage
          </span>
        </div>
      </section>

      <!-- What I learned -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6">
          What I learned
        </h2>

        <ul class="space-y-3 text-gray-400">
          <li>✓ Vue 3 Composition API</li>
          <li>✓ Reactive state with ref and reactive</li>
          <li>✓ Computed properties and watchers</li>
          <li>✓ Props and custom events</li>
          <li>✓ Pinia state management</li>
          <li>✓ Vue Router</li>
          <li>✓ Component communication</li>
          <li>✓ localStorage persistence</li>
        </ul>
      </section>

      <!-- Footer -->
      <section class="text-center border-t border-gray-700 pt-8">
        <p class="text-gray-500">
          Built with Vue.js as a learning project.
        </p>
      </section>

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>