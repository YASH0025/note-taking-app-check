import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { Data, Email, Message } from '../common/entities/user.entity';
import { LoginAuth } from './dto/update-auth.input';
import { JwtService } from '@nestjs/jwt';
export declare class AuthResolver {
    private jwtService;
    private readonly authService;
    constructor(jwtService: JwtService, authService: AuthService);
    signUpUser(signUpUser: CreateAuthInput): Promise<Message>;
    signInUser(signInUser: LoginAuth, context: any): Promise<Data>;
    resendAccountVerificationEmail(email: Email): Promise<Message>;
    greetings(): Promise<string>;
}
