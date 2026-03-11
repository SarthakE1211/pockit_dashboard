import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type UserState = {
    Status: string;
    Message: string;
    UserID: string;
    LoginName: string;
    UserName: string;
    UserType: string;
    Photo: string;
    MobileNumber: string;
    EmailID: string;
    CityID: string;
    CompanyID: string;
    LastAccessedOn: string;
    EncryptedToken: string;
    RefreshToken: string;
    TokenExpiry: string;

} | null;
const initialState = null as UserState;



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            console.log("setUser", action);

            return action.payload
        },
        clearUser: (state) => {
            return null
        }

    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer