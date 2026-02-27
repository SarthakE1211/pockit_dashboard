import axios, { AxiosInstance, AxiosError } from 'axios';

interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
}

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = '/api') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies in requests
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => this.handleError(error)
    );
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);

      // Handle token expiration
      if (error.response.status === 401) {
        // Token expired or invalid, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error: No response received');
    } else {
      // Error in request setup
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }

  // Auth API calls
  async login(username: string, password: string): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await this.client.post<ApiResponse<{ token: string }>>('/auth/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<ApiResponse<null>> {
    try {
      const response = await this.client.post<ApiResponse<null>>('/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await this.client.post<ApiResponse<{ message: string }>>('/auth/forgot-password', {
        email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Generic GET request
  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  // Generic POST request
  async post<T>(url: string, data: Record<string, unknown>): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  // Generic PUT request
  async put<T>(url: string, data: Record<string, unknown>): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  // Generic DELETE request
  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
