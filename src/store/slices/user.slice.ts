import { getStorageitem } from "@/utils/utils";
import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/types/IUser";


interface IUserState {
    user: IUser | null;
   isLoading:boolean
};

const initialState :IUserState = {
    user: getStorageitem("userSession") || null,
    isLoading: false,
};



const userSlice = createSlice ( {
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
              state.isLoading = false
            //  localStorage.setItem("userSession", JSON.stringify(action.payload)); place this where the api call is made
             
        },
        clearUser: (state) => {
            state.user = null;
              state.isLoading = false
          
        },
         setUserLoading: (state, action: PayloadAction<boolean>) => {
           state.isLoading = action.payload;
        }

    
    }
})
export const { setUser, clearUser ,setUserLoading} = userSlice.actions;
export default userSlice.reducer;