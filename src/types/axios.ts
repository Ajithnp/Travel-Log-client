import { AxiosError } from "axios";

export interface IApiResponse {
    success: boolean,
    message: string,
}

export type ApiError = AxiosError<{ message: string }>;