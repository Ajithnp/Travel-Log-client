import api from "@/config/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";

export const sendMessageToBot = async (
    payload: ChatRequest
): Promise<string> => {
    const response = await api.post<ApiResponse<string>>(
        `${API_ENDPOINTS.CHAT_BOT}`,
        payload
    );
    return response.data?.data
};

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ChatRequest {
    message: string;
    chatHistory: { role: 'user' | 'assistant'; content: string }[];
}

export interface ChatResponse {
    data: string;
}