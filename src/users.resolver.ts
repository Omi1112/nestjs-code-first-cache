import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './users.model';

@Resolver((of) => User)
export class UsersResolver {
  @Query((returns) => User)
  getUser(@Args('id') id: string) {
    console.log('calling');

    return { id: id };
  }
}
