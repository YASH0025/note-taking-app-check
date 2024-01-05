import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { DatabaseModule } from '../common/database/database.module'
import { UsersProviders } from './users.providers'
import { jwtSecret } from '../auth/constants'
import { CommonFunctions } from '../common/common_functions/commonfunctions'



@Module({
  imports: [DatabaseModule,
    JwtModule.register({
    secret: jwtSecret,
    signOptions: { expiresIn: '9h' }
  })
],
  providers: [UsersResolver, UsersService, ...UsersProviders, CommonFunctions],
  exports: [UsersService]
})

export class UsersModule { }
