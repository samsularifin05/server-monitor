import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getItem } from "./localStroage";
import { generateSignature, VITE_APP_BE_URL } from "./signature";
import { IResponseLoginDto } from "../types/userdata";
import {
  ApiResponse,
  ErrorResponse,
  RefresTokenInterFace,
} from "../types/axios";

interface ServerErrorResponse {
  message?: string;
  status?: number;
  [key: string]: unknown;
}
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean; // Optional _retry property
}
const errorRegex =
  /Unauthorized|Invalid token|Invalid signature|Token Tidak Ditemukan/i;

class ApiInstance {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: VITE_APP_BE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
    // Interceptor untuk menambah header setiap request
  }

  private initializeResponseInterceptor() {
    this.axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (originalRequest && axios.isAxiosError(error)) {
          const errResponse = error as AxiosError<ErrorResponse>;
          const message =
            errResponse.response?.data?.message || errResponse.message;

          if (/Token has expired/i.test(message) && !originalRequest._retry) {
            originalRequest._retry = true;

            const newTokens = await this.refreshToken();

            if (newTokens?.access_token) {
              if (!originalRequest.headers) {
                originalRequest.headers = {};
              }
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newTokens.access_token}`;

              // Retry original request with new token
              return this.axios(originalRequest);
            }
          }

          if (errorRegex.test(message)) {
            // await this.logout();
          }
        }

        return Promise.reject(error);
      }
    );
  }
  private initializeRequestInterceptor() {
    this.axios.interceptors.request.use(
      (config) => {
        const userdata = getItem<IResponseLoginDto>("userdata");
        const timestamp = new Date().toISOString();
        const signature = generateSignature(timestamp);

        if (config.headers && typeof config.headers.set === "function") {
          config.headers.set("Content-Type", "application/json");
          config.headers.set(
            "Authorization",
            userdata?.access_token ? `Bearer ${userdata.access_token}` : ""
          );
          config.headers.set("timestamp", timestamp);
          config.headers.set("signature", signature);
          config.headers.set("user_id", userdata?.user_id ?? "");
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  /** ----------------
   *  HTTP METHODS
   *  ---------------- */
  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(() => this.axios.get<ApiResponse<T>>(endpoint));
  }

  public async post<T>(
    endpoint: string,
    data: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(() =>
      this.axios.post<ApiResponse<T>>(endpoint, data)
    );
  }

  public async put<T>(
    endpoint: string,
    data: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>(() =>
      this.axios.put<ApiResponse<T>>(endpoint, data)
    );
  }

  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(() => this.axios.delete<ApiResponse<T>>(endpoint));
  }

  /** ----------------
   *  Core Request Handler
   *  ---------------- */
  private async request<T>(
    fn: () => Promise<AxiosResponse<ApiResponse<T>>>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fn();
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /** ----------------
   *  Error Handler
   *  ---------------- */
  private handleError(error: unknown): Error {
    if (!axios.isAxiosError(error)) {
      return new Error("Tidak Terhubung Ke Server");
    }

    const err = error as AxiosError<ServerErrorResponse>;

    if (err.response) {
      const message = err.response.data?.message ?? "Terjadi kesalahan";
      if (/Token is Expired/i.test(message)) {
        this.refreshToken();
      }

      if (errorRegex.test(message)) {
        // Bisa panggil this.logout() di sini
      }

      return new Error(message);
    }

    if (err.request) {
      return new Error("Tidak ada respon dari server");
    }

    return new Error(err.message);
  }

  /** ----------------
   *  Refresh Token Handler
   *  ---------------- */
  private async refreshToken(): Promise<RefresTokenInterFace> {
    const datauser = getItem<IResponseLoginDto>("userdata");
    if (!datauser) throw new Error("User data not found");

    try {
      const timestamp = new Date().toISOString();
      const signature = generateSignature(timestamp);

      const config: AxiosRequestConfig = {
        headers: {
          timestamp,
          signature,
          Accept: "application/json",
          user_id: datauser.user_id,
          Authorization: `Bearer ${datauser.access_token || ""}`,
        },
      };

      const body = {
        user_id: datauser.user_id,
        refresh_token: datauser.refresh_token,
      };

      const { data } = await axios.post<RefresTokenInterFace>(
        `${VITE_APP_BE_URL}/auth/refresh`,
        body,
        config
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data?.message || "Gagal memperbarui token"
        );
      }
      throw new Error("Tidak dapat terhubung ke server");
    }
  }

  /** ----------------
   *  Logout Helper (optional)
   *  ---------------- */
  // private logout(): void {
  //   localStorage.clear();
  //   window.location.reload();
  // }
}

export const apiInstance = new ApiInstance();
