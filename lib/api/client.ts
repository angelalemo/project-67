import { API_BASE_URL } from '../constants/api';
import { ApiError } from '../types/api';

/**
 * Base HTTP Client with error handling
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(this.getUrl(endpoint), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          endpoint
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error',
        500,
        endpoint
      );
    }
  }

  async post<T>(endpoint: string, data: FormData | object): Promise<T> {
    try {
      const isFormData = data instanceof FormData;
      
      const response = await fetch(this.getUrl(endpoint), {
        method: 'POST',
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          endpoint
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error',
        500,
        endpoint
      );
    }
  }

  async patch<T>(endpoint: string, data: FormData | object): Promise<T> {
    try {
      const isFormData = data instanceof FormData;
      
      const response = await fetch(this.getUrl(endpoint), {
        method: 'PATCH',
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          endpoint
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error',
        500,
        endpoint
      );
    }
  }

  //======================================= PUT AND DELETE METHODS =================================================================================
  
  async put<T>(endpoint: string, data: FormData | object): Promise<T> {
    const fullUrl = this.getUrl(endpoint);
    console.log('🔄 PUT Request to:', fullUrl);
    
    try {
      const isFormData = data instanceof FormData;
      
      const response = await fetch(fullUrl, {
        method: 'PUT',
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        console.error('❌ PUT failed with status:', response.status);
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          endpoint
        );
      }

      const result = await response.json();
      console.log('✅ PUT success');
      return result;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error',
        500,
        endpoint
      );
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    const fullUrl = this.getUrl(endpoint);
    console.log('🗑️ DELETE Request to:', fullUrl);
    
    try {
      const response = await fetch(fullUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('❌ DELETE failed with status:', response.status);
        throw new ApiError(
          `HTTP error! status: ${response.status}`,
          response.status,
          endpoint
        );
      }

      const result = await response.json();
      console.log('✅ DELETE success');
      return result;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        error instanceof Error ? error.message : 'Unknown error',
        500,
        endpoint
      );
    }
  }

}

export const apiClient = new ApiClient();