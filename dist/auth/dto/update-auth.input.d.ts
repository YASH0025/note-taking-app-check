import { CreateAuthInput } from './create-auth.input';
declare const UpdateAuthInput_base: import("@nestjs/common").Type<Partial<CreateAuthInput>>;
export declare class UpdateAuthInput extends UpdateAuthInput_base {
    id: number;
}
export declare class LoginAuth {
    email: string;
    password: string;
}
export {};
