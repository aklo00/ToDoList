import { ToDoList } from "../../src/domains/toDoList";
import ToDoListTable from "../../src/infrastructures/toDoListTable";
import { insert } from "../../src/handler/handler";

// jest.mock で対象のファイルをモック化します
jest.mock("../../src/infrastructures/dynamodb/toDoListTable");

describe("greeting Input/Output", (): void => {
  test("hello usecase", async () => {
    const insertData: ToDoList = {
      id: "1",
      title: "タイトル",
      content: "内容",
      done: false
    };

    // モック化したモジュールに対して、呼び出される関数ものについては戻り値を定義します
    const insertMock = (ToDoListTable.insert as jest.Mock).mockResolvedValue(
      null
    );

    // 入力値とモックが準備できたら、 Lambda Function を実行します
    const response = await insert(insertData);

    // モック化した関数が1回だけコールされたことをテストします
    expect(insertMock.mock.calls.length).toBe(1);

    const expected: ToDoList = {
      id: "1",
      title: "タイトル",
      content: "内容",
      done: false
    };

    // 1回目の呼び出しのひとつめのパラメータが期待どおりに渡されていることをテストします
    // 結果的に、ユースケース内のオブジェクト変換処理のテストにもなっています
    expect(insertMock.mock.calls[0][0]).toEqual(expected);

    // レスポンスが期待どおりであることをテストします
    expect(response).toEqual(expected);
  });
});
