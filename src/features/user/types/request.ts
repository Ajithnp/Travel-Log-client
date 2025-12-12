
export type UpdateProfilePayload = {
    name?: string
    phone?: string
};

export type ChangeEmailRequestPayload = {
    email: string
}

export type ChangeEmailPayload = {
    otp: string;
    email: string;
};

export type ChangePasswordPayload = {
    oldPassword: string;
    newPassword: string;
};