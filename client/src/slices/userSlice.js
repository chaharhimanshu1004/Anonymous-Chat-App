import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload;
        },
        logout:(state,action)=>{
            state.user = null;
        },
        setUserImage: (state, action) => {
            // Assuming action.payload contains userId and imageUrl
            if (state.user && state.user.uid === action.payload.userId) {
                state.user.imageUrl = action.payload.imageUrl;
            }
        },
    },

});
export const { login, logout, setUserImage } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;

