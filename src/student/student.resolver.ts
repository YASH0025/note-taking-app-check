import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql'
import { StudentService } from './student.service'
import { CreateStudentInput } from './dto/create-student.input'
import { UpdateStudentInput } from './dto/update-student.input'
import { Student } from '../common/entities/student.entity'
import { Inject } from '@nestjs/common'
import { StudentPaginated } from '../common/entities/studentPaginated.entity'
import { PaginationtInput } from '../common/entities/page-student.input'



@Resolver((of) => Student)
export class StudentResolver {


  constructor(
    @Inject(StudentService) readonly studentService: StudentService,
  ) { }


  @Query((returns) => Student)
  async getSingleStudent(
    @Args('_id', { type: () => ID }) singleStudent: string,
  ): Promise<Student> {
    return this.studentService.findOne(singleStudent)
  }


  @Query((returns) => [Student])
  async getListOfStudents(): Promise<any> {
    return this.studentService.findAll()
  }


  @Query((returns) => StudentPaginated)
  async getListOfStudentsPagination(
    @Args('pageinate') paginateStu: PaginationtInput
  ): Promise<StudentPaginated> {
    const student = await this.studentService.findByPagination(paginateStu.page, paginateStu.limit)
    return student as StudentPaginated
  }


  @Mutation((returns) => Student)
  async createStudent(
    @Args('createStudent') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const student = await this.studentService.create(createStudentInput)
    return student
  }


  @Mutation((returns) => Student)
  async updateStudent(
    @Args('updateStudent') updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    const student = await this.studentService.update(
      updateStudentInput._id,
      updateStudentInput,
    )
    return student
  }
}
