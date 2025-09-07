export type Role = "user" | "admin" | "vendor";

export interface IUser {
    name: string,
    email:string,
    phone: string,
    password:string,
    role:"user"
}

export interface IVendor {
    name: string,
    email:string,
    phone:string,
    password:string,
    role:"vendor"
}

export interface IAdmin {
    email:string,
    password:string,
    role:"admin"
}

export type UserDTO = IAdmin | IVendor | IVendor;