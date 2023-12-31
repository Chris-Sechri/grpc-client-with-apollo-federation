import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;
  @Field()
  name: string;
}
