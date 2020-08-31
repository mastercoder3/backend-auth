import { createConnection } from "typeorm";

export const testConn = (drop: boolean = false) => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "myuser",
        password: "123456",
        database: "test_example",
        synchronize: drop,
        dropSchema: drop,
        entities: [
            __dirname + "../entity/**/*.*"
         ]
    });
}