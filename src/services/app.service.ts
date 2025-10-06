import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

class AppService {
  private static instance: AppService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle 401 errors and token refresh
    // this.api.interceptors.response.use(
    //   (response) => response,
    //   async (error: AxiosError) => {
    //     const originalRequest = error.config as AxiosRequestConfig & {
    //       _retry?: boolean;
    //     };

    //     // If error is not 401 or if we already tried to refresh the token
    //     if (error.response?.status !== 401 || originalRequest._retry) {
    //       return Promise.reject(error);
    //     }

    //     // Prevent multiple refresh attempts
    //     if (this.isRefreshing) {
    //       return new Promise((resolve, reject) => {
    //         this.failedRequests.push(() => {
    //           if (originalRequest.headers) {
    //             originalRequest.headers.Authorization = `Bearer ${Cookies.get(
    //               "buka_token"
    //             )}`;
    //           }
    //           this.api(originalRequest).then(resolve).catch(reject);
    //         });
    //       });
    //     }

    //     originalRequest._retry = true;
    //     this.isRefreshing = true;

    //     try {
    //       // Try to refresh the token
    //       await authService.refreshAccessToken();

    //       // Process all the failed requests in the queue
    //       this.failedRequests.forEach((callback) => callback());
    //       this.failedRequests = [];

    //       // Retry the original request
    //       if (originalRequest.headers) {
    //         originalRequest.headers.Authorization = `Bearer ${Cookies.get(
    //           "buka_token"
    //         )}`;
    //       }
    //       return this.api(originalRequest);
    //     } catch (refreshError) {
    //       // If refresh fails, clear auth and redirect to login
    //       await authService.logout();
    //       return Promise.reject(refreshError);
    //     } finally {
    //       this.isRefreshing = false;
    //     }
    //   }
    // );
  }

  public static getInstance(): AppService {
    if (!AppService.instance) {
      AppService.instance = new AppService();
    }
    return AppService.instance;
  }

  
  public async createBattle({
    habit,
    duration,
    opponentEmail,   
  }: {
    habit: string,
    duration: number,
    opponentEmail: string
  }) {
    try {
      const response = await this.api.post(`/api/battle/create`, {
        habit,
        duration,
        opponentEmail,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to create battle", error);
      throw error;
    }
  }

  public async strike(battleId: string) {
    try {
      const response = await this.api.post(`/api/battle/${battleId}/habit-strike`);
      return response.data;
    } catch (error) {
      console.error("Failed to strike battle", error);
      throw error;
    }
  }
  
  public async habitStrike(battleId: string) {
    return this.strike(battleId);
  }

  public async activateBattle(battleId: string, email: string) {
    try {
        const response = await this.api.post(`/api/battle/${battleId}/accept/${email}`);
  return response.data;
    } catch (error) {
        console.error("Failed to activate battle", error);
        
    }
  }
  
  public async getBattleStatus(battleId: string) {
    try {
      const response = await this.api.get(`/api/battle/${battleId}/status`);
      return response.data;
    } catch (error) {
        console.error("Failed to get battle status", error);
      throw error;
    }
  }

  public async getLeaderboard() {
    try {
        const response = await this.api.get(`/api/battle/leaderboard`);
        return response.data;
    } catch (error) {
        console.error("Failed to get leaderboard", error);
        throw error;
    }
  }
}


export default AppService.getInstance();
