import { IncomingMessage, ServerResponse } from "http";
import { RegisterHandler } from "./RegisterHandler";
import { Authorizer } from "../auth/Authorizer";
import { HTTP_CODES, HTTP_METHODS } from "../model/ServerModel";

const getRequestBodyMock = jest.fn();

jest.mock("../utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock()
}));

describe('RegisterHandler', () => {
  let sut: RegisterHandler;

  const request = {
    method: undefined,
  }

  const responseMock = {
    statusCode: 0,
    writeHead: jest.fn(),
    write: jest.fn(),
  }

  const authorizerMock = {
    registerUser: jest.fn()
  }

  beforeEach(() => {
    sut = new RegisterHandler(
      request as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizerMock as any as Authorizer
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should register valid account in request', async () => {
    request.method = HTTP_METHODS.POST;
    const someId = '1234';
    const someAccount = {
      id: '',
      userName: 'user',
      password: 'pass'
    };

    getRequestBodyMock.mockResolvedValueOnce(someAccount);
    authorizerMock.registerUser.mockResolvedValueOnce(someId);

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.writeHead).toHaveBeenCalledWith(
      HTTP_CODES.CREATED,
      {
        'Content-Type': 'application/json'
      }
    )
    expect(responseMock.write).toHaveBeenCalledWith(
      JSON.stringify(
        {
          userId: someId
        })
    )
  })
})