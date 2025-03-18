<template>
  <span v-if="isPending">Loading...</span>
  <span v-else-if="isError">Error: {{ error?.message }}</span>
  <div v-else-if="data" class="bg-white rounded-sm w-96">
    <h1 class="text-center font-semibold">Vue query</h1>
    <div class="border-b border-solid border-black p-4">
      <div class="flex justify-between items-center">
        <div
          class="flex items-center text-sm font-medium gap-x-2 cursor-pointer"
        >
          <div
            @click="onChangeListType(EListType.All)"
            :class="{ 'text-blue-400': listType === EListType.All }"
          >
            All
          </div>
          <div
            @click="onChangeListType(EListType.Pending)"
            :class="{ 'text-blue-400': listType === EListType.Pending }"
          >
            Pending
          </div>
          <div
            @click="onChangeListType(EListType.Completed)"
            :class="{ 'text-blue-400': listType === EListType.Completed }"
          >
            Completed
          </div>
        </div>
        <div
          class="cursor-pointer text-sm font-semibold bg-blue-500 px-4 py-1 rounded-md text-white"
        >
          Clear All
        </div>
      </div>
    </div>
    <div class="p-4 h-40 pb-4">
      <div class="overflow-y-auto h-full">
        <draggable v-model="todoList" :item-key="(item: TTodo) => item.id">
          <template #item="{ element, index }">
            <todo-item :todo="element" :index="index" />
          </template>
        </draggable>

        <div class="text-center" v-if="isRunOutOfData">
          Nothing more to load
        </div>
        <div v-else class="flex justify-center items-center" ref="target">
          <span v-if="isFetchingNextPage">Loading more...</span>
          <span v-else-if="hasNextPage">Load More</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import TodoItem from "./todo-item/TodoItem.vue";
import { EListType } from "@/enums";
import type { TTodo } from "~/types/Todo";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { shallowRef, useTemplateRef } from "vue";

const target = useTemplateRef<HTMLDivElement>("target");
const targetIsVisible = shallowRef(false);
const listType = ref(EListType.All);
const isRunOutOfData = ref<boolean>(false);

const fetchTodos = async ({ pageParam }: { pageParam: number }) => {
  return $fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=5&_page=${pageParam}`,
    {
      method: "GET",
    }
  ).then((res: any) => {
    if (res.length > 0) {
      return res;
    } else {
      isRunOutOfData.value = true;
      return [];
    }
  });
};

const {
  data,
  error,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError,
} = useInfiniteQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
  initialPageParam: 1,
  staleTime: 1000 * 2,
  getNextPageParam: (_, lastPage) => lastPage.length + 1,
});

const onChangeListType = (type: EListType) => {
  listType.value = type;
};

useIntersectionObserver(target, ([entry]) => {
  targetIsVisible.value = entry?.isIntersecting || false;
});

const todoList = computed(() => {
  if (data.value?.pages && data.value?.pages.length > 0) {
    return data.value.pages.flat().filter((todo) => {
      if (listType.value === EListType.All) return true;
      if (listType.value === EListType.Pending) return !todo.completed;
      if (listType.value === EListType.Completed) return todo.completed;
    });
  }

  return [];
});

watch(targetIsVisible, (isVisible) => {
  if (isVisible && hasNextPage.value) {
    fetchNextPage();
  }
});
</script>
