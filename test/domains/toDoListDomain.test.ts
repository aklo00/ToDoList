import { ToDoListDomain, ToDoList } from "../../src/domains/toDoListDomain";
import { ToDoListTable } from "../../src/infrastructures/toDoListTable";

describe("toDoListDomain create", (): void => {
  test("success", async () => {
    const data: ToDoList = {
      id: "test_id",
      title: "タイトル",
      content: "内容",
      done: true
    };
    // モック化
    ToDoListTable.create = jest.fn().mockReturnValue({
      statusCode: 200,
      body: JSON.stringify({
        id: data.id
      })
    });
    const res = await ToDoListDomain.create(JSON.stringify(data));
    expect(res).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        id: data.id
      })
    });
  });

  test("err_400", async () => {
    const errData: string = "{ id:test_id }";
    const res = await ToDoListDomain.create(errData);
    expect(res).toEqual({
      statusCode: 400,
      body: "Bad Request"
    });
  });
});

describe("toDoListDomain update", (): void => {
  test("success", async () => {
    const data: ToDoList = {
      id: "test_id",
      title: "タイトル",
      content: "内容",
      done: true
    };
    // モック化
    ToDoListTable.update = jest.fn().mockReturnValue({
      statusCode: 204,
      body: null
    });
    const res = await ToDoListDomain.update(data.id, JSON.stringify(data));
    expect(res).toEqual({
      statusCode: 204,
      body: null
    });
  });

  test("err_400", async () => {
    const errData: string = "{ id:test_id }";
    const res = await ToDoListDomain.update("test_id", errData);
    expect(res).toEqual({
      statusCode: 400,
      body: "Bad Request"
    });
  });
});
