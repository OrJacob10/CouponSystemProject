import ErrorResponseModel from '../../Models/ErrorResponseModel';
import { logoutAction } from '../../Redux/AuthState';
import authService from '../../Services/AuthService';


class ErrorHandler {
  static handleErrorResponse(error: any): void {
    if (
      error.response !== undefined &&
      error.response.data !== '' &&
      error.response.data.message !== ''
    ) {
      const jsonString = JSON.stringify(error.response.data);
      const errorResponse: ErrorResponseModel = JSON.parse(jsonString);
      alert(errorResponse.message);
      
      if (errorResponse.code === 117) {
        authService.logout();
      }
    }
    console.log(error);
  }
}

export default ErrorHandler;
 