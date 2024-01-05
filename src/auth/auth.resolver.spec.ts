import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../app.module'
import { CONSTANTS } from '../constants'
import { HttpStatus, INestApplication } from '@nestjs/common'

describe('Your Test Description', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = moduleFixture.createNestApplication();
    await app.init()
  });

  afterAll(async () => {
    await app.close()
  });

  it('Runs signUpUser mutation and check userName provided is empty string', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
                userName: ""
                password: "Synsoft@123"
                email: "synsoft@mailinator.com"
                fullName: "Synsoft Global"
                firstName: "Synsoft"
                lastName: "Global"
                agreeTerms: true
                age: 23
                mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.ENTER_USER_NAME)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signUpUser mutation and check userName provided null as string', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
                userName: "null"
                password: "Synsoft@123"
                email: "synsoft@mailinator.com"
                fullName: "Synsoft Global"
                firstName: "Synsoft"
                lastName: "Global"
                agreeTerms: true
                age: 23
                mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.ENTER_USER_NAME)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signUpUser mutation and check password provided empty string', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft"
              password: ""
              email: "synsoft@mailinator.com"
              fullName: "Synsoft Global"
              firstName: "Synsoft"
              lastName: "Global"
              agreeTerms: true
              age: 23
              mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.STRONG_PASSWORD)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signUpUser mutation and check email provided empty string', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft"
              password: "Synsoft@123"
              email: ""
              fullName: "Synsoft Global"
              firstName: "Synsoft"
              lastName: "Global"
              agreeTerms: true
              age: 23
              mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.EMAIL_VALID)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signUpUser mutation and check fullName provided empty string', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft"
              password: "Synsoft@123"
              email: "synsoft@mailinator.com"
              fullName: ""
              firstName: "Synsoft"
              lastName: "Global"
              agreeTerms: true
              age: 23
              mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.ENTER_FULLNAME)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signUpUser mutation and check firstName provided empty as string', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft"
              password: "Synsoft@123"
              email: "synsoft@mailinator.com"
              fullName: "Synsoft Global"
              firstName: ""
              lastName: "Global"
              agreeTerms: true
              age: 23
              mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.ENTER_FIRSTNAME)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signUpUser mutation and check firstName provided null as string', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft"
              password: "Synsoft@123"
              email: "synsoft@mailinator.com"
              fullName: "Synsoft Global"
              firstName: "null"
              lastName: "Global"
              agreeTerms: true
              age: 23
              mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.ENTER_FIRSTNAME)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signUpUser mutation and check lastName provided empty as string', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft"
              password: "Synsoft@123"
              email: "synsoft@mailinator.com"
              fullName: "Synsoft Global"
              firstName: "Synsoft"
              lastName: ""
              agreeTerms: true
              age: 23
              mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.ENTER_LASTNAME)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signUpUser mutation and check agreeTerms provided false', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft"
              password: "Synsoft@123"
              email: "synsoft@mailinator.com"
              fullName: "Synsoft Global"
              firstName: "Synsoft"
              lastName: "Global"
              agreeTerms: false
              age: 23
              mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.TERMS_AGREE)
          expect(errorStatusCode).toEqual(HttpStatus.NOT_MODIFIED)
        }
      })
  })


  it('Runs signUpUser mutation and register user', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft",
              password: "Synsoft@123",
              email: "synsoft@mailinator.com",
              fullName: "Synsoft Global",
              firstName: "Synsoft",
              lastName: "Global",
              agreeTerms: true,
              age: 29
              mobileNumber: "+911234567890"
            }
        ) {
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
        expect(data.signUpUser.message).toEqual(CONSTANTS.REGISTRATION_SUCCESSFULL)
        expect(data.signUpUser.statusCode).toEqual(HttpStatus.OK)
      })
  })


  it('Runs signUpUser mutation and check if user already exist', async () => {
    const query = `
         mutation SignUpUser {
        signUpUser(
            signUpUser: {
              userName: "synsoft",
              password: "Synsoft@123",
              email: "synsoft@mailinator.com",
              fullName: "Synsoft Global",
              firstName: "Synsoft",
              lastName: "Global",
              agreeTerms: true,
              age: 29
              mobileNumber: "+911234567890"
            }
        ) {
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
        if (response.body.errors) {
          const resp = response.body.errors
          const errorMessage = resp[0].message[0]
          const errorStatusCode = resp[0].statusCode
          expect(errorMessage).toEqual(CONSTANTS.EMAIL_EXISTS)
          expect(errorStatusCode).toEqual(HttpStatus.BAD_REQUEST)
        }
      })
  })


  it('Runs signInUser mutation and check userName and email provided is empty string', async () => {
    const query = `
         mutation SignInUser {
        signInUser(
            signInUser: {
              password: "Synsoft@123",
            }
            ) {
              message
              statusCode
              user {
                userName
                fullName
                email
                agreeTerms
                _id
                age
                auth_token
              }
            }
        }
      `
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect(response => {
        const { signInUser } = response.body.data
        expect(signInUser.message).toEqual(CONSTANTS.USERNAME_OR_EMAIL_CHECK)
        expect(signInUser.statusCode).toEqual(HttpStatus.BAD_REQUEST)
      })
  })


  it('Runs signInUser mutation and to signIn with email', async () => {
    const query = `
         mutation SignInUser {
        signInUser(
            signInUser: {
              password: "Synsoft@123",
              email: "synsoft@mailinator.com"
            }
            ) {
              message
              statusCode
              user {
                userName
                fullName
                email
                agreeTerms
                _id
                age
                auth_token
              }
            }
        }
      `
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect(response => {
        if (response?.body?.data) {
          const { signInUser } = response.body.data
          expect(signInUser.message).toEqual(CONSTANTS.SIGNEDIN_SUCCESS)
          expect(signInUser.statusCode).toEqual(HttpStatus.OK)

        }
      })
  })


  it('Runs signInUser mutation and to signIn with userName', async () => {
    const query = `
         mutation SignInUser {
        signInUser(
            signInUser: {
              password: "Synsoft@123",
              userName: "synsoft"
            }
            ) {
              message
              statusCode
              user {
                userName
                fullName
                email
                agreeTerms
                _id
                age
                auth_token
              }
            }
        }
      `
    return await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect(response => {
        if (response.body.data) {
          const { signInUser } = response.body.data
          expect(signInUser.message).toEqual(CONSTANTS.SIGNEDIN_SUCCESS)
          expect(signInUser.statusCode).toEqual(HttpStatus.OK)

        }
      })
  })


  // it('Delete user', async () => {
  //   const query = `
  //   mutation SignUpUser {
  //     removeUser(removeUser: { userName: "synsoft" }) {
  //       message
  //       statusCode
  //     }
  //   }
  // `
  //   return await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({ query })
  //     .expect(200)
  //     .expect(response => {
  //       const data = response.body.data
  //       expect(data.removeUser.message).toEqual('User removed')
  //       expect(data.removeUser.statusCode).toEqual(HttpStatus.OK)
  //     })
  // })

})
