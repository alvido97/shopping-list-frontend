<template>
  <div class="flex justify-between items-center py-1 mb-2">
    <h4 class="card-title hidden lg:block mr-2"> {{ title }}</h4>
    <div class="hidden sm:block"></div>
  </div>

  <div class="card relative overflow-x-auto">
    <div class="min-w-full inline-block align-middle whitespace-nowrap">
      <div class="overflow-x-visible">
        <table class="min-w-full divide-y divide-gray-300 bg-[#FBF7F3]" id="main-table">
          <slot></slot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

defineProps({
  title: {type: String, default: 'Table'},
});


</script>

<style scoped>
</style>
