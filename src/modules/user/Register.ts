import { Resolver, Query, Mutation, Arg, Authorized} from "type-graphql";
import bcryptjs from 'bcryptjs';
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver{
    @Authorized()
    @Query(() => String)
    async hello(){
        return 'Hello World'
    }

    @Mutation(() => User)
    async register(
        @Arg('data') {email, password, firstName, lastName}: RegisterInput
    ): Promise<User>{
        const hashedPassword = await bcryptjs.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();
        return user;
    }

}