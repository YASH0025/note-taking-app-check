import { Injectable, Inject } from '@nestjs/common'
import { Student } from '../common/entities/student.entity'
import { Model } from 'mongoose'
import { CreateStudentInput } from './dto/create-student.input'
import { UpdateStudentInput } from './dto/update-student.input'
import { StudentPaginated } from '../common/entities/studentPaginated.entity'



@Injectable()
export class StudentService {

  constructor(
    @Inject('STUDENT_MODEL')
    private StudentModel: Model<Student>
  ) {}


  create(createStudentInput: CreateStudentInput) {
    try {
      console.log(createStudentInput)
      const student = new this.StudentModel(createStudentInput)
      student.save()
      return student as Student
    } catch (error) {
      return error
    }
  }


  whoAmI() {
    return 'Student here'
  }


  async findAll() {
    const studentList = await this.StudentModel.find()
    return studentList
  }


  async findByPagination(page, limit) {
    const skip = (page - 1) * limit
    const students = await this.StudentModel.find()
      .skip(skip)
      .limit(limit)
      .exec()
    const totalStudents = await this.StudentModel.countDocuments().exec()
    const a = {
      total: totalStudents,
      students: students
    }
    return a as StudentPaginated
  }


  async findOne(id: string) {
    const singleStudent = await this.StudentModel.findById(id).exec()
    return singleStudent as Student
  }


  async update(id: string, updateStudentInput: UpdateStudentInput) {
    const student = await this.StudentModel.findByIdAndUpdate(
      id,
      updateStudentInput,
      { new: true },
    ).exec()
    return student as Student
  }


  remove(id: number) {
    return `This action removes a #${id} student`
  }
}
