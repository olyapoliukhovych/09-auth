// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import { checkSession, getMe } from "../../lib/api/clientApi";
// import { useAuthStore } from "../../lib/store/authStore";
// import { useEffect, useState } from "react";

// type Props = {
//   children: React.ReactNode;
// };

// const AuthProvider = ({ children }: Props) => {
//   const setUser = useAuthStore((state) => state.setUser);
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
//   const clearIsAuthenticated = useAuthStore(
//     (state) => state.clearIsAuthenticated,
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     const isAuthenticated = await checkSession();
//   //     if (isAuthenticated) {
//   //       const user = await getMe();
//   //       if (user) setUser(user);
//   //     } else {
//   //       clearIsAuthenticated();
//   //     }
//   //   };
//   //   fetchUser();
//   // }, [setUser, clearIsAuthenticated]);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const user = await getMe();
//         setUser(user);
//       } catch (error) {
//         clearIsAuthenticated();
//         if (pathname.startsWith("/profile")) {
//           router.push("/sign-in");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuth();
//   }, [setUser, clearIsAuthenticated, pathname, router]);

//   if (isLoading) {
//     return (
//       <div
//         style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
//       >
//         <p>Loading session...</p>
//       </div>
//     );
//   }

//   return children;
// };

// export default AuthProvider;

"use client";

import { usePathname, useRouter } from "next/navigation";
import { getMe } from "../../lib/api/clientApi";
import { useAuthStore } from "../../lib/store/authStore";
import { useEffect, useState } from "react";

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
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Loading session...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
