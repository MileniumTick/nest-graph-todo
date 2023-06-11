import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'Retorna un hola mundo en ingles',
    name: 'hola',
  })
  helloWorld(): string {
    return 'Hello World';
  }

  @Query(() => Number, { name: 'randomNumber' })
  randomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomZeroTo',
    description: 'Random number from zero to exclusive',
  })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, defaultValue: 6 }) to: number,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
