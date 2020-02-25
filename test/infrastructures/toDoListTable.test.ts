import { ToDoListTable, DocClient } from "../../src/infrastructures/toDoListTable";
import { ToDoList } from "../../src/domains/toDoListDomain";
import * as uuid from "uuid";

describe("toDoListTable getList", (): void => {
  test("success", async () => {
    const data1: ToDoList = {
      id: "test_id1",
      title: "タイトル1",
      content: "内容1",
      done: true
    };
    const data2: ToDoList = {
      id: "test_id2",
      title: "タイトル2",
      content: "内容2",
      done: false
    };
    // モック化
    DocClient.scan = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Items: [data1, data2]
      })
    });
    const res = await ToDoListTable.getList();
    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify([data1, data2])
    });
  });
});

describe("toDoListTable getById", (): void => {
  test("success", async () => {
    const data: ToDoList = {
      id: "test_id",
      title: "タイトル",
      content: "内容",
      done: true
    };
    // モック化
    DocClient.get = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Item: data
      })
    });
    const res = await ToDoListTable.getById("id");
    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify(data)
    });
  });

  test("err_404", async () => {
    // モック化
    DocClient.get = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({
        Item: null
      })
    });
    const res = await ToDoListTable.getById("id");
    expect(res).toEqual({
      statusCode: 404,
      body: "Not Found"
    });
  });
});

describe("toDoListTable create", (): void => {
  test("success", async () => {
    const data: ToDoList = {
      id: "test_id",
      title: "タイトル",
      content: "内容",
      done: true
    };
    // モック化
    DocClient.put = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({})
    });
    jest.spyOn(uuid, "v4").mockReturnValue(data.id);

    const res = await ToDoListTable.create(data);
    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        id: data.id
      })
    });
  });
});

describe("toDoListTable update", (): void => {
  test("success", async () => {
    const data: ToDoList = {
      id: "test_id",
      title: "タイトル",
      content: "内容",
      done: true
    };
    // モック化
    DocClient.update = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({})
    });

    const res = await ToDoListTable.update(data.id, data);
    expect(res).toEqual({
      statusCode: 204,
      body: null
    });
  });
});

describe("toDoListTable delete", (): void => {
  test("success", async () => {
    const id: string = "test_id";
    // モック化
    DocClient.delete = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({})
    });

    const res = await ToDoListTable.delete(id);
    expect(res).toEqual({
      statusCode: 204,
      body: null
    });
  });
});
