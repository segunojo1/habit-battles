import useAppStore from "@/store/app.store";
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

class AuthService {
  private static instance: AuthService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // No token interceptor needed for auth endpoints
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(data: { identifier: string; password: string }) {
    try {
      const response = await this.api.post(`/api/auth/login`, data);
      if (response.data?.token && response.data?.refreshToken) {
        // this.setAuthTokens(response.data.token, response.data.refreshToken);
        const user = response.data.user;
        Cookies.set("user", JSON.stringify(user));
        // Update user state in the store
        useAppStore.getState().login(user);
      }
      return response.data;
    } catch (error) {
      console.error("Failed to login:", error);
      throw error;
    }
  }

  public async signup(data: any) {
    try {
      const res = await this.api.post(`/api/auth/signup`, data);
      if (res.data) {
        const user = res.data.user;
        Cookies.set("user", JSON.stringify(user));
      }
      return res.data;
    } catch (error) {
      console.error("Failed to signup", error);
      throw error;
    }
  }
}

// export const signIn = async () =>  {
//     try {
//         const response = await axios
//     } catch (error) {

//     }
// }

export default AuthService.getInstance();
