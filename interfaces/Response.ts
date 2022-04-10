export interface ErrorResponse {
  errors: { code: number, message: string, type: string }[],
  status: number
  timestamp: number
}

export interface SuccessResponse {
  success: boolean
}
