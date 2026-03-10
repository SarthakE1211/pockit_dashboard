"use client";

import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { persistor } from "@/src/store/store";
import { useDispatch } from "react-redux";
import { clearUser } from "@/src/store/slices/userSlice";
import { useAppSelector } from "../store/hooks";

type AuthContextType = {
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userId = useAppSelector((state) => state.user?.UserID);

    const logout = async () => {
        // remove token cookie
        await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        // clear redux state
        dispatch(clearUser());

        // clear persisted redux
        persistor.purge();

        // redirect
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};