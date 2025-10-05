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

  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(data: { Email: string; Password: string }) {
    try {
      const formData = new FormData();
      formData.append("Email", data.Email);
      formData.append("Password", data.Password);

      const response = await this.api.post(`/api/auth/login`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.token) {
        // this.setAuthTokens(response.data.token, response.data.refreshToken);
        const user = response.data.value;
        Cookies.set("token", response.data.token);
        Cookies.set("user", JSON.stringify(user));
        // Update user state in the store
        useAppStore.getState().login({
          username: user.userName ?? user.username ?? "",
          email: user.email ?? "",
        });
      }
      return response.data;
    } catch (error) {
      console.error("Failed to login:", error);
      throw error;
    }
  }

  public async signup(data: any) {
    try {
      const formData = new FormData();
      Object.entries(data || {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const res = await this.api.post(`/api/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data) {
        const user = res.data.value;
        Cookies.set("token", res.data.token);
        Cookies.set("user", JSON.stringify(user));
        // Update user state in the store
        useAppStore.getState().login({
          username: user.userName ?? user.username ?? "",
          email: user.email ?? "",
        });
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
