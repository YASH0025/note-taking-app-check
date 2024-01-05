import { InputType, Field, Int } from '@nestjs/graphql'
import {IsNotEmpty, IsString, IsNumber} from '@nestjs/class-validator'



@InputType()
export class CreateStudentInput {


  @IsNotEmpty()
  @IsString()
  @Field((type)=>String)
  firstName: string


  @IsNotEmpty()
  @IsString()
  @Field((type)=> String)
  lastName: string

  
  @IsNotEmpty()
  @IsNumber()
  @Field((type)=> Int)
  age: number
}
