"use client";
import Header from "@/src/features/dashboard/Header";
import { useAppSelector } from "@/src/store/hooks";
import { RootState } from "@/src/store/store";
import { useSelector } from "react-redux";
const DashBoard = () => {
    const user = useAppSelector((state) => state.user);
    console.log("user", user, user?.UserID);

    return (
        <div>
            <Header />
        </div>
    )
}

export default DashBoard