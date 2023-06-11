import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int, {
    description: 'The todo id',
  })
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'What do you needs to be done!',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(20)
  description?: string;

  @Field(() => Boolean, {
    description: 'Is the todo done?',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  done?: boolean = false;
}
