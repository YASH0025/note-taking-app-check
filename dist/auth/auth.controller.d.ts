import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    verifyUser(token: string, res: any): Promise<any>;
}
