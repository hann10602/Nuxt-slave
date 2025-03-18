export interface TTodoStore {
  todoList: TTodo[];
}

export interface TTodo {
  id: string;
  title: string;
  completed: boolean;
}
