"use client";

import { Avatar, Drawer } from "antd";
import { useAppSelector } from "@/src/store/hooks";
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from "@/src/context/AuthContext";
type ProfileDrawerProps = {
    openDrawer: boolean;
    setOpenDrawer: (value: boolean) => void;
};

export default function ProfileDrawer({ openDrawer, setOpenDrawer }: ProfileDrawerProps) {
    const user = useAppSelector((state) => state.user);
    const { logout } = useAuth();
    console.log("user", user, user?.UserID);

    return (
        <div >
            <Drawer
                title="Profile"
                placement="right"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                size={400}
            >

                <div className="flex flex-row gap-10 items-center">
                    <div><Avatar style={{ backgroundColor: '#87d068' }} size={64} >{user?.UserName?.charAt(0).toUpperCase()}</Avatar></div>
                    <div>
                        <p><strong>Name:</strong> {user?.UserName}</p>
                        <p><strong>Email:</strong> {user?.EmailID}</p>
                        <p><strong>User ID:</strong> {user?.UserID}</p>
                        <p><strong>User Type:</strong> {user?.UserType}</p>
                    </div>
                    <div>
                        <button
                            className="bg-red-500 p-3 rounded-lg p-10 text-white shadow-lg hover:scale-105 transition cursor-pointer"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}