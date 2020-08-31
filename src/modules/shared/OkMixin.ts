import { ClassType, Field, InputType } from 'type-graphql';

export const OkMixin = <T extends ClassType>(BaseClass: T) =>{
    @InputType()
    class OkInput extends BaseClass{
        @Field()
        Ok: boolean;
    }

    return OkInput;
}