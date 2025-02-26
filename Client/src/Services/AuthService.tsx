import axios from "axios";
import appConfig from "../Configuration/config";
import LoginModel from "../Models/LoginModel";
import { authStore, loginAction, logoutAction} from "../Redux/AuthState";
import TokenModel from "../Models/TokenModel";

class AuthService {

    async login(loginDetails: LoginModel): Promise<void> {
        const response = await axios.post<TokenModel>(appConfig.apiLogin, loginDetails);
        const token: TokenModel = response.data;
        authStore.dispatch(loginAction(token));
    }
    
    logout(): void{
        authStore.dispatch(logoutAction());
    }
}

const authService: AuthService = new AuthService();
export default authService;