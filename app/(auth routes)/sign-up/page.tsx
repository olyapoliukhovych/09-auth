"use client";

import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { notify, RegisterRequest } from "@/lib/api/clientApi";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignUp = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);

      if (res) {
        setUser(res);
        notify.registerSuccess();
        router.push("/profile");
      }
    } catch {}
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
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
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUp;
