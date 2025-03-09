<template>
  <div>
    <ul>
      <li v-for="todo in todoList" :key="todo.id">
        {{ todo.id }}: {{ todo.title }} - {{ todo.description }}
      </li>
    </ul>
    <button class="bg-red-400 px-2 py-1" @click="handleAddTodo">
      click me
    </button>
  </div>
</template>

<script setup>
import { useTodoStore } from "~/stores/todoStore";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();
const { todoList } = storeToRefs(todoStore);

const handleAddTodo = () => {
  todoStore.addTodo({
    id: 3,
    title: "Learn Vue 3",
    description: "Description 1",
    completed: false,
  });
};

console.log("Todo list: ", todoList);
</script>
