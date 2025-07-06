import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/types/IUser";
import { getStorageitem } from "@/utils/utils";

interface IAdminState {
    admin: IUser | null;
    isAuthenticatedAdmin: boolean;
}

const initialState:IAdminState = {
     admin: getStorageitem("adminSession") || null,
     isAuthenticatedAdmin: false,
}


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: (state, action:PayloadAction<IUser> ) => {
            state.admin = action.payload;
            state.isAuthenticatedAdmin = true;
        },
        clearAdmin: (state) => {
            state.admin = null;
            state.isAuthenticatedAdmin = false;
        }
    }
})

export const { setAdmin, clearAdmin  } = adminSlice.actions;
export default adminSlice.reducer;