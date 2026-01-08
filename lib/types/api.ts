// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
