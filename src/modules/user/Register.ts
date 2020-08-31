import { Resolver, Query, Mutation, Arg, UseMiddleware} from "type-graphql";
import bcryptjs from 'bcryptjs';
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuth } from "../middleware/isAuth";
import { sendEmail } from "../utils/sendEmail";
import { createConfirmationUrl } from "../utils/createConfirmationEmailUrl";

@Resolver()
export class RegisterResolver{
    @UseMiddleware(isAuth)
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

        await sendEmail(email, await createConfirmationUrl(user.id));
        return user;
    }

}