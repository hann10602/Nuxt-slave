import type { TTodo } from "~/types/Todo";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todoList: [
      {
        id: 1,
        title: "Todo 1",
        description: "Description 1",
        completed: false,
      },
      {
        id: 2,
        title: "Todo 2",
        description: "Description 2",
        completed: false,
      },
    ],
  }),
  getters: {
    getTodoList: (state) => state.todoList,
  },
  actions: {
    addTodo(newTodo: TTodo) {
      this.todoList.push(newTodo);
    },
  },
});
