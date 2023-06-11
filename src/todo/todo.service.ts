import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatetodoInput, StatusArgs, UpdateTodoInput } from './dto';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Poder', done: false },
    { id: 3, description: 'Piedra de la Realidad', done: true },
  ];

  findAll(statusArgs: StatusArgs): Todo[] {
    return this.todos.filter((todo) =>
      statusArgs?.status !== undefined ? todo.done === statusArgs.status : todo,
    );
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException('Dont find the todo!');

    return todo;
  }

  create(createtodoInput: CreatetodoInput): Todo {
    const todo = new Todo();

    todo.description = createtodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  update({ id, description, done }: UpdateTodoInput) {
    const updateTodo = this.findOne(id);

    if (description) updateTodo.description = description;
    if (done !== undefined) updateTodo.done = done;

    this.todos = this.todos.map((todo) => (todo.id === id ? updateTodo : todo));

    return updateTodo;
  }

  delete(id: number) {
    const deleteTodo = this.findOne(id);

    this.todos = this.todos.filter((todo) => todo.id !== deleteTodo.id);

    return deleteTodo;
  }

  get total(): number {
    return this.todos.length;
  }
  get completed() {
    return this.todos.reduce((accumulator, currentTodo) => {
      if (currentTodo.done === true) {
        return (accumulator += 1);
      }

      return accumulator;
    }, 0);
  }

  get pending() {
    return this.todos.reduce((accumulator, currentTodo) => {
      if (currentTodo.done === false) {
        return (accumulator += 1);
      }

      return accumulator;
    }, 0);
  }
}
