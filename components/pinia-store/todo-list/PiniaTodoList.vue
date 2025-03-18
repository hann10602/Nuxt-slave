<template>
  <div class="bg-white rounded-sm w-96">
    <slot name="first-slot" />
    <div class="border-b border-solid border-black p-4">
      <div class="flex justify-between items-center gap-x-2 h-12 mb-4">
        <input
          class="flex-1 h-full border border-solid border-black outline-none items-center rounded-sm px-2"
          placeholder="Add a new task"
          v-model="addTodoInput"
        />
        <div
          @click="onAddTodo"
          class="bg-blue-400 h-full flex items-center px-2 text-white rounded-md cursor-pointer"
        >
          Add
        </div>
      </div>
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
      <draggable
        v-model="displayedTodoList"
        :item-key="(item: TTodo) => item.id"
        class="overflow-y-auto h-full"
      >
        <template #item="{ element, index }">
          <todo-item :todo="element" :index="index" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "~/stores/todoStore";
import { storeToRefs } from "pinia";
import draggable from "vuedraggable";
import TodoItem from "./todo-item/TodoItem.vue";
import { EListType } from "@/enums";
import type { TTodo } from "~/types/Todo";

const todoStore = useTodoStore();
const { todoList } = storeToRefs(todoStore);

const listType = ref(EListType.All);
const addTodoInput = ref<string>("");

const displayedTodoList = computed(() =>
  todoList.value.filter((todo) => {
    if (listType.value === EListType.All) return true;
    if (listType.value === EListType.Pending) return !todo.completed;
    if (listType.value === EListType.Completed) return todo.completed;
  })
);

const onChangeListType = (type: EListType) => {
  listType.value = type;
};

const onAddTodo = () => {
  todoStore.addTodo({
    id: Math.random().toString(36).substr(2, 9),
    title: addTodoInput.value,
    completed: false,
  });
  addTodoInput.value = "";
};
</script>
