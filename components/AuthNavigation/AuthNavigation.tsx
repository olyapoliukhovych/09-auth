"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import toast from "react-hot-toast";

export default function AuthNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const getActiveClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return isActive ? css.active : "";
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch {
      toast.error("Failed to log out");
      clearIsAuthenticated();
      router.push("/sign-in");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <Link
              href="/"
              prefetch={false}
              className={`${css.navigationLink} ${getActiveClass("/")}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/notes/filter/all"
              prefetch={false}
              className={`${css.navigationLink} ${getActiveClass("/notes/filter/all")}`}
            >
              Notes
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={`${css.navigationLink} ${getActiveClass("/profile")}`}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>User email: {user?.email}</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={`${css.navigationLink} ${getActiveClass("/sign-in")}`}
            >
              Sign in
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={`${css.navigationLink} ${getActiveClass("/sign-up")}`}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
