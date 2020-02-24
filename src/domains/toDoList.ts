export class ToDoListDomain {}

export interface ToDoList {
  id: string;
  title: string;
  content: string;
  done: boolean;
}
