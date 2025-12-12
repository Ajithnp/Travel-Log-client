// import { getStorageitem } from "@/utils/utils";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface IUserSlice {
  id: string;
  name: string;
  email: string;
  role: 'user'| 'admin' | 'vendor';
}
interface IUserState {
  user: IUserSlice | null,
}

const initialState: IUserState = {
  user: null
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSlice>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
