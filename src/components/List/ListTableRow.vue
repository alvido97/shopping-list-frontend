<template>
  <BaseTableTr class="bg-white">
    <BaseTableTd>
      {{ shoppingList.title }} 
    </BaseTableTd>
    <BaseTableTd>
      {{ shoppingList.createdAt }}
    </BaseTableTd>
    <BaseTableTd>
      <button @click="confirmDelete(shoppingList.id)" class="text-red-500 hover:text-red-300">Delete</button>
      <router-link :to="`/edit-shopping-list/${shoppingList.id}`" class="ml-2 hover:text-gray">Edit</router-link>
    </BaseTableTd>
  </BaseTableTr>
</template>

<script setup>
import BaseTableTr from "@/components/BaseTable/BaseTableTr";
import BaseTableTd from "@/components/BaseTable/BaseTableTd";
import api from "@/api";
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["refresh-data"]);

defineProps({
  shoppingList: {
    type: Object,
    required: true,
  },
}); 

const deleteShoppingList = async (id, url = "/shopping-lists/destroy") => {
  try {
    await api.post(url, { shoppingListId: id });
    emit("refresh-data");
  } catch (err) {
    console.error("Error deleting shopping list:", err);
  }
};

const confirmDelete = (id) => {
  if (confirm("Are you sure you want to delete this shopping list?")) {
    deleteShoppingList(id);
  }
};
</script>

<style scoped></style>
