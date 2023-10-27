import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false,
    name: null,
    email:null,
    role: null,id:null
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.name = action.payload.name;
            state.role = action.payload.role;
            state.email= action.payload.email;
            state.id=action.payload.id;
            localStorage.setItem('token', action.payload.token)
            state.isAuthenticated = true
        },
        logout:(state,action)=>{
            state.name = null;
            state.role = null;
            state.name= null;
            state.id=null;
            state.isAuthenticated = false
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer;
