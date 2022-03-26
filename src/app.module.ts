import { join } from 'path';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from './users.resolver';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import {
  DirectiveLocation,
  GraphQLBoolean,
  GraphQLDirective,
  GraphQLEnumType,
  GraphQLInt,
} from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      plugins: [responseCachePlugin()],
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'cacheControl',
            locations: [
              DirectiveLocation.FIELD_DEFINITION,
              DirectiveLocation.OBJECT,
              DirectiveLocation.INTERFACE,
              DirectiveLocation.UNION,
            ],
            args: {
              maxAge: { type: GraphQLInt },
              scope: {
                type: new GraphQLEnumType({
                  name: 'CacheControlScope',
                  astNode: {
                    kind: 'EnumTypeDefinition',
                    description: undefined,
                    name: { kind: 'Name', value: 'CacheControlScope' },
                    directives: [],
                    values: [
                      {
                        kind: 'EnumValueDefinition',
                        description: undefined,
                        name: { kind: 'Name', value: 'PUBLIC' },
                        directives: [],
                      },
                      {
                        kind: 'EnumValueDefinition',
                        description: undefined,
                        name: { kind: 'Name', value: 'PRIVATE' },
                        directives: [],
                      },
                    ],
                  },
                  values: {
                    PUBLIC: {
                      astNode: {
                        kind: 'EnumValueDefinition',
                        description: undefined,
                        name: {
                          kind: 'Name',
                          value: 'PUBLIC',
                        },
                        directives: [],
                      },
                    },
                    PRIVATE: {
                      astNode: {
                        kind: 'EnumValueDefinition',
                        description: undefined,
                        name: {
                          kind: 'Name',
                          value: 'PRIVATE',
                        },
                        directives: [],
                      },
                    },
                  },
                }),
              },
              inheritMaxAge: { type: GraphQLBoolean },
            },
          }),
        ],
      },
    }),
  ],
  providers: [UsersResolver],
})
export class AppModule {}
