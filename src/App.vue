<template>
  <Layout v-if="authChecked"/>
  <div class="w-full h-screen flex items-center justify-center text-2xl" v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Layout from "@/layouts/Layout.vue";
import useAuthStore from '@/stores/auth'
import { storeToRefs } from 'pinia';


const auth = useAuthStore();
const { authChecked } = storeToRefs(auth)

  onMounted(async() => {
    await auth.getUser()
  })

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
