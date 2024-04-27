import { Interface } from 'readline'

export type SignInCredential = {
    Email: string
    password: string
}

export type SignInResponse = {
    
    token: string
    user: {
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignUpResponse = {
    status: number
    message: string
    data: Interface
}

export type SignUpCredential = {
    userName: string
    email: string
    password: string
    role: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
