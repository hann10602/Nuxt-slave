export type TTodoStore = {
  todoList: TTodo[];
};

export type TTodo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};
