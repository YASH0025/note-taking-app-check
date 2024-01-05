import { Student } from './student.entity'
import { Field, Int, ObjectType } from '@nestjs/graphql'



@ObjectType()
export class StudentPaginated {

  @Field((type) => Int)
  total: number


  @Field(() => [Student])
  students: Student[]
}
