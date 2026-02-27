"use client";
import { useEffect, useState } from "react";
import LoginForm from "@/src/features/auth/components/LoginForm";
import SplashScreen from "@/src/features/auth/components/SplashScreen";

const LoginPage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const seen = localStorage.getItem("seenSplash");

    if (seen) {
      setShowSplash(false);
    } else {
      // First time, show splash for 6 seconds then hide
      const timer = setTimeout(() => {
        localStorage.setItem("seenSplash", "true");
        setShowSplash(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Only render after client-side mount to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return <>{showSplash ? <SplashScreen /> : <LoginForm />}</>;
};

export default LoginPage;
