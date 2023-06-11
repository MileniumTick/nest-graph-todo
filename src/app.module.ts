import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { TodoModule } from './todo/todo.module';

const plugins = [
  process.env.NODE_ENV
    ? ApolloServerPluginLandingPageProductionDefault({
        embed: true,
        graphRef: 'myGraph@prod',
      })
    : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins,
    }),
    HelloWorldModule,
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
