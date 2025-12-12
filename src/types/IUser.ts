export interface IUser {
    id:string
    name:string;
    email: string;
    phone: string;
    createdAt: string; // Date
    isBlocked: boolean;
    role: "user" | "admin" | "vendor";
};