import { CreateAuthInput } from './dto/create-auth.input';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Data, Email, Message, User, UserAuthentication } from '../common/entities/user.entity';
import { LoginAuth } from './dto/update-auth.input';
import { CommonFunctions } from '../common/common_functions/commonfunctions';
export declare class AuthService {
    private jwtService;
    private userModel;
    private UserDetailsModel;
    private readonly commonFunctions;
    private mongooseFunction;
    constructor(jwtService: JwtService, userModel: Model<User>, UserDetailsModel: Model<UserAuthentication>, commonFunctions: CommonFunctions);
    signUpUser(createAuthInput: CreateAuthInput): Promise<Message>;
    resendAccountVerificationEmail(email: Email): Promise<Message>;
    verifyUser(token: string): Promise<"<h1>User verified successfully</h1>" | "<h1>User already verified</h1>" | "<h1>Invalid url</h1>">;
    signInUser(loginAuthInput: LoginAuth): Promise<Data>;
}
