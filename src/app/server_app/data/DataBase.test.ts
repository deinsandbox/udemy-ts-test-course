import { DataBase } from "./DataBase";
import * as IdGenerator from "./IdGenerator";

type someTypeWithId = {
  id: string;
  name: string;
  color: string; 
};

describe("DataBase", () => {
  let sut: DataBase<someTypeWithId>;
  const fakeId = "1234";

  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return id after insert", async () => {
    const data = { id: "" } as any;
    const actual = await sut.insert(data);
    expect(actual).toBe(fakeId);
  });

  it("should get element after insert", async () => {
    const data = { id: "", name: "name", color: "blue" };
    const id = await sut.insert(data);
    const actual = await sut.getBy("id", id);
    const expected = { ...data, id: fakeId };
    expect(actual).toStrictEqual(expected);
  });

  it("should find all elements with the same property", async () => {
    const dataFirst = { id: "", name: "one-name", color: "blue" };
    const dataSecond = { id: "", name: "two-name", color: "blue" };

    await sut.insert(dataFirst);
    await sut.insert(dataSecond);

    const actual = await sut.findAllBy("color", "blue");
    const expected = [dataFirst, dataSecond].map((x) => ({ ...x, id: fakeId }));
    expect(actual).toStrictEqual(expected);
  });

  it("should change the color on a element", async () => {
    const data = { id: "", name: "name", color: "blue" };
    const id = await sut.insert(data);

    const expectedColor = "red";
    await sut.update(id, "color", expectedColor);

    const actual = await sut.getBy("id", id);
    expect(actual).toStrictEqual(
      expect.objectContaining({ color: expectedColor })
    );
    expect(actual.color).toBe(expectedColor);
  });

  it("should delete an element", async () => {
    const data = { id: "", name: "name", color: "blue" };
    const id = await sut.insert(data);

    await sut.delete(id);

    const actual = await sut.getBy("id", id);
    expect(actual).toBeUndefined();
  });

  it("should get all element", async () => {
    const firstData = { id: "", name: "one-name", color: "blue" };
    const secondData = { id: "", name: "two-name", color: "blue" };

    await sut.insert(firstData);
    await sut.insert(secondData);

    const actual = await sut.getAllElements();
    const expected = [firstData, secondData].map((x) => ({ ...x, id: fakeId }));

    expect(actual).toStrictEqual(expected);
  });
});
