import * as AWS from "aws-sdk";
import { ToDoList } from "../domains/toDoList";
import { APIGatewayProxyResult } from "aws-lambda";
import * as uuid from "uuid";

const TableName: string = "ToDoList";
const DocClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "ap-northeast-1"
});

export default class ToDoListTable {
  /**
   * 一覧処理
   */
  public static async getList(): Promise<APIGatewayProxyResult> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: TableName
    };
    try {
      const res = await DocClient.scan(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      };
    } catch (err) {
      console.log("Error", err);
      return {
        statusCode: 500,
        body: err
      };
    }
  }

  /**
   * 登録処理
   * @param data 登録するToDoList
   */
  public static async insert(data: ToDoList): Promise<APIGatewayProxyResult> {
    // IDにUUIDをセット
    data.id = uuid.v4();

    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: TableName,
      Item: data
    };
    try {
      await DocClient.put(params).promise();
      return {
        statusCode: 204,
        body: ""
      };
    } catch (err) {
      console.log("Error", err);
      return {
        statusCode: 500,
        body: err
      };
    }
  }
}
