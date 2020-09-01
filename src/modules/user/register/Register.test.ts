import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import { testConn } from "../../../test-utils/testConn";
import faker from 'faker';

let conn: Connection;

beforeAll(async () => {
    conn = await testConn();
});

afterAll(async () => {
    await conn.close();
});

const registerMutaion = `
mutation {
    register(data:{
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
        const user = {
            firstName: faker.name.findName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        const response = await gCall({
            source:  registerMutaion,
            variableValues: {
                data: {
                    user
                }
            }
        });
        console.log(response);
        expect(response).toMatchObject({
            data:{
                register:{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        });

    });
})