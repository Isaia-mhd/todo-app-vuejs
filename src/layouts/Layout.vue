<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white font-bold text-lg">My App</div>
      <div>
        <router-link to="/" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
        <router-link to="/about" class="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</router-link>
      </div>
    </div>

    <div class="main-content p-4">
      <router-view/>
    </div>

    <footer>
        <div class="bg-gray-900 text-white p-4 text-center">
            &copy; 2024 My App. All rights reserved.
        </div>
    </footer>
  </nav>
</template>

<script>
export default {
  name: 'Layout',

}
</script>

<style>

</style>