import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/types/IUser";
import { getStorageitem } from "@/utils/utils";

interface IVendorState {
    vendor: IUser | null;
    isAuthenticatedVendor: boolean;
};

const initialState: IVendorState = {
    vendor: getStorageitem("vendorSession") || null,
    isAuthenticatedVendor: false,
};

const vendorSlice = createSlice ({
    name: "vendor",
    initialState,
    reducers : {
        setVendor: (state, action:PayloadAction<IUser>) => {
            state.vendor = action.payload;
            state.isAuthenticatedVendor = true;
        },
        clearVendor: (state) => {
            state.vendor = null;
            state.isAuthenticatedVendor = false;
        }
    },
});

export const {setVendor, clearVendor} = vendorSlice.actions;
export default vendorSlice.reducer;
