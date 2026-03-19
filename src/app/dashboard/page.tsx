"use client";
import Header from "@/src/features/dashboard/Header";
import { useAppSelector } from "@/src/store/hooks";
import { RootState } from "@/src/store/store";
import { useSelector } from "react-redux";
import BackendDashboard from "./backend/page";
import TechnicianDashboard from "./technician/page";
import CustomerDashboard from "./customer/page";
const DashBoard = () => {
    const user = useAppSelector((state) => state.user);
    console.log("user", user, user?.UserType);
    const UserType = user?.UserType

    return (
        <div>
            <Header />
            {UserType === "Admin" ? (
                <CustomerDashboard />
            ) : UserType === "technician" ? (
                <TechnicianDashboard />
            ) : UserType === "customer" ? (
                <CustomerDashboard />
            ) : null}
        </div>
    )
}

export default DashBoard
