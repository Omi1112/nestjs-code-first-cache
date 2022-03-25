import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@cacheControl(maxAge: 2000)')
export class User {
  @Field(() => ID)
  id: number;
}
