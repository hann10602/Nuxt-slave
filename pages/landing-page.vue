<template>
  <div class="flex flex-col justify-center items-center h-screen bg-sky-300">
    <nav class="bg-white shadow-md">
      <ul class="flex justify-around p-4 gap-x-2">
        <li
          class="cursor-pointer text-blue-500 hover:text-blue-700"
          @click="onChangePage(EMenuList.Pinia)"
        >
          Pinia
        </li>
        <li
          class="cursor-pointer text-blue-500 hover:text-blue-700"
          @click="onChangePage(EMenuList.VueQuery)"
        >
          Vue Query
        </li>
      </ul>
    </nav>
    <pinia-todo-list v-if="page === EMenuList.Pinia">
      <template #first-slot>
        <h1 class="text-center font-semibold">
          Pinia (This title is received from outside)
        </h1>
      </template>
    </pinia-todo-list>
    <vue-query-todo-list v-else-if="page === EMenuList.VueQuery" />
  </div>
</template>

<script setup lang="ts">
import PiniaTodoList from "~/components/pinia-store/todo-list/PiniaTodoList.vue";
import VueQueryTodoList from "~/components/vue-query/todo-list/VueQueryTodoList.vue";
import { EMenuList } from "@/enums";

const page = ref<EMenuList>(EMenuList.Pinia);

const onChangePage = (menuOptions: EMenuList) => {
  page.value = menuOptions;
};
</script>
