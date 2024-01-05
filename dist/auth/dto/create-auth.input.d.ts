import { Email } from '../../common/entities/user.entity';
export declare class SignInAuthInput extends Email {
    password: string;
}
export declare class CreateAuthInput extends SignInAuthInput {
    fullName: string;
}
export declare class RemoveUserInput {
    userName: string;
}
