export function calculateOtpTimer(expiresAt: number, serverTime: number): number{
    const now = Math.floor(Date.now() / 1000);
    const delay = now - serverTime;
    return expiresAt - (serverTime + delay);
}