export type UserRegistrationType = {
    name: string,
    email: string,
    password: string,
    role?: string,
}

export type UserLoginType = {
    email: string,
    password: string,
}