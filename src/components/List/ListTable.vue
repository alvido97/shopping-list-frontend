<template>
  <BaseTable
      :title="`Shopping List`"
     
  >
    <BaseTableThead>
      <BaseTableTr>

        <BaseTableTh>Title</BaseTableTh>

        <BaseTableTh>Created At</BaseTableTh>

        <BaseTableTh>Action</BaseTableTh>
      </BaseTableTr>
    </BaseTableThead>

    <BaseTableTbody>
      <ListTableRow
          v-for="(shoppingList, index) in shoppingLists"
          :key="shoppingList.id"
          :index="(shoppingLists.current_page - 1) * shoppingLists.per_page + index + 1"
          :shoppingList="shoppingList"
           @refresh-data="emit('refresh-data')"
      />
    </BaseTableTbody>
  </BaseTable>
</template>

<script setup>

import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseTableThead from "@/components/BaseTable/BaseTableThead.vue";
import BaseTableTr from "@/components/BaseTable/BaseTableTr.vue";
import BaseTableTh from "@/components/BaseTable/BaseTableTh.vue";
import BaseTableTbody from "@/components/BaseTable/BaseTableTbody.vue";
import ListTableRow from "@/components/List/ListTableRow.vue";

import {defineEmits, defineProps} from "vue";

const emit = defineEmits(["refresh-data"]);

defineProps({
  shoppingLists: {
    type: Object,
    required: true,
  },
});



</script>

<style scoped>

</style>
