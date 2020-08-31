import { Resolver, Mutation, Arg, Ctx} from "type-graphql";
import bcryptjs from 'bcryptjs';
import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class LoginResolver{

    @Mutation(() => User)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() Ctx: MyContext
    ): Promise<User | null>{
        const user = await User.findOne({where:  {email}});

        if(!user){
            return null
        }
        
        const valid = await bcryptjs.compare(password, user.password);

        if(!valid){
            return null;
        }

        Ctx.req.session!.userId = user.id;

        return user;
    }

}