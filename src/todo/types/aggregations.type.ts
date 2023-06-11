import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Todo quick aggregations' })
export class AggregationsType {
  @Field(() => Int, { name: 'total', description: 'Total of todos' })
  total: number;
  @Field(() => Int, {
    name: 'completed',
    description: 'Total of todos completed',
  })
  completed: number;
  @Field(() => Int, { name: 'pending', description: 'Total of todos pending' })
  pending: number;
  @Field(() => Int, {
    name: 'totals',
    description: 'Total of todos (deprecated)',
    deprecationReason: 'Most dont used instead',
  })
  totals: number;
}
