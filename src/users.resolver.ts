import { Args, Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UsersResolver {
  @Query()
  getUser(@Args('id') id: string) {
    console.log('calling');

    return { id: id };
  }
}
