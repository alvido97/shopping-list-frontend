<template>
    <div class="flex h-screen">
      <SideMenu />
        <div class="flex flex-col flex-1">
            <div class="w-full h-16 bg-gray-800 text-white flex items-center px-6 shadow-md">
            <h1 class="text-xl font-semibold"> {{ pageTitle }}</h1>
        </div>
  
        <div class="flex-1 overflow-auto p-6">
            <slot />
        </div>
      </div>
    </div>
  </template>

    
<script setup>
import SideMenu from "@/components/menus/SideMenu.vue";
defineProps({
  pageTitle: {type: String, default: 'Dashboard'},
});

</script>