// Objective: Define the structure of the response of the authentication API.

export interface AuthApiResponseModel {
  statusCode?: number
  message?: string | [string]
  error?: string
}
