import type { TTodo } from "~/types/Todo";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todoList: [
      {
        id: "1",
        title: "Todo 1",
        completed: false,
      },
      {
        id: "2",
        title: "Todo 2",
        completed: false,
      },
      {
        id: "3",
        title: "Todo 1",
        completed: false,
      },
      {
        id: "4",
        title: "Todo 2",
        completed: false,
      },
      {
        id: "5",
        title: "Todo 1",
        completed: false,
      },
      {
        id: "6",
        title: "Todo 2",
        completed: false,
      },
      {
        id: "7",
        title: "Todo 1",
        completed: false,
      },
      {
        id: "8",
        title: "Todo 2",
        completed: false,
      },
      {
        id: "9",
        title: "Todo 1",
        completed: false,
      },
      {
        id: "10",
        title: "Todo 2",
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
    editTodo(id: string, title: string) {
      this.todoList = this.todoList.filter((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      });
    },
    deleteTodo(id: string) {
      this.todoList.filter((item) => item.id != id);
    },
    completeTodo(value: boolean, todoId: string) {
      this.todoList = this.todoList.map((todo) => {
        if (todo.id === todoId) {
          todo.completed = value;
        }

        return todo;
      });
    },
  },
});
