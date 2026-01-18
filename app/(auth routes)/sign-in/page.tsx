"use client";

import { useRouter } from "next/navigation";
import css from "./SignInPage.module.css";
import { login, LoginRequest, notify } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignIn = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);

      if (res) {
        setUser(res);
        notify.loginSuccess();
        router.push("/profile");
      }
    } catch {}
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            minLength={8}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignIn;
