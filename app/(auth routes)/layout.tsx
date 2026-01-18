// "use client";

// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect, useState } from "react";

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// export default function AuthLayout({ children }: AuthLayoutProps) {
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();

//   useEffect(() => {
//     router.refresh();
//     setLoading(false);
//   }, [router]);

//   return <>{loading ? <div>Loading...</div> : children}</>;
// }

"use client";

import { ReactNode } from "react";
// import css from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div
    // className={css.authContainer}
    >
      {children}
    </div>
  );
}
