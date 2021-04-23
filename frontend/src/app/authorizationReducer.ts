import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from '../config/axios';

interface ILogin {
    login: string,
    password: string
}

export interface IRegister {
    firstName: string, 
    lastName: string,
    eMail: string, 
    login: string, 
    password: string,
    confirmPassword: string,
    role: string
}

export const submitLogin = createAsyncThunk(
    'authorization/submitLogin',
    async (data: ILogin) => {
        const login = await axios.post(`/authorization/login?login=${data.login}&password=${data.password}`)
        .then( response => response.data)
        .then( data => {
            window.localStorage.setItem("token", JSON.stringify(data));
            return data
        })
        .catch( err => console.error(err) )
        return login
    }
);

export const submitRegister = createAsyncThunk(
    'authorization/submitRegister',
    async (data: IRegister) => {
        const register = axios.post(
            `/authorization/register?firstName=${data.firstName}&lastName=${data.lastName}&email=${data.eMail}&login=${data.login}&password=${data.password}&role=${data.role}`
        ).then( response => response.data ) 
        .catch( err => console.error(err) )
        return register
    }
)

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: {
        token: "",
        isCreated: false,
        error: false,
    },
    reducers: { },
    extraReducers: builder => {
        builder.addCase(submitLogin.fulfilled, (state, action: PayloadAction<string>) => {
            state.token = action.payload
        });
        builder.addCase(submitRegister.fulfilled, (state, action: PayloadAction<string>) => {
            state.isCreated = true
        });
        builder.addCase(submitRegister.rejected, (state, action) => {
            state.isCreated = false
            state.error = true
        });
    }
})

export default authorizationSlice.reducer 
