import { APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import ToDoListTable from "../infrastructures/toDoListTable";
import { ToDoList } from "../domains/toDoList";

/**
 * ToDoList一覧取得API
 */
export async function getList(): Promise<APIGatewayProxyResult> {
  return ToDoListTable.getList();
}

/**
 * ToDoList登録API
 * @param body ToDoList
 */
export async function insert(body: ToDoList): Promise<APIGatewayProxyResult> {
  return ToDoListTable.insert(body);
}
