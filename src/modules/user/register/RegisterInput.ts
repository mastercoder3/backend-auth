import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IsEmailExists } from './isEmailAlreadyExist';
import { PasswordInput } from './../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput{

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
}