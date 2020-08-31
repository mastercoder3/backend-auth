import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { RegisterResolver } from './modules/user/Register';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import cors from 'cors';
import { LoginResolver } from './modules/user/Login';
import { MeResolver } from './modules/user/Me';


const main = async () => {

    await createConnection();

    const schema = await buildSchema({
        resolvers: [ RegisterResolver, LoginResolver, MeResolver ]
    });



    const apolloServer = new ApolloServer({
        schema,
        context: ({req} :any) => ({req})
    });

    const app = Express();

    const RefisStore = connectRedis(session);

    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }));

    app.use(
        session({
        store: new RefisStore({
            client: redis as any
        }),
        name: 'qid',
        secret: "qwerttypoipoip",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365 //7 years
        }
    })
    );

    apolloServer.applyMiddleware({app});

    app.listen(4000, () =>{
        console.log('Server Started @ http://localhost:4000 ');
    });
}

main();