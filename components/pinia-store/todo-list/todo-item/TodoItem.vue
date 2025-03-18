<template>
  <div
    class="cursor-move py-2 text-sm flex justify-between items-center"
    :class="{ 'border-t border-solid border-gray-200': props.index !== 0 }"
  >
    <div class="flex justify-center items-center gap-x-2">
      <input
        type="checkbox"
        :checked="props.todo.completed"
        @change="onChangeTodoState"
      />
      <input
        v-if="isEdit"
        type="text"
        class="border border-solid border-black outline-none rounded-md py-1 px-2"
        v-model="todoTitle"
      />
      <p
        v-else
        class="font-semibold"
        :class="{ 'line-through': props.todo.completed }"
      >
        {{ todoTitle }}
      </p>
    </div>
    <div class="flex justify-center items-center gap-x-2">
      <div
        class="bg-green-400 px-2 py-1 text-white rounded-md cursor-pointer"
        @click="onEditTodo"
      >
        Edit
      </div>
      <div
        class="bg-red-400 px-2 py-1 text-white rounded-md cursor-pointer"
        @click="todoStore.deleteTodo(props.todo.id)"
      >
        Delete
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { TTodo } from "@/types/Todo";

const props = defineProps<{
  todo: TTodo;
  index: number;
}>();

const isEdit = ref<boolean>(false);
const todoTitle = ref<string>(props.todo.title);

const todoStore = useTodoStore();

const onChangeTodoState = (event: Event) => {
  todoStore.completeTodo(
    (event.target as HTMLInputElement).checked as boolean,
    props.todo.id
  );
};

const onEditTodo = (event: Event) => {
  if (isEdit.value) {
    isEdit.value = false;
    todoStore.editTodo(props.todo.id, (event.target as HTMLInputElement).value);
  } else {
    isEdit.value = true;
  }
};
</script>
