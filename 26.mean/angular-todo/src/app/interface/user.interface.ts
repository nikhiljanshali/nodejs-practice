export interface IAuthentication {
  message: string
  status: boolean
  data: AuthData
}

export interface AuthData {
  id: string
  firstName: string
  lastName: string
  email: string
}



export interface AuthResponse {
  message: string
  status: boolean
  data: AuthResponseData
}

export interface AuthResponseData {
  token: string
  user: AuthResponseUser
}

export interface AuthResponseUser {
  id: string
  email: string
}
