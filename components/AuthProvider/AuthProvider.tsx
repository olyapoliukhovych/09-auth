"use client";

import { usePathname, useRouter } from "next/navigation";
import { getMe } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const user = await getMe();
        setUser(user);

        if (pathname === "/sign-in" || pathname === "/sign-up") {
          router.push("/profile");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        clearIsAuthenticated();

        if (pathname.startsWith("/profile")) {
          router.push("/sign-in");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <Spinner fullScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
