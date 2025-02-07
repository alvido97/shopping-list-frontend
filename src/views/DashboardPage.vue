<template>
<AdminLayout>
  <div class="flex" >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-4xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg p-6 text-center w-full h-32 flex flex-col justify-center">
          <h2 class="text-lg font-semibold text-gray-700">Total Items</h2>
          <p class="text-2xl font-bold text-blue-600">{{count}}</p>
          <p v-if="isLoading" class="text-sm font-bold text-gray-600">Please Wait ...</p>
      </div>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-4xl mx-auto">
    <div class="bg-white shadow-lg rounded-lg p-6 text-center w-full h-32 flex flex-col justify-center">
        <RouterLink to="/create-shopping-list" >
          <button class="text-lg font-semibold text-gray-700">Create New List</button>
      </RouterLink>
    </div>
</div>
  </div> 

</AdminLayout>
    

</template>
    
<script setup>
import AdminLayout from "@/components/AdminLayout.vue";
import api from "@/api"; 
import { ref, onMounted } from "vue";

const count = ref("");
const isLoading = ref(true);

const fetchShoppingLists = async (url = "/dashboard") => {
  
      const response = await api.get(url);
      count.value =  response.data.shoppingListCount
      isLoading.value = false
  
  };

  onMounted(() => fetchShoppingLists());

</script>
    
      