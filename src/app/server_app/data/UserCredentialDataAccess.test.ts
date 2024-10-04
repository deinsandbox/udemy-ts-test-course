import { Account } from "../model/AuthModel";
import { DataBase } from "./DataBase";
import { UserCredentialsDataAccess } from "./UserCredentialsDataAccess";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock("./DataBase", () => ({
    DataBase: jest.fn().mockImplementation(() => ({
      insert: insertMock,
      getBy: getByMock,
    })),
  })
);

describe("UserCredentialsDataAccess", () => {
  let sut: UserCredentialsDataAccess;

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should add user and return the id', async () => {
    const someAccount: Account = { id: '', userName: 'user', password: 'pass' };
    const fakeId = '1234';
    insertMock.mockResolvedValueOnce(fakeId);

    const id = await sut.addUser(someAccount);

    expect(id).toBe(fakeId);
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock).toHaveBeenCalledWith(someAccount);
  })

  it('should get user by id', async () => {
    const someAccount: Account = { id: '1234', userName: 'user', password: 'pass' };
    const expectedId = someAccount.id;
    getByMock.mockResolvedValueOnce(someAccount);

    const actual = await sut.getUserById(expectedId);
    expect(actual).toStrictEqual(someAccount);
    expect(getByMock).toHaveBeenCalledTimes(1);
    expect(getByMock).toHaveBeenCalledWith('id', expectedId);
  })

  it('should get user by username', async () => {
    const someAccount: Account = { id: '', userName: 'user', password: 'pass' };
    const expectedUser = someAccount.userName;
    getByMock.mockResolvedValueOnce(someAccount);

    const actual = await sut.getUserByUserName(expectedUser);
    expect(actual).toStrictEqual(someAccount);
    expect(getByMock).toHaveBeenCalledTimes(1);
    expect(getByMock).toHaveBeenCalledWith('userName', expectedUser);
  })
});
