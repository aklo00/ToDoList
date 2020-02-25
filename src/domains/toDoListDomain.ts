import { ToDoListTable } from "../infrastructures/toDoListTable";

export interface ToDoList {
  id?: string;
  title: string;
  content: string;
  done: boolean;
}

export class ToDoListDomain {
  /**
   * ToDoList登録処理
   * @param body
   */
  public static async create(body: string) {
    let toDoList: ToDoList;
    // JSONをパース
    try {
      toDoList = JSON.parse(body);
    } catch (err) {
      return {
        statusCode: 400,
        body: "Bad Request"
      };
    }
    return ToDoListTable.create(toDoList);
  }

  /**
   * ToDoList更新処理
   * @param body
   */
  public static async update(id: string, body: string) {
    let toDoList: ToDoList;
    // JSONをパース
    try {
      toDoList = JSON.parse(body);
    } catch (err) {
      return {
        statusCode: 400,
        body: "Bad Request"
      };
    }
    return ToDoListTable.update(id, toDoList);
  }
}
