import { getStorageitem } from "@/utils/utils";
import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/types/IUser";


interface IUserState {
    user: IUser | null;
    isAuthenticatedUser: boolean;
};

const initialState :IUserState = {
    user: getStorageitem("userSession") || null,
    isAuthenticatedUser: false,
};



const userSlice = createSlice ( {
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuthenticatedUser = true;
            //  localStorage.setItem("userSession", JSON.stringify(action.payload)); place this where the api call is made
             
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticatedUser = false;
          
        }
    }
})
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;