export const apiConfig = {
    baseUrl:import.meta.env.VITE_API_URL

}

export const appConfig = {
    googleAuth: {
        oauthClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
        redirectUrl: import.meta.env.VITE_GOOGLE_REDIRECTED_URL || 'http://localhost:3001/api/v1/auth/google/callback'
        
    }
}