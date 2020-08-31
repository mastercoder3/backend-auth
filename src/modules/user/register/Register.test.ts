import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";

let conn: Connection;

beforeAll(async () => {
    conn = await testConn();
});

afterAll(async () => {
    await conn.close();
});

const registerMutaion = `
mutation Register($data: RegisterInput!){
    register($data:{
        firstName: "Junaid",
        lastName: "Hassan",
        email: "test1@gmail.com",
        password: "123123"
      }){
        name,
        id,
        email
      }
}
`;

describe('Register', () => {
    it("create user", async() => {
        console.log(await gCall({
            source:  registerMutaion,
            variableValues: {
                data: {
                    firstName: 'test',
                    lastName: 'last test',
                    email: 'test3@gmail.com',
                    password: '123123'
                }
            }
        }))
    });
})