import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { Email, Message, User, UserFind, UserPaginated } from '../common/entities/user.entity'
import { ResetPasswords, UpdatePasswords, UpdateUserInput } from './dto/update-user.input'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { RemoveUserInput } from '../auth/dto/create-auth.input'
import { PaginationtInput } from '../common/entities/page-student.input'



@Resolver(() => User)
export class UsersResolver {


  constructor(private readonly usersService: UsersService) { }


  @UseGuards(GqlAuthGuard)
  @Query((returns) => [User])
  findAll() {
    return this.usersService.findAll()
  }


  @Query((returns) => User, { name: 'findOneUser' })
  async findUser(@Args('userDetail') userDetail: UserFind) {
    const result = this.usersService.findUser(userDetail)
    return result
  }



  // @Mutation((returns) => Message)
  // async generateOTP(@Args('generateOtp') data: Email): Promise<Message> {
  //   const generatedOtp = await this.usersService.generateOTP(data);
  //   return generatedOtp;
  // }


  @Query((returns) => Message)
  async forgotPassword(@Args('forgotPass') data: Email): Promise<Message> {
    const generatedOtp = await this.usersService.forgotPassword(data);
    return generatedOtp;
  }


  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() context: any
  ) {
    const userId = context?.req?.user._id
    const result = this.usersService.update(userId, updateUserInput)
    return result
  }


  @Mutation(() => Message)
  async resetPassword(@Args('resetPassword') resetPassword: ResetPasswords) {
    const result = await this.usersService.resetPassword(resetPassword)
    return result
  }


  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async updatePassword(
    @Args('updatePassword') updatePassword: UpdatePasswords,
    @Context() context: any,
  ) {
    const userData = context?.req?.user
    const result = await this.usersService.updatePassword(userData, updatePassword)
    return result
  }


  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async removeUser(@Args('removeUser') email: Email) {

    const result = await this.usersService.remove(email)
    return result
  }

  @Query((returns) => UserPaginated)
  async getListInPagination(
    @Args('pageinate') paginate?: PaginationtInput
  ): Promise<UserPaginated> {
    const data = await this.usersService.findByPagination(paginate)
    return data as UserPaginated
  }
}
