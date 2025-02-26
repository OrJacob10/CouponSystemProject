import { authStore, logoutAction } from "../Redux/AuthState";
import TokenModel from "../Models/TokenModel";
import authService from "./AuthService";

class TokenService {
  isTokenExpired(): boolean {
        const expirationDate: number = authStore.getState().exp!;
        const currentDate: number = Math.round((new Date()).getTime() / 1000);
        console.log(expirationDate);
        console.log(currentDate);
        return expirationDate <= currentDate;
      }
      
  TokenExpiredHandler(token: string): boolean {
        if (token === null || this.isTokenExpired()) {
          authService.logout();
          return true;
        }
        return false;
    }
}
const tokenService: TokenService = new TokenService();
export default tokenService;