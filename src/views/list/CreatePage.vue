<template>
  <AdminLayout
    :pageTitle="pageTitle"
  >
    <form class="w-full mt-8 bg-white p-6 shadow-lg ">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="name"
          v-model="form.title"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
      </div>

      <div v-for="(item, index) in form.items" :key="index" class="mb-4 bg-gray-100 p-4 rounded-lg">
        <div class="flex items-center space-x-4">
          <div class="flex-grow">
            <label class="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              v-model="item.title"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p v-if="errors[`items.${index}.title`]" class="text-red-500 text-sm mt-1">{{ errors[`items.${index}.title`] }}</p>
          </div>

          <div class="flex-grow">
            <label class="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              v-model="item.quantity"
              min="1"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p v-if="errors[`items.${index}.quantity`]" class="text-red-500 text-sm mt-1">{{ errors[`items.${index}.quantity`] }}</p>
          </div>

          <div class="flex-grow">
            <label class="block text-sm font-medium text-gray-700">Unit</label>
            <select
              v-model="item.unit"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="l">Liters</option>
              <option value="ml">Milliliters</option>
              <option value="g">Grams</option>
              <option value="kg">Kilograms</option>
              <option value="pieces">Pieces</option>
            </select>
            <p v-if="errors[`items.${index}.unit`]" class="text-red-500 text-sm mt-1">{{ errors[`items.${index}.unit`] }}</p>
          </div>

          <div v-if="form.items.length > 1" class="flex items-center">
            <button
              type="button"
              @click="removeItem(index)"
              class="ml-4 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <button
          type="button"
          @click="addItem"
          class="px-2 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500"
        >
          Add Item
        </button>
      </div>

      <div>
        <button
          type="button"
          @click="save"
          :disabled="loading"
          class="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 disabled:bg-gray-400"
        >
          {{ loading ? 'Saving...' : isEditMode ? 'Update' : 'Save' }}
        </button>
      </div>

      <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
    </form>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from "@/components/AdminLayout.vue";
import api from "@/api"; 

const form = ref({
  title: "",
  id: null,
  items: [{ title: "", quantity: 1, unit: "l" }],
});

const errors = ref({});
const loading = ref(false);
const successMessage = ref("");
const isEditMode = ref(false);
const route = useRoute();
const pageTitle = ref("Create Shopping List");

const addItem = () => {
  form.value.items.push({ title: "", quantity: 1, unit: "l" });
};

const removeItem = (index) => {
  if (form.value.items.length > 1) {
    form.value.items.splice(index, 1);
  }
};

const shoppingListId = route.params.id;

const fetchShoppingList = async () => {
  try {
    const response = await api.get(`/shopping-lists/show/${shoppingListId}`);
    form.value = response.data.shoppingList;
    isEditMode.value = true;
    pageTitle.value = isEditMode.value ? 'Update Shopping List' : 'Create Shopping List'
  } catch (err) {
    console.error("Error fetching shopping list:", err);
  }
};

onMounted(() => {
  form.value = { title: "", items: [{ title: "", quantity: 1, unit: "l" }] };
  if (shoppingListId) {
    fetchShoppingList();
  }
});

const save = async () => {
  errors.value = {};
  loading.value = true;
  successMessage.value = "";

  try {
    let response;
    if (isEditMode.value) {
      response = await api.post(`/shopping-lists/update/${shoppingListId}`, form.value);
    } else {
      response = await api.post("/shopping-lists/store", form.value); 
    }

    successMessage.value = response.data.message || (isEditMode.value ? "Shopping list updated successfully!" : "Shopping list created successfully!");
    if(isEditMode.value){
      fetchShoppingList();
    }else{
      form.value = { title: "", items: [{ title: "", quantity: 1, unit: "l" }] };
    }

  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      errors.value.general = "Something went wrong. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
