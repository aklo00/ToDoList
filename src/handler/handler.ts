import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import "source-map-support/register";
import ToDoListTable from "../infrastructures/toDoListTable";
import { ToDoList, ToDoListDomain } from "../domains/toDoListDomain";

/**
 * ToDoList一覧取得API
 */
export async function getList(): Promise<APIGatewayProxyResult> {
  return ToDoListTable.getList();
}

/**
 * ToDoList取得API
 */
export async function getById(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  return ToDoListTable.getById(event.pathParameters["id"]);
}

/**
 * ToDoList登録API
 * @param body ToDoList
 */
export async function create(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  return ToDoListDomain.create(event.body);
}

/**
 * ToDoList更新API
 */
export async function update(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  return ToDoListDomain.update(event.pathParameters["id"], event.body);
}

/**
 * ToDoList削除API
 */
export async function deleteById(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
  return ToDoListTable.delete(event.pathParameters["id"]);
}
