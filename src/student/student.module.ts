import { Module } from '@nestjs/common'
import { StudentService } from './student.service'
import { StudentResolver } from './student.resolver'
import { StudentProviders } from './student.providers'
import { DatabaseModule } from '../common/database/database.module'



@Module({
  imports: [DatabaseModule],
  providers: [StudentResolver, StudentService, ...StudentProviders]
})

export class StudentModule {}
