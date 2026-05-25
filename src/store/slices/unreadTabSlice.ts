import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type VendorTab, type AdminTab } from "../../lib/constants/constants";


export type TabKey = VendorTab | AdminTab;


interface UnreadTabsState {
    tabs: TabKey[];
}

const initialState: UnreadTabsState = {
    tabs: [],
};

const unreadTabsSlice = createSlice({
    name: "unreadTabs",
    initialState,
    reducers: {
        setUnreadTabs: (state, action: PayloadAction<TabKey[]>) => {
            state.tabs = action.payload;
        },
        addUnreadTab: (state, action: PayloadAction<TabKey>) => {
            if (!state.tabs.includes(action.payload)) {
                state.tabs.push(action.payload);
            }
        },
        removeUnreadTab: (state, action: PayloadAction<TabKey>) => {
            state.tabs = state.tabs.filter((t) => t !== action.payload);
        },
    },
});

export const { setUnreadTabs, addUnreadTab, removeUnreadTab } =
    unreadTabsSlice.actions;

export default unreadTabsSlice.reducer;


export const selectIsTabUnread = (tabKey: TabKey) => (state: { unreadTabs: UnreadTabsState }) => state.unreadTabs.tabs.includes(tabKey);