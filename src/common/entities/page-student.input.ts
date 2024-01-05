import { IsNumber} from '@nestjs/class-validator'
import { InputType, Field, Int } from '@nestjs/graphql'



@InputType()
export class PaginationtInput {

  @IsNumber()
  @Field((type)=> Int)
  page?: number


  @Field((type)=> Int)
  limit?: number
}
