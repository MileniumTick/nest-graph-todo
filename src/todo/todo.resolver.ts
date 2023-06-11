import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatetodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { AggregationsType } from './types/aggregations.type';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(
    @Args()
    statusArgs: StatusArgs,
  ): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'findTodo' })
  findOne(@Args('id', { type: () => Int, defaultValue: 0 }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(
    @Args('createTodoInput', {
      type: () => CreatetodoInput,
      name: 'createtodoInput',
    })
    createtodoInput: CreatetodoInput,
  ) {
    return this.todoService.create(createtodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(
    @Args('updateTodoInput', {
      type: () => UpdateTodoInput,
      name: 'updateTodoInput',
    })
    updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Todo, { name: 'deleteTodo' })
  deleteTodo(
    @Args('id', {
      type: () => Int,
      name: 'id',
    })
    id: number,
  ) {
    return this.todoService.delete(id);
  }

  // Aggregations
  @Query(() => Int, { name: 'totalTodos' })
  totalTodos(): number {
    return this.todoService.total;
  }

  @Query(() => Int, { name: 'completedTodos' })
  completedTodos(): number {
    return this.todoService.completed;
  }

  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodos(): number {
    return this.todoService.pending;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      total: this.totalTodos(),
      completed: this.completedTodos(),
      pending: this.pendingTodos(),
      totals: this.totalTodos(),
    };
  }
}
