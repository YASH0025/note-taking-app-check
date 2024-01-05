import { CreateStudentInput } from './create-student.input'
import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsNumber} from '@nestjs/class-validator'
import { InputType, Field, Int } from '@nestjs/graphql'



@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {

  @IsString()
  @Field((type)=>String, {nullable: true})
  firstName: string


  @IsString()
  @Field((type)=> String, {nullable: true})
  lastName: string


  @IsNumber()
  @Field((type)=> Int, {nullable: true})
  age: number


  @Field((type)=> String)
  _id: string
}
