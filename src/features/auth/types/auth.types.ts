import type { Role } from "./role"
export interface ILoginPayload {
    name: string,
    email: string,
    role: Role
}