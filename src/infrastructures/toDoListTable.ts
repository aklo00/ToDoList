import * as AWS from "aws-sdk";
import { ToDoList } from "../domains/toDoListDomain";
import { APIGatewayProxyResult } from "aws-lambda";
import * as uuid from "uuid";
import { AWSError } from "aws-sdk";

const TableName: string = "ToDoList";
const DocClient = new AWS.DynamoDB.DocumentClient({
  region: "ap-northeast-1",
  maxRetries: 5
});

export default class ToDoListTable {
  /**
   * 一覧取得処理
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
      let errorInfo = JSON.stringify(err);
      console.log("Error", errorInfo);
      if (err instanceof AWSError) {
        err.statusCode;
      }
      return {
        statusCode: 500,
        body: errorInfo
      };
    }
  }

  /**
   * 取得処理
   */
  public static async getById(id: string): Promise<APIGatewayProxyResult> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: TableName,
      Key: {
        id: id
      }
    };
    try {
      const res = await DocClient.get(params).promise();
      if (res.Item == null) {
        return {
          statusCode: 404,
          body: "Not Found"
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      };
    } catch (err) {
      console.log("Error", err);
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      };
    }
  }

  /**
   * 登録処理
   * @param data 登録するToDoList
   */
  public static async create(data: ToDoList): Promise<APIGatewayProxyResult> {
    // IDにUUIDをセット
    data.id = uuid.v4();

    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: TableName,
      Item: data
    };
    try {
      await DocClient.put(params).promise();
      return {
        statusCode: 200,
        body: JSON.stringify({
          id: data.id
        })
      };
    } catch (err) {
      console.log("Error", err);
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      };
    }
  }

  /**
   * 更新処理
   */
  public static async update(id: string, data: ToDoList): Promise<APIGatewayProxyResult> {
    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: TableName,
      Key: {
        id: id
      },
      UpdateExpression: "set title = :t, content=:c, done=:d",
      ExpressionAttributeValues: {
        ":t": data.title,
        ":c": data.content,
        ":d": data.done
      }
    };

    try {
      await DocClient.update(params).promise();
      return {
        statusCode: 204,
        body: null
      };
    } catch (err) {
      console.log("Error", err);
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      };
    }
  }

  /**
   * 削除処理
   */
  public static async delete(id: string): Promise<APIGatewayProxyResult> {
    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: TableName,
      Key: {
        id: id
      }
    };
    try {
      await DocClient.delete(params).promise();
      return {
        statusCode: 204,
        body: null
      };
    } catch (err) {
      console.log("Error", err);
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      };
    }
  }
}
