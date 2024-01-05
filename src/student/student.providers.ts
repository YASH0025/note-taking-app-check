import { Connection } from 'mongoose'
import { StudentSchema } from '../schemas/student.schema'



export const StudentProviders = [
  {
    provide: 'STUDENT_MODEL',
    useFactory: (connection: Connection) => connection.model('Student', StudentSchema),
    inject: ['DATABASE_CONNECTION']
  }
]