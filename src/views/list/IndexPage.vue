<template>
    <AdminLayout
    :pageTitle="pageTitle"

    >
      <div class="flex-1 p-8 overflow-x-auto">
        <div class="overflow-x-auto">
          <ListTable
            :shoppingLists="shoppingLists"
            @click-delete="handleClickDelete"
            @refresh-data="fetchShoppingLists"
          />
          <p class="text-blue-600 mx-auto" v-if="loading">Loading ...</p>

          <div v-if="pagination" class="flex items-center justify-between mt-4">
            <button
              @click="fetchShoppingLists(pagination.prev_page_url)"
              :disabled="!pagination.prev_page_url"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-indigo-200 rounded hover:bg-indigo-300 disabled:opacity-50"
            >
              Previous
            </button>
  
            <span class="text-gray-700">
              Page {{ pagination.current_page }} of {{ pagination.last_page }}
            </span>
  
            <button
              @click="fetchShoppingLists(pagination.next_page_url)"
              :disabled="!pagination.next_page_url"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-indigo-200 rounded hover:bg-indigo-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  </template>
  
<script setup>
import AdminLayout from "@/components/AdminLayout.vue";
import { ref, onMounted } from "vue";
import api from "@/api"; 
import ListTable from "@/components/List/ListTable.vue";
  
  const shoppingLists = ref([]);
  const pagination = ref(null);
  const loading = ref(false);
  const error = ref("");
  const pageTitle = ref("Shoppping List");
  
  const fetchShoppingLists = async (url = "/shopping-lists/index?limit=10") => {
    loading.value = true;
    error.value = "";
  
    try {
      const response = await api.get(url);
      console.log(response.data.shoppingLists
      )
      shoppingLists.value = response.data.shoppingLists.data;
      pagination.value = {
        current_page: response.data.shoppingLists.current_page,
        last_page: response.data.shoppingLists.last_page,
        prev_page_url: response.data.shoppingLists.prev_page_url,
        next_page_url: response.data.shoppingLists.next_page_url,
      };
    } catch (err) {
      error.value = "Failed to load data. Please try again.";
    } finally {
      loading.value = false;
    }
  };
  
  // Fetch data on component mount
  onMounted(() => fetchShoppingLists());
  </script>
  