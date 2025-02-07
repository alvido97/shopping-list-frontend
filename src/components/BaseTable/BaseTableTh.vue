<template>
  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider z-1">
      <span class="flex items-center">
        <slot></slot>
      </span>
  </th>
</template>

<script>
export default {
  name: "BaseTableTh",
};
</script>
