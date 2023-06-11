import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreatetodoInput {
  @Field(() => String, { description: 'What do you needs to be done!' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  description: string;
}
