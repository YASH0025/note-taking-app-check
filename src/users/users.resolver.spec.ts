import { Test, TestingModule } from '@nestjs/testing'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CONSTANTS } from '../constants';
describe('UsersResolver', () => {
  let app;
  // let resolver: UsersResolver
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Not Successfull delete user', async () => {
    const query = `
    mutation RemoveUser {
      removeUser(removeUser: { userName: "synsoft1" }) {
          message
          statusCode
      }
  }  
  `
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect(response => {
        const data = response.body.data
        expect(data.removeUser.message).toEqual(CONSTANTS.USER_DELETE_ERROR)
        expect(data.removeUser.statusCode).toEqual(HttpStatus.FORBIDDEN)
      })
  })



  // it('Delete user', async () => {
  //   const query = `
  //   mutation RemoveUser {
  //     removeUser(removeUser: { userName: "synsoft" }) {
  //         message
  //         statusCode
  //     }
  // }
  // `
  //   return await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({ query })
  //     .expect(200)
  //     .expect(response => {
  //       const data = response.body.data
  //       expect(data.removeUser.message).toEqual(CONSTANTS.USER_DELETE_SUCCESS)
  //       expect(data.removeUser.statusCode).toEqual(HttpStatus.OK)
  //     })
  // })
  it('should be defined', () => {
    // expect(resolver).toBeDefined()
  })
})
