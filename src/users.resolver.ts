import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';

@Resolver('User')
export class UsersResolver {
  @Query()
  getUser(@Args('id') id: string) {
    console.log("callin");

    return { id: id };
  }
}
