//Interface for API response

export interface APIResponse<T> {
  status: number
  statusText: string
  data: T
}
