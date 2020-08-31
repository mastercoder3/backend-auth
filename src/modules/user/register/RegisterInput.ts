import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IsEmailExists } from './isEmailAlreadyExist';

@InputType()
export class RegisterInput{

    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailExists({message: "Email already in use"})
    email: string;

    @Field()
    password: string;
}