import { Field, ID, Int, ObjectType } from '@nestjs/graphql'



@ObjectType()
export class Student {

  @Field((type) => String)
  firstName: string


  @Field((type) => String)
  lastName: string


  @Field((type) => Int)
  age: number


  @Field((type) => ID)
  _id: string
}
